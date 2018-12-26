<template>
  <div id="deep-chart">
    <x-chart :id="id" :option="option"></x-chart>
  </div>
</template>

<script lang="ts">
import XChart from './chart.vue';
import { Vue, Component } from 'vue-property-decorator';

// import options from './chart-options.js';
// console.log(options);
const data = {
  buy: [[100, 8000], [200, 7000], [300, 6000], [400, 1000]],
  sell: [[500, 1100], [610, 3000], [720, 4000], [830, 5000]],
};
const buy = data.buy;
const sell = data.sell;
const dataX = [];
const dataY = [];
buy.forEach(ele => {
  dataX.push(ele[0]);
  dataY.push(ele[1]);
});
sell.forEach(ele => {
  dataX.push(ele[0]);
  dataY.push(ele[1]);
});
console.log(sell);
console.log(buy);
const options = {
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
        return dataX[this.value];
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
      return '<b>委托价：' + dataX[this.x] + '</b><br/><b>累计：' + this.y + '</b>';
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
          value: dataY.length / 2 - 1,
          color: '#d3ebd8',
        },
      ],
      data: dataY,
    },
  ],
};
export default class extends Vue{
  data() {
    const option = options;
    return {
      id: 'test',
      option,
    };
  },
  components: {
    XChart,
  },
};
</script>

<style>
#deep-chart {
  width: 100%;
  height: 100%;
}
</style>
