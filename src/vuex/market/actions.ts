import { ActionTree } from 'vuex';
import { getMrkets, favouriteMarkets, getMarketOrderbook, getMarketTrades } from '@/utils/apis';
import { MarketState } from './types';
import { RootState } from '../types';
import { unsubscribeTradeUpdate, subscribeTradeUpdate } from '@/utils/socket';

export const actions: ActionTree<MarketState, RootState> = {
  async fetchMarkets({ commit, rootState }) {
    const markets = await getMrkets(rootState.accountName);
    commit('setMarkets', markets);
  },
  async addFavoriteMarkets({ dispatch, commit, rootState }, ids: number[]) {
    if (!rootState.accountName) {
      ids.forEach(e => commit('addFavoriteMarketId', e));
      return;
    }
    if (!rootState.jwtToken) {
      await dispatch('fetchJwtToken');
    }
    await favouriteMarkets(ids, true);
    dispatch('fetchMarkets');
  },
  async addFavoriteMarket({ dispatch }, id: number) {
    await dispatch('addFavoriteMarkets', [id]);
  },
  async removeFavoriteMarkets({ dispatch, commit, rootState }, ids: number[]) {
    if (!rootState.accountName) {
      ids.forEach(e => commit('removeFavoriteMarketId', e));
      return;
    }
    if (!rootState.jwtToken) {
      await dispatch('fetchJwtToken');
    }
    await favouriteMarkets(ids, false);
    dispatch('fetchMarkets');
  },
  async removeFavoriteMarket({ dispatch }, id: number) {
    await dispatch('removeFavoriteMarkets', [id]);
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