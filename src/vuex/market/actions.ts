import { ActionTree } from 'vuex';
import { getMrkets, favouriteMarkets } from '@/utils/apis';
import { MarketState } from './types';
import { RootState } from '../types';

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
};
