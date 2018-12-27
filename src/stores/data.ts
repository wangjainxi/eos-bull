import onfire from 'onfire.js';
import { observable, computed, action, runInAction } from 'mobx';
import {
  getMrkets,
  getAccountInfo,
  getUserPendingOrders,
  getUserHistoryOrders,
  getAnnouncementList,
} from '@/utils/apis';
import { TickerUpdate, Order, Market, AccountInfo, BalanceUpdate, Announcement } from '@/define';
import { getAccount } from '@/utils/scatter';

interface Historyobject {
  orders: Array<Order>;
  count: number;
}
class DataStore {
  @observable
  accountName = 'user1';

  @observable
  markets: Array<Market> = [];

  @observable
  historyOrders: Historyobject = {
    orders: [],
    count: 0,
  };

  @observable
  pendingOrders: Array<Order> = [];

  @observable
  announcements: Array<Announcement> = [];

  resOrder = {
    bids: [],
    asks: [],
  };

  @observable
  eosAccountInfo: any = {};

  @observable
  searchmarketList: Array<Market> = [];

  @observable
  marketsLink: Array<Market> = [];

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
    return this.markets.slice().sort((e1, e2) => {
      const num1 = Number(e1.volumeBase);
      const num2 = Number(e2.volumeBase);
      return num2 - num1;
    });
  }

  // 自选市场列表
  @computed
  get freeMarketList() {
    const locatFav = localStorage.getItem('localFavourite');
    if (!locatFav) return [];
    return this.markets.filter(e => {
      return e.favourited === true || JSON.parse(locatFav).indexOf(e.marketId) >= 0;
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
  get cpuLimit() {
    return (
      this.eosAccountInfo['cpu_limit'] || {
        available: 0,
        max: 0,
        used: 0,
      }
    );
  }

  @computed
  get netLimit() {
    return (
      this.eosAccountInfo['net_limit'] || {
        available: 0,
        max: 0,
        used: 0,
      }
    );
  }

  @computed
  get ramLimit() {
    return {
      used: this.eosAccountInfo['ram_usage'] || 0,
      max: this.eosAccountInfo['ram_quota'] || 0,
    };
  }

  @computed
  get cpuUsageRate() {
    const { used, max } = this.cpuLimit;
    return Math.round((used / max) * 10000) / 100.0;
  }

  @computed
  get netUsageRate() {
    const { used, max } = this.netLimit;
    return Math.round((used / max) * 10000) / 100.0;
  }

  @computed
  get ramUsageRate() {
    const { used, max } = this.ramLimit;
    return Math.round((used / max) * 10000) / 100.0;
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
    console.log(1111);
    onfire.on('tickerUpdate', this.handleTickerUpdate);
    onfire.on('balanceUpdate', this.handleBalanceUpdate);
    this.updateMarkets();
    this.updateAccountInfo();
    setInterval(() => {
      getAccount(this.accountName).then(res => {
        this.eosAccountInfo = res;
      });
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
    console.log(222);
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

  async updateMarketsLink() {
    const accountInfo = this.accountInfo || { accountName: '' };
    const res = await getMrkets(accountInfo.accountName);
    runInAction(() => {
      this.marketsLink = res.filter(e => {
        return e.favourited === true;
      });
      const marketTopLocal = localStorage.getItem('marketTop');
      if (marketTopLocal === null) return;
      const marketTop = JSON.parse(marketTopLocal);
      this.marketsLink.map((item, key) => {
        if (item.marketId === marketTop.marketId) {
          const item = this.marketsLink.splice(key, 1);
          this.marketsLink.unshift(item[0]);
        }
      });
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
  async updateHistoryOrders(params: { page?: number; pageSize?: number }) {
    const res = await getUserHistoryOrders(this.accountName, params);
    runInAction(() => {
      this.historyOrders = res;
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
   * 侦听余额变化
   */
  @action
  handleBalanceUpdate(data: BalanceUpdate) {
    this.updateAccountInfo();
  }
}

const dataStore = new DataStore();
Object.assign(window, { dataStore });
export default dataStore;
