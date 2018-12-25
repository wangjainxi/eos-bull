<template>
  <div class="chart-view">
    <VueTradingView />
    <!-- <TVChartContainer/> -->
    <!-- <DeepChart/> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// import TVChartContainer from '../../../../components/TVChartContainer/index.vue';
import VueTradingView from '@/components/vueTradingView/index.vue';
import DeepChart from '@/components/deepCharts/index.vue';
import data from '@/stores/data';

@Component({
  components: {
    VueTradingView,
    // TVChartContainer,
    // DeepChart,
  },
})
export default class extends Vue {
  mounted() {
    console.log(data.orders);
  }
}
</script>
<style scoped>
  .chart-view{
    width: 100%;
    height: 100%;
  }
</style>
