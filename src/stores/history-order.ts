import { getUserHistoryOrders } from '@/utils/apis';
import { Order, ORDER_STATUS, ORDER_SIDE, HistoryOrderParams } from '@/define';
import { observable, action, computed } from 'mobx';

class HistoryOrder {
  @observable
  orderList: Order[] = [];

  @observable
  totalCount = 0;

  @observable
  page = 1;

  @observable
  pageSize = 10;

  @observable
  baseCurrency = '';

  @observable
  side?: ORDER_SIDE;

  @observable
  status?: ORDER_STATUS;

  @observable
  ignoreCanceled = false;

  @computed
  get orders() {
    return this.orderList;
  }

  @action
  setParams(params: HistoryOrderParams) {
    Object.keys(params).forEach(e => {
      Reflect.set(this, e, Reflect.get(params, e));
    });
    this.setPage(1);
    this.orderList = [];
  }

  @action
  setPage(page: number) {
    this.page = page;
  }

  async fetchOrders(name: string) {
    const params = {
      page: this.page,
      pageSize: this.pageSize,
    };
    ['baseCurrency', 'side', 'status', 'ignoreCanceled'].forEach(key => {
      const val = Reflect.get(this, key);
      if (val) Reflect.set(params, key, val);
    });
    const res = await getUserHistoryOrders(name, params);
    this.totalCount = res.count;
    return res;
  }

  @action
  async fetchWebOrders(name: string, params: any) {
    const res = await getUserHistoryOrders(name, params);
    this.orderList = res.orders;
  }

  @action
  async fetchMobileOrders(name: string) {
    const res = await this.fetchOrders(name);
    this.orderList.push(...res.orders);
  }
}

export default new HistoryOrder();
