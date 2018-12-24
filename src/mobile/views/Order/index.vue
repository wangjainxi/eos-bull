<template>
  <div id="order-container">
    <OrderTab/>
    <div>ddd</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import OrderTab from './OrderTab.vue';
import userStore from '@/stores/user';

@Component({
  components: {
    OrderTab,
  },
})
export default class extends Vue {
  selected = '1';
  created() {
    userStore.setCurrency('3');
  }
}
</script>

<style lang="scss" >
@import '@/style/mixin.scss';
#order-container {
  width: 100%;
  background-color: #fff;
}
</style>


