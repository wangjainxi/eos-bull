<template>
  <div id="mex-place-order-page">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="tabName('exchange.Limit_Order')" name="first">
        <div class="place-order-info" v-if="currentMarket">
          <!-- 买入 -->
          <div class="buy">
            <div class="place-order-info-title">
              <h4>
                <Language resource="exchange.Buy_In"/>
                {{ currentMarket.pair.baseCurrency.symbol.name }}
              </h4>
              <p v-if="quoteBalanceAmount">
                <Language resource="exchange.Balance"/>
                : {{ quoteBalanceAmount }}
              </p>
            </div>
            <!-- 买入价 -->
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Buy_In_Price"/>
              </p>
              <input type="number" v-model="limitBuyParams.price" @input="updateLimitBuyTotal">
              <p>{{ currentMarket.pair.quoteCurrency.symbol.name }}</p>
            </div>
            <!-- 买入量 -->
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Buy_In_Amount"/>
              </p>
              <input type="number" v-model="limitBuyParams.size" @input="updateLimitBuyTotal">
              <p>{{ currentMarket.pair.baseCurrency.symbol.name }}</p>
            </div>
            <div class="slider-box">
              <el-slider v-model="sliderValueBuy" :step="25" show-stops></el-slider>
              <div class="slider-num">
                <span>0%</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;25%</span>
                <span>&nbsp;&nbsp;&nbsp;50%</span>
                <span>&nbsp;&nbsp;75%</span>
                <span>100%</span>
              </div>
            </div>
            <!-- 交易额 -->
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Exchange_Total"/>
              </p>
              <input type="number" v-model="limitBuyParams.total" @input="updateLimitBuySize">
              <p>{{ currentMarket.pair.quoteCurrency.symbol.name }}</p>
            </div>
            <el-button type="primary" @click="handleBuyBtnClick">
              <Language resource="exchange.Buy_In"/>
            </el-button>
          </div>
          <div class="sell">
            <div class="place-order-info-title">
              <h4>
                <Language resource="exchange.Sell_out"/>
                {{ currentMarket.pair.baseCurrency.symbol.name }}
              </h4>
              <p v-if="baseBalanceAmount">
                <Language resource="exchange.Balance"/>
                {{ baseBalanceAmount }}
              </p>
            </div>
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Sell_Out_Price"/>
              </p>
              <input type="number" v-model="limitSellParams.price" @input="updateLimitSellTotal">
              <p>{{ currentMarket.pair.quoteCurrency.symbol.name }}</p>
            </div>
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Sell_Out_Amount"/>
              </p>
              <input type="number" v-model="limitSellParams.size" @input="updateLimitSellTotal">
              <p>{{ currentMarket.pair.baseCurrency.symbol.name }}</p>
            </div>
            <div class="slider-box">
              <el-slider v-model="sliderValueSell" :step="25" show-stops></el-slider>
              <div class="slider-num">
                <span>0%</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;25%</span>
                <span>&nbsp;&nbsp;&nbsp;50%</span>
                <span>&nbsp;&nbsp;75%</span>
                <span>100%</span>
              </div>
            </div>
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Exchange_Total"/>
              </p>
              <input type="number" v-model="limitSellParams.total" @input="updateLimitSellSize">
              <p>{{ currentMarket.pair.quoteCurrency.symbol.name }}</p>
            </div>
            <el-button type="primary" @click="handleSellBtnClick">
              <Language resource="exchange.Sell_out"/>
            </el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="tabName('exchange.Market_Order')" name="second">
        <div class="place-order-info">
          <div class="buy">
            <div class="place-order-info-title">
              <h4>
                <Language resource="exchange.Buy_In"/>MAX
              </h4>
              <p>
                <Language resource="exchange.Balance"/>:5.8501 EOS
              </p>
            </div>
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Buy_In_Price"/>
              </p>
              <input type="number" :placeholder="tabName('exchange.Buy_at_the_best_market_price')">
              <p>EOS</p>
            </div>
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Exchange_Total"/>
              </p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <div class="slider-box">
              <el-slider v-model="sliderValueBuy" :step="25" show-stops></el-slider>
              <div class="slider-num">
                <span>0%</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;25%</span>
                <span>&nbsp;&nbsp;&nbsp;50%</span>
                <span>&nbsp;&nbsp;75%</span>
                <span>100%</span>
              </div>
            </div>
            <el-button type="primary">
              <Language resource="exchange.Buy_In"/>
            </el-button>
          </div>
          <div class="sell">
            <div class="place-order-info-title">
              <h4>
                <Language resource="exchange.Sell_out"/>MAX
              </h4>
              <p>
                <Language resource="exchange.Balance"/>:5.8501 EOS
              </p>
            </div>
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Sell_Out_Price"/>
              </p>
              <input type="number" :placeholder="tabName('exchange.Sell_at_the_best_market_price')">
              <p>EOS</p>
            </div>
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Sell_Out_Amount"/>
              </p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <div class="slider-box">
              <el-slider v-model="sliderValueSell" :step="25" show-stops></el-slider>
              <div class="slider-num">
                <span>0%</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;25%</span>
                <span>&nbsp;&nbsp;&nbsp;50%</span>
                <span>&nbsp;&nbsp;75%</span>
                <span>100%</span>
              </div>
            </div>
            <el-button type="primary">
              <Language resource="exchange.Sell_out"/>
            </el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-popover
      placement="bottom"
      width="300"
      trigger="hover"
      :content="tabName('exchange.EOSmex_is_a_decentralized_exchange')"
    >
      <div class="mex-place-order" slot="reference">
        <img src="@/images/mobile/ic_warning.svg" alt>
        <p>
          <Language resource="business.Tips"/>
        </p>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Message } from 'element-ui';
