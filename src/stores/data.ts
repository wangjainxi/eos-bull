import { getMarketOrderbook } from './../utils/apis';
import { observable, computed, action, runInAction } from 'mobx';
import socket from '@/utils/socket';
import { getMrkets, getAccountInfo } from '@/utils/apis';
import {
  PriceLevelUpdate,
  TickerUpdate,
  Trade,
  Order,
  Market,
  AccountInfo,
  BalanceUpdate,
  ResOrder,
  Orderbook,
} from '@/define';

class DataStore {
  @observable
  accountName = 'player';

  @observable
  markets: Array<Market> = [];

  @observable
  marketsLink: Array<Market> = [];

  @observable
  orders: Array<Order> = [];

  @observable
  resOrder = {
    bids: [],
    asks: [],
  };

  @observable
  searchmarketList: Array<Market> = [];

  @observable
  favouriteList: Array<Market> = [];

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
  get riseRank() {
    const { order } = this.marketParams;
    if (!order) return this.markets;
    return this.markets.slice().sort((e1, e2) => {
      const num1 = Number(e1.change.slice(0, e1.change.length - 1).slice(1, e1.change.length));
      const num2 = Number(e2.change.slice(0, e2.change.length - 1).slice(1, e2.change.length));
      if (order === 'desc') return num2 - num1;
      return num1 - num2;
    });
  }

  @computed
  get exChangeRank() {
    return this.markets.sort((e1, e2) => {
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
    socket.on('ticketUpdate', this.handleTickerUpdate);
    socket.on('tradeUpdate', this.handleTradeUpdate);
    socket.on('balanceUpdate', this.handleBalanceUpdate);
    socket.on('orderUpdate', this.handleOrderUpdate);
    this.updateMarkets();
    this.updateAccountInfo();
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
  getFavouriteList() {
    const locatFav = localStorage.getItem('localFavourite');
    if (!locatFav) return;
    this.favouriteList = this.markets.filter(
      (e: any) => e.favourited === true || JSON.parse(locatFav).indexOf(e.marketId) >= 0
    );
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
      this.updateMarketsLink();
    });
  }

  @action
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
    });
  }

  @action
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
  @action
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
    if (!this.accountName) return;
    const order = this.orders.find(e => e.orderId === data.orderId);
    if (order) {
      Object.assign(order, data);
    } else {
      this.orders.push(data);
    }
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
