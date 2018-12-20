<template>
  <div>
    <TVChartContainer/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TVChartContainer from '../../../../components/TVChartContainer/index.vue';

@Component({
  components: {
    TVChartContainer,
  },
})
export default class extends Vue {
  //
}
</script>
