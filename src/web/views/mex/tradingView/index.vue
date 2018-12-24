<template>
  <div>
    <!-- <TVChartContainer/> -->
    <DeepChart/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// import TVChartContainer from '../../../../components/TVChartContainer/index.vue';
import DeepChart from '@/components/deepCharts/index.vue';

@Component({
  components: {
    // TVChartContainer,
    DeepChart,
  },
})
export default class extends Vue {
  //
}
</script>
