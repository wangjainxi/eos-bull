import { observable, action } from 'mobx';

class MarketViewStore {
  @observable
  showAlert: boolean = true;

  @observable
  itemData: any = {};

  @action
  changeStatus = (bool: boolean, itemData?: any) => {
    this.showAlert = bool;
    this.itemData = itemData;
    console.log(this.itemData);
  };
}
export default new MarketViewStore();
