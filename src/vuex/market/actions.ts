import { ActionTree } from 'vuex';
import { getMrkets, favouriteMarkets, getMarketOrderbook, getMarketTrades } from '@/utils/apis';
import { MarketState } from './types';
import { RootState } from '../types';
import {
  unsubscribeTradeUpdate,
  subscribeTradeUpdate,
  unsubscribeL2update,
  subscribeL2update,
} from '@/utils/socket';

export const actions: ActionTree<MarketState, RootState> = {
  /**
   * 拉取市场列表
   */
  async fetchMarkets({ commit, rootState }) {
    const markets = await getMrkets(rootState.accountName);
    commit('setMarkets', markets);
  },
  /**
   * 收藏市场（多个）
   */
  async addFavoriteMarkets({ dispatch, commit, rootState }, ids: number[]) {
    if (!rootState.accountName) {
      ids.forEach(e => commit('addFavoriteMarketId', e));
      return;
    }
    if (!rootState.jwtToken) {
      await dispatch('fetchJwtToken', null, { root: true });
    }
    await favouriteMarkets(ids, true);
    dispatch('fetchMarkets');
  },
  /**
   * 收藏市场
   */
  async addFavoriteMarket({ dispatch }, id: number) {
    await dispatch('addFavoriteMarkets', [id]);
  },
  /**
   * 取消收藏市场（多个）
   */
  async removeFavoriteMarkets({ dispatch, commit, rootState }, ids: number[]) {
    if (!rootState.accountName) {
      ids.forEach(e => commit('removeFavoriteMarketId', e));
      return;
    }
    if (!rootState.jwtToken) {
      await dispatch('fetchJwtToken', null, { root: true });
    }
    await favouriteMarkets(ids, false);
    dispatch('fetchMarkets');
  },
  /**
   * 取消收藏市场
   */
  async removeFavoriteMarket({ dispatch }, id: number) {
    await dispatch('removeFavoriteMarkets', [id]);
  },
  /**
   * 更新市场（通过socket）
   */
  async updateMarket({ state, dispatch, commit }, marketId: number) {
    if (state.currentMarketId === marketId) return;
    if (state.currentMarketId) {
      unsubscribeL2update(state.currentMarketId);
      unsubscribeTradeUpdate(state.currentMarketId);
    }
    commit('setCurrentMarketId', marketId);
    await Promise.all([dispatch('fetchOrderbook', marketId), dispatch('fetchTrades', marketId)]);
    subscribeL2update(marketId);
    subscribeTradeUpdate(marketId);
  },
  /**
   * 拉取订单簿
   */
  async fetchOrderbook({ commit }, marketId: number) {
    const orderbook = await getMarketOrderbook(marketId);
    commit('setOrderbook', orderbook);
  },
  /**
   * 拉取最近撮合
   */
  async fetchTrades({ commit }, marketId: number) {
    const trades = await getMarketTrades(marketId);
    commit('setTrades', trades);
  },
};
