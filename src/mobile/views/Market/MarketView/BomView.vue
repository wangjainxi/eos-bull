<template>
  <div id="bom-container">
    <div id="tab-box-container" class="flex-row-start">
      <div class="type-select-box">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">委托订单</mt-tab-item>
          <mt-tab-item id="2">深度</mt-tab-item>
          <mt-tab-item id="3">最新成交</mt-tab-item>
          <mt-tab-item id="4">简介</mt-tab-item>
        </mt-navbar>
      </div>
      <!-- tab-container -->
      <div>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <OrderTab/>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <DeepCharts/>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <DealTab/>
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
            <Introduction/>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <div class="container-box"></div>
  </div>
</template>

<script lang="ts">
import OrderTab from './component/OrderTab.vue';
import DealTab from './component/DealTab.vue';
import Introduction from './component/VueIntroduction.vue';
import DeepCharts from '../../../../components/deepCharts/index.vue';
export default {
  name: 'bom-view',
  data() {
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
    DealTab,
    Introduction,
    DeepCharts,
  },
};
</script>

<style lang="scss">
@import '../../../../style/mixin.scss';
#bom-container {
  width: 100vw;
  background-color: #fff;
  .mint-tab-item-label {
    font-size: 0.2rem;
  }
  .type-select-box {
    background-color: #ddd;
    width: 100%;
  }
  #tab-box-container {
    font-size: 0.16rem !important;
    > div {
      width: 100%;
    }
    @include flexLayout(column, flex-start, flex-start);
    .mint-navbar {
      border-bottom: 0.01rem solid rgba(242, 245, 251, 1);
      border-top: 0.01rem solid rgba(242, 245, 251, 1);
    }
    .mint-tab-item-label {
      height: 0.16rem;
      font-size: 0.14rem;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(141, 141, 141, 1);
      line-height: 0.16rem;
    }
    .tab-item {
      margin-right: 0.25rem;
      p {
        font-size: 0.14rem;
      }
    }
    .mint-navbar .mint-tab-item {
      height: 0.42rem;
      padding: 0px;
    }
    .mint-navbar .mint-tab-item.is-selected {
      border-bottom: none;
      .mint-tab-item-label {
        color: rgba(0, 122, 255, 1);
      }
    }
    .mint-tab-item-label{
      margin-top: 0.14rem;
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


