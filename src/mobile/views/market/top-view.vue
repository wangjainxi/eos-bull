<template>
  <div class="view-box-top">
    <div class="currency-box flex-row-between" v-if="market">
      <span
        class="currency-name"
      >{{ market.pair.baseCurrency.symbol.name }}/{{ market.pair.quoteCurrency.symbol.name }}</span>
      <div class="collect-box">
        <img
          v-if="market.favourited"
          @click="collect"
          src="@/images/mobile/ic_collection_current_s.svg"
        >
        <img v-else @click="collect" src="@/images/mobile/ic_collection_s.svg">
      </div>
    </div>
    <div class="real-data flex-row-between-start">
      <div class="real-name-box">
        <span :class="changeStyle">{{ market.lastPrice }}</span>
        <img
          v-if="parseFloat(market.change) > 0 && parseFloat(market.change) !== 0"
          src="@/images/mobile/ic_rise.svg"
          alt
        >
        <img
          v-if="parseFloat(market.change) < 0 && parseFloat(market.change) !== 0"
          src="@/images/mobile/ic_Fall_s.svg"
          alt
        >
      </div>
      <span>
        <span :class="changeColor">{{ market.change }}</span>
      </span>
    </div>
    <div class="max24-box">
      <div>
        <span class="real-title">
          <Language resource="transaction.H24_Hig"/>：
        </span>
        <span class="real-text">{{ market.high }}</span>
      </div>
      <div>
        <span class="real-title">
          <Language resource="transaction.H24_Low"/>：
        </span>
        <span class="real-text">{{ market.low }}</span>
      </div>
      <div>
        <span class="real-title">
          <Language resource="transaction.H24_Volume"/>：
        </span>
        <span class="real-text">{{ market.volumeQuote }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Market } from '@/define';

const marketModule = namespace('market');

@Component
export default class MarketInfo extends Vue {
  @Prop()
  market!: Market;

  baseClass = ['real-text'];
  baseColor = ['long-text'];

  @marketModule.Action('addFavoriteMarket')
  addFavoriteMarket!: Function;

  @marketModule.Action('removeFavoriteMarket')
  removeFavoriteMarket!: Function;

  collect() {
    if (!this.market) return;
    if (this.market.favourited) {
      this.removeFavoriteMarket(this.market.marketId);
    } else {
      this.addFavoriteMarket(this.market.marketId);
    }
  }

  get changeStyle() {
    const changeValue = parseFloat(this.market.change);
    if (changeValue > 0) {
      this.baseClass.push('green-color');
    } else if (changeValue < 0) {
      this.baseClass.push('red-color');
    }
    return this.baseClass;
  }

  get changeColor() {
    const changeValue = parseFloat(this.market.change);
    if (changeValue > 0) {
      this.baseColor.push('green-color');
    } else if (changeValue < 0) {
      this.baseColor.push('red-color');
    }
    return this.baseColor;
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.green-color {
  color: rgba(7, 199, 78, 1);
}
.red-color {
  color: rgba(229, 55, 87, 1);
}
.view-box-top {
  font-size: 0.14rem;
  width: 100%;
  height: 1.68rem;
  padding: 0.14rem 0.2rem;
  background-color: #fff;
  margin-bottom: 0.04rem;
  .collect-box {
    > img {
      width: 0.18rem;
      height: 0.18rem;
    }
  }
  .currency-box {
    .currency-name {
      font-size: 0.16rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }
  }
  .real-data {
    .real-name-box {
      @include flexLayout(row, flex-start, center);
    }
    @include flexLayout(row, space-between, center);
    margin-bottom: 0.05rem;
    margin-top: 0.05rem;
    .real-text {
      font-size: 0.32rem;
      font-family: PingFangSC-Semibold;
      font-weight: 400;
      margin-right: 0.14rem;
    }
    .long-text {
      font-size: 0.14rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
    }
  }
  .max24-box {
    @include flexLayout(column, flex-start, flex-start);
    > div {
      height: 0.24rem;
      line-height: 0.24rem;
    }
    .real-title {
      font-size: 0.14rem;
      font-family: PingFangSC-Light;
      font-weight: 400;
      color: rgba(141, 141, 141, 1);
    }
    .real-text {
      font-size: 0.14rem;
      font-family: PingFangSC-Medium;
      font-weight: bolder;
      color: rgba(0, 0, 0, 1);
    }
  }
}
</style>


