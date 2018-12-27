<template>
  <div id="market-optional-page">
    <div class="market-search-input-box">
      <router-link to="market">
        <img src="../../../images/mobile/ic_arrow_right.svg" class="return-icon" alt>
      </router-link>
      <h4>
        <Language resource="asset.Edit_Favorites"/>
      </h4>
      <router-link to="market">
        <p>
          <Language resource="asset.Complete"/>
        </p>
      </router-link>
    </div>
    <div v-if="dataStores.marketsLink.length>0" class="optional-list-box">
      <div class="optional-list-title-box">
        <p>
          <Language resource="asset.Complete"/>
        </p>
        <p>
          <Language resource="asset.Top"/>
        </p>
        <p>
          <Language resource="asset.Delete"/>
        </p>
      </div>
      <div
        v-for="(item,index) in dataStores.marketsLink"
        :key="index"
        class="search-list-child-box"
      >
        <h4
          class="list-title"
        >{{item.pair.baseCurrency.symbol.name}}/{{item.pair.quoteCurrency.symbol.name}}</h4>
        <img
          v-if="index !== 0"
          src="../../../images/mobile/ic_topping.svg"
          v-on:click="setTop(index)"
          alt
        >
        <img src="../../../images/mobile/ic_delete.svg" alt>
      </div>
    </div>
    <div v-else class="list-no-box">
      <img src="../../../images/mobile/ic_nodata.png" alt>
      <p>
        <Language resource="asset.no_data"/>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import dataStores from '@/stores/data';

@Observer
@Component
export default class extends Vue {
  dataStores = dataStores;
  setTop(id: number) {
    dataStores.setTop(id);
  }
}
</script>
<style lang="scss">
#market-optional-page {
  width: 100%;
  min-height: 100%;
  background: #f7f7f7;
  .market-search-input-box {
    height: 0.42rem;
    padding: 0 0.18rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 4px solid #f2f5fb;
    background: #fff;
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
    background: #fff;
  }
  .optional-list-title-box,
  .search-list-child-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.4rem;
    border-bottom: 1px solid #f2f5fb;
    background: #fff;
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
    width: 100%;
    min-height: 100%;
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
.return-icon {
  transform: rotate(180deg);
}
</style>
