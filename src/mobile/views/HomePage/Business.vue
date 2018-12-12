<template>
  <div class="business">
    <div class="business-coin-title">
      <div class="business-coin-name">
        <span>LTC/EOS</span>
        <i></i>
      </div>
      <div class="business-coin-image">
        <i class="business-coin-star"></i>
        <i class="business-coin-img1"></i>
      </div>
    </div>
    <div class="business-tab">
      <div
        :class="['business-tab-buy', {active : currrentTab === tab}, {tab2: index === 1}]"
        @click="changeTab(tab)"
        v-for="(tab,index) in tabs"
        :key="tab"
      >
        <span>{{tab}}</span>
      </div>
    </div>
    <div class="business-show-data">
      <div class="business-show-data-left">
        <div class="left-title">
          <span>限价</span>
          <i></i>
        </div>
        <div class="business-price">
          <div class="business-price-down" @click="businessPrice--">-</div>
          <div class="business-price-show">{{businessPrice}}</div>
          <div class="business-price-up" @click="businessPrice++">+</div>
        </div>
        <div class="business-mount">
          <input type="text" v-model="inputVal">
          <span>WIZBOX</span>
        </div>
        <div class="business-change-eos">{{`≈${changeEos}EOS`}}</div>
        <div class="business-range">
          <!-- <mt-range v-model="rangeValue" :min="0" :max="100" :step="1" :bar-height="1">
            <div slot="start">0</div>
            <div slot="end">100</div>
          </mt-range>-->
          dssf
        </div>
        <div
          id="goBusiness"
          :class="currrentTab === '买入' || currrentTab === 'buy' ? 'businessBuy' : 'businessSell'"
        >{{currrentTab}}</div>
      </div>
      <div class="business-show-data-right">
        <div class="right-top">
          <div class="coin-items header">
            <div class="coin-price">价格</div>
            <div class="coin-mount">数量</div>
          </div>
          <div class="coin-item-box">
            <div class="coin-items">
              <i :style="{ width: '30%' }"></i>
              <div class="coin-price">0.2203</div>
              <div class="coin-mount">7</div>
            </div>
          </div>
        </div>
        <div class="right-middle">
          <span>0.0200</span>
          <i></i>
        </div>
        <div class="right-bottom"></div>
      </div>
    </div>
  </div>
