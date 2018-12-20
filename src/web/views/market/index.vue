<template>
  <div id="web-market-page">
    <div class="inner-box">
      <el-tabs v-model="activeName" @tab-click="onTabSwitch">
        <el-tab-pane label="Favorite" name="first" class="tab-first">用户管理</el-tab-pane>
        <el-tab-pane label="EOS" name="second" class="tab_second">
          <div class="market-list-box">
            <el-table :data="tableData" style="width: 100%" empty-text="There's no data yet">
              <el-table-column prop="coin" label="Pairs" align="center" width="200">
                <template slot-scope="props">
                  <div class="props-box">
                    <img
                      v-if="props.row.collectionState === 1"
                      src="../../../images/web/ic_fav_normal.svg"
                      class="collection-icon"
                      alt
                    >
                    <img
                      v-else
                      src="../../../images/web/ic_fav_normal1.svg"
                      class="collection-icon"
                      alt
                    >
                    <div class="pairs-icon">
                      <img src="../../../images/web/ic_eos.svg" class="pairsIcon" alt>
                    </div>
                    <h4>
                      <span>{{props.row.pairs}}</span> / EOS
                    </h4>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="last_price" label="Last price" align="right">
                <template slot-scope="props">
                  <div class="last-price-box-rise" v-if="props.row.status">
                    <p>{{props.row.last_price}}</p>
                  </div>
                  <div class="last-price-box-fall" v-else>
                    <p>{{props.row.last_price}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="change" label="24H Change" sortable align="right">
                <template slot-scope="props">
                  <div class="change-box-rise" v-if="props.row.status">
                    <p>{{props.row.change}}</p>
                  </div>
                  <div class="change-box-fall" v-else>
                    <p>{{props.row.change}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="high" label="24H High" align="right">
                <template slot-scope="props">
                  <div class="hige-box">
                    <p>{{props.row.high}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="low" label="24H Low" align="right">
                <template slot-scope="props">
                  <div class="low-box">
                    <p>{{props.row.low}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="volume" label="24H Volume" sortable width="200" align="right">
                <template slot-scope="props">
                  <div class="volume-box">
                    <p>{{props.row.volume}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="Action" align="center">
                <template slot-scope="props">
                  <div class="action-box">Trade</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      activeName: 'second',
      tableData: [
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
      ],
    };
  },
  methods: {
    onTabSwitch() {
      //
    },
  },
};
</script>
<style lang="scss">
#web-market-page {
  padding-top: 40px;
  padding-bottom: 12px;
  .inner-box {
    border-radius: 8px;
    background: #142e4d;
    overflow: hidden;
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
