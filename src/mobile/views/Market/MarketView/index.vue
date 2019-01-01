<template>
  <div class="market-view-box">
    <TransactionDetail v-if="marketViewStore.showAlert" :onTransaction="onTransaction"/>
    <div class="market-container">
      <TopView :market="dataStore.currentMarket"/>
      <div class="trading-box">
        <VueTradingView/>
      </div>
      <BomView :OrderData="OrderData" :recentDealData="recentDealData" />
    </div>
    <div class="btn-box">
      <div>
        <mt-button
          @click="onTransaction('buy')"
          style="background:rgba(7,199,78,1);color:#fff"
          type="default"
        >
          <Language resource="asset.buy1"/>
        </mt-button>
      </div>
      <div>
        <mt-button
          @click="onTransaction('sell')"
          style="background:rgba(255,0,0,1);color:#fff"
          type="default"
        >
          <Language resource="asset.sell1"/>
        </mt-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import data from '@/stores/data';
import dataStore from '@/stores/data';
import TopView from './TopView.vue';
import BomView from './BomView.vue';
import TransactionDetail from './TransactionDetail.vue';
import VueTradingView from '@/components/vueTradingView/index.vue';
import { observer } from 'mobx-vue';
import { Market, Trade } from '@/define';
import { computed } from 'mobx';
import { getMarketOrderbook, getMarketTrades, favouriteMarkets } from '@/utils/apis';
import marketViewStore from './marketViewStore';

const marketModule = namespace('market');

@observer
@Component({
  components: {
    TopView,
    BomView,
    TransactionDetail,
    VueTradingView,
  },
})
export default class MarketView extends Vue {
  marketViewStore = marketViewStore;
  dataStore = dataStore;
  OrderData = {};
  recentDealData: Array<Trade> = [];

  @marketModule.Getter('markets')
  markets!: Market[];

  @marketModule.Getter('favoriteMarkets')
  favouriteMarkets!: Market[];

  get market() {
    const id = parseInt(this.$route.params.id, 10);
    return this.markets.find(e => e.marketId === id);
  }

  mounted() {
    this.getOrderData();
    this.getRecentData();
  }

  async getRecentData() {
    this.recentDealData = await getMarketTrades(Number(this.$route.params.id));
  }

  async getOrderData() {
    this.OrderData = await getMarketOrderbook(Number(this.$route.params.id));
  }

  onTransaction(t: any) {
    const data = {
      name: 'business',
      params: {
        id: this.$route.params.id,
        coinName: this.$route.params.coinName,
        type: t,
      },
    };
    this.$router.push(data);
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin.scss';
.green-color {
  color: rgba(7, 199, 78, 1);
}
.red-color {
  color: rgba(229, 55, 87, 1);
}

.market-view-box {
  background: rgba(242, 245, 251, 1);
  position: relative;
  @include flexLayout(column, flex-start, flex-start);
  height: 100vh;
  box-sizing: border-box;
  width: 100vw;
  .market-container {
    padding-bottom: 0.62rem;
  }
  .mint-navbar {
    height: 40px;
  }
  .trading-box {
    width: 100%;
    height: 100%;
    height: 4.3rem;
    font-size: 0.14rem;
  }
}
.btn-box {
  height: 0.62rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0 1px 0px rgba(92, 102, 119, 0.2);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  @include flexLayout(row, space-between, center);
  > div {
    flex: 1;
    > button {
      width: 100%;
      height: 0.38rem;
      border-radius: 0.02rem;
      font-size: 15px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
  div:nth-child(1) {
    margin-right: 0.09rem;
  }
}
</style>


