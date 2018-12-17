<template>
  <div class="entrust-item">
    <div class="entrust-item-head">
      <div class="head-left">
        <div class="left-type">买</div>
        <div class="left-coin-type">MAX/EOS</div>
        <div class="left-date">12-11</div>
      </div>
      <div :class="['head-right',{canCansel:entrustType === 0}]">
        <span @click="canselOrder">{{entrustType === 0?'撤销':'已成交'}}</span>
        <i v-show="entrustType !== 0" @click="goHisitory"></i>
      </div>
    </div>
    <div class="entrust-item-body">
      <div class="item-body-top">
        <div class="entrust-box1">
          <div class="box-title">委托价(EOS)</div>
          <div class="box-data">0.000150</div>
        </div>
        <div class="entrust-box2">
          <div class="box-title">委托量(MAX)</div>
          <div class="box-data">64274.6666</div>
        </div>
        <div class="entrust-box3">
          <div class="box-title">成交量(MAX)</div>
          <div class="box-data">—</div>
        </div>
      </div>
      <div class="item-body-bottom">
        <div class="entrust-box1">
          <div class="box-title">成交均价(EOS)</div>
          <div class="box-data">0.000150</div>
        </div>
        <div class="entrust-box2">
          <div class="box-title">成交总额(EOS)</div>
          <div class="box-data">64274.6666</div>
        </div>
        <div class="entrust-box3">
          <div class="box-title">成交总额(EOS)</div>
          <div class="box-data">0.0085</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
let data = [{}];
export default {
  name: 'business-entrust-item',
  props: ['item', 'entrustType'],
  data() {
    return {};
  },
  methods: {
    canselOrder() {
      // MessageBox({
      //   title: "提示",
      //   message: "确定撤销订单?",
      //   showCancelButton: true
      // });
      if (this.entrustType === 0) {
        MessageBox.confirm('确定撤销订单?').then(
          action => {
            console.log(action);
          },
          action => {
            console.log(action);
          }
        );
      }
    },
    goHisitory() {
      this.$router.push({
        path: '/businessHistory',
        name: 'businessHistory',
        params: {
          name: 'business',
        },
      });
    },
  },
};
</script>
<style lang="scss">
@import '../../../../style/mixin.scss';
.entrust-item {
  padding: 0 0.2rem 0.05rem;
  @include wh(100%, auto);
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 1);
}
.entrust-item-head {
  margin: 0.17rem 0;
  @include flex(flex, center, space-between);
}
.head-left {
  @include flex(flex, center, space-between);
  .left-type {
    @include flex(flex, center, center);
    @include borderRadius(50%);
    @include wh(0.15rem, 0.15rem);
    background: rgba(7, 199, 78, 1);
    @include font(400, 0.09rem, 0.13rem, 'PingFangSC-Regular');
    color: rgba(255, 255, 255, 1);
  }
  .left-type.sell {
    background: rgba(255, 0, 0, 1);
  }
  .left-coin-type {
    margin: 0 0.06rem;
    color: rgba(0, 0, 0, 1);
    @include font(400, 0.16rem, 0.22rem, 'PingFangSC-Regular');
  }
  .left-date {
    @include font(300, 0.12rem, 0.17rem, 'PingFangSC-Regular');
    color: rgba(102, 102, 102, 1);
  }
}
.head-right {
  @include flex(flex, flex-end, space-between);
  span {
    @include flex(flex, center, center);
    color: rgba(102, 102, 102, 1);
    @include font(300, 0.14rem, 0.2rem, 'PingFangSC-Regular');
  }
  i {
    margin-left: 0.04rem;
    @include bis('./../../../../images/mobile/ic_arrow_under.svg');
    @include wh(0.2rem, 0.2rem);
  }
}
.head-right.canCansel {
  span {
    background: rgba(0, 122, 255, 1);
    @include borderRadius(3px);
    @include wh(0.42rem, 0.22rem);
    color: rgba(255, 255, 255, 1);
  }
}
.entrust-item-body {
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid rgba(242, 245, 251, 1);
  & > div {
    margin-bottom: 0.1rem;
    @include flex(flex, center, space-between);
    & > div {
      display: flex;
      flex-direction: column;
    }
  }
  .entrust-box1 {
    & > div {
      text-align: left;
    }
  }
  .entrust-box3 {
    & > div {
      text-align: right;
    }
  }
  .box-title {
    color: rgba(102, 102, 102, 1);
    @include font(300, 0.12rem, 0.17rem, 'PingFangSC-Light');
  }
  .box-data {
    margin-top: 0.02rem;
    @include font(500, 0.14rem, 0.2rem, 'PingFangSC-Medium');
    color: rgba(0, 0, 0, 1);
  }
}
</style>
