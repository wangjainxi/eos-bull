<template>
  <div>
    <VueTradingView/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import VueTradingView from '../../../../components/vueTradingView/index.vue';

@Component({
  components: {
    VueTradingView,
  },
})
export default class extends Vue {
  //
}
</script>
