<template>
  <div id="bom-container">

<mt-button type="default">default</mt-button>
<mt-button type="danger">danger</mt-button>
    <div id="tab-box" class="flex-row-start">
      <Button>dddd</Button>
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
      <mt-navbar v-model="selected">
  <mt-tab-item id="1">选项一</mt-tab-item>
  <mt-tab-item id="2">选项二</mt-tab-item>
  <mt-tab-item id="3">选项三</mt-tab-item>
</mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected">
  <mt-tab-container-item id="1">
    <mt-cell v-for="n in 10" :title="'内容 ' + n" />
  </mt-tab-container-item>
  <mt-tab-container-item id="2">
    <mt-cell v-for="n in 4" :title="'测试 ' + n" />
  </mt-tab-container-item>
  <mt-tab-container-item id="3">
    <mt-cell v-for="n in 6" :title="'选项 ' + n" />
  </mt-tab-container-item>
</mt-tab-container>
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
export default {
  name: "bom-view",
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


