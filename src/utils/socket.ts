import onfire from 'onfire.js';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import store from '@/vuex';
import { PriceLevelUpdate, TickerUpdate, Trade, BalanceUpdate, Order } from '@/define';

let connnected = false;

const socket = new HubConnectionBuilder()
  .withUrl(process.env.VUE_APP_SOCKET_URL)
  .configureLogging(LogLevel.Information)
  .build();

socket.on('l2update', (data: PriceLevelUpdate) => {
  store.commit('market/updateOrderbook', data);
});

socket.on('tickerUpdate', (data: TickerUpdate) => {
  store.commit('market/updateMarket', data);
});

socket.on('tradeUpdate', (data: Trade) => {
  store.commit('market/updateTrades', data);
});

socket.on('balanceUpdate', (data: BalanceUpdate) => {
  // TODO: 更新余额信息
});

socket.on('orderUpdate', (data: Order) => {
  store.dispatch('order/fetchPendingOrders');
});

/**
 * 简单解决向后台invoke的时候socket未完成链接报错
 */
const invoke = (api: string, ...args: any[]) => {
  if (connnected) {
    socket.invoke(api, ...args);
  } else {
    onfire.one('socketReady', () => {
      socket.invoke(api, ...args);
    });
  }
};

/**
 * 订阅市场订单簿价格更新
 */
export const subscribeL2update = (marketId: number) => {
  return invoke('SubscribeL2update', marketId);
};

/**
 * 取消订阅市场订单簿价格更新
 */
export const unsubscribeL2update = (marketId: number) => {
  return invoke('UnsubscribeL2update', marketId);
};

/**
 * 订阅市场Ticker统计更新
 */
export const subscribeTickerUpdate = () => {
  return invoke('SubscribeTickerUpdate');
};

/**
 * 取消市场Ticker统计更新
 */
export const unsubscribeTickerUpdate = () => {
  return invoke('UnsubscribeTickerUpdate');
};

/**
 * 市场最近成交列表更新
 */
export const subscribeTradeUpdate = (marketId: number) => {
  return invoke('SubscribeTradeUpdate', marketId);
};

/**
 * 取消市场最近成交列表更新
 */
export const unsubscribeTradeUpdate = (marketId: number) => {
  return invoke('UnsubscribeTradeUpdate', marketId);
};

/**
 * 订阅余额变更
 */
export const subscribeBalanceUpdate = (accountName: string) => {
  return invoke('SubscribeBalanceUpdate', accountName);
};

/**
 * 取消订阅余额变更
 */
export const unsubscribeBalanceUpdate = (accountName: string) => {
  return invoke('UnsubscribeBalanceUpdate', accountName);
};

/**
 * 订阅订单状态更新
 */
export const subscribeOrderUpdate = (accountName: string) => {
  return invoke('SubscribeOrderUpdate', accountName);
};

/**
 * 取消订阅订单状态更新
 */
export const unsubscribeOrderUpdate = (accountName: string) => {
  return invoke('UnsubscribeOrderUpdate', accountName);
};

/**
 * 订阅订单撮合通知
 */
export const subscribeFillUpdate = (accountName: string) => {
  return invoke('SubscribeFillUpdate', accountName);
};

/**
 * 取消订阅订单撮合通知
 */
export const unsubscribeFillUpdate = (accountName: string) => {
  return invoke('UnsubscribeFillUpdate', accountName);
};

const start = () => {
  socket
    .start()
    .then(() => {
      connnected = true;
      onfire.fire('socketReady');
      subscribeTickerUpdate();
    })
    .catch(start);
};

socket.onclose(async () => {
  await start();
});

start();

export default socket;
