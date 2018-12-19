import instance from './api-client';
import { resWrapper } from './api-client';

interface HistoryParams {
  page: number;
  pageSize: number;
}

export async function orderHistory(account: string, params: HistoryParams) {
  const res = await instance.get('/orders/history/' + account, {
    params,
  });
  return resWrapper(res);
}
