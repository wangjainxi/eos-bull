<template>
  <div id="bom-container">
    <div id="tab-box-container" >
      <div class="type-select-box ">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1"><Language resource="transaction.order_Book"/></mt-tab-item>
          <mt-tab-item id="2"><Language resource="transaction.depth"/></mt-tab-item>
          <mt-tab-item id="3"><Language resource="transaction.latest_Deal"/></mt-tab-item>
          <mt-tab-item id="4"><Language resource="transaction.introduction"/></mt-tab-item>
        </mt-navbar>
      </div>
      <!-- tab-container -->
      <div >
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <OrderTab :orderData="orderData" />
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <DeepCharts/>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <DealTab :recentDealData="recentDealData" />
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
            <Introduction :tokenInfo="tokenInfo" />
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <div class="container-box"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import OrderTab from './component/OrderTab.vue';
import DealTab from './component/DealTab.vue';
import Introduction from './component/VueIntroduction.vue';
import DeepCharts from '../../../components/deepCharts/index.vue';
import { TokenInfo } from '@/define';

@Component({
  components: {
    OrderTab,
    DealTab,
    Introduction,
    DeepCharts,
  },
})
export default class BomView extends Vue {
  @Prop() orderData!: any;
  @Prop() recentDealData!: any;
  @Prop() tokenInfo?: TokenInfo;

  selected = '1';
}
</script>

<style lang="scss" >
@import '../../../style/mixin.scss';
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#bom-container {
  width: 100vw;
  min-height: 200px;
  background-color: #fff;
  margin-top: 0.04rem;
  .type-select-box {
    background-color: #fff;
    width: 100%;
  }
  #tab-box-container {
    font-size: 0.16rem !important;
    > div {
      width: 100%;
    }
    .mint-navbar {
      border-bottom: 0.01rem solid rgba(242, 245, 251, 1);
      border-top: 0.01rem solid rgba(242, 245, 251, 1);
      @include flexLayout('row', 'space-between', 'center');
    }

    .tab-item {
      margin-right: 0.25rem;
      p {
        font-size: 0.14rem;
      }
    }
    .mint-navbar .mint-tab-item {
      flex: 1;
      height: 0.42rem;
      padding: 0px;
      .mint-tab-item-label {
        font-size: 0.2rem;
        height: 0.16rem;
        font-size: 0.14rem;
        font-family: PingFangSC-Semibold;
        font-weight: 300;
        color: rgba(141, 141, 141, 1);
        line-height: 0.16rem;
        margin-top: 0.14rem;
      }
    }
    .mint-navbar .mint-tab-item.is-selected {
      border-bottom: none;
      .mint-tab-item-label {
        color: rgba(0, 122, 255, 1);
      }
    }
    .mint-navbar .mint-tab-item.is-selected::after {
      content: '1';
      background-color: red;
      color: transparent;
      display: inline-block;
      width: 0.15rem;
      height: 0.03rem;
      background: rgba(0, 122, 255, 1);
      border-radius: 0.03rem;
      margin-top: 0.09rem;
    }
  }
  .btn-box {
    @include flexLayout(row, space-between, center);
    width: 100%;
    height: 0.62rem;
    > div {
      flex: 1;
    }
  }
}
</style>


