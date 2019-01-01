import { Module } from 'vuex';
import { MarketState } from './types';
import { RootState } from '../types';
import { getMrkets, favouriteMarkets } from '@/utils/apis';
import { Market, TickerUpdate } from '@/define';

const namespaced = true;
const STORAGE_FAVORITE = '__favorite_maket_ids__';

function getCacheMarketIds() {
  return (localStorage.getItem(STORAGE_FAVORITE) || '')
    .split(',')
    .map(e => parseInt(e, 10))
    .filter(Number.isInteger);
}

export const state: MarketState = {
  markets: [],
  favoriteMarketIds: getCacheMarketIds(),
};

export const market: Module<MarketState, RootState> = {
  namespaced,
  state,
  getters: {
    markets(state) {
      return state.markets;
    },
    // 收藏列表
    favoriteMarkets(state, getters, rootState) {
      // 先判断是否有用scatter登录
      if (rootState.accountName) {
        return state.markets.filter(e => e.favourited);
      }
      // 筛选缓存的收藏
      return state.markets.filter(e => state.favoriteMarketIds.includes(e.marketId));
    },
    // 涨幅榜
    changeRankingList(state) {
      return state.markets
        .slice()
        .sort((e1, e2) => {
          return parseFloat(e2.change) - parseFloat(e1.change);
        })
        .filter((e, index) => index < 10);
    },
    // 24小时成交榜
    volumeRankingList(state) {
      return state.markets
        .slice()
        .sort((e1, e2) => {
          return parseFloat(e2.volumeBase) - parseFloat(e1.volumeBase);
        })
        .filter((e, index) => index < 10);
    },
  },
  actions: {
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
  },
  mutations: {
    setMarkets(state, markets: Market[]) {
      state.markets = markets;
    },
    setFavoriteMarkets(state, markets: Market[]) {
      state.markets = markets;
    },
    updateMarket(state, data: TickerUpdate) {
      for (const m of state.markets) {
        if (m.marketId !== data.marketId) continue;
        Object.assign(m, data);
        break;
      }
    },
    addFavoriteMarketId(state, id: number) {
      if (state.favoriteMarketIds.includes(id)) return;
      state.favoriteMarketIds.push(id);
      localStorage.setItem(STORAGE_FAVORITE, state.favoriteMarketIds.join(','));
    },
    removeFavoriteMarketId(state, id: number) {
      if (!state.favoriteMarketIds.includes(id)) return;
      for (let i = 0; i < state.favoriteMarketIds.length; i += 1) {
        if (i !== id) continue;
        state.favoriteMarketIds.splice(i, 1);
        break;
      }
    },
  },
};
