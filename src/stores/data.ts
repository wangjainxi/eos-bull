import { observable, computed, action, runInAction } from 'mobx';
import socket from '@/utils/socket';
import {
  getMrkets,
  getAccountInfo,
  getUserHistoryOrders,
  getUserPendingOrders,
} from '@/utils/apis';
import {
  PriceLevelUpdate,
  TickerUpdate,
  Trade,
  Order,
  Market,
  AccountInfo,
  BalanceUpdate,
} from '@/define';

class DataStore {
  @observable
  accountName = 'player';

  @observable
  markets: Array<Market> = [];

  @observable
  historyOrders: Array<Order> = [];

  @observable
  pendingOrders: Array<Order> = [];

  @observable
  market?: Market;

  @observable
  accountInfo?: AccountInfo;

  @observable
  marketParams = {
    sortby: '', // pair, volume, price, change
    order: '', // asc, desc
    name: '',
  };

  @computed
  get marketList() {
    const { name, order, sortby } = this.marketParams;
    let arr = this.markets.slice();
    if (name) {
      arr = arr.filter(e => {
        const { baseCurrency, quoteCurrency } = e.pair;
        return baseCurrency.symbol.name.includes(name) || quoteCurrency.symbol.name.includes(name);
      });
    }

    if (!sortby) return arr;
    return arr.sort((e1, e2) => {
      let v1;
      let v2;
      if (sortby === 'volume') {
        v1 = e1.volumeBase;
        v2 = e2.volumeBase;
      } else if (sortby === 'price') {
        v1 = e1.lastPrice;
        v2 = e2.lastPrice;
      } else if (sortby === 'change') {
        v1 = e1.change;
        v2 = e2.change;
      } else {
        // 其余情况按pair处理
        v1 = `${e1.pair.baseCurrency.symbol.name}/${e1.pair.quoteCurrency.symbol.name}`;
        v2 = `${e2.pair.baseCurrency.symbol.name}/${e2.pair.quoteCurrency.symbol.name}`;
      }
      if (order === 'desc') return Number(v2 > v1);
      return Number(v1 > v2);
    });
  }

  constructor() {
    socket.on('l2update', this.handlePriceLevelUpdate);
    socket.on('tickerUpdate', this.handleTickerUpdate);
    socket.on('tradeUpdate', this.handleTradeUpdate);
    socket.on('balanceUpdate', this.handleBalanceUpdate);
    socket.on('orderUpdate', this.handleOrderUpdate);
    // this.subscribeTickerUpdate();
    this.updateMarkets();
    this.updateAccountInfo();
  }

  @action
  async updateMarkets() {
    const res = await getMrkets();
    runInAction(() => {
      this.markets = res;
    });
  }

  @action
  async updateAccountInfo() {
    const res = await getAccountInfo('player');
    runInAction(() => {
      this.accountInfo = res;
    });
  }

  @action
  async updateHistoryOrders(params?: { page?: number; pageSize?: number }) {
    const res = await getUserHistoryOrders(this.accountName, params);
    runInAction(() => {
      this.historyOrders = res.orders;
    });
  }

  @action
  async updatePendingOrders() {
    const res = await getUserPendingOrders(this.accountName);
    runInAction(() => {
      this.pendingOrders = res;
    });
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
    console.log(data);
    // TODO: 更新订单簿条目的数据
  }

  /**
   * 侦听Ticker统计更新
   */
  @action.bound
  handleTickerUpdate(data: TickerUpdate) {
    const market = this.markets.find(e => e.marketId === data.marketId);
    if (!market) return;
    Object.assign(market, data);
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
  @action
  handleBalanceUpdate(data: BalanceUpdate) {
    if (!this.accountInfo) return;
    const token = this.accountInfo.tokens.find(
      e => e.symbol.symbol.name === data.newBalance.symbol.symbol.name
    );
    token && (token.amount = data.newBalance.amount);
  }

  /**
   * 侦听订单状态变化
   */
  handleOrderUpdate(data: Order) {
    // if (!this.accountName) return;
    // const order = this.pendingOrders.find(e => e.orderId === data.orderId);
    // if (order) {
    //   Object.assign(order, data);
    // } else {
    //   this.orders.push(data);
    // }
  }

  /**
   * 侦听订单撮合通知
   */
  handleFillUpdate(data: Trade) {
    const { buyer, buyerOrderId, sellerOrderId } = data;
    const orderId = buyer === this.accountName ? buyerOrderId : sellerOrderId;
  }
}

const dataStore = new DataStore();
Object.assign(window, { dataStore });
export default dataStore;