import { namespace, State } from 'vuex-class';
import { Market, TokenBalance, AccountInfo } from '@/define';
import { OrderParams } from '@/utils/scatter';
import language from '@/stores/language';
import { Observer } from 'mobx-vue';

const userModule = namespace('user');
const orderModule = namespace('order');

@Observer
@Component
export default class MexPlaceOrder extends Vue {
  @Prop()
  currentMarket?: Market;

  @State('accountName')
  accountName!: string;

  limitBuyParams = {
    price: '0.0000',
    size: '0',
    total: '0',
  };

  limitSellParams = {
    price: '0.0000',
    size: '0',
    total: '0',
  };

  @userModule.State('accountInfo')
  accountInfo!: AccountInfo;

  @userModule.Getter('walletTokens')
  walletTokens!: TokenBalance[];

  @orderModule.Action('createOrder')
  createOrder!: (params: OrderParams) => Promise<any>;

  get baseBalanceAmount() {
    if (!this.currentMarket || this.walletTokens.length === 0) return null;
    const baseName = this.currentMarket.pair.baseCurrency.symbol.name;
    if (baseName === 'EOS') {
      return `${this.accountInfo.eos.available.amount} EOS`;
    }
    const t = this.walletTokens.find(e => {
      return e.available.symbol.symbol.name === baseName;
    });
    if (t) {
      return `${t.available.amount} ${baseName}`;
    }

    return null;
  }

  tabName(obj: string) {
    return language.getIntlText(obj);
  }

  get quoteBalanceAmount() {
    if (!this.currentMarket || this.walletTokens.length === 0) return null;
    const quoteName = this.currentMarket.pair.quoteCurrency.symbol.name;
    if (quoteName === 'EOS') {
      return `${this.accountInfo.eos.available.amount} EOS`;
    }
    const t = this.walletTokens.find(e => {
      return e.available.symbol.symbol.name === quoteName;
    });
    if (t) {
      return `${t.available.amount} ${quoteName}`;
    }

    return null;
  }

  handleBuyBtnClick() {
    if (!this.accountName || !this.currentMarket) return;
    const baseName = this.currentMarket.pair.baseCurrency.symbol.name;
    const quoteName = this.currentMarket.pair.quoteCurrency.symbol.name;
    const contract = this.currentMarket.pair.quoteCurrency.contract;
    this.createOrder({
      referrer: '',
      market_id: this.currentMarket.marketId,
      price: `${parseFloat(this.limitBuyParams.price).toFixed(6)} ${quoteName}`,
      size: `${parseFloat(this.limitBuyParams.size).toFixed(4)} ${baseName}`,
      coin_contract: contract,
      order_side: 'bid',
      order_type: 'limit',
      time_in_force: 'gtc',
      post_only: 0,
      quantity: `${parseFloat(this.limitBuyParams.total).toFixed(4)} ${quoteName}`,
    })
      .then(() => {
        Message.success('Add order success.');
      })
      .catch(() => {
        Message.error('Add order fail.');
      });
  }

