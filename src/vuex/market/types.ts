import { Market, Orderbook, Trade } from '@/define';

export interface MarketState {
  markets: Market[];
  orderbook: Orderbook;
  trades: Trade[];
  currentMarketId: number;
  favoriteMarketIds: number[];
}

export const STORAGE_FAVORITE = '__favorite_maket_ids__';
