<template>
  <div id="market-page">
    <div class="home-tab-title-box">
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item id="1" v-on:click.native="modifyGrowList('1')">
          <img
            v-if="selected === '1'"
            src="../../../images/mobile/ic_collection_current_s.svg"
            alt
            class="table-icon"
          >
          <img v-else src="../../../images/mobile/ic_collection_s.svg" alt class="table-icon">
          自选
        </mt-tab-item>
        <mt-tab-item id="2" v-on:click.native="modifyGrowList('2')">
          <img
            v-if="selected === '2'"
            src="../../../images/mobile/ic_current_eos.svg"
            alt
            class="table-icon"
          >
          <img v-else src="../../../images/mobile/ic_normal_eos.svg" alt class="table-icon">
          EOS
        </mt-tab-item>
      </mt-navbar>
      <img src="../../../images/mobile/ic_find.svg" alt class="search-icon">
    </div>
    <div class="home-list-package-box">
      <mt-tab-container v-model="selected">
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
          <ListChild v-for="(item, index) in dealList" :item="item" :key="index"></ListChild>
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
          <ListChild v-for="(item, index) in growList" :item="item" :key="index"></ListChild>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
const dealList = [
  {
    currency: "EOS",
    dealSize: 3333,
    price: 0.0023,
    statu: 1,
    Percentage: 10,
    id: 1
  },
  {
    currency: "EOS",
    dealSize: 3333,
    price: 0.0023,
    statu: 0,
    Percentage: 10,
    id: 2
  },
  {
    currency: "EOS",
    dealSize: 3333,
    price: 0.0023,
    statu: 2,
    Percentage: 10,
    id: 3
  }
];
const growList = [
  {
    currency: "EOS",
    dealSize: 3333,
    price: 0.0023,
    statu: 1,
    Percentage: 10,
    id: 1
  },
  {
    currency: "EOS",
    dealSize: 3333,
    price: 0.0023,
    statu: 0,
    Percentage: 10,
    id: 2
  }
];
import ListChild from "../HomePage/components/ListChild";
export default {
  data: function() {
    return {
      selected: "1",
      dealList: [],
      growList: [],
      typeTableState: "1",
      upOrDown: "0"
    };
  },
  components: {
    ListChild
  },
  methods: {
    setDealList: function(list) {
      this.dealList = list;
    },
    setGrowList: function(list) {
      this.growList = list;
    },
    modifyGrowList: function(value) {
      this.selected = value;
    },
    onTypeTable: function(id) {
      this.typeTableState = id;
      if (this.upOrDown === "0" || this.upOrDown === "2") {
        this.upOrDown = "1";
      } else if (this.upOrDown === "1") {
        this.upOrDown = "2";
      }
      //获取数据时 根据this.selected结合this.typeTableState来判断应该调取的借口
    }
  },
  created() {
    this.setDealList(dealList);
    this.setGrowList(growList);
  }
};
</script>
<style lang="scss">
#market-page {
  width: 100%;
  min-height: 100%;
  background: #000;
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
      content: "";
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
  }
  .home-list-package-box {
    padding: 0 0.2rem;
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
    > div {
      font-size: 0.13rem;
      color: #8d8d8d;
    }
    .special {
      color: #007aff;
    }
  }
}
</style>

