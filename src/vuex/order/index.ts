import { Module } from 'vuex';
import { OrderState } from './types';
import { RootState } from '../types';
import { getUserPendingOrders, getUserHistoryOrders } from '@/utils/apis';
import { Order, HistoryOrderParams } from '@/define';

const namespaced = true;

export const state: OrderState = {
  pendingOrders: [],
  historyOrders: [],
  historyOrderCount: 0,
};

export const order: Module<OrderState, RootState> = {
  namespaced,
  state,
  actions: {
    async fetchPendingOrders({ commit, rootState }) {
      const res = await getUserPendingOrders(rootState.accountName);
      commit('setPendingOrders', res);
    },
    async fetchHistoryOrders({ commit, rootState }, params: HistoryOrderParams, cover = true) {
      const res = await getUserHistoryOrders(rootState.accountName, params);
      commit('setHistoryOrders', res.orders, cover);
      commit('setHistoryOrderCount', res.count);
    },
  },
  mutations: {
    setPendingOrders(state, orders: Order[]) {
      state.pendingOrders = orders;
    },
    setHistoryOrders(state, orders: Order[], cover?: boolean) {
      if (cover) {
        state.historyOrders.push(...orders);
      } else {
        state.historyOrders = orders;
      }
    },
    setHistoryOrderCount(state, count) {
      state.historyOrderCount = count;
    },
  },
};
