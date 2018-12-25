<template>
  <div class="x-bar">
    <div :id="id" class="chart-line"
    :option="option"></div>
  </div>
</template>
<script lang="ts">
import HighCharts from 'highcharts';
export default {
  // 验证类型
  props: {
    id: {
      type: String,
    },
    option: {
      type: Object,
    },
  },
  mounted() {
    HighCharts.chart(this.id, this.option);
  },
};
</script>
<style scoped>
  .x-bar{
    height: 100%;
    width: 100%;
  }
  .chart-line{
    height: 100%;
    width: 100%;
  }
</style>
