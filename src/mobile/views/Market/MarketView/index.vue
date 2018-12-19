<template>
  <div class="market-view-box">
    <TransactionDetail v-if="showAlert" :onTransaction="onTransaction"/>
    <div class="market-container">
        <TopView/>
        <div class="trading-box">trading view</div>
        <BomView/>
    </div>
    <div class="btn-box">
      <div><mt-button @click="onTransaction('buy')" style="background:rgba(7,199,78,1);color:#fff" type="default">买入</mt-button></div>
      <div><mt-button  @click="onTransaction('sell')"  style="background:rgba(255,0,0,1);color:#fff"  type="default">卖出</mt-button></div>
    </div>
  </div>
</template>
<script>
import TopView from './TopView.vue';
import BomView from './BomView.vue';
import TransactionDetail from './TransactionDetail.vue';
import {mapActions} from 'vuex';

export default {
  name: 'market-view',
  components: {
    TopView,
    BomView,
    TransactionDetail,
  },
  data() {
    return {
      showAlert: false,
    };
  },
  methods: {
    onTransaction(t) {
      const data={
        name:'business',
        params:{
          id:this.$store.state.user.marketId,
          type:t,
        }
      }
     this.$router.push(data);
    },
  },
};
</script>
<style lang="scss">
@import '../../../../style/mixin.scss';
.green-color {
  color: rgba(7, 199, 78, 1);
}
.red-color {
  color: rgba(229, 55, 87, 1);
}
.market-view-box {
  background: rgba(242, 245, 251, 1);
  position: relative;
  @include flexLayout(column, flex-start, flex-start);
  height: 100vh;
  box-sizing: border-box;
  width: 100vw;
  .market-container {
    padding-bottom: 0.62rem;
  }
  .mint-navbar {
    height: 40px;
  }
  .trading-box {
    height: 4.3rem;
    font-size: 0.14rem;
  }
  .btn-box {
    height: 0.62rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 0 1px 0px rgba(92, 102, 119, 0.2);
    position: fixed;
    bottom: 0;
    left: 0;
    @include flexLayout(row, space-between, center);
    > div {
      flex: 1;
      > button {
        width: 100%;
      }
    }
    div:nth-child(1) {
      margin-right: 0.09rem;
    }
  }
}
</style>


