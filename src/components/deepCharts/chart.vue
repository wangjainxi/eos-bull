<template>
  <div>
    <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import VueHighcharts from 'vue2-highcharts';
import chartStore from '@/stores/chart';
import { observer } from 'mobx-vue';

@observer
@Component({
  components: {
    VueHighcharts,
  },
})
export default class extends Vue {
  mounted() {
    this.load();
  }
  options = chartStore.options;
  load() {
    const lineCharts: any = this.$refs.lineCharts;
    lineCharts.delegateMethod('showLoading', 'Loading...');
    lineCharts.chart.redraw();
    lineCharts.hideLoading();
  }
}
</script>
