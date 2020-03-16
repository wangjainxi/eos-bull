import { GetterTree } from 'vuex';
import { MarketState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<MarketState, RootState> = {
  markets(state) {
    return state.markets;
  },
  lastTrade(state) {
    return state.trades[0];
  },
  currentMarket(state) {
    return state.markets.find(e => e.marketId === state.currentMarketId);
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
};