</template>
<script>
// import { Range } from 'mint-ui';
// Vue.component(Range.name, Range);
export default {
  name: "business-box",
  data() {
    return {
      rangeValue: 6,
      businessPrice: 3422.02,
      inputVal: 0,
      changeEos: 0.00001,
      currrentTab: "买入",
      tabs: ["买入", "卖出"]
    };
  },
  methods: {
    changeTab(val) {
      this.currrentTab = val;
      this.getShowTabData();
    },
    getShowTabData() {}
  }
};
</script>
<style lang="scss" scoped>
@import "../../../style/mixin.scss";
.business {
  @include wh(100%, 100%);
  position: relative;
  .business-coin-title,
  .business-show-data {
    border-bottom: 0.01rem solid rgba(242, 245, 251, 1);
    margin: 0 0.2rem;
    @include flex(flex, center, space-between);
  }
  .business-coin-title {
    @include wh(auto, 0.5rem);
    .business-coin-name {
      @include flex(flex, center, flex-start);
      & > span,
      & > i {
        @include font(500, 0.16rem, 0.22rem, "PingFangSC-Regular");
        color: rgba(0, 0, 0, 1);
      }
      i {
        @include wh(0.12rem, 0.12rem);
        margin-left: 0.06rem;
        cursor: pointer;
        @include bis("./../../../images/mobile/ic_arrow_under.svg");
      }
    }
    .business-coin-image {
      display: flex;
      .business-coin-star,
      .business-coin-img1 {
        @include wh(0.18rem, 0.18rem);
      }
      .business-coin-star {
        @include bis("./../../../images/mobile/ic_collection_normal.svg");
      }
      .business-coin-img1 {
        margin-left: 0.15rem;
        @include bis("./../../../images/mobile/ic_chart.svg");
      }
    }
  }
  .business-tab {
    @include wh(auto, 0.54rem);
    @include flex(flex, center, center);
    border-bottom: 1px solid rgba(242, 245, 251, 1);
    .business-tab-buy {
      @include flex(flex, center, center);
      @include wh(50%, 0.54rem);
      span {
        @include font(300, 0.16rem, 0.22rem, "PingFangSC-Regular");
        color: rgba(141, 141, 141, 1);
        @include wh(auto, 0.54rem);
        line-height: 0.54rem;
        display: inline-block;
      }
    }
    .active {
      span {
        color: rgba(7, 199, 78, 1);
        border-bottom: 3px solid rgba(7, 199, 78, 1);
        @include borderRadius(2px);
      }
    }
    .active.tab2 {
      span {
        color: rgba(255, 0, 0, 1);
        border-bottom: 3px solid rgba(255, 0, 0, 1);
        @include borderRadius(2px);
      }
    }
  }
  .business-show-data {
    @include wh(auto, auto);
    @include flex(flex, center, flex-start);
    .business-show-data-left,
    .business-show-data-right {
      margin-bottom: 0.18rem;
    }
    .business-show-data-left {
      width: 50%;
      .left-title {
        padding: 0.16rem 0 0.03rem;
        @include flex(flex, center, flex-start);
        span {
          @include font(400, 0.15rem, 0.21rem, "PingFangSC-Regular");
          color: rgba(0, 0, 0, 1);
        }
        i {
          margin-left: 0.06rem;
          @include wh(0.12rem, 0.12rem);
          @include bis("./../../../images/mobile/ic_arrow_under.svg");
        }
      }
      .business-price,
      .business-mount {
        margin: 0.13rem 0;
        @include wh(95%, 0.34rem);
        @include borderRadius(0.02rem);
        border: 1px solid rgba(141, 141, 141, 1);
        @include flex(flex, center, space-between);
        flex-direction: row;
      }
      .business-price {
        .business-price-down,
        .business-price-up {
          @include flex(flex, center, center);
          @include wh(0.24rem, 100%);
          @include font(400, 0.15rem, 0.21rem, "PingFangSC-Light");
          color: rgba(141, 141, 141, 1);
          &:active {
            background-color: rgb(235, 235, 235);
          }
        }
        .business-price-show {
          @include font(400, 0.15rem, 0.21rem, "PingFangSC-Light");
          color: rgba(0, 0, 0, 1);
        }
        .business-price-down {
          border-right: 2px solid rgba(141, 141, 141, 0.7);
        }
        .business-price-up {
          border-left: 2px solid rgba(141, 141, 141, 0.7);
        }
      }
      .business-mount {
        padding: 0 0.08rem;
        margin: 0.26rem 0 0;
        input,
        span {
          @include font(400, 0.15rem, 0.21rem, "PingFangSC-Light");
        }
        input {
          width: 55%;
          border: none;
          color: rgba(0, 0, 0, 1);
        }
        span {
          color: rgba(141, 141, 141, 1);
        }
      }
      .business-change-eos {
        margin-top: 0.06rem;
        @include font(400, 0.12rem, 0.17rem, "PingFangSC-Light");
        display: flex;
        text-align: left;
        color: rgba(141, 141, 141, 1);
      }
      .business-range {
        margin: 0.26rem 0;
        display: flex;
        @include font(400, 0.12rem, 0.17rem, "PingFangSC-Light");
      }
      #goBusiness {
        height: 0.34rem;
        width: 95%;
        @include flex(flex, center, center);
        @include font(500, 0.16rem, 0.22rem, "PingFangSC-Medium");
        color: rgba(255, 255, 255, 1);
        border-radius: 2px;
      }
      .businessBuy {
        background-color: rgba(7, 199, 78, 1);
      }
      .businessSell {
        background-color: rgba(255, 0, 0, 1);
      }
    }
    .business-show-data-right {
      width: 50%;
      font-size: 0.12rem;
      display: flex;
      flex-direction: column;
      .right-top,
      .right-middle,
      .right-bottom {
        width: 95%;
        height: auto;
        display: flex;
        height: 1.22rem;
        margin-left: 5%;
      }
      .right-top {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .coin-item-box{
          overflow-y: scroll;
        }
        .coin-items {
          display: flex;
          @include wh(100%, auto);
          position: relative;
          & > div {
            width: 50%;
            color: rgba(255, 0, 0, 1);
            @include font(400, 0.12rem, 0.26rem, "PingFangSC-Regular");
          }
          .coin-price{
            text-align: left;
          }
          .coin-mount{
            text-align: right;
          }
          i {
            position: absolute;
            top: 0;
            left: 0;
            height: auto;
            background: rgba(255, 0, 0, 0.1);
          }
        }
        .header {
          margin: 0.16rem 0 0rem;
          & > div {
            color: rgba(141, 141, 141, 1);
            @include font(400, 0.15rem, 0.21rem, "PingFangSC-Regular");
          }
        }
      }
      .right-middle {
        height: 0.23rem;
        color: rgba(7, 199, 78, 1);
        border-top: 1px solid rgba(141, 141, 141, 1);
        border-bottom: 1px solid rgba(141, 141, 141, 1);
        margin: 0.03rem auto;
        display: flex;
        span,
        i {
          text-align: center;
          @include font(400, 0.14rem, 0.2rem, "PingFangSC-Regular");
        }
      }
      .red {
        color: rgba(255, 0, 0, 1);
      }
      .right-bottom {
      }
    }
  }
}
</style>
