<template>
    <div class="view-box-top">
      <div class="currency-box flex-row-between">
          <span class="currency-name">LTC/EOS</span>
          <img src="@/images/mobile/ic_collection_normal.svg" alt="">
      </div>
      <div class="real-data flex-row-between-center">
        <div>
          <span class="real-text green-color">0.00000314</span>
          <!-- <img src="../../../images/mobile/ic_rise.svg" alt=""> -->
        </div>
        <span class="long-text green-color">+ 112.16%</span>
      </div>
      <div  class="max24-box flex-column-start-start">
        <div><span class="real-title">24H最高价：</span><span class="real-text">0.000000373</span></div>
        <div><span class="real-title">24H最低价：</span><span class="real-text">0.000000147</span></div>
        <div><span class="real-title">24H成交量：</span><span class="real-text">8584584.134</span></div>
      </div>
    </div>
</template>
<script>
export default {
  name: "top-view"
};
</script>
<style lang="scss">
.green-color {
  color: rgba(7, 199, 78, 1);
}
.red-color {
  color: rgba(229, 55, 87, 1);
}
  .view-box-top {
    width: 100%;
    height: 16.8rem;
    padding: 1.4rem 2rem;
    .currency-box {
      .currency-name {
        font-size: 1.6rem;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
      }
    }
    > :nth-child(2) {
         margin-bottom: 1rem;
         margin-top: 1rem;
      .real-text {
        font-size: 3.2rem;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        margin-right: 1.4rem;
      }
      .long-text {
        font-size: 1.4rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(7, 199, 78, 1);
      }
    }
    .max24-box{
      >div{
        height: 2.4rem;
        line-height: 2.4rem;
      }
      .real-title{
        font-size:1.4rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(141,141,141,1);
      }
      .real-text{
        font-size:1.4rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
      }
    }
  }
</style>


