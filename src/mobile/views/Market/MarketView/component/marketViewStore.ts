import { observable, action } from 'mobx';

class MarketViewStore {
  @observable
  showAlert: boolean = false;
  @observable
  itemData: any = {};

  @action
  onTap = (item: any) => {
    this.showAlert = !this.showAlert;
    this.itemData = item;
  };
}
export default new MarketViewStore();
