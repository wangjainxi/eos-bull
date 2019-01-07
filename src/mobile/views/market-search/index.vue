<template>
  <div id="market-search-page">
    <div class="market-search-input-box">
      <img src="../../../images/mobile/ic_find.svg">
      <input v-model="searchInput" type="text">
      <router-link to="/markets">
        <img src="../../../images/mobile/closeBtn.svg" alt>
      </router-link>
    </div>
    <div v-if="markets.length > 0">
      <div class="search-result-box">
        <Language resource="business.sR"/>
      </div>
      <router-link
        class="search-list-child-box"
        v-for="item of searchResult"
        :key="item.marketId"
        :to="{ name: 'market', params: { id: item.marketId,item:item } }"
      >
        <h4
          class="list-title"
        >{{item.pair.baseCurrency.symbol.name}}/{{item.pair.quoteCurrency.symbol.name}}</h4>
        <p
          class="list-price"
        >{{Number(item.lastPrice).toFixed(item.pair.quoteCurrency.symbol.precision)}}</p>
        <p class="list-precentage-rise" v-if="item.change.indexOf('+') !== -1">{{item.change}}%</p>
        <p
          class="list-precentage-fall"
          v-else-if="item.change.indexOf('-') !== -1"
        >-{{item.percentage}}%</p>
        <p class="list-precentage-middle" v-else>0.00%</p>
        <img
          v-if="checkFavourite(item.marketId)"
          @click.capture="handleFavouriteBtnClick(tem.marketId, false)"
          src="../../../images/mobile/ic_collection_current_s.svg"
        >
        <img
          v-else
          @click.stop="handleFavouriteBtnClick(tem.marketId, true)"
          src="../../../images/mobile/ic_collection_s.svg"
        >
      </router-link>
    </div>
    <div v-else class="list-no-box">
      <img src="../../../images/mobile/ic_nodata.png" alt>
      <p>
        <Language resource="business.nodata"/>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Market } from '@/define';

const marketModule = namespace('market');

@Component
export default class MarketSearch extends Vue {
  searchInput = '';

  @marketModule.Getter('markets')
  markets!: Market[];

  @marketModule.Getter('favoriteMarkets')
  favoriteMarkets!: Market[];

  @marketModule.Action('addFavoriteMarkets')
  addFavoriteMarkets!: Function;

  get searchResult() {
    return this.markets.filter(e => {
      const symbolName = e.pair.baseCurrency.symbol.name.toLowerCase();
      return symbolName.includes(this.searchInput.toLocaleLowerCase());
    });
  }

  handleFavouriteBtnClick(id: number, favourited: boolean) {
    this.addFavoriteMarkets([id], favourited);
  }

  checkFavourite(id: number) {
    return !!this.favoriteMarkets.find(e => e.marketId === id);
  }
}
</script>
<style lang="scss">
#market-search-page {
  width: 100%;
  min-height: 100%;
  background: #f7f7f7;
  .market-search-input-box {
    height: 0.54rem;
    padding: 0.13rem 0.2rem;
    display: flex;
    justify-content: space-between;
    background: #fff;
    input {
      width: 100%;
      margin: 0 0.17rem;
      background: #f2f5fb;
      border-radius: 0.14rem;
      padding-left: 0.17rem;
      color: #8d8d8d;
    }
    a {
      display: flex;
      align-items: center;
    }
  }
  .search-result-box {
    font-size: 0.16rem;
    color: #8d8d8d;
    padding: 0.14rem 0.2rem;
    text-align: left;
    background: #fff;
  }
  .list-no-box {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 0.78rem;
      height: 0.78rem;
    }
    p {
      color: #8d8d8d;
      font-size: 0.13rem;
      margin-top: 0.15rem;
    }
  }
  .search-list-child-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    padding-bottom: 0.14rem;
    height: 0.36rem;
    background: #fff;
    .list-title {
      color: #000000;
      font-size: 0.16rem;
      width: 30%;
      text-align: left;
    }
    .list-price {
      font-size: 0.14rem;
      color: #000000;
      font-weight: bold;
      text-align: right;
      width: 30%;
    }
    .list-precentage-rise {
      color: #07c74e;
      font-size: 0.14rem;
      text-align: right;
      width: 30%;
    }
    .list-precentage-fall {
      color: #ff0000;
      font-size: 0.14rem;
      text-align: right;
      width: 30%;
    }
    .list-precentage-middle {
      color: #8d8d8d;
      font-size: 0.14rem;
      text-align: right;
      width: 30%;
    }
  }
}
</style>
