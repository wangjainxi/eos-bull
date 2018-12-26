import { observable, action } from 'mobx';
import { getMarketOrderbook } from './../utils/apis';

class ChartStore {
  constructor() {
    this.getResOrder();
  }
  @observable
  resData = {};

  /**
   * restful获取订单
   *    */
  @action
  getResOrder = () => {
    getMarketOrderbook(1).then(res => {
      this.resData = res;
      console.log(this.resData);
    });
  };
}
export default new ChartStore();
