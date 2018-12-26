import { observable, autorun, action } from 'mobx';
import { getMarketOrderbook } from '../../utils/apis';

// const buy = data.buy;
// const sell = data.sell;
// const dataX = [];
// const dataY = [];
// buy.forEach(ele => {
//   dataX.push(ele[0]);
//   dataY.push(ele[1]);
// });
// sell.forEach(ele => {
//   dataX.push(ele[0]);
//   dataY.push(ele[1]);
// });
class Option {
  constructor() {
    this.getData();
  }
  @observable
  data = {};
  @observable
  dataX = [];
  @observable
  dataY = [];

  @action
  getData() {
    debugger;
    console.log(1);
    getMarketOrderbook(1).then(res => {
      console.log(res);
    });
    const buy = [[100, 8000], [200, 7000], [300, 6000], [400, 1000]];
    const sell = [[500, 1100], [610, 3000], [720, 4000], [830, 5000]];
    buy.forEach(ele => {
      this.dataX.push(ele[0]);
      this.dataY.push(ele[1]);
    });
    sell.forEach(ele => {
      this.dataX.push(ele[0]);
      this.dataY.push(ele[1]);
    });
  }

  options = {
    chart: {
      type: 'area',
    },
    title: {
      text: '交易深度图',
    },
    subtitle: {
      text:
        '数据来源: <a href="https://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
        'thebulletin.metapress.com</a>',
    },
    xAxis: {
      title: {
        text: '交易深度图',
      },
      labels: {
        formatter() {
          return this.dataX[this.value];
        },
      },
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
      labels: {
        formatter() {
          this.value = this.value >= 1000 ? this.value / 1000 + 'k' : this.value;
          return this.value;
        },
      },
    },
    tooltip: {
      headerFormat: '',
      pointFormatter() {
        return '<b>委托价：' + this.dataX[this.x] + '</b><br/><b>累计：' + this.y + '</b>';
      },
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
}
export default new Option();
