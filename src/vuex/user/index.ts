import { Module } from 'vuex';
import { UserState } from './types';
import { RootState } from '../types';
import { getAccountInfo } from '@/utils/apis';
import { AccountInfo, TokenBalance } from '@/define';
import { getAccount } from '@/utils/scatter';

let timer: any = null;
const namespaced = true;

export const state: UserState = {
  accountInfo: null,
  eosAccountInfo: null,
};

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters: {
    accountInfo(state) {
      return state.accountInfo;
    },
    walletTokens(state) {
      if (!state.accountInfo) return [];
      const tokens = state.accountInfo.tokens.slice();
      const { available, onOrder } = state.accountInfo.eos;
      tokens.unshift({
        available: {
          amount: available.amount,
          symbol: {
            contract: 'eostoken.io',
            symbol: available.symbol,
          },
        },
        onOrder: {
          amount: onOrder.amount,
          symbol: {
            contract: 'eostoken.io',
            symbol: available.symbol,
          },
        },
        estValue: available,
      });
      return tokens;
    },
    totalValuation(state) {
      if (!state.accountInfo) {
        return {
          name: 'EOS',
          amount: '0.0000',
        };
      }
      const { amount, symbol } = state.accountInfo.estValue;
      return { amount, name: symbol.name };
    },
    cpuInfo(state) {
      let used = 0;
      let max = 0;
      let usageRate = 0;
      if (state.eosAccountInfo) {
        const cpuLimit = state.eosAccountInfo.cpu_limit;
        used = cpuLimit.used;
        max = cpuLimit.max;
        usageRate = Math.round((used / max) * 10000) / 100.0;
      }
      return { used, max, usageRate };
    },
    netInfo(state) {
      let used = 0;
      let max = 0;
      let usageRate = 0;
      if (state.eosAccountInfo) {
        const cpuLimit = state.eosAccountInfo.net_limit;
        used = cpuLimit.used;
        max = cpuLimit.max;
        usageRate = Math.round((used / max) * 10000) / 100.0;
      }
      return { used, max, usageRate };
    },
    ramInfo(state) {
      let used = 0;
      let max = 0;
      let usageRate = 0;
      if (state.eosAccountInfo) {
        used = state.eosAccountInfo['ram_usage'];
        max = state.eosAccountInfo['ram_quota'];
        usageRate = Math.round((used / max) * 10000) / 100.0;
      }
      return { used, max, usageRate };
    },
  },
  actions: {
    async fetchAccountInfo({ commit, rootState }) {
      const res = await getAccountInfo(rootState.accountName);
      commit('setAccountInfo', res);
    },
    async fetchEOSAccountInfo({ commit, rootState }) {
      const res = await getAccount(rootState.accountName);
      commit('setEOSAccountInfo', res);
    },
    startFetchEOSAccountInfoLoop({ dispatch }) {
      dispatch('fetchEOSAccountInfo');
      timer = setInterval(() => {
        dispatch('fetchEOSAccountInfo');
      }, 3000);
    },
    stopFetchEOSAccountInfoLoop() {
      clearInterval(timer);
    },
  },
  mutations: {
    setAccountInfo(state, accountInfo: AccountInfo) {
      state.accountInfo = accountInfo;
    },
    setEOSAccountInfo(state, eosAccountInfo: any) {
      state.eosAccountInfo = eosAccountInfo;
    },
  },
};
