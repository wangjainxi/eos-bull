import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { getIdentity } from '@/utils/scatter';

import { RootState } from './types';
import { user } from './user';
import { order } from './order';
import { market } from './market';
import { announcement } from './announcement';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store<RootState>({
  state: {
    accountName: '',
  },
  modules: {
    user,
    order,
    market,
    announcement,
  },
  actions: {
    async login({ dispatch, commit }) {
      const res = await getIdentity();
      commit('setAccountName', res.name);
      dispatch('market/fetchMarkets');
      dispatch('user/fetchAccountInfo');
      dispatch('user/startFetchEOSAccountInfoLoop');
      dispatch('order/fetchPendingOrders');
      dispatch('order/fetchHistoryOrders');
    },
  },
  mutations: {
    setAccountName(state, accountName: string) {
      state.accountName = accountName;
    },
  },
  strict: debug,
  plugins: debug ? [createLogger({})] : [],
});

export default store;
