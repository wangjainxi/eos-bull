import Axios, { AxiosResponse } from 'axios';
import { Market, TokenInfo, Orderbook, Trade, Order, AccountInfo, Announcement } from '@/define';

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

function resWrapper<T = any>(res: Response<T>): T {
  return res.data.data;
}

/**
 * 获取市场列表
 */
export const getMrkets = async (accountName?: string) => {
  const res = await instance.get('/v1/markets', {
    params: { accountName },
  });
  return resWrapper<Market[]>(res);
};

/**
 * 获取代币信息
 */
export const getTokenInfo = async (contract: string, symbol: string) => {
  const res = await instance.get(`/v1/token/${contract}/${symbol}`);
  return resWrapper<TokenInfo>(res);
};

/**
 * 获取市场订单簿
 */
export const getMarketOrderbook = async (marketId: number) => {
  const res = await instance.get(`/v1/markets/${marketId}/orderbook`);
  return resWrapper<Orderbook>(res);
};

/**
 * 获取市场最近成交
 */
export const getMarketTrades = async (marketId: number) => {
  const res = await instance.get(`/v1/markets/${marketId}/trades`);
  return resWrapper<Trade[]>(res);
};

/**
 * 获取用户未成交订单列表
 */
export const getUserPendingOrders = async (accountName: string) => {
  const res = await instance.get(`/v1/orders/pending/${accountName}`);
  return resWrapper<Order[]>(res);
};

/**
 * 获取用户订单历史
 */
export const getUserHistoryOrders = async (
  accountName: string,
  params?: { page?: number; pageSize?: number }
) => {
  const res = await instance.get(`/v1/orders/history/${accountName}`, { params });
  return resWrapper<{
    orders: Order[];
    count: number;
  }>(res);
};

/**
 * 获取订单撮合历史
 */
export const getOrderFills = async (orderId: number) => {
  const res = await instance.get(`/v1/fills/${orderId}`);
  return resWrapper<Trade[]>(res);
};

/**
 * 获取账户信息
 */
export const getAccountInfo = async (accountName: string) => {
  const res = await instance.get(`/v1/account/${accountName}`);
  return resWrapper<AccountInfo>(res);
};

/**
 * 获取公告列表
 */
export const getAnnouncementList = async (params?: { page?: number; pageSize?: number }) => {
  const res = await instance.get(`/v1/announcement/list`, { params });
  return resWrapper<{
    announcements: Announcement[];
    count: number;
  }>(res);
};
