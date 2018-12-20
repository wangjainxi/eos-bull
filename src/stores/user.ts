import { observable, action } from 'mobx';

class UserStore {
  @observable
  currency = 'BTC';
  account = 'admin';
  marketId = 1;

  @action.bound
  setCurrency(currency: string) {
    this.currency = currency;
  }
}

export default new UserStore();
