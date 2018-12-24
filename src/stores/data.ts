import socket from '@/utils/socket';
import { PriceLevelUpdate, TickerUpdate, Trade, Order } from '@/define';

class DataStore {
  constructor() {
    socket.on('l2update', this.handlePriceLevelUpdate);
    socket.on('ticketUpdate', this.handleTickerUpdate);
    socket.on('tradeUpdate', this.handleTradeUpdate);
    socket.on('balanceUpdate', this.handleBalanceUpdate);
    socket.on('orderUpdate', this.handleOrderUpdate);
  }

  /**
   * 订阅市场订单簿价格更新
   */
  subscribeL2update(marketId: number) {
    return socket.invoke('SubscribeL2update', marketId);
  }

  /**
   * 取消订阅市场订单簿价格更新
   */
  unsubscribeL2update(marketId: number) {
    return socket.invoke('UnsubscribeL2update', marketId);
  }

  /**
   * 订阅市场Ticker统计更新
   */
  subscribeTickerUpdate() {
    return socket.invoke('SubscribeTickerUpdate');
  }

  /**
   * 取消市场Ticker统计更新
   */
  unsubscribeTickerUpdate() {
    return socket.invoke('UnsubscribeTickerUpdate');
  }

  /**
   * 市场最近成交列表更新
   */
  subscribeTradeUpdate(marketId: number) {
    return socket.invoke('SubscribeTradeUpdate', marketId);
  }

  /**
   * 取消市场最近成交列表更新
   */
  unsubscribeTradeUpdate(marketId: number) {
    return socket.invoke('UnsubscribeTradeUpdate', marketId);
  }

  /**
   * 订阅余额变更
   */
  subscribeBalanceUpdate(accountName: string) {
    return socket.invoke('SubscribeBalanceUpdate', accountName);
  }

  /**
   * 取消订阅余额变更
   */
  unsubscribeBalanceUpdate(accountName: string) {
    return socket.invoke('UnsubscribeBalanceUpdate', accountName);
  }

  /**
   * 订阅订单状态更新
   */
  subscribeOrderUpdate(accountName: string) {
    return socket.invoke('SubscribeOrderUpdate', accountName);
  }

  /**
   * 取消订阅订单状态更新
   */
  unsubscribeOrderUpdate(accountName: string) {
    return socket.invoke('UnsubscribeOrderUpdate', accountName);
  }

  /**
   * 订阅订单撮合通知
   */
  subscribeFillUpdate(accountName: string) {
    return socket.invoke('SubscribeFillUpdate', accountName);
  }

  /**
   * 取消订阅订单撮合通知
   */
  unsubscribeFillUpdate(accountName: string) {
    return socket.invoke('UnsubscribeFillUpdate', accountName);
  }

  /**
   * 侦听市场订单簿价格更新
   */
  handlePriceLevelUpdate(data: PriceLevelUpdate) {
    // TODO: 更新订单簿条目的数据
  }

  /**
   * 侦听Ticker统计更新
   */
  handleTickerUpdate(data: TickerUpdate) {
    // TODO: 更新交易对
  }

  /**
   * 侦听市场最近成交
   */
  handleTradeUpdate(data: Trade) {
    // TODO: 更新trade
  }

  /**
   * 侦听余额变化
   */
  handleBalanceUpdate(data: Trade) {
    // TODO: 更新余额信息
  }

  /**
   * 侦听订单状态变化
   */
  handleOrderUpdate(data: Order) {
    // TODO: 更新订单信息
  }

  /**
   * 侦听订单撮合通知
   */
  handleFillUpdate(data: Trade) {
    // TODO: 处理更新撮合
  }
}

export default new DataStore();
