<template>
  <div id="order-container">
    <OrderTab/>ddd
  </div>
</template>
<script>
import OrderTab from './OrderTab.vue';
import store from '@/store';
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
  created() {
    store.commit('setCurrentNum', '3');
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


