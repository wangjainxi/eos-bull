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
    border-bottom: 1px solid rgba(242, 245, 251, 1);
    margin: 0 20px;
    @include flex(flex, center, space-between);
  }
  .business-coin-title {
    @include wh(auto, 50px);
    .business-coin-name {
      @include flex(flex, center, flex-start);
      & > span,
      & > i {
        @include font(500, 16px, 22px, "PingFangSC-Regular");
        color: rgba(0, 0, 0, 1);
      }
      i {
        @include wh(12px, 12px);
        margin-left: 6px;
        cursor: pointer;
        @include bis("./../../../images/mobile/homepage/ic_arrow_under.svg");
      }
    }
    .business-coin-image {
      display: flex;
      .business-coin-star,
      .business-coin-img1 {
        @include wh(18px, 18px);
      }
      .business-coin-star {
        @include bis(
          "./../../../images/mobile/homepage/ic_collection_normal.svg"
        );
      }
      .business-coin-img1 {
        margin-left: 15px;
        @include bis("./../../../images/mobile/homepage/ic_chart.svg");
      }
    }
  }
  .business-tab {
    @include wh(auto, 54px);
    @include flex(flex, center, center);
    border-bottom: 1px solid rgba(242, 245, 251, 1);
    .business-tab-buy {
      @include wh(50%, auto);
      @include font(300, 16px, 22px, "PingFangSC-Light");
      span {
        color: rgba(141, 141, 141, 1);
        @include wh(auto, 54px);
        line-height: 54px;
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
        padding: 16px 0;
        @include flex(flex, center, flex-start);
        span {
          @include font(400, 15px, 21px, "PingFangSC-Regular");
          color: rgba(0, 0, 0, 1);
        }
        i {
          margin-left: 6px;
          @include wh(12px, 12px);
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
