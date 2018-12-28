<template>
  <div id="mex-table-roder-page" v-loading="loading">
    <div class="table-roder-title">
      <h4>
        <Language resource="exchange.Open_Orders"/>
      </h4>
      <div>
        <img src="../../../images/web/ic_refresh.svg" alt>
        <p @click="handleRevokeAllBtnClick">
          <Language resource="exchange.Revoke_All"/>
        </p>
        <el-checkbox v-model="checked" @change="handleHideMarketCheck">
          <Language resource="exchange.Hide_Other_Pairs"/>
        </el-checkbox>
        <img src="../../../images/web/ic_refresh.svg" alt>
      </div>
    </div>
    <div class="table-box">
      <el-table
        :data="Array.from(openOrderStore.orders)"
        style="width: 100%"
        :empty-text="ThereSNoDataYet"
      >
        <el-table-column prop="coin" width="200">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Coin"/>
          </template>
          <template slot-scope="props">
            <div class="coin-box">
              <h4>{{props.row.coin}} / EOS</h4>
              <p>{{props.row.odd}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" align="center">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Type"/>
          </template>
          <template slot-scope="props">
            <p :class="props.row.type === 'Buy'?'buy-box':'sell-box'">{{props.row.type}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="time" align="center" width="200">
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
              {{props.row.price}}
              <span>EOS</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="average" align="right">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Deal_Average"/>
          </template>
        </el-table-column>
        <el-table-column prop="amount" align="right">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Entrusted_Amount"/>
          </template>
          <template slot-scope="props">
            <p class="amount-box">
              {{props.row.amount}}
              <span>{{props.row.coin}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="dealt" align="right">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Dealt_Num"/>
          </template>
        </el-table-column>
        <el-table-column prop="entrusted" align="right">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Entrusted_Total"/>
          </template>
          <template slot-scope="props">
            <p class="entrusted-box">
              {{props.row.entrusted}}
              <span>EOS</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="Status" align="center">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Status"/>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Action"/>
          </template>
          <template slot-scope="props">
            <p class="action-box" @click="greet(props.row.id)">
              <Language resource="exchange.Revoke"/>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import dataStore from '@/stores/data';
import openOrderStore from '@/stores/open-order';
import language from '@/stores/language';

@Observer
@Component
export default class MexOpenOrders extends Vue {
  dataStore = dataStore;
  openOrderStore = openOrderStore;
  checked = false;
  loading = false;
  ThereSNoDataYet = language.getIntlText('exchange.There_s_no_data_yet');
  handleRevokeAllBtnClick() {
    this.loading = true;
    openOrderStore.fetchOrders('user1').finally(() => {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }

  handleHideMarketCheck(val: boolean) {
    const marketId = dataStore.currentMarket.marketId;
    if (val) openOrderStore.hideOtherMarket(marketId);
    else openOrderStore.showOtherMarket();
  }

  handleDetailBtnClick() {
    // TODO：展示订单详情
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
}
</style>
