<template>
  <div id="mex-table-roder-page" v-loading="loading">
    <div class="table-roder-title">
      <h4>
        <Language resource="exchange.Open_Orders"/>
      </h4>
      <div>
        <div class="revoke-all-data" v-show="showFlags">
          <img src="../../../images/web/ic_refresh.svg" alt>
          <p @click="handleRevokeAllBtnClick">
            <Language resource="exchange.Revoke_All"/>
          </p>
        </div>
        <el-checkbox v-model="checked" @change="handleHideMarketCheck">
          <Language resource="exchange.Hide_Other_Pairs"/>
        </el-checkbox>
        <img src="../../../images/web/ic_refresh.svg" alt>
      </div>
    </div>
    <div class="table-box">
      <el-table :data="pendingOrders" style="width: 100%" max-height="250">
        <el-table-column prop="coin" width="110" align="left">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Coin"/>
          </template>
          <template slot-scope="props">
            <div class="coin-box">
              <h4>{{props.row.size.symbol.name}} / {{ props.row.price.symbol.name }}</h4>
              <p>缺少字段</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" align="center">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Type"/>
          </template>
          <template slot-scope="props">
            <p :class="props.row.type === 'Buy'?'buy-box':'sell-box'">{{props.row.side}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="time" align="center" width="170">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Entrusted_Time"/>
          </template>
        </el-table-column>
        <el-table-column prop="price" align="right" width="120">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Entrusted_Price"/>
          </template>
          <template slot-scope="props">
            <p class="props-box">
              {{props.row.avgPrice.amount}}
              <span>{{props.row.avgPrice.symbol.name}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="average" align="right" width="130">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Deal_Average"/>
          </template>
          <template slot-scope="props">
            <p class="props-box">
              {{props.row.size.amount}}
              <span>{{props.row.size.symbol.name}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="amount" align="right" width="130">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Entrusted_Amount"/>
          </template>
          <template slot-scope="props">
            <p class="props-box">
              {{props.row.filled.amount}}
              <span>{{props.row.filled.symbol.name}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="dealt" align="right" width="130">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Dealt_Num"/>
          </template>
          <template slot-scope="props">
            <p class="props-box">
              {{props.row.fees.amount}}
              <span>{{props.row.fees.symbol.name}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="entrusted" align="right" width="130">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Entrusted_Total"/>
          </template>
          <template slot-scope="props">
            <p class="props-box">
              {{props.row.fees.amount}}
              <span>{{props.row.fees.symbol.name}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" align="center">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Status"/>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Action"/>
          </template>
          <template slot-scope="props">
            <p class="action-box" @click="greet(props.row.orderId)">
              <Language resource="exchange.Revoke"/>
            </p>
          </template>
        </el-table-column>
        <div slot="empty">
          <Language resource="exchange.There_s_no_data_yet"/>
        </div>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <template slot="title">
        <div>111</div>
      </template>
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
import { MessageBox, Message } from 'element-ui';
import { namespace } from 'vuex-class';
import { Observer } from 'mobx-vue';
import languageStore from '@/stores/language';
import language from '@/stores/language';
import { Market, Order } from '@/define';

const orderModule = namespace('order');
const marketModule = namespace('market');

@Observer
@Component
export default class MexOpenOrders extends Vue {
  @marketModule.Getter('currentMarket')
  currentMarket?: Market;

  @orderModule.Getter('pendingOrders')
  pendingOrders!: Order[];

  @orderModule.Action('fetchPendingOrders')
  fetchPendingOrders!: Function;

  checked = false;
  loading = false;
  dialogVisible = false;
  showFlag = false;

  ThereSNoDataYet = language.getIntlText('exchange.There_s_no_data_yet');
  handleRevokeAllBtnClick() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
  get showFlags() {
    const a = this.pendingOrders;
    a.length > 0 ? (this.showFlag = true) : (this.showFlag = false);
    // console.log(this.pendingOrders);
    return this.showFlag;
  }

  handleHideMarketCheck(val: boolean) {
    //
  }

  handleDetailBtnClick() {
    // TODO：展示订单详情
  }

  async greet(id: number) {
    await MessageBox.confirm('Are you sure to revoke the order?', 'Tips', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Concel',
      type: 'warning',
    });
    await this.$store.dispatch('order/cancelOrder', id);
    Message.success('Revoke susccess.');
  }
}
</script>
<style lang="scss">
#mex-table-roder-page {
  .el-table .cell {
    padding-right: 0;
  }
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
      .revoke-all-data {
        display: flex;
        align-items: center;
      }
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
