import { Market } from '@/define';

export interface MarketState {
  markets: Market[];
  currentMarketId: number;
  favoriteMarketIds: number[];
}
