import { getMarketOrderbook } from './../utils/apis';
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
<<<<<<< HEAD
  ResOrder,
  Orderbook,
=======
  Announcement,
>>>>>>> ae55fd8d52d8ffbe0b5dfe712a18aefaee5025bb
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
  resOrder = {
    bids: [],
    asks: [],
  };

  @observable
  searchmarketList: Array<Market> = [];

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
    arr = arr.sort((e1, e2) => {
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
      if (order === 'desc') return Number(v2 > v1);
      return Number(v1 > v2);
    });
    console.log(JSON.stringify(arr));
    return arr;
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

  /**
   * restful获取订单
   *    */
  @action
  getResOrder = () => {
    getMarketOrderbook(1).then(res => {
      //@ts-ignore
      this.resOrder.asks = res.asks;
      //@ts-ignore
      this.resOrder.bids = res.bids;
    });
    //
  };

  @action
  setMarketParams(sortby: string = 'pair', order: string = 'asc', name: string = '') {
    this.marketParams = {
      sortby, // pair, volume, price, change
      order, // asc, desc
      name,
    };
  }
  @action
  getMarketSearchList(text: string) {
    if (text === '') return;
    this.searchmarketList = [];
    this.markets.map((item, index) => {
      if (item.pair.baseCurrency.symbol.name.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
        this.searchmarketList.push(item);
      }
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
  }

  @action
<<<<<<< HEAD
  async updateMarketsLink() {
    const accountInfo = this.accountInfo || { accountName: '' };
    const res = await getMrkets(accountInfo.accountName);
    runInAction(() => {
      this.marketsLink = res.filter(e => {
        return e.favourited !== undefined;
      });
      const marketTopLocal = localStorage.getItem('marketTop');
      if (marketTopLocal === null) return;
      const marketTop = JSON.parse(marketTopLocal);
      this.marketsLink.map((item, key) => {
        if (item.marketId === marketTop.marketId) {
          const item = this.marketsLink.splice(key, 1);
          console.log(item);
          this.marketsLink.unshift(item[0]);
          console.log(this.marketsLink);
        }
      });
=======
  async updateHistoryOrders(params?: { page?: number; pageSize?: number }) {
    const res = await getUserHistoryOrders(this.accountName, params);
    runInAction(() => {
      this.historyOrders = res.orders;
>>>>>>> ae55fd8d52d8ffbe0b5dfe712a18aefaee5025bb
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
    const item = this.marketsLink.splice(index, 1);
    this.marketsLink.unshift(item[0]);
    localStorage.setItem('marketTop', JSON.stringify(item[0]));
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
    // TODO: 更新订单簿条目的数据
  }

  /**
   * 侦听Ticker统计更新
   */
  @action.bound
  handleTickerUpdate(data: TickerUpdate) {
    const market = this.markets.find(e => e.marketId === data.marketId);
    if (!market) return;
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
