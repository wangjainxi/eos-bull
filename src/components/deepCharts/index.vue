<template>
  <div id="deep-chart">
    <x-chart :id="id" :option="option"></x-chart>
  </div>
</template>

<script lang="ts">
import XChart from './chart.vue';
import options from './chart-options.js';

export default {
  name: 'app',
  data() {
    const option = options.options;
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
