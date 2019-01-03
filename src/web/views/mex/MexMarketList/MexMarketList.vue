<template>
  <div class="market-list">
    <div class="list-header">
      <transition>
        <a :class="{active:shows ===3 }" @click="showView(3)" :title="showAltContent('exchange.Buy')">
          <img src="../../../../images/web/ic_top.svg" alt>
        </a>
      </transition>
      <transition>
        <a :class="{active:shows ===2 }" @click="showView(2)" :title="showAltContent('exchange.Sell')">
          <img src="../../../../images/web/ic_bottom.svg" alt>
        </a>
      </transition>
      <transition>
        <a :class="{active:shows ===1 }" @click="showView(1)" :title="showAltContent('exchange.deep')">
          <img src="../../../../images/web/ic_middle.svg" alt>
        </a>
      </transition>
    </div>
    <div class="list-title">
      <span class="left-text">
        <Language resource="exchange.Price"/>(EOS)
      </span>
      <span class="center-text">
        <Language resource="exchange.Amount"/>(MAX)
      </span>
      <span class="right-text">
        <Language resource="exchange.Total"/>(EOS)
      </span>
    </div>
    <div class="list-content">
      <!-- 买卖 -->
      <div v-if="shows === 3">
        <div class="sell-part">
          <ListItem :sellData="sellData.ask" class="sell-box"/>
        </div>
        <div class="real-price-part">
          <div>
            <span>0.000360</span>
            <span>!</span>
          </div>
        </div>
        <div class="buy-part">
          <ListItem :sellData="sellData.bids" class="buy-box"/>
        </div>
      </div>

      <!-- 买 -->
      <div v-if="shows === 2">
        <div class="real-price-part">
          <div>
            <span>0.000360</span>
            <span>!</span>
          </div>
        </div>
        <div class="buy-part">
          <ListItem :sellData="sellData.asks" class="buy-box"/>
        </div>
      </div>
      <!-- 卖 -->
      <div v-if="shows === 1">
        <div class="sell-part">
          <ListItem :sellData="sellData.bids" class="sell-box"/>
        </div>
        <div class="real-price-part">
          <div>
            <span>0.000360</span>
            <span>!</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import ListItem from './ListItem.vue';
import { Market } from '@/define';
import { getMarketOrderbook } from '@/utils/apis';
import language from '@/stores/language';
import { Observer } from 'mobx-vue';

const marketModule = namespace('market');

@Observer
@Component({
  components: {
    ListItem,
  },
})
export default class extends Vue {
  @marketModule.State('currentMarketId')
  currentMarketId!: number;

  @marketModule.Getter('currentMarket')
  currentMarket?: Market;

  sellData: any = {};
  shows = 1;
  beforeMount() {
    console.log(this.sellData.length);
    const obj = {
      price: 0.0004,
      size: 141194.1235,
      total: 56.3365,
      width: '10%',
    };
  }
  showView(type: any) {
    this.shows = type;
    const obj = {
      price: 0.0004,
      size: 141194.1235,
      total: 56.3365,
      width: '10%',
    };
    this.sellData = [];
  }

  showAltContent(obj: string) {
    return language.getIntlText(obj);
  }

  @Watch('currentMarketId')
  async handleCcurrentMarketIdChange(newId: number, oldId: number) {
    this.sellData = await getMarketOrderbook(newId);
  }
}
</script>

<style lang="scss" scoped>
.market-list {
  height: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow-y: hidden;

  .list-header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 42px;
    background: rgba(20, 46, 77, 1);
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-start;
    color: #fff;
    & > a {
      padding: 0 7px;
      cursor: pointer;
    }
  }

  .list-title {
    padding-left: 12px;
    padding-right: 9px;
    height: 34px;
    background: rgba(18, 38, 63, 1);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 11px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(110, 132, 163, 1);
    }
  }

  .real-price-part {
    line-height: 40px;
    height: 40px;
    font-size: 21px;
    font-family: Helvetica;
    color: rgba(28, 196, 102, 1);
  }

  .active {
    border: 1px solid #fff;
  }
}
</style>
