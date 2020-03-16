<template>
  <mt-popup :value="value" popup-transition="popup-fade" @input="handleVisibleChange">
    <div class="coin-body">
      <div class="coin-tab">
        <div
          :class="['coin-tab-item',{active:currentTab === index}]"
          v-for="(key, index) in tabs"
          :key="index"
          @click="handleTabClick(index)"
        >
          <i></i>
          <Language :resource="key"/>
        </div>
      </div>
      <div class="coin-body-list">
        <div
          class="coin-body-item"
          v-for="(item, index) in list"
          @click="handleMarketItemClick(item.marketId)"
          :key="index"
        >
          <div class="coin-name">
            {{ item.pair.baseCurrency.symbol.name }}/
            {{ item.pair.quoteCurrency.symbol.name }}
          </div>
          <div class="coin-price">{{item.lastPrice}}</div>
          <div class="coin-change">{{item.change}}</div>
        </div>
      </div>
    </div>
  </mt-popup>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import { namespace } from 'vuex-class';
import languageStore from '@/stores/language';
import { Market } from '@/define';

const marketModule = namespace('market');

@Observer
@Component
export default class ShowCoinList extends Vue {
  @Prop()
  value!: boolean;

  @marketModule.State('markets')
  markets!: Market[];

  @marketModule.Getter('favoriteMarkets')
  favoriteMarkets!: Market[];

  @marketModule.Getter('currentMarket')
  currentMarket?: Market;

  @marketModule.Action('updateMarket')
  updateMarket!: Function;

  currentTab = 1;

  get list() {
    if (this.currentTab === 1) return this.markets;
    return this.favoriteMarkets;
  }

  tabs = ['business.Favorites', 'business.EOS'];

  handleTabClick(index: number) {
    this.currentTab = index;
  }

  handleVisibleChange(val: boolean) {
    this.$emit('input', val);
  }

  handleMarketItemClick(marketId: number) {
    this.$router.push({
      name: 'business',
      params: {
        id: String(marketId),
      },
    });
    this.$emit('input', false);
  }
}
</script>
<style lang="scss" scoped>
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
    @include bis('./../../../../images/mobile/ic_collection_s.svg');
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
.coin-tab-item:nth-child(2) {
  i {
    @include bis('./../../../../images/mobile/ic_normal_eos.svg');
  }
}
.active {
  span {
    position: relative;
    height: 0.57rem;
    @include font(500, 0.16rem, 0.34rem, 'PingFangSC-Light');
    color: rgba(0, 122, 255, 1);
    // border-bottom: 0.03rem solid rgba(0, 122, 255, 1);
    // @include borderRadius(0.02rem);
    &::before {
      position: absolute;
      bottom: 0;
      content: '';
      left: 50%;
      transform: translateX(-50%);
      width: 0.24rem;
      height: 0.03rem;
      background-color: rgba(0, 122, 255, 1);
      border-radius: 0.02rem;
    }
  }
}
.active.coin-tab-item:nth-child(1) {
  i {
    @include bis('./../../../../images/mobile/ic_collection_current_s.svg');
  }
}
.active.coin-tab-item:nth-child(2) {
  i {
    @include bis('./../../../../images/mobile/ic_current_eos.svg');
  }
}
.coin-body-list {
  overflow-y: scroll;
  flex-direction: column;
  height: 500px;
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
