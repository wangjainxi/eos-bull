<template>
  <div class="market-view-box" v-if="currentMarket">
    <!-- <TransactionDetail v-if="marketViewStore.showAlert" :onTransaction="onTransaction"/> -->
    <div class="market-container">
      <TopView :market="currentMarket"/>
      <div class="trading-box">
        <!-- <VueTradingView/> -->
      </div>
      <BomView :orderData="pendingOrders" :recentDealData="[]" />
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
import { namespace, State } from 'vuex-class';
import data from '@/stores/data';
import TopView from './TopView.vue';
import BomView from './BomView.vue';
import TransactionDetail from './TransactionDetail.vue';
import VueTradingView from '@/components/vueTradingView/index.vue';
import { observer } from 'mobx-vue';
import { Market, Trade, Order } from '@/define';
import { computed } from 'mobx';
import { getMarketOrderbook, getMarketTrades, favouriteMarkets } from '@/utils/apis';
import marketViewStore from './marketViewStore';
import { market } from '@/vuex/market';

const orderModule = namespace('order');
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
  @State('accountName')
  accountName!: string;

  @marketModule.Getter('markets')
  markets!: Market[];

  @marketModule.Getter('currentMarket')
  currentMarket?: Market;

  @marketModule.Getter('favoriteMarkets')
  favouriteMarkets!: Market[];

  @orderModule.State('pendingOrders')
  pendingOrders!: Order[];

  @orderModule.State('historyOrders')
  historyOrders!: Order[];

  marketViewStore = marketViewStore;

  recentDealData: Array<Trade> = [];

  @marketModule.Action('fetchMarkets')
  fetchMarkets!: Function;

  @marketModule.Mutation('setCurrentMarketId')
  setCurrentMarketId!: Function;

  @orderModule.Action('fetchPendingOrders')
  fetchPendingOrders!: Function;

  @orderModule.Action('fetchHistoryOrders')
  fetchHistoryOrders!: Function;

  get marketId() {
    return parseInt(this.$route.params.id, 10);
  }

  async created() {
    this.setCurrentMarketId(this.marketId);
    if (!this.currentMarket) {
      this.fetchMarkets();
    }
    setTimeout(() => {
      this.fetchPendingOrders();
    }, 1000);
  }

  async getRecentData() {
    this.recentDealData = await getMarketTrades(Number(this.$route.params.id));
  }

  onTransaction(t: any) {
    const data = {
      name: 'business',
      params: {
        id: this.$route.params.id,
      },
      query: {
        type: t,
        coinName: this.$route.params.coinName,
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


