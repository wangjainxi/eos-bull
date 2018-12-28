<template>
  <div id="mex-table-roder-page" v-loading="loading">
    <div class="table-roder-title">
      <h4>Open Order</h4>
      <div>
        <img src="../../../images/web/ic_refresh.svg" alt>
        <p @click="handleRevokeAllBtnClick">Revoke All</p>
        <el-checkbox v-model="checked" @change="handleHideMarketCheck">Hide Other Pair</el-checkbox>
        <img src="../../../images/web/ic_refresh.svg" alt>
      </div>
    </div>
    <div class="table-box">
      <el-table
        :data="Array.from(openOrderStore.orders)"
        style="width: 100%"
        empty-text="There's no data yet"
      >
        <el-table-column prop="coin" label="Coin" width="200">
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
        <el-table-column prop="price" label="Price" align="right" width="120">
          <template slot-scope="props">
            <p class="props-box">
              {{props.row.price.amount}}
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
    <el-dialog
      :title="thisTip"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div class="content">
        <img src="./../../../images/web/ic_warning_big.svg" alt>
        <Language resource="home.revoke_order"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          <Language resource="home.Cancel"/>
        </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          <Language resource="home.OK"/>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import languageStore from '@/stores/language';
import dataStore from '@/stores/data';
import openOrderStore from '@/stores/open-order';

@Observer
@Component
export default class MexOpenOrders extends Vue {
  dataStore = dataStore;
  openOrderStore = openOrderStore;
  checked = false;
  loading = false;
  dialogVisible = false;

  handleRevokeAllBtnClick() {
    this.loading = true;
    openOrderStore.fetchOrders('user1').finally(() => {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }

  // created() {
  //   this.noTitle = `${&nbsp}`;
  // }
  handleHideMarketCheck(val: boolean) {
    const marketId = dataStore.currentMarket.marketId;
    if (val) openOrderStore.hideOtherMarket(marketId);
    else openOrderStore.showOtherMarket();
  }

  handleDetailBtnClick() {
    // TODO：展示订单详情
  }
  greet(id: number) {
    this.dialogVisible = true;
  }
}
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
  .el-dialog {
    & > div {
      background: rgba(20, 46, 77, 1);
    }

    .el-button {
      width: 100px;
      height: 40px;
    }
  }
  .scatter-dialog {
    .el-button {
      width: 100px;
      height: 40px;
    }
  }
  .el-dialog__header {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid rgba(30, 58, 93, 1);
    span {
      font-size: 18px;
      height: 25px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    i {
      color: rgba(226, 101, 101, 1);
    }
  }
  .el-button--default {
    border: 1px solid rgba(110, 132, 163, 1);
    background: rgba(20, 46, 77, 1);
    color: rgba(146, 167, 197, 1);
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      margin: 10px auto 30px;
      width: 36px;
      height: 36px;
    }
    span {
      height: 57px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(146, 167, 197, 1);
      line-height: 22px;
    }
  }
  .scatter {
    margin: 0 45px;
    img {
      margin: 5px auto 40px;
      width: 90px;
      height: 90px;
    }
    & > span {
      border-radius: 4px;
      padding: 0 25px;
      height: 42px;
      font-size: 16px;
      color: rgba(45, 123, 229, 1);
      line-height: 42px;
      margin-bottom: 88px;
      border: 1px solid rgba(110, 132, 163, 1);
    }
    & > div {
      p {
        display: inline;
        & > span {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #2d7be5;
          line-height: 20px;
          color: rgba(146, 167, 197, 1);
        }
      }
      span {
        padding: 0;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #2d7be5;
        line-height: 20px;
        color: rgba(45, 123, 229, 1);
      }
    }
  }
}
</style>