  handleSellBtnClick() {
    if (!this.accountName || !this.currentMarket) return;
    const baseName = this.currentMarket.pair.baseCurrency.symbol.name;
    const quoteName = this.currentMarket.pair.quoteCurrency.symbol.name;
    const contract = this.currentMarket.pair.baseCurrency.contract;
    this.createOrder({
      referrer: '',
      market_id: this.currentMarket.marketId,
      price: `${parseFloat(this.limitSellParams.price).toFixed(6)} ${quoteName}`,
      size: `${parseFloat(this.limitSellParams.size).toFixed(4)} ${baseName}`,
      coin_contract: contract,
      order_side: 'ask',
      order_type: 'limit',
      time_in_force: 'gtc',
      post_only: 0,
      quantity: `${parseFloat(this.limitSellParams.size).toFixed(4)} ${baseName}`,
    })
      .then(() => {
        Message.success('Add order success.');
      })
      .catch(() => {
        Message.error('Add order fail.');
      });
  }

  updateLimitBuyTotal() {
    const price = parseFloat(this.limitBuyParams.price);
    const size = parseFloat(this.limitBuyParams.size);
    if (price === 0 || size === 0) return;
    this.limitBuyParams.total = (price * size).toFixed(4);
  }

  updateLimitSellTotal() {
    const price = parseFloat(this.limitSellParams.price);
    const size = parseFloat(this.limitSellParams.size);
    if (price === 0 || size === 0) return;
    this.limitSellParams.total = (price * size).toFixed(4);
  }

  updateLimitBuySize() {
    const price = parseFloat(this.limitBuyParams.price);
    const total = parseFloat(this.limitBuyParams.total);
    if (price === 0 || total === 0) return;
    this.limitBuyParams.size = (total / price).toFixed(4);
  }

  updateLimitSellSize() {
    const price = parseFloat(this.limitSellParams.price);
    const total = parseFloat(this.limitSellParams.total);
    if (price === 0 || total === 0) return;
    this.limitSellParams.size = (total / price).toFixed(4);
  }

  activeName = 'first';
  sliderValueBuy = 0;
  sliderValueSell = 0;
}
</script>

<style lang="scss">
.el-popover {
  text-align: left;
}
#mex-place-order-page {
  position: relative;
  .place-order-info {
    display: flex;
    .buy {
      font-size: 14px;
      h4 {
        color: #1cc466;
      }
      button {
        background: #1cc466;
        border-color: #1cc466;
        width: 100%;
        margin-top: 17px;
      }
    }
    .sell {
      font-size: 14px;
      h4 {
        color: #e53757;
      }
      button {
        background: #e53757;
        border-color: #e53757;
        width: 100%;
        margin-top: 17px;
      }
    }
    > div {
      width: 50%;
      padding: 0 16px;
      border-right: 1px solid #1e3a5d;
      color: #7b8db9;
      .place-order-info-title {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        p {
          font-size: 12px;
        }
      }
      .place-order-info-input {
        margin-top: 15px;
        background: #1e3a5d;
        height: 40px;
        width: 100%;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        input {
          width: 100%;
          text-align: right;
          padding-right: 20px;
          background: none;
          border: none;
          font-size: 15px;
          background: rgba(30, 58, 93, 1);
          flex: 1 1;
        }
      }
      .slider-box {
        margin-top: 17px;
        display: flex;
        position: relative;
        flex-direction: column;
        .el-slider {
          padding: 0 5px;
        }
        .slider-num {
          position: absolute;
          width: 100%;
          bottom: -5px;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(123, 141, 185, 1);
        }
      }
    }
    > div:nth-child(2) {
      border-right: none;
    }
  }
  .mex-place-order {
    color: #d6a93b;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
    img {
      margin-right: 5px;
    }
  }
  .el-tabs__nav-scroll {
    padding: 0 20px;
  }
  .el-tabs__nav-wrap::after {
    height: 1px;
    background: #1e3a5d;
  }
  .el-tabs__nav {
    .is-active {
      color: #fff;
    }
  }
  .el-tabs__item {
    color: #92a7c5;
  }
  .el-tabs__active-bar {
    background: #2d7be5;
  }
}
</style>
