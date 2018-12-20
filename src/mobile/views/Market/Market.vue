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
          自选
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
          <div :class="typeTableState === '1'? 'special':''" @click="onTypeTable('1')">
            交易对
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
            24H成交量
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
            最新价
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
            24H涨跌幅
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
        <div v-if="dealList.length>0" class="market-list-package-box">
          <ListChild v-for="(item, index) in dealList" :item="item" :key="index"></ListChild>
        </div>
        <div class="list-no-box" v-else>
          <img src="../../../images/mobile/ic_collection_normal.svg" alt>
          <p>快去添加你感兴趣的交易对吧</p>
          <router-link to="market-search">
            <mt-button type="primary">添加</mt-button>
          </router-link>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="type-table">
          <div :class="typeTableState === '1'? 'special':''" @click="onTypeTable('1')">
            交易对
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
            24H成交量
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
            最新价
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
            24H涨跌幅
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
          <ListChild v-for="(item, index) in growList" :item="item" :key="index"></ListChild>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import userStore from '@/stores/user';
import ListChild from '../HomePage/components/ListChild.vue';

const dealList = [
  {
    currency: 'EOS',
    dealSize: 3333,
    price: 0.0023,
    statu: 1,
    Percentage: 10,
    id: 1,
  },
  {
    currency: 'EOS',
    dealSize: 3333,
    price: 0.0023,
    statu: 0,
    Percentage: 10,
    id: 2,
  },
  {
    currency: 'EOS',
    dealSize: 3333,
    price: 0.0023,
    statu: 2,
    Percentage: 10,
    id: 3,
  },
];

const growList = [
  {
    currency: 'EOS',
    dealSize: 3333,
    price: 0.0023,
    statu: 1,
    Percentage: 10,
    id: 1,
  },
  {
    currency: 'EOS',
    dealSize: 3333,
    price: 0.0023,
    statu: 0,
    Percentage: 10,
    id: 2,
  },
];

@Component({
  components: {
    ListChild,
  },
})
export default class extends Vue {
  isOptional = '2';
  dealList = [];
  growList = [];
  typeTableState = '1';
  upOrDown = '0';

  created() {
    this.setDealList(dealList);
    this.setGrowList(growList);
    userStore.setCurrency('2');
  }

  setDealList(list: any) {
    this.dealList = list;
  }

  setGrowList(list: any) {
    this.growList = list;
  }

  modifyGrowList(value: any) {
    this.isOptional = value;
  }

  onTypeTable(id: any) {
    this.typeTableState = id;
    if (this.upOrDown === '0' || this.upOrDown === '2') {
      this.upOrDown = '1';
    } else if (this.upOrDown === '1') {
      this.upOrDown = '2';
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

