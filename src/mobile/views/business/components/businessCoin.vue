<template>
  <mt-popup v-model="thisPopupVisible"  popup-transition="popup-fade" :getPopupVisible="getPopupVisible">
    <div class="coin-body">
      <div class="coin-tab">
        <div
          :class="['coin-tab-item',{active:currentTab === item}]"
          v-for="(item, index) in tabs"
          :key="index"
          @click="getDataList(item,index)"
        >
          <i></i>
          <span>{{item}}</span>
        </div>
      </div>
      <div class="coin-body-list">
        <div class="coin-body-item" v-for="(item, index) in dataList" :key="index">
          <div class="coin-name">{{item.name}}</div>
          <div class="coin-price">{{item.price}}</div>
          <div class="coin-change">{{item.change}}</div>
        </div>
      </div>
    </div>
  </mt-popup>
</template>
<script>
export default {
  name: 'show-coin-list',
  props: ['popupVisible', 'dataCoinList','changePopupVisible'],
  data() {
    return {
      currentTab: 'EOS',
      tabs: ['自选', 'EOS'],
      dataList: this.dataCoinList,
      thisPopupVisible: this.popupVisible,
    };
  },
  methods: {
    getDataList(item, index) {
      this.currentTab = item;
      if (index === 0) {
        this.dataList = [];
      } else {
        this.dataList = this.dataCoinList;
      }
    },
  },
  computed: {
    getPopupVisible() {
      this.$emit('changePopupVisible',this.thisPopupVisible);
    },
  },
  watch:{
    popupVisible:function(newVal){
      this.thisPopupVisible = newVal;
    }
  },
  created() {},
};
</script>
<style lang="scss">
@import './../../../../style/mixin.scss';
$tabHeight: 44px;
.mint-popup {
  @include wh(100%, 80%);
  overflow: hidden;
  padding-bottom: 20px;
}
.coin-body {
  @include wh(100%, auto);
  display: flex;
  flex-direction: column;
}
.coin-tab {
  display: flex;
  @include wh(inherit, 0.54rem);
  flex-direction: row;
  @include flex(flex, center, space-between);
}
.coin-tab-item {
  @include wh(100%, 0.54rem);
  @include flex(flex, center, center);
  border-bottom: 1px solid rgba(242, 245, 251, 1);
  i {
    @include wh(0.16rem, 0.16rem);
    margin-right: 0.08rem;
    @include bis('./../../../../images/mobile/ic_collection_normal.svg');
  }
  span {
    display: flex;
    @include wh(auto, 0.54rem);
    line-height: 0.54rem;
    @include flex(flex, center, center);
    flex-direction: column;
    @include font(300, 0.16rem, 0.34rem, 'PingFangSC-Light');
    color: rgba(141, 141, 141, 1);
  }
}
.coin-tab:nth-child(2) {
  i {
    @include bis('./../../../../images/mobile/ic_chart.svg');
  }
}
.active {
  span {
    @include font(500, 0.16rem, 0.34rem, 'PingFangSC-Light');
    color: rgba(0, 122, 255, 1);
    border-bottom: 0.03rem solid rgba(0, 122, 255, 1);
    @include borderRadius(0.02rem);
  }
}
.coin-body-list {
  overflow-y: scroll;
  flex-direction: column;
  height: 470px;
  margin: 0 0.2rem;
  padding: 0 0 0.2rem;
  .coin-body-item {
    @include wh(100%, 0.42rem);
    @include flex(flex, center, space-between);
    & > div {
      flex: 1;
      @include font(400, 0.14rem, 0.2rem, 'PingFangSC-Regular');
      color: rgba(0, 0, 0, 1);
      text-align: left;
    }
    .coin-name {
      flex: 1.75;
      @include font(400, 0.16rem, 0.22rem, 'PingFangSC-Regular');
    }
    .coin-price {
      @include font(600, 0.14rem, 0.2rem, 'PingFangSC-Semibold');
    }
    .coin-change {
      color: rgba(7, 199, 78, 1);
      text-align: right;
    }
  }
}
</style>
