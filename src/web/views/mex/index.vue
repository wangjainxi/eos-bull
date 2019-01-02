<template>
  <div id="mex">
    <div class="mex-head-Info">
      <mex-head-info :market="currentMarket" />
    </div>
    <div class="mex-keynote-page">
      <div class="mex-keynote-first">
        <div class="mex-market-page">
          <MexMarketList />
        </div>
      </div>
      <div class="mex-keynote-second">
        <div class="mex-k-line-page">
          <MexKLineChart/>
        </div>
        <div class="mex-plact-order-page">
          <mex-place-order :currentMarket="currentMarket" />
        </div>
      </div>
      <div class="mex-keynote-third">
        <div class="mex-currentcy-page">
          <mex-currentcy-list @change="handleMarketChange" />
        </div>
        <div class="mex-tran-history-page">
          <mex-tran-history-list />
        </div>
      </div>
    </div>
    <div class="mex-table-order-page">
      <mex-table-order></mex-table-order>
    </div>
    <div class="mex-table-history-page">
      <mex-table-history></mex-table-history>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Observer } from 'mobx-vue';
import MexCurrentcyList from './MexCurrentcyList.vue';
import { Market } from '@/define';
import dataStore from '@/stores/data';
import MexHeadInfo from './MexHeadInfo.vue';
import MexKLineChart from './tradingView/index.vue';
import MexPlaceOrder from './MexPlaceOrder.vue';
import MexTableHistory from './MexTableHistory.vue';
import MexTableOrder from './MexTableOrder.vue';
import MexTranHistoryList from './MexTranHistoryList/MexTranHistoryList.vue';
import MexMarketList from './MexMarketList/MexMarketList.vue';

const marketModule = namespace('market');

@Observer
@Component({
  components: {
    MexCurrentcyList,
    MexHeadInfo,
    MexKLineChart,
    MexPlaceOrder,
    MexTableHistory,
    MexTableOrder,
    MexTranHistoryList,
    MexMarketList,
  },
})
export default class Mex extends Vue {
  @marketModule.Getter('markets')
  markets!: Market[];

  @marketModule.Getter('currentMarket')
  currentMarket?: Market;

  @marketModule.Action('fetchMarkets')
  fetchMarkets!: Function;

  @marketModule.Mutation('setCurrentMarketId')
  setCurrentMarketId!: Function;

  created() {
    this.fetchMarkets().then(() => {
      if (this.markets.length === 0) return;
      this.setCurrentMarketId(this.markets[0].marketId);
    });
  }

  handleMarketChange(market: Market) {
    this.setCurrentMarketId(market.marketId);
  }
}
</script>

<style lang="scss">
#mex {
  padding-top: 10px;
  padding-bottom: 10px;
  .mex-head-Info {
    width: 100%;
    min-height: 70px;
    margin-bottom: 10px;
    background: #142e4d;
    border-radius: 8px;
  }
  .mex-keynote-page {
    width: 100%;
    height: 860px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    > div > div {
      background: #142e4d;
      border-radius: 8px;
    }
  }
  .mex-keynote-first {
    width: 278px;
    height: 100%;
  }
  .mex-market-page {
    width: 278px;
    height: 100%;
  }
  .mex-keynote-second {
    width: 617px;
  }
  .mex-k-line-page {
    width: 100%;
    height: 463px;
    margin-bottom: 10px;
  }
  .mex-plact-order-page {
    width: 100%;
    height: 386px;
  }
  .mex-keynote-third {
    width: 285px;
  }
  .mex-currentcy-page {
    width: 100%;
    height: 463px;
    margin-bottom: 10px;
  }
  .mex-tran-history-page {
    width: 100%;
    height: 386px;
  }
  .mex-table-order-page {
    margin-bottom: 10px;
  }
  .mex-table-order-page,
  .mex-table-history-page {
    width: 100%;
    min-height: 100px;
    background: #142e4d;
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
