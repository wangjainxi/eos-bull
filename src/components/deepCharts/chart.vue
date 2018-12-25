<template>
  <div class="x-bar">
    <div :id="id" class="chart-line"
    :option="option"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getMarketOrderbook } from '@/utils/apis';
import HighCharts from 'highcharts';
import Orderdata from '@/stores/data';
import { observer } from 'mobx-vue';

@observer
export default class extends Vue {
  id = String;
  option = Object;
  mounted() {
    const dataX: Array<any> = [];
    const dataY: Array<any> = [];
    Orderdata.resOrder.bids.forEach((ele: any) => {
      console.log(ele);
      dataX.push(ele[0]);
      dataY.push(ele[1]);
    });
    Orderdata.resOrder.asks.forEach((ele: any) => {
      dataX.push(ele[0]);
      dataY.push(ele[1]);
    });
    // HighCharts.chart(this.id, this.option);
  }
}
</script>
<style scoped>
.x-bar {
  height: 100%;
  width: 100%;
}
.chart-line {
  height: 100%;
  width: 100%;
}
</style>
