import { Module } from 'vuex';
import { MarketState, STORAGE_FAVORITE } from './types';
import { RootState } from '../types';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const namespaced = true;

function getCacheMarketIds() {
  return (localStorage.getItem(STORAGE_FAVORITE) || '')
    .split(',')
    .map(e => parseInt(e, 10))
    .filter(Number.isInteger);
}

export const state: MarketState = {
  markets: [],
  currentMarketId: 0,
  favoriteMarketIds: getCacheMarketIds(),
  orderbook: {
    asks: [],
    bids: [],
  },
  trades: [],
};

export const market: Module<MarketState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
