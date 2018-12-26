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
  methods: {
    async getOrder() {
      const res = await getMarketOrderbook(1);
      console.log(res);
    },
  },
  mounted() {
    HighCharts.chart(this.id, this.option);
  },
};
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
