import { observable, action, computed } from 'mobx';
import { Order } from '@/define';
import { getUserPendingOrders } from '@/utils/apis';

class OpenOrder {
  @observable
  orderList: Order[] = [];

  @observable
  showOther = true;

  @observable
  marketId = 0;

  @computed
  get orders() {
    if (this.showOther) return this.orderList;
    return this.orderList.filter(e => e.marketId === this.marketId);
  }

  @action
  async fetchOrders(name: string) {
    const res = await getUserPendingOrders(name);
    this.orderList = res;
  }

  showOtherMarket() {
    this.showOther = true;
  }

  hideOtherMarket(marketId: number) {
    this.marketId = marketId;
    this.showOther = false;
  }
}

export default new OpenOrder();
