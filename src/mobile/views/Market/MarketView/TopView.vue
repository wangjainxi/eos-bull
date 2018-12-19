<template>
    <div class="view-box-top">
      <div class="currency-box flex-row-between">
          <span class="currency-name">LTC/EOS</span>
          <img src="@/images/mobile/ic_collection_normal.svg" alt="">
      </div>
      <div class="real-data flex-row-between-start">
        <div class="real-name-box">
          <span class="real-text green-color">0.00000314</span>
          <img src="@/images/mobile/ic_collection_normal.svg" alt="">
        </div>
        <span class="long-text green-color">+ 112.16%</span>
      </div>
      <div  class="max24-box">
        <div><span class="real-title">24H最高价：</span><span class="real-text">0.000000373</span></div>
        <div><span class="real-title">24H最低价：</span><span class="real-text">0.000000147</span></div>
        <div><span class="real-title">24H成交量：</span><span class="real-text">8584584.134</span></div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'top-view',
};
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.green-color {
  color: rgba(7, 199, 78, 1);
}
.red-color {
  color: rgba(229, 55, 87, 1);
}
.view-box-top {
  font-size: 0.14rem;
  width: 100%;
  height: 1.68rem;
  padding: 0.14rem 0.2rem;
  background-color: #fff;
  .currency-box {
    .currency-name {
      font-size: 0.16rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }
  }
  .real-data {
    .real-name-box {
      @include flexLayout(row, flex-start, center);
    }
    @include flexLayout(row, space-between, center);
    margin-bottom: 0.01rem;
    margin-top: 0.01rem;
    .real-text {
      font-size: 0.32rem;
      font-family: PingFangSC-Semibold;
      font-weight: 400;
      margin-right: 0.14rem;
    }
    .long-text {
      font-size: 0.14rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(7, 199, 78, 1);
    }
  }
  .max24-box {
    @include flexLayout(column, flex-start, flex-start);
    > div {
      height: 0.24rem;
      line-height: 0.24rem;
    }
    .real-title {
      font-size: 0.14rem;
      font-family: PingFangSC-Light;
      font-weight: 400;
      color: rgba(141, 141, 141, 1);
    }
    .real-text {
      font-size: 0.14rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }
  }
}
</style>


