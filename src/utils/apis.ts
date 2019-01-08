import Axios, { AxiosResponse } from 'axios';
import { STORAGE_JWT } from '@/vuex/types';
import {
  Market,
  TokenInfo,
  Orderbook,
  Trade,
  AccountInfo,
  Announcement,
  HistoryOrderParams,
  OrdersWithIcons,
  Order,
} from '@/define';

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
 * 获取市场详情
 */
export const getMarket = async (id: number, accountName: string) => {
  const res = await instance.get(`/v1/markets/${id}`, {
    params: { accountName },
  });
  return resWrapper<Market>(res);
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

const formartOrders = (list: OrdersWithIcons) => {
  return list.orders.map(e => {
    const icon = list.icons.find(e2 => e2.marketId === e.marketId);
    if (icon) e.iconUrl = icon.iconUrl;
    return e;
  });
};

/**
 * 获取用户未成交订单列表
 */
export const getUserPendingOrders = async (accountName: string) => {
  const res = await instance.get(`/v1/orders/pending/${accountName}`);
  const result = resWrapper<OrdersWithIcons>(res);
  return formartOrders(result);
};

/**
 * 获取单个订单信息
 */
export const getOrderDetail = async (orderId: number) => {
  const res = await instance.get(`/v1/orders/detail/${orderId}`);
  return resWrapper<Order>(res);
};

/**
 * 获取用户订单历史
 */
export const getUserHistoryOrders = async (accountName: string, params?: HistoryOrderParams) => {
  const res = await instance.get(`/v1/orders/history/${accountName}`, { params });
  const result = resWrapper<{
    list: OrdersWithIcons;
    count: number;
  }>(res);

  return {
    count: result.count,
    orders: formartOrders(result.list),
  };
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

/**
 * 收藏市场
 */
export const favouriteMarkets = async (ids: number[], favourited: boolean) => {
  const params = ids.map(e => ({ marketId: e, favourited }));
  await instance.post('/v1/user/favourite', params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem(STORAGE_JWT)}`,
    },
  });
};

/**
 * 登录
 */
export const login = async (accountName: string, signature: string) => {
  const res = await instance.post('/v1/user/login', {
    accountName,
    signature,
  });
  return resWrapper<{
    token: string;
  }>(res);
};
