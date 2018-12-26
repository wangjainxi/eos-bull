import { observable, computed, action, runInAction } from 'mobx';
import socket from '@/utils/socket';
import {
  getMrkets,
  getAccountInfo,
  getUserHistoryOrders,
  getUserPendingOrders,
  getAnnouncementList,
} from '@/utils/apis';
import {
  PriceLevelUpdate,
  TickerUpdate,
  Trade,
  Order,
  Market,
  AccountInfo,
  BalanceUpdate,
  Announcement,
} from '@/define';
import { getAccount } from '@/utils/scatter';

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
  announcements: Array<Announcement> = [];

  @observable
  market?: Market;

  @observable
  accountInfo?: AccountInfo;

  @observable
  marketParams = {
    sortby: '', // pair, volume, price, change
    order: '', // asc, desc
  };

  @observable
  freeMarketParams = {
    sortby: '', // pair, volume, price, change
    order: '', // asc, desc
  };

  // 用户钱包页面token展示
  @computed
  get walletTokens() {
    if (!this.accountInfo) return [];
    return this.accountInfo.tokens;
  }

  @computed
  get riseRank() {
    return this.markets.slice().sort((e1, e2) => {
      const num1 = Number(e1.change.slice(0, e1.change.length - 1).slice(1, e1.change.length));
      const num2 = Number(e2.change.slice(0, e2.change.length - 1).slice(1, e2.change.length));
      return num2 - num1;
    });
  }

  @computed
  get exChangeRank() {
    return this.markets.slice().sort((e1, e2) => {
      const num1 = Number(e1.volumeBase);
      const num2 = Number(e2.volumeBase);
      return num2 - num1;
    });
  }

  // 自选市场列表
  @computed
  get freeMarketList() {
    return this.markets.filter(e => {
      return !!e;
    });
  }

  // 市场列表
  @computed
  get marketList() {
    if (this.markets.length === 0) return this.markets;
    const { order, sortby } = this.marketParams;
    const arr = this.markets.slice();
    if (!sortby) return arr;
    return this.sortMarkets(arr, sortby, order);
  }

  @computed
  get totalValuation() {
    if (!this.accountInfo) {
      return {
        name: 'EOS',
        amount: '0.0000',
      };
    }
    const { amount, symbol } = this.accountInfo.estValue;
    return { amount, name: symbol.name };
  }

  constructor() {
    socket.on('l2update', this.handlePriceLevelUpdate);
    socket.on('tickerUpdate', this.handleTickerUpdate);
    socket.on('tradeUpdate', this.handleTradeUpdate);
    socket.on('balanceUpdate', this.handleBalanceUpdate);
    socket.on('orderUpdate', this.handleOrderUpdate);
    this.updateMarkets();
    this.updateAccountInfo();
    setInterval(() => {
      getAccount(this.accountName);
    }, 3000);
  }

  sortMarkets(markets: Market[], sortby: string, order: string) {
    markets.sort((e1, e2) => {
      let v1;
      let v2;
      if (sortby === 'volume') {
        v1 = e1.volumeBase;
        v2 = e2.volumeBase;
      } else if (sortby === 'price') {
        v1 = parseFloat(e1.lastPrice);
        v2 = parseFloat(e2.lastPrice);
      } else if (sortby === 'change') {
        v1 = parseFloat(e1.change);
        v2 = parseFloat(e2.change);
      } else {
        // 其余情况按pair处理
        v1 = `${e1.pair.baseCurrency.symbol.name}/${e1.pair.quoteCurrency.symbol.name}`;
        v2 = `${e2.pair.baseCurrency.symbol.name}/${e2.pair.quoteCurrency.symbol.name}`;
      }

      const o = order === 'desc' ? v2 > v1 : v1 > v2;
      return o ? -1 : 1;
    });
    return markets;
  }

  @action.bound
  updateMarketListSort(t: string) {
    const { sortby, order } = this.marketParams;
    if (t === sortby) {
      Object.assign(this.marketParams, { order: order === 'asc' ? 'desc' : 'asc' });
    } else {
      Object.assign(this.marketParams, { sortby: t, order: 'asc' });
    }
  }

  @action.bound
  updateFreeMarketListSort(t: string) {
    const { sortby, order } = this.freeMarketParams;
    if (t === sortby) {
      Object.assign(this.freeMarketParams, { order: order === 'asc' ? 'desc' : 'asc' });
    } else {
      Object.assign(this.freeMarketParams, { sortby: t, order: 'asc' });
    }
  }

  @action
  getMarketSearchList(text: string) {
    return this.markets.filter(item => {
      const symbolName = item.pair.baseCurrency.symbol.name.toLowerCase();
      return symbolName.includes(text.toLocaleLowerCase());
    });
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
    console.log(this.accountInfo);
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

  @action
  async updateAnnouncements() {
    const res = await getAnnouncementList({ page: 1, pageSize: 5 });
    runInAction(() => {
      this.announcements = res.announcements;
    });
  }

  setTop(index: number) {
    const growList = [
      {
        currency: 'EOS',
        dealSize: 3333,
        price: 0.0023,
        statu: 1,
        percentage: 10,
        collectionState: 1,
        id: 1,
      },
      {
        currency: 'EOS',
        dealSize: 3333,
        price: 0.0023,
        statu: 0,
        percentage: 10,
        collectionState: 0,
        id: 2,
      },
      {
        currency: 'EOS',
        dealSize: 3333,
        price: 0.0023,
        statu: 2,
        percentage: 10,
        collectionState: 0,
        id: 3,
      },
    ];
    console.log(index);
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
  subscribeBalanceUpdate() {
    return socket.invoke('SubscribeBalanceUpdate', this.accountName);
  }

  /**
   * 取消订阅余额变更
   */
  unsubscribeBalanceUpdate() {
    return socket.invoke('UnsubscribeBalanceUpdate', this.accountName);
  }

  /**
   * 订阅订单状态更新
   */
  subscribeOrderUpdate() {
    return socket.invoke('SubscribeOrderUpdate', this.accountName);
  }

  /**
   * 取消订阅订单状态更新
   */
  unsubscribeOrderUpdate() {
    return socket.invoke('UnsubscribeOrderUpdate', this.accountName);
  }

  /**
   * 订阅订单撮合通知
   */
  subscribeFillUpdate() {
    return socket.invoke('SubscribeFillUpdate', this.accountName);
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
    this.markets.forEach((e, index) => {
      if (e.marketId !== data.marketId) return;
      this.markets.splice(index, 1, Object.assign({}, e, data));
    });
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
    this.updateAccountInfo();
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
