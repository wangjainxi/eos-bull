<template>
  <div id="bom-container">
    <mt-navbar v-model="selected"></mt-navbar>
  <mt-tab-item id="1">option A</mt-tab-item>
  <mt-tab-item id="2">option B</mt-tab-item>
  <mt-tab-item id="3">option C</mt-tab-item>
</mt-navbar>


    <div id="tab-box" class="flex-row-start">
        <!-- <div class="tab-item">
          <p class="tab-title">委托订单</p>
          <p class="tab-mark"></p>
        </div>
        <div class="tab-item">
          <p class="tab-title">深度</p>
          <p class="tab-mark"></p>
        </div>
         <div class="tab-item">
          <p class="tab-title">最新成交</p>
          <p class="tab-mark"></p>
        </div> -->

    </div>

    <div class="container-box">

    </div>
    <!-- <div class="btn-box">
       <div><Button text="买入" type="sell38" @onclick="onBuy"/></div>
       <div><Button text="卖出" type="sell38" @onclick="onBuy"/></div>
    </div> -->
  </div>
</template>
<script>
import Vue from 'vue'
import Button from "@/components/button.vue";
import { Navbar, TabItem,TabContainer } from "mint-ui";
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
export default {
  name: "bom-view",
  components: {
    Button
  },
  methods: {
    selected: function() {
      console.log(222);
    }
  }
};
</script>
<style lang="scss">
@import "../../../../style/mixin.scss";
#bom-container {
  width: 100vw;
    .mint-tab-item-label{
      font-size: 0.2rem;
    }
  #tab-box {
    height: 0.42rem;
    background-color: #ddd;
    line-height: 0.42rem;
    padding-left: 0.2rem;
    font-size: 0.16rem!important;

    .tab-item {
      margin-right: 0.25rem;
      p {
        font-size: 0.14rem;
      }
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
  .transaction-box {
  }
}
</style>


