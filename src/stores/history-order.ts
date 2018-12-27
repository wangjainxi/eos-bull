import { getUserHistoryOrders } from '@/utils/apis';
import { Order } from '@/define';
import { observable, action, computed } from 'mobx';

class HistoryOrder {
  @observable
  orderList: Order[] = [];

  @observable
  totalCount = 0;

  @computed
  get orders() {
    return this.orderList;
  }

  @action
  async fetchWebOrders(name: string, params: any) {
    const res = await getUserHistoryOrders(name, params);
    this.orderList = res.orders;
    this.totalCount = res.count;
  }
}

export default new HistoryOrder();
