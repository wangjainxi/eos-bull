<template>
  <div id="order-container">
    <OrderTab/>
    <div @click="setCurency">ddd</div>
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
    setCurency:function(){
      this.$store.dispatch('onSetCurrency','eth');
      this.test();
    },
    test:function(){
       console.log(this.$store);
      console.log(this.$store.getters.geCurrency);
    }
  },
  components: {
    OrderTab,
  },
  mounted(){
    this.test();
}
};
</script>
<style lang="scss" >
@import '@/style/mixin.scss';
#order-container {
  width: 100vw;
  background-color: #fff;

}
</style>


