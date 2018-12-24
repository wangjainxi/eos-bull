<template>
  <div id="market-search-page">
    <div class="market-search-input-box">
      <img src="../../../images/mobile/ic_find.svg" alt>
      <input type="text" placeholder="搜索">
      <router-link to="market">
        <img src="../../../images/mobile/ic_find.svg" alt>
      </router-link>
    </div>
    <div v-if="growList.length>0">
      <div class="search-result-box">搜索结果</div>
      <div v-for="item in growList" :key="item.id" class="search-list-child-box">
        <h4 class="list-title">{{item.currency}}/EOS</h4>
        <p class="list-price">{{item.price}}</p>
        <p class="list-precentage-rise" v-if="item.statu === 1">+{{item.percentage}}%</p>
        <p class="list-precentage-fall" v-else-if="item.statu === 0">-{{item.percentage}}%</p>
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
const growList = [
  {
    currency: 'EOS',
    dealSize: 3333,
    price: 0.0023,
    statu: 1,
    percentage: 10,
    collectionState: 1,
    id: 1,
  },
  {
    currency: 'EOS',
    dealSize: 3333,
    price: 0.0023,
    statu: 0,
    percentage: 10,
    collectionState: 0,
    id: 2,
  },
  {
    currency: 'EOS',
    dealSize: 3333,
    price: 0.0023,
    statu: 2,
    percentage: 10,
    collectionState: 0,
    id: 3,
  },
];
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class extends Vue {
  growList = [];
  setGrowList(list: any) {
    this.growList = list;
  }
  created() {
    this.setGrowList(growList);
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
