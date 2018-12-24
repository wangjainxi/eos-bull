<template>
  <div id="app">
    <x-chart :id="id" :option="option"></x-chart>
  </div>
</template>

<script lang="ts">
import XChart from './chart.vue';

import options from './chart-options.js';
console.log(options);
export default {
  name: 'app',
  data() {
    console.log(options);
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
#test {
  width: 100%;
  height: 400px;
  margin: 40px auto;
}
</style>
