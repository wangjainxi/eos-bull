<template>
  <div class="currentcy-data">
    <div class="change-tab-box">
      <div
        :class="['currentcy-tab',{active: currentTab.name === tab.name}]"
        v-for="tab in tabs"
        :key="tab.id"
        @click="updateTab(tab)"
      >
        <i class="tab-icon"></i>
        {{tab.name}}
      </div>
      <div class="search-input">
        <i class="search-icon"></i>
        <input
          type="search"
          class="search"
          placeholder="Search"
          v-model="inputValue"
          :inputSearch="inputSearch"
        >
        <!-- <i v-if="inputValue" class="search-close"></i> -->
      </div>
    </div>
    <div class="currentcy-data-list">
      <div class="data-list-title">
        <div class="data-name">
          <Language resource="home.Market"/>
        </div>
        <div class="data-price">
          <Language resource="home.Last_price"/>
        </div>
        <div class="data-change">
          <Language resource="home.Change"/>
          <span :class="['data-change-icon',sort]" @click="sortDataList"></span>
        </div>
      </div>
      <div class="data-list-body">
        <MexCurrentcyListDataItem v-for="(item, index) in items.riseRank" :item="item" :key="index"></MexCurrentcyListDataItem>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import { getMrkets, getAccountInfo } from '@/utils/apis';
import languageStore from '@/stores/language';
import MexCurrentcyListDataItem from './MexCurrentcyListDataItem.vue';
// import socket from '@/utils/socket';
import dataStore from '@/stores/data';

interface ObjectData {
  id: number;
  name: string;
}
const tabs = [
  {
    id: 1,
    name: languageStore.getIntlText('home.Favorites'),
  },
  {
    id: 2,
    name: 'EOS',
  },
];
const dataList = [
  {
    name: 'DICE / EOS',
    dec: 'betdicetoken',
    price: 0.002541,
    change: '5.44%',
    goTotop: true,
  },
  {
    name: 'MAX / EOS',
    dec: 'eosmax1token',
    price: 0.002141,
    change: '2.44%',
    goTotop: false,
  },
];
@Observer
@Component({
  components: {
    MexCurrentcyListDataItem,
  },
})
export default class MexCurrentcyList extends Vue {
  // data
  items: any = dataStore;
  sort: string = '';
  inputValue: string = '';
  currentTab: ObjectData = tabs[1];
  tabs: Array<any> = tabs;

  created() {
    dataStore.setMarketParams('change', '', '');
    this.updateDataList(this.currentTab.id);
  }
  get inputSearch() {
    if (!this.inputValue) {
      dataStore.updateMarkets();
      this.items = dataStore;
    } else {
      dataStore.getMarketSearchList(this.inputValue);
      return (this.items.markets = dataStore.searchmarketList);
    }
  }
  // methods
  updateTab(obj: ObjectData) {
    this.currentTab = obj;
    this.sort = '';
    this.updateDataList(obj.id);
  }
  updateDataList(num: number) {
    //获取列表
    const res = dataStore;
    this.sort = '';
    dataStore.setMarketParams('', '', '');
    if (num === 1) {
      // const loData = localStorage.getItem('localFavourite');
      // if (!loData) return;
      // const localFavourite = JSON.parse(loData);
      // this.items.markets = this.items.markets.filter(
      //   (e: any) => e.favourited === true || localFavourite.indexOf(e.marketId) >= 0
      // );
      dataStore.getFavouriteList();
      this.items.markets = dataStore.favouriteList;
      console.log(this.items.markets);
    } else {
      dataStore.updateMarkets();
      this.items = dataStore;
    }
  }
  sortDataList() {
    //列表排序
    if (this.sort === '' || this.sort === 'sort-down') {
      dataStore.setMarketParams('change', 'asc', '');
      if (this.currentTab.id === 1) {
        this.items.markets = this.items.markets.filter((e: any) => e.favourited === true);
      }
      this.sort = 'sort-up';
    } else {
      dataStore.setMarketParams('change', 'desc', '');
      console.log(this.items);
      if (this.currentTab.id === 1) {
        this.items.markets = this.items.markets.filter((e: any) => e.favourited === true);
      }
      this.sort = 'sort-down';
    }
  }
}
</script>
<style lang="scss" scoped>
$marginLeft-width: 24px;
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 6px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
} /* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: rgba(8, 21, 37, 1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(8, 21, 37, 1);
}
.currentcy-data {
  height: 455px;
  margin-bottom: 8px;
  overflow: hidden;
  .change-tab-box {
    padding: 0 7px;
    height: 42px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .currentcy-tab {
      height: 40px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(146, 167, 197, 1);
      cursor: pointer;
      display: flex;
      align-items: center;
      .tab-icon {
        width: 12px;
        height: 12px;
        margin-right: 6px;
        background-repeat: no-repeat;
        background-image: url(../../../images/ic_fav_normal.png);
      }
    }
    .currentcy-tab:nth-child(2) {
      margin-right: 20px;
      .tab-icon {
        width: 9px;
        background-image: url(../../../images/ic_eos.png);
      }
    }
    .active {
      border-bottom: 2px solid rgba(45, 123, 229, 1);
      color: rgba(45, 123, 229, 1);
    }
    .search-input {
      display: flex;
      align-items: center;
      width: 120px;
      height: 25px;
      border-radius: 13px;
      border: 1px solid rgba(36, 65, 102, 1);
      .search-icon {
        width: 12px;
        height: 12px;
        margin: 0 6px 0 11px;
        background-image: url(../../../images/ic_search.png);
        background-repeat: no-repeat;
      }
      .search {
        width: 65%;
        height: 17px;
        background-color: transparent;
        border: none;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(110, 132, 163, 1);
      }
    }
  }
  .currentcy-data-list {
    height: 100%;
    .data-list-title {
      height: 35px;
      background: rgba(18, 38, 63, 1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > div {
        text-align: left;
        font-size: 11px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(110, 132, 163, 1);
      }
      .data-name {
        width: calc(40% - #{$marginLeft-width});
        margin-left: 24px;
      }
      .data-price,
      .data-change {
        width: 30%;
        text-align: right;
      }
      .data-change {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .data-change-icon {
          margin: 0 6px;
          width: 10px;
          height: 12px;
          background-image: url(../../../images/ic_sort_normal.png);
        }
        .sort-down {
          background-image: url(../../../images/ic_sort_down.png);
        }
        .sort-up {
          background-image: url(../../../images/ic_sort_up.png);
        }
      }
    }
    .data-list-body {
      overflow: auto;
      height: calc(100% - #{$marginLeft-width + 53});
    }
  }
}
</style>
