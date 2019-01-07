<template>
  <div id="order-container">
    <OrderTab :showPopup="showPopup"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import OrderTab from './OrderTab.vue';
@Component({
  components: {
    OrderTab,
  },
})
export default class Orders extends Vue {
  selected = '1';
  showPopup = false;
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
#order-container {
  width: 100%;
  background-color: #fff;
  padding-bottom: 0.5rem;
}
</style>


