<template>
  <div id="market-search-page">
    <div class="market-search-input-box">
      <img src="../../../images/mobile/ic_find.svg" v-on:click="onSearch" alt>
      <input v-model="searchInput" type="text" @keyup.13="onSearch">
      <router-link to="market">
        <img src="../../../images/mobile/closeBtn.svg" alt>
      </router-link>
    </div>
    <div v-if="dataStore.searchmarketList.length>0">
      <div class="search-result-box">搜索结果</div>
      <div
        v-for="(item,key,index) in dataStore.searchmarketList"
        :key="index"
        class="search-list-child-box"
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
        <img v-if="item.collectionState === 1" src="../../../images/mobile/ic_collection_s.svg" alt>
        <img v-else src="../../../images/mobile/ic_collection_current_s.svg" alt>
      </div>
    </div>
    <div v-else class="list-no-box">
      <img src="../../../images/mobile/ic_collection_s.svg" alt>
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import dataStore from '@/stores/data';
import { Observer } from 'mobx-vue';
@Observer
@Component
export default class extends Vue {
  dataStore = dataStore;
  searchInput = '';
  onSearch() {
    dataStore.getMarketSearchList(this.searchInput);
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
