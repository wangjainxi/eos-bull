<template>
  <div id="web-market-page">
    <div class="inner-box">
      <el-tabs v-model="activeName" @tab-click="onTabSwitch">
        <el-tab-pane :label="tabName('home.Favorites')" name="first" class="tab-first">
          <TableItem :thisTdata="favoriteMarkets"/>
        </el-tab-pane>
        <el-tab-pane :label="tabName('home.EOS')" name="second" class="tab_second">
          <TableItem :thisTdata="markets"/>
        </el-tab-pane>
      </el-tabs>
      <div class="search-th-right">
        <el-input :placeholder="tabName('myWallet.Search')" v-model="inputVal" clearable>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import TableItem from './tableItem.vue';
import { Market } from '@/define';
import language from '@/stores/language';
import { Observer } from 'mobx-vue';

const marketModule = namespace('market');

@Observer
@Component({
  components: { TableItem },
})
export default class extends Vue {
  @marketModule.State('markets')
  markets!: Market[];
  inputVal = '';

  @marketModule.Getter('favoriteMarkets')
  favoriteMarkets!: Market[];

  // data
  activeName: string = 'second';
  tableData: Array<any> = [
    {
      pairs: 'ZKS',
      collectionState: 1,
      last_price: 0.00008,
      change: 1,
      high: 0.888,
      low: 0.111,
      volume: 9999.2222,
      status: 1,
      id: 1,
    },
    {
      pairs: 'ZKS',
      collectionState: 0,
      last_price: 0.00008,
      change: 10,
      high: 0.888,
      low: 0.111,
      volume: 99.22,
      status: 0,
      id: 2,
    },
    {
      pairs: 'ZKS',
      collectionState: 0,
      last_price: 0.00008,
      change: 10,
      high: 0.888,
      low: 0.111,
      volume: 9999.22,
      status: 0,
      id: 3,
    },
  ];
  onTabSwitch() {
    //
  }
  tabName(obj: string) {
    return language.getIntlText(obj);
  }
}
</script>
<style lang="scss">
#web-market-page {
  padding-bottom: 12px;
  border-radius: 8px;
  padding-top: 40px;
  .inner-box {
    border-radius: 8px;
    background: #142e4d;
    overflow: hidden;
    position: relative;
  }
  .search-th-right{
    position: absolute;
    width: 210px;
    display: inline-block;
    top: 9px;
    right: 10px;

  }
  .el-tabs__header {
    margin: 0;
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__nav-scroll {
    padding-left: 20px;
    .el-tabs__item.is-active {
      color: #2d7be5;
    }
    .el-tabs__item {
      color: #92a7c5;
      height: 60px;
      line-height: 60px;
      font-size: 14px;
    }
  }
  .el-tabs__nav {
    div:nth-child(2) {
      background-image: url('../../../images/web/ic_fav_normal.svg');
      background-repeat: no-repeat;
      background-size: 16px 16px;
      background-position: 0px 20px;
      padding-left: 20px;
    }
    div:nth-child(2).is-active {
      background-image: url('../../../images/web/ic_fav_normal1.svg');
    }
    div:nth-child(3) {
      background-image: url('../../../images/web/ic_normal_eos.svg');
      background-repeat: no-repeat;
      background-position: 20px 20px;
      padding-left: 40px;
      background-size: 16px 16px;
    }
    div:nth-child(3).is-active {
      background-image: url('../../../images/web/ic_eos.svg');
    }
  }
  .el-table th {
    padding: 10px 0;
  }
  .el-table th > .cell {
    font-size: 14px;
  }
  .el-table .cell {
    font-size: 14px;
  }
  .props-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .collection-icon {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }

  .volume-box {
    padding-right: 24px;
  }
  .change-box-rise {
    padding-right: 24px;
  }
  .change-box-fall {
    padding-right: 24px;
  }
  .pairs-icon {
    width: 25px;
    height: 25px;
    background: #dddddd;
    border-radius: 100%;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .el-table__row {
    color: #ddd;
  }
  .last-price-box-rise,
  .change-box-rise {
    color: #1cc466;
  }
  .last-price-box-fall,
  .change-box-fall {
    color: #e53757;
  }
  .action-box {
    color: #2d7be5;
  }
}
</style>
