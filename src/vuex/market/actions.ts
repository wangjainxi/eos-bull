import { ActionTree } from 'vuex';
import { getMrkets, favouriteMarkets, getMarketOrderbook, getMarketTrades } from '@/utils/apis';
import { MarketState } from './types';
import { RootState } from '../types';
import { unsubscribeTradeUpdate, subscribeTradeUpdate } from '@/utils/socket';

export const actions: ActionTree<MarketState, RootState> = {
  async fetchMarkets({ commit }) {
    const markets = await getMrkets();
    commit('setMarkets', markets);
  },
  async addFavoriteMarkets({ dispatch, commit, rootState }, ids: number[]) {
    if (!rootState.accountName) {
      ids.forEach(e => commit('addFavoriteMarketId', e));
      return;
    }
    await favouriteMarkets(ids, true);
    dispatch('fetchMarkets');
  },
  async removeFavoriteMarkets({ dispatch, commit, rootState }, ids: number[]) {
    if (!rootState.accountName) {
      ids.forEach(e => commit('removeFavoriteMarketId', e));
      return;
    }
    await favouriteMarkets(ids, false);
    dispatch('fetchMarkets');
  },
  async updateMarket({ state, dispatch, commit }, marketId: number) {
    if (state.currentMarketId === marketId) return;
    if (state.currentMarketId) {
      unsubscribeTradeUpdate(state.currentMarketId);
    }
    commit('setCurrentMarketId', marketId);
    await Promise.all([dispatch('fetchOrderbook', marketId), dispatch('fetchTrades', marketId)]);
    subscribeTradeUpdate(marketId);
  },
  async fetchOrderbook({ commit }, marketId: number) {
    const orderbook = await getMarketOrderbook(marketId);
    commit('setOrderbook', orderbook);
  },
  async fetchTrades({ commit }, marketId: number) {
    const trades = await getMarketTrades(marketId);
    commit('setTrades', trades);
  },
};
