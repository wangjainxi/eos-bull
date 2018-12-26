<template>
  <div id="market-page">
    <div class="home-tab-title-box">
      <mt-navbar class="page-part" v-model="isOptional">
        <mt-tab-item id="1" v-on:click.native="modifyGrowList('1')">
          <img
            v-if="isOptional === '1'"
            src="../../../images/mobile/ic_collection_current_s.svg"
            alt
            class="table-icon"
          >
          <img v-else src="../../../images/mobile/ic_collection_s.svg" alt class="table-icon">
          <Language resource="asset.Favorites"/>
        </mt-tab-item>
        <mt-tab-item id="2" v-on:click.native="modifyGrowList('2')">
          <img
            v-if="isOptional === '2'"
            src="../../../images/mobile/ic_current_eos.svg"
            alt
            class="table-icon"
          >
          <img v-else src="../../../images/mobile/ic_normal_eos.svg" alt class="table-icon">
          EOS
        </mt-tab-item>
      </mt-navbar>
      <router-link to="market-search">
        <img src="../../../images/mobile/ic_find.svg" alt class="search-icon">
      </router-link>
      <router-link to="market-optional" v-if="isOptional === '1'">
        <img src="../../../images/mobile/ic_edit.svg" alt class="edit-icon">
      </router-link>
    </div>
    <mt-tab-container v-model="isOptional">
      <mt-tab-container-item id="1">
        <div class="type-table">
          <div :class="typeTableState === '5'? 'special':''" @click="onTypeTable('5')">
            <Language resource="asset.Pairs"/>

            <img
              v-if="upOrDown === '1' && typeTableState ==='5'"
              src="../../../images/ic_sort_up.png"
              alt
            >
            <img
              v-else-if="upOrDown === '2' && typeTableState ==='5'"
              src="../../../images/ic_sort_down.png"
              alt
            >
            <img v-else src="../../../images/ic_sort_normal.png" alt>
          </div>
          <div :class="typeTableState === '6'? 'special':''" @click="onTypeTable('6')">
            <Language resource="asset.VOL24H"/>

            <img
              v-if="upOrDown === '1' && typeTableState ==='6'"
              src="../../../images/ic_sort_up.png"
              alt
            >
            <img
              v-else-if="upOrDown === '2' && typeTableState ==='6'"
              src="../../../images/ic_sort_down.png"
              alt
            >
            <img v-else src="../../../images/ic_sort_normal.png" alt>
          </div>
          <div :class="typeTableState === '7'? 'special':''" @click="onTypeTable('7')">
            <Language resource="asset.Last_Price"/>

            <img
              v-if="upOrDown === '1' && typeTableState ==='7'"
              src="../../../images/ic_sort_up.png"
              alt
            >
            <img
              v-else-if="upOrDown === '2' && typeTableState ==='7'"
              src="../../../images/ic_sort_down.png"
              alt
            >
            <img v-else src="../../../images/ic_sort_normal.png" alt>
          </div>
          <div :class="typeTableState === '8'? 'special':''" @click="onTypeTable('8')">
            <Language resource="asset.Change24H"/>

            <img
              v-if="upOrDown === '1' && typeTableState ==='8'"
              src="../../../images/ic_sort_up.png"
              alt
            >
            <img
              v-else-if="upOrDown === '2' && typeTableState ==='8'"
              src="../../../images/ic_sort_down.png"
              alt
            >
            <img v-else src="../../../images/ic_sort_normal.png" alt>
          </div>
        </div>
        <div v-if="dataStore.marketList.length>0" class="market-list-package-box">
          <ListChild v-for="(item, index) in dataStore.marketList" :item="item" :key="index"></ListChild>
        </div>
        <div class="list-no-box" v-else>
          <img src="../../../images/mobile/ic_collection_normal.svg" alt>
          <p>
            <Language resource="asset.Get_started_on_adding_your_favorite_exchange_pair"/>
          </p>
          <router-link to="market-search">
            <mt-button type="primary">
              <Language resource="asset.Add"/>
            </mt-button>
          </router-link>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="type-table">
          <div :class="typeTableState === '1'? 'special':''" @click="onTypeTable('1')">
            <Language resource="asset.Pairs"/>

            <img
              v-if="upOrDown === '1' && typeTableState ==='1'"
              src="../../../images/ic_sort_up.png"
              alt
            >
            <img
              v-else-if="upOrDown === '2' && typeTableState ==='1'"
              src="../../../images/ic_sort_down.png"
              alt
            >
            <img v-else src="../../../images/ic_sort_normal.png" alt>
          </div>
          <div :class="typeTableState === '2'? 'special':''" @click="onTypeTable('2')">
            <Language resource="asset.VOL24H"/>

            <img
              v-if="upOrDown === '1' && typeTableState ==='2'"
              src="../../../images/ic_sort_up.png"
              alt
            >
            <img
              v-else-if="upOrDown === '2' && typeTableState ==='2'"
              src="../../../images/ic_sort_down.png"
              alt
            >
            <img v-else src="../../../images/ic_sort_normal.png" alt>
          </div>
          <div :class="typeTableState === '3'? 'special':''" @click="onTypeTable('3')">
            <Language resource="asset.Last_Price"/>

            <img
              v-if="upOrDown === '1' && typeTableState ==='3'"
              src="../../../images/ic_sort_up.png"
              alt
            >
            <img
              v-else-if="upOrDown === '2' && typeTableState ==='3'"
              src="../../../images/ic_sort_down.png"
              alt
            >
            <img v-else src="../../../images/ic_sort_normal.png" alt>
          </div>
          <div :class="typeTableState === '4'? 'special':''" @click="onTypeTable('4')">
            <Language resource="asset.Change24H"/>

            <img
              v-if="upOrDown === '1' && typeTableState ==='4'"
              src="../../../images/ic_sort_up.png"
              alt
            >
            <img
              v-else-if="upOrDown === '2' && typeTableState ==='4'"
              src="../../../images/ic_sort_down.png"
              alt
            >
            <img v-else src="../../../images/ic_sort_normal.png" alt>
          </div>
        </div>
        <div class="market-list-package-box">
          <ListChild v-for="(item, index) in dataStore.marketList" :item="item" :key="index"></ListChild>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import userStore from '@/stores/user';
