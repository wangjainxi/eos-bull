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
        <div class="business-price"></div>
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
  box-sizing: border-box;
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
    .business-show-data-left {
      flex-grow: 1;
      .left-title {
        padding: 1.6rem 0;
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
      .business-price {
        @include wh(100%,auto);
      }
    }
    .business-show-data-right {
      flex-grow: 1;
    }
  }
}
</style>
