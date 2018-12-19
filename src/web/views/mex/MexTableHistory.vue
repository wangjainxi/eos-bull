<template>
  <div id="mex-table-history-page">
    <div class="table-roder-title">
      <h4>Order History</h4>
      <div>
        <el-checkbox v-model="OrdeChecked">Hide Revoked Orde</el-checkbox>
        <el-checkbox v-model="PairChecked">Hide Other Pair</el-checkbox>
        <img src="../../../images/web/ic_refresh.svg" alt>
      </div>
    </div>
    <div class="table-box">
      <el-table :data="tableData" style="width: 100%" empty-text="There's no data yet">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="expand-box">
              <el-table
                :data="props.row.dealData"
                style="width: 100%"
                empty-text="There's no data yet"
              >
                <el-table-column prop="dealTime" label="Deal Time" align="center"></el-table-column>
                <el-table-column prop="price" label="Price" align="right">
                  <template slot-scope="props">
                    <p class="price-box">
                      {{props.row.price}}
                      <span>EOS</span>
                    </p>
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Amount" align="right">
                  <template slot-scope="props">
                    <p class="amount-box">
                      {{props.row.amount}}
                      <span>{{props.row.coin}}</span>
                    </p>
                  </template>
                </el-table-column>
                <el-table-column prop="total" label="total" align="right">
                  <template slot-scope="props">
                    <p class="price-box">
                      {{props.row.total}}
                      <span>EOS</span>
                    </p>
                  </template>
                </el-table-column>
                <el-table-column prop="fee" label="Fee" align="right">
                  <template slot-scope="props">
                    <p class="amount-box">
                      {{props.row.amount}}
                      <span>{{props.row.coin}}</span>
                    </p>
                  </template>
                </el-table-column>
                <el-table-column label="Action" align="right">
                  <template slot-scope="props">
                    <p class="action-box" @click="showdialogVisible(props.row.id)">Details</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <span>这是一段信息{{props.row.coin}}</span>
            </el-dialog>
          </template>
        </el-table-column>
        <!-- 下拉详情 -->
        <el-table-column prop="coin" label="Coin" width="155">
          <template slot-scope="props">
            <div class="coin-box">
              <img src="../../../images/web/logo_box.svg" alt>
              <p>{{props.row.coin}} / EOS</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="Type" align="center">
          <template slot-scope="props">
            <p :class="props.row.type === 'Buy'?'buy-box':'sell-box'">{{props.row.type}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="Entrusted Time" align="center" width="200"></el-table-column>
        <el-table-column prop="price" label="Price" align="right" width="120">
          <template slot-scope="props">
            <p class="props-box">
              {{props.row.price}}
              <span>EOS</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="average" label="Average" align="right"></el-table-column>
        <el-table-column prop="amount" label="Amount" align="right">
          <template slot-scope="props">
            <p class="amount-box">
              {{props.row.amount}}
              <span>{{props.row.coin}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="dealt" label="Dealt" align="right"></el-table-column>
        <el-table-column prop="entrusted" label="Entrusted" align="right">
          <template slot-scope="props">
            <p class="entrusted-box">
              {{props.row.entrusted}}
              <span>EOS</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" align="center"></el-table-column>
        <el-table-column label="Action" align="center">
          <template slot-scope="props">
            <p class="action-box" @click="greet(props.row.id)">Details</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mex-table-history',
  data() {
    return {
      dialogVisible: false,
      OrdeChecked: false,
      PairChecked: false,
      currentPage4: 1,
      total: 200,
      tableData: [
        {
          coin: 'ZKS',
          type: 'Buy',
          time: '2018-12-07 14:15:55',
          price: 0.00008,
          average: 0,
          amount: 21,
          dealt: 0,
          entrusted: 0.003,
          status: 'Not deal',
          odd: 'eosdkeigjndlie',
          id: 1,
          dealData: [
            {
              coin: 'ZKS',
              dealTime: '2018-12-07 14:15:55',
              price: 0.00008,
              amount: 21,
              total: 3333,
              fee: 2,
              id: 101,
            },
            {
              coin: 'ZKS2',
              dealTime: '2018-12-07 14:15:55',
              price: 0.00008,
              amount: 21,
              total: 3333,
              fee: 2,
              id: 102,
            },
          ],
        },
        {
          coin: 'ZKS',
          type: 'Sell',
          time: '2018-12-07 14:15:55',
          price: 0.00008,
          average: 0,
          amount: 21,
          dealt: 0,
          entrusted: 0.003,
          status: 'Not deal',
          odd: 'eosdkeigjndlie',
          id: 2,
          dealData: [
            {
              coin: 'ZKS',
              dealTime: '2018-12-07 14:15:55',
              price: 0.00008,
              amount: 21,
              total: 3333,
              fee: 2,
              id: 201,
            },
            {
              coin: 'ZKS2',
              dealTime: '2018-12-07 14:15:55',
              price: 0.00008,
              amount: 21,
              total: 3333,
              fee: 2,
              id: 202,
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    greet(id) {
      console.log(id);
    },
    showdialogVisible(id) {
      console.log(id);
      this.dialogVisible = true;
    },
    handleClose(done) {
      done();
    },
  },
};
</script>
<style lang="scss">
#mex-table-history-page {
  .el-table__expanded-cell[class*='cell'] {
    padding: 5px 77px;
  }
  .el-table__expanded-cell {
    background: #0d1f35;
  }
  .el-table__expanded-cell:hover {
    background: #0d1f35 !important;
  }
  .expand-box {
    .el-table th,
    .el-table td {
      padding: 5px 0;
      height: 36px;
    }
    .el-table__row {
      background: #142e4d;
    }
  }
  .el-table .cell {
    padding-left: 10px;
  }
  .table-roder-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 42px;
    padding: 0 16px;
    .el-checkbox + .el-checkbox {
      margin-left: 10px;
    }
    > h4 {
      font-size: 14px;
      color: #fff;
    }
    > div {
      display: flex;
      color: #2d7be5;
      span {
        color: #ddd;
      }
      p {
        margin: 0 10px;
        font-size: 12px;
        line-height: 22px;
      }
      img {
        margin-left: 10px;
      }
      .el-checkbox__label {
        line-height: 22px;
        font-size: 12px;
      }
    }
  }
  .table-box {
    color: #ddd;
    .coin-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        margin-left: -10px;
        width: 28px;
      }
      > p {
        font-size: 14px;
        line-height: 16px;
        color: #2d7be5;
      }
    }
    .buy-box {
      color: #1cc466;
    }
    .sell-box {
      color: #e53757;
    }
    .props-box,
    .amount-box,
    .entrusted-box {
      span {
        color: #677bb7;
      }
    }
    .action-box {
      color: #2d7be5;
      cursor: pointer;
    }
  }
  .pagination-box {
    padding: 30px 0;
    .el-input__inner {
      background: #142e4d;
      border-color: #1e3a5d;
      color: #ddd;
    }
    .el-pagination button:disabled {
      background: #142e4d;
      color: #ddd;
    }
    .el-pager li {
      background: #142e4d;
      color: #ddd;
    }
    .el-pager li.active {
      color: #2d7be5;
    }
    .el-pagination .btn-prev {
      background: #142e4d;
      color: #ddd;
    }
    .el-pagination .btn-next {
      background: #142e4d;
      color: #ddd;
    }
    .el-pagination__total {
      color: #ddd;
    }
    .el-pagination__jump {
      color: #ddd;
    }
  }
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background: rgba(45, 123, 229, 0.3);
}
</style>