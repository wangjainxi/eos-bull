<template>
  <div id="myWallet">
    <div class="wallet-header">
      <Language resource="myWallet.My_Wallet"/>
    </div>
    <div class="eallet-body">
      <div class="my-info">
        <img src="@/images/web/ic_eos.svg" alt>
        <div class="my-name">{{ accountName }}</div>
      </div>
      <div class="wallet-assets">
        <div class="assets-left">
          <span>{{ totalValuation.amount }} {{ totalValuation.name }}</span>
          <Language resource="myWallet.Current_Value"/>
        </div>
        <span></span>
        <div class="assets-right" @click="showModel">
          <Language resource="myWallet.Receipt"/>
        </div>
      </div>
      <div class="wallet-table">
        <div class="table-item">
          <div class="item-name">
            <Language resource="myWallet.Redeeming"/>
          </div>
          <div class="item-content">
            <span>{{ accountInfo ? accountInfo.eos.refunding.amount : '-' }}</span>EOS
          </div>
        </div>
        <div class="table-item">
          <div class="item-name">
            <Language resource="myWallet.Available"/>
          </div>
          <div class="item-content">
            <span>{{ accountInfo ? accountInfo.eos.available.amount : '-' }}</span>EOS
          </div>
        </div>
        <div class="table-item">
          <div class="item-name">&nbsp;RAM</div>
          <div class="item-content ram-item">
            <Language resource="myWallet.Remain"/>
            <el-tooltip class="item" effect="light" placement="bottom">
              <div slot="content">
                <Language resource="myWallet.Used"/>
                {{ ramInfo.used | byte2Kilobyte }}KB /
                <Language resource="myWallet.Total"/>
                {{ ramInfo.max | byte2Kilobyte }}KB (0.1000 EOS)
              </div>
              <div>
                <span>{{ ramInfo.max - ramInfo.used | byte2Kilobyte }}KB</span>
                <i></i>
              </div>
            </el-tooltip>
          </div>
        </div>
        <div class="table-item">
          <div class="item-name">CPU</div>
          <div class="item-content">
            <el-tooltip class="item" effect="light" placement="bottom">
              <div slot="content">
                <Language resource="myWallet.Used"/>
                {{ cpuInfo.used / 1000 }}ms /
                <Language resource="myWallet.Total"/>
                {{ cpuInfo.max / 1000 }}ms (0.1000 EOS)
              </div>
              <div>
                <Language resource="myWallet.Used"/>
                <span>{{ cpuInfo.usageRate }}%</span>
                <i></i>
              </div>
            </el-tooltip>
          </div>
        </div>
        <div class="table-item">
          <div class="item-name">NET</div>
          <div class="item-content">
            <el-tooltip class="item" effect="light" placement="bottom">
              <div slot="content">
                <Language resource="myWallet.Used"/>
                {{ netInfo.used | byte2Kilobyte }}KB /
                <Language resource="myWallet.Total"/>
                {{ netInfo.max | byte2Kilobyte }}KB (0.1000 EOS)
              </div>
              <div>
                <Language resource="myWallet.Used"/>
                <span>{{ netInfo.usageRate }}%</span>
                <i></i>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="assets-table">
        <div class="assets-table-header">
          <div class="assets-th-left">
            <!-- <span>Tradable Assets</span>
            <i></i>-->
            <el-select v-model="value" placeholder="select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="tabName(item.label)"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="assets-th-right">
            <el-input :placeholder="tabName('myWallet.Search')" v-model="inputVal" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </div>
        <div class="assets-table-body">
          <el-table
            :data="walletTokens"
            style="width: 100%"
            :empty-text="tabName('exchange.There_s_no_data_yet')"
          >
            <el-table-column prop="coin">
              <template slot="header" slot-scope="scope">
                <Language resource="myWallet.Coin"/>
              </template>
              <template slot-scope="scope">
                <img :src="scope.row.imgurl">
                <span>{{ scope.row.available.symbol.symbol.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="contract">
              <template slot="header" slot-scope="scope">
                <Language resource="myWallet.Contract"/>
              </template>
              <template slot-scope="scope">
                <span class="span2">{{ scope.row.available.symbol.contract }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="available" width="150" align="right">
              <template slot="header" slot-scope="scope">
                <Language resource="myWallet.Available"/>
              </template>
              <template slot-scope="scope">
                <span class="span3">
                  {{ scope.row.available.amount }}
                  {{ scope.row.available.symbol.symbol.name }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="frozen" width="280" align="center">
              <template slot="header" slot-scope="scope">
                <Language resource="myWallet.Frozen"/>
              </template>
              <template slot-scope="scope">
                <span>
                  {{ scope.row.onOrder.amount }}
                  {{ scope.row.onOrder.symbol.symbol.name }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="valuation" width="130" align="right">
              <template slot="header" slot-scope="scope">
                <Language resource="myWallet.EOS_Valuation"/>
              </template>
              <template slot-scope="scope">
                <span>
                  {{ scope.row.estValue.amount }}
                  {{ scope.row.estValue.symbol.name }}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header" slot-scope="scope">
                <Language resource="myWallet.Action"/>
                <i slot="prefix" class="el-input__icon el-icon-refresh"></i>
              </template>
              <template slot-scope="scope">
                <el-button size="small" @click="handleEdit(scope.row)">
                  <Language resource="myWallet.Exchange"/>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MessageBox } from 'element-ui';
import { namespace } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { Observer } from 'mobx-vue';
import languageStore from '@/stores/language';
import MyWalletModel from './myWalletModel.vue';
import language from '@/stores/language';
import { TokenBalance, AccountInfo } from '@/define';

const userModule = namespace('user');

@Observer
@Component({
  components: {
    MyWalletModel,
  },
})
export default class MyWallet extends Vue {
  @State('accountName')
  accountName!: string;

  @userModule.State('accountInfo')
  accountInfo?: AccountInfo;

  @userModule.Getter('cpuInfo')
  cpuInfo!: Object;

  @userModule.Getter('netInfo')
  netInfo!: Object;

  @userModule.Getter('ramInfo')
  ramInfo!: Object;

  @userModule.Getter('totalValuation')
  totalValuation!: Object;

  @userModule.Getter('walletTokens')
  walletTokens!: TokenBalance[];

  inputVal: string = '';
  loading: boolean = false;
  thisBoxKey: number = 1;

  options: Array<any> = [
    {
      value: 1,
      label: 'myWallet.Tradable_Assets',
    },
    {
      value: 2,
      label: 'myWallet.Total_Asset',
    },
    {
      value: 3,
      label: 'myWallet.Value_EOS',
    },
    {
      value: 4,
      label: 'myWallet.Following',
    },
  ];
  value: number = 1;
  showModel() {
    const h = this.$createElement;
    MessageBox({
      title: '',
      message: h(MyWalletModel),
      showCancelButton: false,
      showConfirmButton: false,
      customClass: 'my-wallet-model',
    });
  }

  tabName(obj: string) {
    return language.getIntlText(obj);
  }

  handleEdit(obj: Object) {
    console.log(obj);
  }
}
</script>

<style lang="scss" scoped>
@import './../../../../style/mixin.scss';
$height: 100%;
#myWallet {
  @include wh(100%, $height);
  min-height: 779px;
  display: flex;
  flex-direction: column;
  .span2 {
    color: rgba(229, 55, 87, 1);
  }
  .span3 {
    color: rgba(45, 123, 229, 1);
  }
  .wallet-header {
    @include font(400, 20px, 28px, 'PingFangSC-Regular');
    border-bottom: 1px solid rgba(30, 58, 93, 1);
    color: rgba(146, 167, 197, 1);
    padding: 40px 0 10px;
    text-align: left;
  }
  .wallet-body {
    @include flex(flex, center, center);
    flex-direction: column;
  }
  .my-info {
    flex-direction: column;
    img {
      @include wh(32px, 32px);
      margin: 30px 0 10px;
    }
    .my-name {
      @include font(400, 20px, 28px, 'PingFangSC-Regular');
      color: rgba(146, 167, 197, 1);
    }
  }
  .wallet-assets {
    flex-direction: row;
    @include flex(flex, center, center);
    margin: 20px 0 30px;
    & > span {
      @include wh(1px, 40px);
      background: rgba(30, 58, 93, 1);
      margin: 0 20px;
    }
    .assets-left {
      @include flex(flex, center, center);
      flex-direction: column;
      span {
        @include font(500, 24px, 33px, 'PingFangSC-Medium');
        color: rgba(255, 255, 255, 1);
      }
      span:nth-child(2) {
        @include font(400, 14px, 20px, 'PingFangSC-Regular');
        color: rgba(110, 132, 163, 1);
      }
    }
    .assets-right {
      @include wh(120px, 40px);
      @include font(500, 16px, 22px, 'PingFangSC-Medium');
      @include flex(flex, center, center);
      color: rgba(255, 255, 255, 1);
      background: rgba(45, 123, 229, 1);
      border-radius: 4px;
      cursor: pointer;
    }
  }
  .wallet-table,
  .assets-table {
    width: 100%;
    background: rgba(20, 46, 77, 1);
    @include flex(flex, center, space-around);
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .wallet-table {
    .table-item {
      text-align: left;
      margin: 13px 0;
      .item-name {
        @include font(400, 14px, 20px, 'PingFangSC-Regular');
        color: rgba(103, 123, 183, 1);
      }
      .item-content {
        @include flex(flex, center, center);
        color: rgba(103, 123, 183, 1);
        @include font(400, 14px, 20px, 'PingFangSC-Regular');
        .el-tooltip {
          @include flex(flex, center, flex-start);
        }
        span {
          padding: 0 5px 0 0;
          color: rgba(255, 255, 255, 1);
        }
        i {
          @include wh(12px, 7px);
          margin: 0 5px;
        }
      }
      .ram-item {
        & > span {
          color: rgba(103, 123, 183, 1);
        }
      }
    }
    .table-item:nth-child(3) {
      .item-content {
        span {
          padding-left: 5px;
        }
        i {
          @include bis('./../../../../images/web/ic_arrow_down.svg');
        }
      }
    }

    .table-item:nth-child(4) {
      .item-content {
        span {
          color: rgba(229, 55, 87, 1);
        }
        i {
          @include bis('./../../../../images/web/ic_arrow_down_r.svg');
        }
      }
    }

    .table-item:nth-child(5) {
      .item-content {
        span {
          color: rgba(28, 196, 102, 1);
        }
        i {
          @include bis('./../../../../images/web/ic_arrow_down_g.svg');
        }
      }
    }
  }
  .assets-table {
    display: flex;
    flex-direction: column;
  }
  .assets-table-header {
    @include flex(flex, center, space-between);
    @include wh(100%, 60px);
    .assets-th-right {
      @include wh(210px, 40px);
      margin: 0 20px;
      align-items: flex-start;
    }
    .assets-th-left {
      margin: 0 20px;
      @include flex(flex, center, center);
      color: rgba(103, 123, 183, 1);
      @include font(400, 14px, 20px, 'PingFangSC-Regular');
      span {
        padding: 0 5px 0 0;
      }
      i {
        @include bis('./../../../../images/web/ic_arrow_down.svg');
        @include wh(12px, 7px);
        margin: 0 5px;
      }
    }
  }
  .assets-table-body {
    @include wh(100%, auto);
  }
  .el-button {
    background: transparent;
    border: none;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(45, 123, 229, 1);
  }
}
</style>
