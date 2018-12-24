import Axios, { AxiosResponse } from 'axios';
import { Market, TokenInfo, Orderbook, Trade, Order, AccountInfo } from '@/define';

interface ResponseData<T = any> {
  code: number;
  msg?: string;
  data: T;
}

type Response<T = any> = AxiosResponse<ResponseData<T>>;

const instance = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
});

function resWrapper<T = any>(res: Response<T>) {
  return res.data.data;
}

/**
 * 获取市场列表
 */
export const getMrkets = async (accountName: string) => {
  const res = await instance.get('/v1/markets', {
    params: { accountName },
  });
  return resWrapper<Response<Market[]>>(res);
};

/**
 * 获取代币信息
 */
export const getTokenInfo = async (contract: string, symbol: string) => {
  const res = await instance.get(`/v1/token/${contract}/${symbol}`);
  return resWrapper<Response<TokenInfo>>(res);
};

/**
 * 获取市场订单簿
 */
export const getMarketOrderbook = async (marketId: number) => {
  const res = await instance.get(`/v1/markets/${marketId}/orderbook`);
  return resWrapper<Response<Orderbook>>(res);
};

/**
 * 获取市场最近成交
 */
export const getMarketTrades = async (marketId: number) => {
  const res = await instance.get(`/v1/markets/${marketId}/trades`);
  return resWrapper<Response<Trade[]>>(res);
};

/**
 * 获取用户未成交订单列表
 */
export const getUserPendingOrders = async (accountName: string) => {
  const res = await instance.get(`/v1/orders/pending/${accountName}`);
  return resWrapper<Response<Order[]>>(res);
};

/**
 * 获取用户订单历史
 */
export const getUserHistoryOrders = async (
  accountName: string,
  params?: { page?: number; pageSize?: number }
) => {
  const res = await instance.get(`/v1/orders/history/${accountName}`, { params });

  type HistoryOrderData = Response<{
    orders: Order[];
    count: number;
  }>;
  return resWrapper<HistoryOrderData>(res);
};

/**
 * 获取订单撮合历史
 */
export const getOrderFills = async (orderId: number) => {
  const res = await instance.get(`/v1/fills/${orderId}`);
  return resWrapper<Response<Trade[]>>(res);
};

/**
 * 获取账户信息
 */
export const getCountInfo = async (accountName: string) => {
  const res = await instance.get(`/v1/account/${accountName}`);
  return resWrapper<Response<AccountInfo>>(res);
};