import dataStore from '@/stores/data';
import { Observer } from 'mobx-vue';
import ListChild from '../HomePage/components/ListChild.vue';

@Observer
@Component({
  components: {
    ListChild,
  },
})
export default class extends Vue {
  isOptional = '2';
  dataStore = dataStore;
  typeTableState = '1';
  upOrDown = '2';

  created() {
    userStore.setCurrency('2');
  }

  modifyGrowList(value: any) {
    this.isOptional = value;
  }
  // pair, volume, price, change
  onTypeTable(id: string) {
    this.typeTableState = id;
    if (this.upOrDown === '2') {
      this.upOrDown = '1';
      if (id === '1') {
        dataStore.setMarketParams('pair', 'asc');
      }
      if (id === '2') {
        dataStore.setMarketParams('volume', 'asc');
      }
      if (id === '3') {
        dataStore.setMarketParams('price', 'asc');
      }
      if (id === '4') {
        dataStore.setMarketParams('change', 'asc');
      }
    } else if (this.upOrDown === '1') {
      this.upOrDown = '2';
      if (id === '1') {
        dataStore.setMarketParams('pair', 'asc');
      }
      if (id === '2') {
        dataStore.setMarketParams('volume', 'asc');
      }
      if (id === '3') {
        dataStore.setMarketParams('price', 'asc');
      }
      if (id === '4') {
        dataStore.setMarketParams('change', 'asc');
      }
    }
    //获取数据时 根据this.isOptional结合this.typeTableState来判断应该调取的借口
  }
}
</script>

<style lang="scss">
#market-page {
  width: 100%;
  min-height: 100%;
  background: #f7f7f7;
  padding-bottom: 0.5rem;

  .home-tab-title-box {
    width: 100%;
    height: 0.54rem;
    border-bottom: 1px solid #f2f5fb;
    position: relative;
    .mint-navbar {
      height: 100%;
    }
    .mint-tab-item-label {
      font-size: 0.16rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .mint-navbar .mint-tab-item {
      color: #8d8d8d;
    }
    .mint-navbar .mint-tab-item.is-selected {
      margin-bottom: 0;
      border: none;
      color: #007aff;
      position: relative;
      .mint-tab-item-label {
        font-weight: bold;
      }
    }
    .mint-navbar .mint-tab-item.is-selected::after {
      position: absolute;
      content: '';
      height: 0.03rem;
      width: 0.24rem;
      left: 50%;
      bottom: 0;
      margin-left: -0.12rem;
      background: #007aff;
      border-radius: 0.02rem;
    }
    .search-icon {
      position: absolute;
      top: 18px;
      right: 18px;
      cursor: pointer;
    }
    .edit-icon {
      position: absolute;
      top: 18px;
      left: 18px;
      cursor: pointer;
    }
  }
  .table-icon {
    margin-right: 5px;
    width: 0.16rem;
    height: 0.16rem;
  }
  .home-link-to-market-box {
    height: 0.6rem;
    display: flex;
    justify-content: center;
    padding-top: 0.1rem;
    align-items: flex-start;
    a {
      font-size: 0.12rem;
      color: #007aff;
    }
    img {
      width: 0.12rem;
      height: 0.12rem;
      margin-top: 0.02rem;
      transform: rotate(-90deg);
      margin-left: 5px;
    }
  }
  .type-table {
    display: flex;
    justify-content: space-between;
    height: 0.5rem;
    border-bottom: 1px solid #f2f5fb;
    align-items: center;
    padding: 0 0.2rem;
    background: #fff;
    > div {
      font-size: 0.13rem;
      color: #8d8d8d;
    }
    .special {
      color: #007aff;
    }
  }
  .mint-tab-container-item > div:last-child {
    border: none;
  }
  .market-list-package-box {
    padding: 0 0.2rem;
    background: #fff;
    > div:last-child {
      border: none;
    }
  }
  .list-no-box {
    padding-top: 100px;
    img {
      width: 0.78rem;
      height: 0.78rem;
    }
    p {
      color: #8d8d8d;
      font-size: 0.13rem;
      margin: 0.1rem 0;
    }
    button {
      width: 1.85rem;
      height: 0.42rem;
      border-radius: 0.02rem;
      background: #007aff;
    }
  }
}
</style>

