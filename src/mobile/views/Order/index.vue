<template>
  <div id="order-container">
    <OrderTab/>
    ddd
  </div>
</template>
<script>
import Vue from 'vue';
import OrderTab from './OrderTab.vue';
export default {
  name: 'bom-view',
  data: function() {
    return {
      selected: '1',
    };
  },
  methods: {
    // selected: function() {
    //   console.log(222);
    // },
  },
  components: {
    OrderTab,
  },
};
</script>
<style lang="scss" >
@import '@/style/mixin.scss';
#order-container {
  width: 100vw;
  background-color: #fff;

}
</style>


