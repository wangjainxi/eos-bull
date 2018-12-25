<template>
  <div id="market-optional-page">
    <div class="market-search-input-box">
      <router-link to="market">
        <img src="../../../images/mobile/ic_find.svg" alt>
      </router-link>
      <h4>编辑自选</h4>
      <router-link to="market">
        <p>完成</p>
      </router-link>
    </div>
    <div v-if="growList.length>0" class="optional-list-box">
      <div class="optional-list-title-box">
        <p>交易对</p>
        <p>置顶</p>
        <p>删除</p>
      </div>
      <div v-for="(item,index) in growList" :key="index" class="search-list-child-box">
        <h4 class="list-title">{{item.currency}}/EOS</h4>
        <img
          v-if="index !== 0"
          src="../../../images/mobile/ic_topping.svg"
          v-on:click="setGrowList(item.id)"
          alt
        >
        <img src="../../../images/mobile/ic_delete.svg" alt>
      </div>
    </div>
    <div v-else class="list-no-box">
      <img src="../../../images/mobile/ic_collection_s.svg" alt>
      <p>暂无数据</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class extends Vue {
  growList = [
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
  setGrowList(id: string) {
    //
  }
}
</script>
<style lang="scss">
#market-optional-page {
  width: 100%;
  .market-search-input-box {
    height: 0.42rem;
    padding: 0 0.18rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 4px solid #f2f5fb;
    h4 {
      color: #191a2a;
      font-size: 0.16rem;
    }
    p {
      color: #007aff;
      font-size: 0.16rem;
    }
  }
  .optional-list-box {
    padding: 0 0.2rem;
  }
  .optional-list-title-box,
  .search-list-child-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.4rem;
    border-bottom: 1px solid #f2f5fb;
  }
  .optional-list-title-box {
    p {
      color: #8d8d8d;
      font-size: 0.13rem;
    }
    p:nth-child(1) {
      width: 70%;
      text-align: left;
    }
    p:nth-child(2) {
      width: 15%;
      text-align: center;
    }
  }
  .search-list-child-box {
    h4 {
      font-size: 0.16rem;
      color: #000;
      font-weight: bold;
      width: 70%;
      text-align: left;
    }
    img:nth-child(2) {
      margin-left: -0.1rem;
      width: 0.16rem;
      height: 0.16rem;
    }
    img:nth-child(3) {
      margin-left: -0.1rem;
      width: 0.16rem;
      height: 0.16rem;
    }
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
}
</style>
