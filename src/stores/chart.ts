import { observable, action, computed } from 'mobx';
import { getMarketOrderbook } from './../utils/apis';

class ChartStore {
  constructor() {
    this.getResOrder();
  }
  @observable
  dataX = [100, 200, 300, 400, 500, 610, 720, 830];
  @observable
  dataY = [8000, 7000, 6000, 1000, 1100, 3000, 4000, 5000];

  @observable
  options = {
    chart: {
      type: 'area',
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    subtitle: {
      text: '',
      // '数据来源: <a href="https://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
      // 'thebulletin.metapress.com</a>',
    },
    xAxis: {
      title: {
        text: '',
      },
      // labels: {
      //   formatter() {
      //     const res = VueComponent.dataX[this.value];
      //     return res;
      //   },
      // },
      tickmarkPlacement: 'on',
    },
    yAxis: {
      title: {
        enabled: false,
      },
      minPadding: 0,
      startOnTick: false,
      tickWidth: 1,
      gridLineWidth: 0,
      // labels: {
      //   formatter() {
      //     this.value = this.value >= 1000 ? this.value / 1000 + 'k' : this.value;
      //     return this.value;
      //   },
      // },
    },
    tooltip: {
      // headerFormat: '',
      // pointFormatter() {
      //   return '<b>委托价：' + this.dataX[this.x] + '</b><br/><b>累计：' + this.y + '</b>';
      // },
    },
    plotOptions: {
      area: {
        area: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 4,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
      },
    },
    series: [
      {
        showInLegend: false,
        zoneAxis: 'x',
        color: '#ffd6d6',
        zones: [
          {
            value: this.dataY.length / 2 - 1,
            color: '#d3ebd8',
          },
        ],
        data: this.dataY,
      },
    ],
  };

  /**
   * restful获取订单
   *    */
  @action
  getResOrder = () => {
    getMarketOrderbook(1).then(res => {
      const mockRes = {
        asks: [
          { price: '0.008000', size: '100.0000' },
          { price: '0.009000', size: '200.0000' },
          { price: '0.010000', size: '300.0000' },
        ],
        bids: [
          { price: '0.008000', size: '100.0000' },
          { price: '0.009000', size: '100.0000' },
          { price: '0.011000', size: '100.0000' },
        ],
        marketId: 1,
      };
      mockRes.asks.forEach((ele: any) => {
        this.dataX.push(ele.price);
        this.dataY.push(ele.size);
      });
      mockRes.bids.forEach((ele: any) => {
        this.dataX.push(ele.price);
        this.dataY.push(ele.size);
      });
    });
  };
}
export default new ChartStore();
