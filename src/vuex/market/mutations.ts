import { MutationTree } from 'vuex';
import { Market, TickerUpdate, Orderbook, Trade, PriceLevelUpdate, ORDER_SIDE } from '@/define';
import { MarketState, STORAGE_FAVORITE } from './types';

export const mutations: MutationTree<MarketState> = {
  setMarkets(state, markets: Market[]) {
    state.markets = markets;
  },
  setCurrentMarketId(state, currentMarketId: number) {
    state.currentMarketId = currentMarketId;
  },
  setOrderbook(state, orderbook: Orderbook) {
    state.orderbook = orderbook;
  },
  setTrades(state, trades: Trade[]) {
    state.trades = trades;
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
  updateOrderbook(state, data: PriceLevelUpdate) {
    const priceLevel = {
      price: data.price,
      size: String(data.size), // TODO: 确定是number还是string
    };
    if (data.side === ORDER_SIDE.ask) {
      state.orderbook.asks.unshift(priceLevel);
    } else {
      state.orderbook.bids.unshift(priceLevel);
    }
  },
  updateTrades(state, data: Trade) {
    state.trades.unshift(data);
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
};
