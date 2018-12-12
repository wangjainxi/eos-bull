<template>
  <div id="mex-table-roder-page">
    <div class="table-roder-title">
      <h4>Open Order</h4>
      <div>
        <img src="../../../images/Exchange_svg/ic_refresh.svg" alt>
        <p>Revoke All</p>
        <el-checkbox v-model="checked">Hide Other Pair</el-checkbox>
        <img src="../../../images/Exchange_svg/ic_refresh.svg" alt>
      </div>
    </div>
    <div class="table-box">
      <el-table :data="tableData" style="width: 100%" empty-text="There's no data yet">
        <el-table-column prop="coin" label="Coin">
          <template slot-scope="props">
            <div class="coin-box">
              <h4>{{props.row.coin}} / EOS</h4>
              <p>{{props.row.odd}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="Type" align="center">
          <template slot-scope="props">
            <p :class="props.row.type === 'Buy'?'buy-box':'sell-box'">{{props.row.type}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="Entrusted Time" align="center" width="200"></el-table-column>
        <el-table-column prop="price" label="Price" align="right">
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
            <p class="action-box" @click="greet(props.row.id)">Revoke</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "mex-table-order",
  methods: {
    greet(id) {
      console.log(id);
    }
  },
  data() {
    return {
      checked: false,
      tableData: [
        {
          coin: "ZKS",
          type: "Buy",
          time: "2018-12-07 14:15:5",
          price: 0.00008,
          average: 0,
          amount: 21,
          dealt: 0,
          entrusted: 0.003,
          status: "Not deal",
          odd: "eosdkeigjndlie",
          id: 1
        },
        {
          coin: "ZKS",
          type: "Sell",
          time: "2018-12-07 14:15:5",
          price: 0.00008,
          average: 0,
          amount: 21,
          dealt: 0,
          entrusted: 0.003,
          status: "Not deal",
          odd: "eosdkeigjndlie",
          id: 2
        }
      ]
    };
  }
};
</script>
<style lang="scss">
#mex-table-roder-page {
  .table-roder-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 42px;
    padding: 0 16px;
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
      > h4 {
        font-size: 14px;
        line-height: 16px;
        color: #ddd;
      }
      > p {
        font-size: 12px;
        line-height: 14px;
        color: #677bb7;
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
}
</style>