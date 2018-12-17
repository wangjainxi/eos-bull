<template>
<div>
  <div class="order-item" v-for="item in data">
    <div class="type-buy"  v-if="item.type === 1">
      <div class="top">
       <span class="left-info">
        <img class="type" src="@/images/mobile/ic_buy_c.svg" alt="">
        <span class="currency">MAX/EOS</span>
        <span class="time">12-11</span>
      </span>
      <span>
        <Button class="btn" type="default" v-if="item.status === 1">撤销</Button>
        <span  v-if="item.status === 0">已撤销</span>
       <span   v-if="item.status === 2" class="already-deal">
          <span>已成交</span>
           <img class="type" src="@/images/mobile/ic_sell_c.svg" alt="">
        </span>
      </span>

    </div>
    <div class="bom">
      <span>
        <span>委托价(EOS)</span>
        <span>0.000150</span>
      </span>
       <span>
        <span>委托量(MAX)</span>
        <span>64274.6666</span>
      </span>
       <span>
        <span>成交量(MAX)</span>
        <span>150</span>
      </span>
    </div>
    <div class="line"></div>
    </div>
    <div class="type-sell"  v-if="item.type === 2" >
      <div class="top">
         <span class="left-info">
          <img class="type" src="@/images/mobile/ic_sell_c.svg" alt="">
          <span class="currency">MAX/EOS</span>
          <span class="time">12-11</span>
        </span>
      <span>
        <Button class="btn" type="default" v-if="item.status === 1">撤销</Button>
        <span  v-if="item.status === 0">已撤销</span>
        <span   v-if="item.status === 2" class="already-deal">
          <span>已成交</span>
           <img class="type" src="@/images/mobile/ic_arrow_right_ red.svg" alt="">
        </span>
      </span>
    </div>
    <div class="bom">
      <span>
        <span>委托价(EOS)</span>
        <span>0.000150</span>
      </span>
       <span>
        <span>委托量(MAX)</span>
        <span>64274.6666</span>
      </span>
       <span>
        <span>成交量(MAX)</span>
        <span>150</span>
      </span>
    </div>
    <div class="bom2">
      <span>
        <span>成交均价(EOS)</span>
        <span>0.000150</span>
      </span>
       <span>
        <span>成交总额(EOS)</span>
        <span>64274.6666</span>
      </span>
       <span>
        <span>手续费(EOS)</span>
        <span>150</span>
      </span>
    </div>
    <div class="line"></div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'order-item',
  props: {
    data: {
      type: Array,
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.order-item {
  width: 100%;
  padding: 0.15rem 0.2rem 0rem;
  .line {
    height: 0.02rem;
    background-color: rgba(242, 245, 251, 1);
    margin-top: 0.14rem;
  }
  .top {
    width: 100%;
    margin-bottom: 0.16rem;

    @include flexLayout(row, space-between, flex-start);
  }
  .left-info {
    @include flexLayout(row, flex-start, center);
    .type {
      margin-right: 0.05rem;
    }
    .currency {
      font-size: 0.16rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-right: 0.06rem;
    }
    .time {
      font-size: 0.12rem;
      font-family: PingFangSC-Light;
      font-weight: 300;
      color: rgba(102, 102, 102, 1);
    }
  }
  .btn {
    width: 42px;
    height: 22px;
    background: rgba(0, 122, 255, 1);
    border-radius: 3px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .bom2 {
    margin-top: 0.1rem;
  }
  .already-deal {
    @include flexLayout(row, flex-start, center);
    > span {
      margin-right: 0.09rem;
    }
  }
  .bom,
  .bom2 {
    @include flexLayout(row, space-between, flex-start);
    > span {
      word-break: break-all;
      @include flexLayout(column, flex-start, '');
      span:nth-child(1) {
        font-size: 0.12rem;
        font-family: PingFangSC-Light;
        font-weight: 300;
        color: rgba(102, 102, 102, 1);
        line-height: 0.17rem;
      }
      span:nth-child(2) {
        font-size: 0.14rem;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 0.2rem;
      }
    }
    span:nth-child(1) {
      span {
        text-align: left;
      }
    }
    span:nth-child(2) {
      span {
        text-align: right;
      }
    }
    span:nth-child(3) {
      span {
        text-align: right;
      }
    }
  }
}
</style>


