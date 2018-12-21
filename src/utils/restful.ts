import instance from './api-client';
import { resWrapper } from './api-client';

interface HistoryParams {
  page: number;
  pageSize: number;
}

interface MarketOrderParams {
  marketId: number;
}

export async function orderHistory(account: string, params: HistoryParams) {
  const res = await instance.get('/v1/orders/history/' + account, {
    params,
  });
  return resWrapper(res);
}

export async function marketOrderList(params: MarketOrderParams) {
  const res = await instance.get('/v1/markets/' + params.marketId + '/orderbook');
  return resWrapper(res);
}

export async function marketRecentDeal(params: MarketOrderParams) {
  const res = await instance.get('/v1/markets/' + params.marketId + '/trades');
  return resWrapper(res);
}
