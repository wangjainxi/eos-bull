<template>
  <div class="trading-box">
    <VueTradingView/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// import TVChartContainer from '@/components/TVChartContainer/index.vue';
import VueTradingView from '@/components/vueTradingView/index.vue';
@Component({
  components: {
    VueTradingView,
  },
})
export default class extends Vue {
  //
}
</script>
<style scoped>
.trading-box{
  height: 100%;
}

</style>
