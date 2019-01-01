import onfire from 'onfire.js';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import store from '@/vuex';
import { PriceLevelUpdate, TickerUpdate, Trade, BalanceUpdate, Order } from '@/define';

const socket = new HubConnectionBuilder()
  .withUrl(process.env.VUE_APP_SOCKET_URL)
  .configureLogging(LogLevel.Information)
  .build();

socket.on('l2update', (data: PriceLevelUpdate) => {
  onfire.fire('l2update', data);
});

socket.on('tickerUpdate', (data: TickerUpdate) => {
  store.commit('market/updateMarket', data);
  onfire.fire('tickerUpdate', data);
});

socket.on('tradeUpdate', (data: Trade) => {
  onfire.fire('tradeUpdate', data);
});

socket.on('balanceUpdate', (data: BalanceUpdate) => {
  onfire.fire('balanceUpdate', data);
});

socket.on('orderUpdate', (data: Order) => {
  onfire.fire('orderUpdate', data);
});

/**
 * 订阅市场订单簿价格更新
 */
export const subscribeL2update = (marketId: number) => {
  return socket.invoke('SubscribeL2update', marketId);
};

/**
 * 取消订阅市场订单簿价格更新
 */
export const unsubscribeL2update = (marketId: number) => {
  return socket.invoke('UnsubscribeL2update', marketId);
};

/**
 * 订阅市场Ticker统计更新
 */
export const subscribeTickerUpdate = () => {
  return socket.invoke('SubscribeTickerUpdate');
};

/**
 * 取消市场Ticker统计更新
 */
export const unsubscribeTickerUpdate = () => {
  return socket.invoke('UnsubscribeTickerUpdate');
};

/**
 * 市场最近成交列表更新
 */
export const subscribeTradeUpdate = (marketId: number) => {
  return socket.invoke('SubscribeTradeUpdate', marketId);
};

/**
 * 取消市场最近成交列表更新
 */
export const unsubscribeTradeUpdate = (marketId: number) => {
  return socket.invoke('UnsubscribeTradeUpdate', marketId);
};

/**
 * 订阅余额变更
 */
export const subscribeBalanceUpdate = (accountName: string) => {
  return socket.invoke('SubscribeBalanceUpdate', accountName);
};

/**
 * 取消订阅余额变更
 */
export const unsubscribeBalanceUpdate = (accountName: string) => {
  return socket.invoke('UnsubscribeBalanceUpdate', accountName);
};

/**
 * 订阅订单状态更新
 */
export const subscribeOrderUpdate = (accountName: string) => {
  return socket.invoke('SubscribeOrderUpdate', accountName);
};

/**
 * 取消订阅订单状态更新
 */
export const unsubscribeOrderUpdate = (accountName: string) => {
  return socket.invoke('UnsubscribeOrderUpdate', accountName);
};

/**
 * 订阅订单撮合通知
 */
export const subscribeFillUpdate = (accountName: string) => {
  return socket.invoke('SubscribeFillUpdate', accountName);
};

/**
 * 取消订阅订单撮合通知
 */
export const unsubscribeFillUpdate = (accountName: string) => {
  return socket.invoke('UnsubscribeFillUpdate', accountName);
};

const start = () => {
  socket
    .start()
    .then(() => {
      subscribeTickerUpdate();
    })
    .catch(start);
};

socket.onclose(async () => {
  await start();
});

start();

export default socket;
