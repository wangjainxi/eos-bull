<template>
  <div class="market-view-box" v-if="currentMarket">
    <!-- <TransactionDetail :onTransaction="onTransaction"/> -->
    <div class="market-container">
      <TopView :market="currentMarket"/>
      <div class="trading-box">
        <!-- <VueTradingView/> -->
      </div>
      <BomView
        :orderData="orderbook"
        :recentDealData="trades"
        :tokenInfo="tokenInfo" />
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
import { Vue, Component, Watch } from 'vue-property-decorator';
import { namespace, State, Action } from 'vuex-class';
import TopView from './top-view.vue';
import BomView from './bom-view.vue';
import TransactionDetail from './TransactionDetail.vue';
import VueTradingView from '@/components/vueTradingView/index.vue';
import { Market, Trade, Order, TokenInfo, Orderbook } from '@/define';
import { getMarketTrades, getTokenInfo, getMarketOrderbook } from '@/utils/apis';

const orderModule = namespace('order');
const marketModule = namespace('market');

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

  @marketModule.State('orderbook')
  orderbook!: Orderbook;

  @marketModule.State('trades')
  trades!: Trade[];

  @marketModule.Getter('markets')
  markets!: Market[];

  @marketModule.Getter('currentMarket')
  currentMarket?: Market;

  @marketModule.Getter('favoriteMarkets')
  favouriteMarkets!: Market[];

  @Action('login')
  login!: Function;

  @marketModule.Action('fetchMarkets')
  fetchMarkets!: Function;

  @orderModule.Action('fetchPendingOrders')
  fetchPendingOrders!: Function;

  @orderModule.Action('fetchHistoryOrders')
  fetchHistoryOrders!: Function;

  @marketModule.Action('updateMarket')
  updateMarket!: Function;

  tokenInfo: TokenInfo | null = null;

  get marketId() {
    return parseInt(this.$route.params.id, 10);
  }

  created() {
    this.initData();
  }

  @Watch('$route')
  handleRouteChange() {
    this.initData();
  }

  async initData() {
    // 设置当前市场
    this.updateMarket(this.marketId);

    // 登录判断
    if (!this.accountName) {
      await this.login();
    }

    // 市场判断
    if (!this.currentMarket) {
      await this.fetchMarkets();
    }
    // 加载token信息
    const contract = this.currentMarket!.pair.baseCurrency.contract;
    const symbol = this.currentMarket!.pair.baseCurrency.symbol.name;
    this.tokenInfo = await getTokenInfo(contract, symbol);
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
@import '../../../style/mixin.scss';

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


