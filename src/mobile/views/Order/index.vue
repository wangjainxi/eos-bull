<template>
  <div id="order-container">
    <OrderTab/>
    <div @click="setCurency">ddd</div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import OrderTab from './OrderTab.vue';
import { SET_CURRENCY_MUTATION } from '../../../store/modules/mutations-types.ts';
export default {
  name: 'bom-view',
  data() {
    return {
      selected: '1',
    };
  },
  methods: {
    ...mapActions([SET_CURRENCY_MUTATION]),
    setCurency() {
      this.SET_CURRENCY_MUTATION('eth');
      this.test();
    },
    test() {
      console.log(this.$store);
      console.log(this.$store.getters.geCurrency);
    },
  },
  components: {
    OrderTab,
  },
  mounted() {
    this.test();
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


