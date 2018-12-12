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
        <input type="search" class="search" placeholder="Search" v-model="inputValue">
        <!-- <i v-if="inputValue" class="search-close"></i> -->
      </div>
    </div>
    <div class="currentcy-data-list">
      <div class="data-list-title">
        <div class="data-name">Market</div>
        <div class="data-price">Last price</div>
        <div class="data-change">
          <span>Change</span>
          <span :class="['data-change-icon',sort]" @click="sortDataList"></span>
        </div>
      </div>
      <div class="data-list-body">
        <mex-currentcy-list-data-item v-for="(item, index) in items" :item="item" :key="index"></mex-currentcy-list-data-item>
      </div>
    </div>
  </div>
</template>
<script>
import MexCurrentcyListDataItem from "./MexCurrentcyListDataItem.vue";
let tabs = [
  {
    id: 1,
    name: "Favorite"
  },
  {
    id: 2,
    name: "EOS"
  }
];
let dataList = [
  {
    name: "DICE / EOS",
    dec: "betdicetoken",
    price: 0.002541,
    change: "5.44%",
    goTotop: true
  },
  {
    name: "MAX / EOS",
    dec: "eosmax1token",
    price: 0.002141,
    change: "2.44%",
    goTotop: false
  }
];
let dataList1 = [
  {
    name: "MAX / EOS",
    dec: "eosmax1token",
    price: 0.002141,
    change: "2.44%",
    goTotop: false
  },
  {
    name: "DICE / EOS",
    dec: "betdicetoken",
    price: 0.002541,
    change: "5.44%",
    goTotop: true
  },
  {
    name: "MAX / EOS",
    dec: "eosmax1token",
    price: 0.002141,
    change: "2.44%",
    goTotop: false
  },{
    name: "MAX / EOS",
    dec: "eosmax1token",
    price: 0.002141,
    change: "2.44%",
    goTotop: false
  },
  {
    name: "DICE / EOS",
    dec: "betdicetoken",
    price: 0.002541,
    change: "5.44%",
    goTotop: true
  },
  {
    name: "MAX / EOS",
    dec: "eosmax1token",
    price: 0.002141,
    change: "2.44%",
    goTotop: false
  },{
    name: "MAX / EOS",
    dec: "eosmax1token",
    price: 0.002141,
    change: "2.44%",
    goTotop: false
  },
  {
    name: "DICE / EOS",
    dec: "betdicetoken",
    price: 0.002541,
    change: "5.44%",
    goTotop: true
  },
  {
    name: "MAX / EOS",
    dec: "eosmax1token",
    price: 0.002141,
    change: "2.44%",
    goTotop: false
  },{
    name: "MAX / EOS",
    dec: "eosmax1token",
    price: 0.002141,
    change: "2.44%",
    goTotop: false
  },
  {
    name: "DICE / EOS",
    dec: "betdicetoken",
    price: 0.002541,
    change: "5.44%",
    goTotop: true
  },
  {
    name: "MAX / EOS",
    dec: "eosmax1token",
    price: 0.002141,
    change: "2.44%",
    goTotop: false
  },{
    name: "MAX / EOS",
    dec: "eosmax1token",
    price: 0.002141,
    change: "2.44%",
    goTotop: false
  },
  {
    name: "DICE / EOS",
    dec: "betdicetoken",
    price: 0.002541,
    change: "5.44%",
    goTotop: true
  },
  {
    name: "MAX / EOS",
    dec: "eosmax1token",
    price: 0.002141,
    change: "2.44%",
    goTotop: false
  }
];
export default {
  name: "mex-currentcy-list",
  components: {
    MexCurrentcyListDataItem
  },
  data() {
    return {
      items: [],
      sort: "",
      inputValue: "",
      currentTab: tabs[1],
      tabs: tabs
    };
  },
  created() {
    this.updateDataList(this.currentTab.id);
  },
  methods: {
    updateTab(obj) {
      this.currentTab = obj;
      this.sort = "";
      this.updateDataList(obj.id);
    },
    updateDataList(num) {
      num === 1 ? (this.items = dataList) : (this.items = dataList1);
    },
    sortDataList() {
      if (this.sort === "" || this.sort === "sort-down") {
        this.sort = "sort-up";
        this.updateDataList(1);
      } else {
        this.sort = "sort-down";
        this.updateDataList(0);
      }
    }
  }
};
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
      color:rgba(45,123,229,1);
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
