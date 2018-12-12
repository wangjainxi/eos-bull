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
        <div class="business-range">带填充</div>
        <div
          id="goBusiness"
          :class="currrentTab === '买入' || currrentTab === 'buy' ? 'businessBuy' : 'businessSell'"
        >{{currrentTab}}</div>
      </div>
      <div class="business-show-data-right">daff</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "business-box",
  data() {
    return {
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
@import "./../../../style/mixin.scss";
.business {
  @include wh(100%, 100%);
  position: relative;
  .business-coin-title,
  .business-show-data {
    border-bottom: 0.1rem solid rgba(242, 245, 251, 1);
    margin: 0 2rem;
    @include flex(flex, center, space-between);
  }
  .business-coin-title {
    @include wh(auto, 5rem);
    .business-coin-name {
      @include flex(flex, center, flex-start);
      & > span,
      & > i {
        @include font(500, 1.6rem, 2.2rem, "PingFangSC-Regular");
        color: rgba(0, 0, 0, 1);
      }
      i {
        @include wh(1.2rem, 1.2rem);
        margin-left: 0.6rem;
        cursor: pointer;
        @include bis("./../../../images/mobile/homepage/ic_arrow_under.svg");
      }
    }
    .business-coin-image {
      display: flex;
      .business-coin-star,
      .business-coin-img1 {
        @include wh(1.8rem, 1.8rem);
      }
      .business-coin-star {
        @include bis(
          "./../../../images/mobile/homepage/ic_collection_normal.svg"
        );
      }
      .business-coin-img1 {
        margin-left: 1.5rem;
        @include bis("./../../../images/mobile/homepage/ic_chart.svg");
      }
    }
  }
  .business-tab {
    @include wh(auto, 5.4rem);
    @include flex(flex, center, center);
    border-bottom: 1px solid rgba(242, 245, 251, 1);
    .business-tab-buy {
      @include wh(50%, auto);
      span {
        @include font(300, 1.6rem, 2.2rem, "PingFangSC-Light");
        color: rgba(141, 141, 141, 1);
        @include wh(auto, 5.4rem);
        line-height: 5.4rem;
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
    .business-show-data-left,.business-show-data-right{
      margin-bottom: 1.8rem;
    }
    .business-show-data-left {
      width: 50%;
      .left-title {
        padding: 1.6rem 0 0.3rem;
        @include flex(flex, center, flex-start);
        span {
          @include font(400, 1.5rem, 2.1rem, "PingFangSC-Regular");
          color: rgba(0, 0, 0, 1);
        }
        i {
          margin-left: 6px;
          @include wh(1.2rem, 1.2rem);
          @include bis("./../../../images/mobile/homepage/ic_arrow_under.svg");
        }
      }
      .business-price,
      .business-mount {
        margin: 1.3rem 0;
        @include wh(95%, 3.4rem);
        @include borderRadius(0.2rem);
        border: 1px solid rgba(141, 141, 141, 1);
        @include flex(flex, center, space-between);
        flex-direction: row;
      }
      .business-price {
        .business-price-down,
        .business-price-up {
          @include flex(flex, center, center);
          @include wh(2.4rem, 100%);
          @include font(400, 1.5rem, 2.1rem, "PingFangSC-Light");
          color: rgba(141, 141, 141, 1);
          &:active {
            background-color: rgb(235, 235, 235);
          }
        }
        .business-price-show {
          @include font(400, 1.5rem, 2.1rem, "PingFangSC-Light");
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
        padding: 0 0.8rem;
        margin: 2.6rem 0 0;
        input,
        span {
          @include font(400, 1.5rem, 2.1rem, "PingFangSC-Light");
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
        margin-top: 0.6rem;
        @include font(400, 1.2rem, 1.7rem, "PingFangSC-Light");
        text-align: left;
        color: rgba(141, 141, 141, 1);
      }
      .business-range {
        margin: 2.6rem 0;
      }
      #goBusiness {
        height: 3.4rem;
        width: 95%;
        @include flex(flex, center, center);
        @include font(500, 1.6rem, 2.2rem, "PingFangSC-Medium");
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
    }
  }
}
</style>
