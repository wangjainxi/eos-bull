<template>
  <div class="market-view-box">
    <div class="view-box-top">
      <div class="currency-box flex-row-between">
          <span class="currency-name">LTC/EOS</span>
          <img src="../../../images/mobile/ic_collection_normal.svg" alt="">
      </div>
      <div class="real-data flex-row-between">
        <div class="">
          <span>LTC/EOS</span>
          <img src="../../../images/mobile/ic_rise.svg" alt="">
        </div>
        <span>+ 112.16%</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "market-view"
};
</script>
<style lang="scss">
.market-view-box {
  .view-box-top {
    height: 168px;
    padding:14px 20px;
    .currency-box{
      margin-bottom: 10px;
      .currency-name{
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
      }
    }

}
}
</style>


