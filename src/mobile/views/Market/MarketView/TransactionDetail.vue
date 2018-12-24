<template>
  <div class="detail-container" @click="onTransaction"  @touchmove.prevent>
    <div class="detail-content" @click.stop>
      <div class="title">DICE/EOS交易明细</div>
      <div class="tans-detail-top">
        <div class="detail-box">
          <div class="detail-item">
            <p>成交价</p>
            <p>0.000150</p>
          </div>
           <div class="detail-item">
            <p>成交量</p>
            <p>0.000150</p>
          </div>
        </div>
        <div class="detail-box">
          <div class="detail-item">
            <p>成交金额</p>
            <p>0.000150</p>
          </div>
           <div class="detail-item">
            <p>成交时间</p>
            <p>0.000150</p>
          </div>
      </div>
      </div>
      <div class="trans-buy">
        <div class="trans-type buy-text">
          买方
        </div>
        <div class="detail-text-box">
          <p class="text-item">
            <span>EOS账户名：</span>
            <span class="account account-text">WantLine</span>
          </p>
          <p class="text-item">
            <span>结算数量：</span>
            <span class="account">2390.8097</span>
          </p>
            <p class="text-item">
            <span>手续费：</span>
            <span class="account">2.8097</span>
          </p>
            <p class="text-item">
            <span>交易委托TrxID：</span>
            <span class="account">4ewfewf214...</span>
          </p>
            <p class="text-item">
            <span>成交结算TrxID：</span>
            <span class="account">4ewfewf214...</span>
          </p>
        </div>
      </div>
        <div class="trans-sell">
        <div class="trans-type sell-text">
           卖方
        </div>
        <div class="detail-text-box">
          <p class="text-item">
            <span>EOS账户名：</span>
            <span class="account account-text">WantLine</span>
          </p>
          <p class="text-item">
            <span>结算数量：</span>
            <span class="account">2390.8097</span>
          </p>
            <p class="text-item">
            <span>手续费：</span>
            <span class="account">2.8097</span>
          </p>
            <p class="text-item">
            <span>交易委托TrxID：</span>
            <span class="account">4ewfewf214...</span>
          </p>
            <p class="text-item">
            <span>成交结算TrxID：</span>
            <span class="account">4ewfewf214...</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'transaction-detail',
  props: {
    onTransaction: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.detail-container {
  position: fixed;
  top: 0rem;
  left: 0rem;
  width: 100%;
  height: 100%;
  background: rgba(31, 31, 31, 0.67);
  z-index: 99;
  @include flexLayout(column, center, center);
  .detail-content {
    width: 2.95rem;
    background-color: #fff;
    padding: 0.18rem 0.2rem 0.2rem 0.2rem;
    border-radius: 0.08rem;
    .title {
      font-size: 0.16rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 0.14rem;
    }
  }
  .tans-detail-top {
    .detail-box {
      @include flexLayout(row, flex-start, flex-start);
    }
    .detail-item {
      flex: 1;
      @include flexLayout(column, flex-start, flex-start);
      p:nth-child(2) {
        height: 0.2rem;
        font-size: 0.14rem;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 0.2rem;
      }
    }
    .detail-box:nth-child(1) {
      margin-bottom: 0.1rem;
    }
    .detail-box:nth-child(2) {
      margin-bottom: 0.19rem;
    }
  }
     .trans-buy,.trans-sell{
      @include flexLayout(row,flex-start,flex-start);
    }
    .trans-buy{
      margin-bottom: 0.11rem;
    }
      .trans-type{
      width:0.46rem;
      height:0.18rem;
      line-height: 0.18rem;
      text-align: center;
      border-radius:0.02rem;
      font-size:0.14rem;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      margin-right: 0.13rem;

    }
    .buy-text{
      background:rgba(7,199,78,1);
    }
     .sell-text{
      background:rgba(255,0,0,1);
    }
    .text-item{
      text-align: left;
      margin-bottom: 0.05rem;
        span:nth-child(1){
          font-size:0.12rem;
          font-family:PingFangSC-Light;
          font-weight:300;
          color:rgba(102,102,102,1);
        }
        span:nth-child(2){
          font-size:0.14rem;
          font-family:PingFangSC-Light;
          font-weight:500;
          color:rgba(0,0,0,1);
        }
        .account-text{
          color:rgba(0,122,255,1)!important;
      }
      }

}
</style>


