<template>
  <div id="market-page">
    <div class="home-tab-title-box">
      <mt-navbar class="page-part" v-model="selectTab">
        <mt-tab-item v-for="item of tabs" :id="item.id" :key="item.id">
          <img class="table-icon" :src="selectTab === item.id ? item.selectIcon : item.icon">
          <Language :resource="item.key"/>
        </mt-tab-item>
      </mt-navbar>
      <router-link to="market-search">
        <img src="../../../images/mobile/ic_find.svg" alt class="search-icon">
      </router-link>
      <router-link to="market-optional" v-if="tabs[0].id === selectTab">
        <img src="../../../images/mobile/ic_edit.svg" alt class="edit-icon">
      </router-link>
    </div>
    <mt-tab-container v-model="selectTab">
      <mt-tab-container-item :id="tabs[0].id">
        <div class="type-table">
          <div
            v-for="item of filters"
            :key="item.type"
            :class="{ special: dataStore.freeMarketParams.sortby === item.type}"
            @click="dataStore.updateFreeMarketListSort(item.type)"
          >
            <Language :resource="item.key"/>
            <img
              v-if="item.type !== dataStore.freeMarketParams.sortby"
              src="../../../images/ic_sort_normal.png"
            >
            <template v-else>
              <img
                v-if="dataStore.freeMarketParams.order === 'asc'"
                src="../../../images/ic_sort_down.png"
              >
              <img v-else src="../../../images/ic_sort_up.png">
            </template>
          </div>
        </div>
        <div v-if="dataStore.freeMarketList.length > 0" class="market-list-package-box">
          <ListChild v-for="(item, index) in dataStore.freeMarketList" :item="item" :key="index"></ListChild>
        </div>
        <div class="list-no-box" v-else>
          <img src="../../../images/mobile/ic_nodata.png" alt>
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
      <mt-tab-container-item :id="tabs[1].id">
        <div class="type-table">
          <div
            v-for="item of filters"
            :key="item.type"
            :class="{ special: dataStore.marketParams.sortby === item.type}"
            @click="dataStore.updateMarketListSort(item.type)"
          >
            <Language :resource="item.key"/>
            <img
              v-if="item.type !== dataStore.marketParams.sortby"
              src="../../../images/ic_sort_normal.png"
            >
            <template v-else>
              <img
                v-if="dataStore.marketParams.order === 'asc'"
                src="../../../images/ic_sort_down.png"
              >
              <img v-else src="../../../images/ic_sort_up.png">
            </template>
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
import dataStore from '@/stores/data';
import { Observer } from 'mobx-vue';
import ListChild from '../HomePage/components/ListChild.vue';
import { computed } from 'mobx';

@Observer
@Component({
  components: {
    ListChild,
  },
})
export default class MarketList extends Vue {
  dataStore = dataStore;
  selectTab = 'eos';
  tabs = [
    {
      key: 'asset.Favorites',
      id: 'free',
      icon: require('../../../images/mobile/ic_collection_s.svg'),
      selectIcon: require('../../../images/mobile/ic_collection_current_s.svg'),
    },
    {
      key: 'asset.EOS',
      id: 'eos',
      icon: require('../../../images/mobile/ic_normal_eos.svg'),
      selectIcon: require('../../../images/mobile/ic_current_eos.svg'),
    },
  ];
  selectFreeFilter = 'pair';
  selectAllFilter = 'pair';
  filters = [
    {
      type: 'pair',
      key: 'asset.Pairs',
    },
    {
      type: 'volume',
      key: 'asset.VOL24H',
    },
    {
      type: 'price',
      key: 'asset.Last_Price',
    },
    {
      type: 'change',
      key: 'asset.Change24H',
    },
  ];
}
</script>

<style lang="scss" scoped>
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
      span {
        font-size: 0.16rem !important;
      }
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

