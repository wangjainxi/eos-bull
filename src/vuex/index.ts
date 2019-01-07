import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { getIdentity, signature, getAccount, callScatterApi } from '@/utils/scatter';

import { RootState, STORAGE_JWT } from './types';
import { user } from './user';
import { order } from './order';
import { market } from './market';
import { announcement } from './announcement';
import { subscribeOrderUpdate } from '@/utils/socket';
import { login } from '@/utils/apis';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store<RootState>({
  state: {
    accountName: '',
    jwtToken: sessionStorage.getItem(STORAGE_JWT) || '',
  },
  modules: {
    user,
    order,
    market,
    announcement,
  },
  actions: {
    async login({ dispatch, commit, state }) {
      const res = await getIdentity();
      commit('setAccountName', res.name);
      dispatch('market/fetchMarkets');
      dispatch('user/fetchAccountInfo');
      dispatch('user/startFetchEOSAccountInfoLoop');
      dispatch('order/fetchPendingOrders');
      dispatch('order/fetchHistoryOrders');
      subscribeOrderUpdate(state.accountName);
    },
    async logout({ dispatch, commit }) {
      await callScatterApi('forgetIdentity');
      dispatch('user/stopFetchEOSAccountInfoLoop');
      commit('setAccountName', '');
      commit('setJwtToken', '');
      dispatch('market/fetchMarkets');
    },
    async fetchJwtToken({ commit, state }) {
      const account = await getAccount(state.accountName);
      const sig = await signature(
        account.permissions[0].required_auth.keys[0].key,
        state.accountName
      );
      const res = await login(state.accountName, sig);
      commit('setJwtToken', res.token);
    },
  },
  mutations: {
    setAccountName(state, accountName: string) {
      state.accountName = accountName;
    },
    setJwtToken(state, jwtToken: string) {
      state.jwtToken = jwtToken;
      sessionStorage.setItem(STORAGE_JWT, jwtToken);
    },
  },
  strict: debug,
  plugins: debug ? [createLogger({})] : [],
});

export default store;
