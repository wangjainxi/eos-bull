<template>
  <div id="deep-chart">
    <x-chart></x-chart>
  </div>
</template>

<script lang="ts">
import XChart from './chart.vue';

export default {
  name: 'app',
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
