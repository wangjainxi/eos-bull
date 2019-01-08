<template>
  <div class="business" id="business" v-if="currentMarket">
    <div class="business-coin-title">
      <div class="business-coin-name" @click="showCoinData">
        <span>{{ baseCurrencyName }}/{{ quoteCurrencyName }}</span>
        <i></i>
      </div>
      <div class="business-coin-image">
        <i
          :class="['business-coin-star',{'business-coin-star-fav' : isFavorite.indexOf(routeId) !== -1}]"
          @click="getFav"
        ></i>
        <i class="business-coin-img1" @click="getPrevPage"></i>
      </div>
    </div>
    <div class="business-show-data">
      <div class="business-show-data-left">
        <div class="business-tab">
          <div
            :class="['business-tab-buy', {active: orderSide === tab.side}, {tab2: orderSide === 'ask'}]"
            v-for="(tab, index) in tabs"
            @click="changeOrderSide(tab.side)"
            :key="index"
          >
            <Language :resource="tab.key"/>
          </div>
        </div>
        <div class="left-title" @click="showNowPrice">
          <Language :resource="orderType === 'limit' ? 'business.Limit' : 'business.Market'"/>
          <i></i>
        </div>
        <div class="business-price" v-if="orderType === 'limit'">
          <div class="business-price-down" @click="changePrice(0)">-</div>
          <div class="business-price-show">
            <input type="number" v-model="businessPrice">
          </div>
          <div class="business-price-up" @click="changePrice(1)">+</div>
        </div>
        <div
          class="business-price business-price-market"
          v-if="orderType === 'market' && orderSide === 'bid'"
        >
          <Language resource="business.buyPlace"/>
        </div>
        <div
          class="business-price business-price-market"
          v-if="orderType === 'market' && orderSide === 'ask'"
        >
          <Language resource="business.sellPlace"/>
        </div>
        <div class="business-mount">
          <input
            type="text"
            :value="inputVal"
            @change="handleChangeIpt($event)"
            placeholder="0.0000"
          >
          <span>{{ orderType === 'market' && orderSide === 'bid' ? quoteCurrencyName : baseCurrencyName }}</span>
        </div>
        <div v-show="orderType === 'limit'" class="business-change-eos">{{`≈${estimatePrice}EOS`}}</div>
        <BusinessRange
          :orderSide="orderSide"
          @getRangeValue="getRangeValue"
          :rangeValue="rangeValue"
          :cricleMount="cricleMount"
        />
        <div class="use-mount">
          <div class="use-mount-left">
            <Language resource="business.Bal"/>
            {{`${balance.name}: ${balance.amount}`}}
          </div>
          <div class="use-mount-right">{{`${rangeValue}%`}}</div>
        </div>

        <div v-if="orderSide === 'bid'" class="goBusiness businessBuy" @click="goBusiness">
          <Language resource="business.Buy"/>
        </div>
        <div v-else class="goBusiness businessSell" @click="goBusiness">
          <Language resource="business.Sell"/>
        </div>
      </div>
      <div class="business-show-data-right">
        <div class="right-top">
          <div class="coin-items header">
            <div class="coin-price">
              <Language resource="business.Price"/>
            </div>
            <div class="coin-mount">
              <Language resource="business.Amount"/>
            </div>
          </div>
          <div class="coin-item-box">
            <BusinessTradeItem
              :changePriceAndMount="changePriceAndMount"
              :tradeType="'sell'"
              v-for="(item, index) in orderbook.asks"
              :item="item"
              :key="index"
              :tradeDataMountSum="tradeDataMountSum"
            ></BusinessTradeItem>
          </div>
        </div>

        <div
          v-if="lastTrade"
          :class="{'right-middle': true, 'middle-active': lastTrade.makerSide === 1}"
        >
          <span>{{ lastTrade.price.amount }}</span>
          <i></i>
        </div>
        <div v-else class="right-middle"></div>

        <div class="right-bottom">
          <div class="coin-item-box">
            <BusinessTradeItem
              :tradeType="'buy'"
              :changePriceAndMount="changePriceAndMount"
              v-for="(item, index) in orderbook.bids"
              :item="item"
              :key="index"
              :tradeDataMountSum="tradeDataMountSum"
            ></BusinessTradeItem>
          </div>
        </div>
      </div>
    </div>
    <div class="business-entrust">
      <div class="business-entrust-header">
        <div class="entrust-tabs">
          <div
            :class="['entrust-tab-item',{'entrust-active': entrustType === 0}]"
            @click="changeEntrustType(0)"
          >
            <Language resource="business.Open_Orders"/>
            <i></i>
          </div>
          <div
            :class="['entrust-tab-item',{'entrust-active': entrustType === 1}]"
            @click="changeEntrustType(1)"
          >
            <Language resource="business.Order_History"/>
            <i></i>
          </div>
        </div>
        <div class="entrust-img" @click="showMsg">
          <i></i>
          <Language resource="business.Tips"/>
        </div>
      </div>
      <div
        :class="['business-entrust-body',{'show-item': pendingOrders.length !== 0,'show-no-item': pendingOrders.length == 0}]"
        v-if="entrustType === 0"
      >
        <ShowMessageImg v-if="pendingOrders.length === 0" :imgUrl="imgUrl" :imgMsg="imgMsg"></ShowMessageImg>
        <div class="loadmore-list" v-else>
          <OrderItem
            v-for="(item,index) in pendingOrders"
            :order="item"
            :routeParam="routeParam"
            :entrustType="entrustType"
            :key="index"
          />
        </div>
      </div>
      <div
        :class="['business-entrust-body',{'show-item': historyOrders.orders.length !== 0,'show-no-item': historyOrders.orders.length == 0}]"
        v-else
      >
        <ShowMessageImg v-if="historyOrders.orders.length === 0" :imgUrl="imgUrl" :imgMsg="imgMsg"></ShowMessageImg>
        <div class="loadmore-list" v-else>
          <Loadmore
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            @bottom-status-change="handleBottomChange"
            ref="loadmore"
          >
            <OrderItem
              v-for="(item,index) in historyOrders.orders"
              :order="item"
              :routeParam="routeParam"
              :entrustType="entrustType"
              :key="index"
            />
            <div slot="bottom" class="mint-loadmore-bottom">
              <span
                v-show="bottomStatus !== 'loading'"
                :class="{ 'rotate': bottomStatus === 'drop' }"
              >↑</span>
              <span v-show="bottomStatus === 'loading'">Loading...</span>
            </div>
          </Loadmore>
        </div>
      </div>
    </div>
    <mt-actionsheet :actions="sheetActions" :cancelText="cancel" v-model="sheetVisible"/>
    <ShowCoinList v-model="popupVisible" :dataCoinList="markets"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import onfire from 'onfire.js';
import ShowMessageImg from '@/components/messageImage.vue';
import OrderItem from '@/mobile/components/order-item.vue';
import BusinessTradeItem from './components/businessTrade.vue';
import BusinessRange from './components/businessRange.vue';
import ShowCoinList from './components/businessCoin.vue';
import { MessageBox, Toast, Loadmore } from 'mint-ui';
import languageStore from '@/stores/language';
import { Market, Order, Orderbook, Trade, AccountInfo, TokenBalance } from '@/define';
import { OrderParams } from '@/utils/scatter';

const orderModule = namespace('order');
const marketModule = namespace('market');
const userModule = namespace('user');

@Component({
  components: {
    ShowMessageImg,
    BusinessTradeItem,
    BusinessRange,
    ShowCoinList,
    Loadmore,
    OrderItem,
  },
})
export default class Business extends Vue {
  @marketModule.State('markets')
  markets!: Market[];

  @userModule.State('accountInfo')
  accountInfo!: AccountInfo;

  @marketModule.State('orderbook')
  orderbook!: Orderbook;

  @marketModule.Getter('lastTrade')
  lastTrade?: Trade;

  @marketModule.Getter('currentMarket')
  currentMarket?: Market;

  @orderModule.Getter('pendingOrders')
  pendingOrders!: Order[];

  @orderModule.State('historyOrders')
  historyOrders!: Order[];

  @marketModule.Action('updateMarket')
  updateMarket!: Function;

  @userModule.Getter('walletTokens')
  walletTokens!: TokenBalance[];

  @orderModule.Action('createOrder')
  createOrder!: (params: OrderParams) => Promise<any>;

  orderSide = 'bid';
  orderType = 'limit'; //限价还是市价

  cricleMount = [0, 1, 2, 3, 4];
  rangeValue = 0;
  entrustType = 0;
  pageparams = { page: 1, pageSize: 10 };
  cancel = languageStore.getIntlText('business.cancel');
  popupVisible = false; //币种弹
  sheetVisible = false; //价格弹
  businessPrice = '0'; //交易价
  inputVal = ''; //交易
  routeParam: any = '';
  coinName: any = '';
  isFavorite: any = [];
  routeId: number = -1;
  changeEos: any = '0.0000';

  tabs = [
    {
      key: 'business.Buy',
      side: 'bid',
    },
    {
      key: 'business.Sell',
      side: 'ask',
    },
  ];

  imgUrl = require('./../../../images/mobile/ic_nodata.png');
  imgMsg = languageStore.getIntlText('business.nodata');
  tradeDataMountSum = 0;
  priceString = 0; //小数点后的位数
  baseNum = 0; //价格计算的基数

  // 刷新
  bottomStatus = '';
  allLoaded = false;

  sheetActions = [
    {
      name: languageStore.getIntlText('business.Limit'),
      method: this.changeNowPrice1,
    },
    {
      name: languageStore.getIntlText('business.Market'),
      method: this.changeNowPrice2,
    },
  ];

  get baseCurrencyName() {
    if (!this.currentMarket) return '-';
    return this.currentMarket.pair.baseCurrency.symbol.name;
  }

  get quoteCurrencyName() {
    if (!this.currentMarket) return '-';
    return this.currentMarket.pair.quoteCurrency.symbol.name;
  }

  // 页面账户余额计算属性
  get balance() {
    if (!this.currentMarket || this.walletTokens.length === 0) return {};
    const currencyName = this.orderSide === 'bid' ? this.quoteCurrencyName : this.baseCurrencyName;
    if (currencyName === 'EOS') {
      return {
        amount: this.accountInfo.eos.available.amount,
        name: 'EOS',
      };
    }
    const t = this.walletTokens.find(e => {
      return e.available.symbol.symbol.name === currencyName;
    });
    if (t) {
      return {
        amount: t.available.amount,
        name: currencyName,
      };
    }
    return {};
  }

  get estimatePrice() {
    const price = parseFloat(this.businessPrice);
    const size = parseFloat(this.inputVal);
    const total = price * size;
    if (!Number.isFinite(total)) return '0.0000';
    return total.toFixed(4);
  }

  created() {
    const id = parseInt(this.$route.params.id, 10);
    this.updateMarket(id);
    this.initData();
  }

  initData() {
    if (this.$route.query.side) {
      this.orderSide = this.$route.query.side as string;
    }

    if (this.currentMarket) {
      this.businessPrice = this.currentMarket.lastPrice;
      this.priceString = this.currentMarket.lastPrice.split('.')[1].length;
      this.baseNum = 1 / Math.pow(10, this.priceString);
    }
  }

  @Watch('currentMarket')
  handleCurrentMarketUpdate() {
    this.initData();
  }

  mounted() {
    this.routeParam = this.$route.params;
    this.routeId = Number(this.$route.params.id);
  }

  @Watch('$route')
  handleRouteChange() {
    const id = parseInt(this.$route.params.id, 10);
    this.updateMarket(id);
  }

  getFav() {
    if (this.isFavorite.indexOf(this.routeId) !== -1) {
      this.isFavorite = this.isFavorite.filter((e: any) => e !== this.routeId);
      localStorage.setItem('localFavourite', JSON.stringify(this.isFavorite));
    } else {
      this.isFavorite.push(this.routeId);
      localStorage.setItem('localFavourite', JSON.stringify(this.isFavorite));
    }
  }

  handleBottomChange(status: any) {
    this.bottomStatus = status;
  }
  loadBottom() {
    // 加载更多数据
    // if (!this.pageparams.page) return;
    // if (!this.pageparams.pageSize) return;
    // this.pageparams.page += 1;
    // dataStore.updateHistoryOrders(this.pageparams);
    // console.log(dataStore.historyOrders);
    // if (
    //   Math.ceil(dataStore.historyOrders.count / this.pageparams.pageSize) === this.pageparams.page
    // ) {
    //   this.allLoaded = true; // 若数据已全部获取完毕
    // }
    // (this.$refs.loadmore as any).onBottomLoaded();
  }

  changeOrderSide(side: string) {
    this.orderSide = side;
  }

  changeEntrustType(type: any) {
    // this.entrustType = type;
    // if (type === 0) {
    //   dataStore.updatePendingOrders();
    //   this.entrustData = dataStore;
    //   console.log(dataStore);
    // } else {
    //   dataStore.updateHistoryOrders(this.pageparams);
    //   this.entrustData = dataStore;
    //   console.log(dataStore);
    //   // this.entrustData = dataStore.pendingOrders;
    // }
  }

  changePriceAndMount(obj1: any, obj2: any) {
    this.businessPrice = obj1;
    this.priceString = obj1.split('.')[1].length;
    this.baseNum = 1 / Math.pow(10, this.priceString);
    this.inputVal = obj2;
  }
  showMsg() {
    MessageBox({
      title: languageStore.getIntlText('business.Tips'),
      message: languageStore.getIntlText('business.tipeos'),
      confirmButtonText: languageStore.getIntlText('business.yes'),
    });
  }
  changeNowPrice1() {
    this.sheetVisible = false;
    this.orderType = 'limit';
  }
  changeNowPrice2() {
    this.sheetVisible = false;
    this.orderType = 'market';
  }
  showNowPrice() {
    this.sheetVisible = true;
  }
  getRangeValue(obj: number) {
    if (!this.accountInfo) return;
    const accountValue = parseFloat(this.balance.amount || '0');
    const businessPrice = parseFloat(this.businessPrice);
    const maxCount = Math.floor((accountValue / businessPrice) * 10000) / 10000;
    this.rangeValue = obj;
    if (obj === 0) {
      this.changeEos = '0.0000';
      this.inputVal = '';
    } else if (
      (this.orderSide === 'bid' && this.orderType === 'market') ||
      this.orderType === 'ask'
    ) {
      this.inputVal = ((accountValue * obj) / 100).toFixed(4);
    } else {
      this.inputVal = ((maxCount * obj) / 100).toFixed(4);
    }
  }

  changePrice(num: number) {
    const oldPrice = parseFloat(this.businessPrice);
    if (num === 0) {
      this.businessPrice = (oldPrice - this.baseNum).toFixed(6);
    } else if (num === 1) {
      this.businessPrice = (oldPrice + this.baseNum).toFixed(6);
    }
  }

  handleChangeIpt(e: any) {
    if (!this.accountInfo) return;
    const accountValue = parseFloat(this.accountInfo.eos.available.amount);
    const businessPrice = parseFloat(this.businessPrice);
    const maxCount = Math.floor((accountValue / businessPrice) * 10000) / 10000;
    this.inputVal = `${Math.floor(Number(e.target.value) * 10000) / 10000}`;
    if (!this.inputVal) return;
    this.changeEos = Math.floor(businessPrice * parseFloat(this.inputVal) * 10000) / 10000;
  }

  changePopupVisible(obj: any) {
    this.popupVisible = obj;
  }
  goBusiness() {
    const market = this.currentMarket!;
    const orderType = this.orderType;
    const timeInforce = orderType === 'market' ? 'fok' : 'gtc';
    const orderSide = this.orderSide;
    const baseName = this.baseCurrencyName;
    const quoteName = this.quoteCurrencyName;
    const baseContract = market.pair.baseCurrency.contract;
    const quoteContract = market.pair.quoteCurrency.contract;
    const contract = orderSide === 'bid' ? quoteContract : baseContract;

    const size = parseFloat(this.inputVal);
    const price = parseFloat(this.businessPrice);
    let sizeAsset = `${size.toFixed(4)} ${baseName}`;
    let priceAsset = `${price.toFixed(6)} ${quoteName}`;
    let quantityAsset = '';

    if (orderType === 'limit' && orderSide === 'bid') {
      quantityAsset = `${(size * price).toFixed(4)} ${quoteName}`;
    } else if (orderType === 'limit' && orderSide === 'ask') {
      quantityAsset = `${size.toFixed(4)} ${baseName}`;
    } else if (orderType === 'market' && orderSide === 'bid') {
      sizeAsset = `0.0000 ${quoteName}`;
      priceAsset = `0.000000 ${quoteName}`;
      quantityAsset = `${size.toFixed(4)} ${quoteName}`;
    } else if (orderType === 'market' && orderSide === 'ask') {
      sizeAsset = `0.0000 ${baseName}`;
      priceAsset = `0.000000 ${quoteName}`;
      quantityAsset = `${size.toFixed(4)} ${baseName}`;
    }

    this.createOrder({
      market_id: market.marketId,
      price: priceAsset,
      size: sizeAsset,
      coin_contract: contract,
      order_side: orderSide,
      order_type: orderType,
      time_in_force: timeInforce,
      post_only: 0,
      quantity: quantityAsset,
    })
      .then(() => {
        Toast({
          message: '已提交，待区块确认',
          iconClass: 'ic_correct',
          duration: 2000,
        });
      })
      .catch((err: Error) => {
        Toast({
          message: err.message,
          iconClass: 'ic_correct',
          duration: 2000,
        });
      });

    // Toast({
    //   message: 'EOS余额不足',
    // });
  }
  showCoinData() {
    this.popupVisible = true;
  }
  getPrevPage() {
    this.$router.push({
      name: 'market',
      params: {
        id: this.$route.params.id,
      },
    });
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin.scss';
$marginwidth: 0.12rem;
.business {
  width: 100%;
  position: relative;
  margin-bottom: 0.5rem;
}
.business-coin-title,
.business-show-data {
  border-bottom: 0.01rem solid rgba(242, 245, 251, 1);
  margin: 0 0.2rem;
  @include flex(flex, center, space-between);
}
.business-coin-title {
  @include wh(auto, 0.5rem);
  .business-coin-name {
    @include flex(flex, center, flex-start);
    & > span,
    & > i {
      @include font(500, 0.16rem, 0.22rem, 'PingFangSC-Regular');
      color: rgba(0, 0, 0, 1);
    }
    i {
      @include wh(0.12rem, 0.12rem);
      margin-left: 0.06rem;
      cursor: pointer;
      @include bis('./../../../images/mobile/ic_arrow_under.svg');
    }
  }
  .business-coin-image {
    display: flex;
    .business-coin-star,
    .business-coin-img1 {
      @include wh(0.18rem, 0.18rem);
    }
    .business-coin-star {
      @include bis('./../../../images/mobile/ic_collection_s.svg');
    }
    .business-coin-img1 {
      margin-left: 0.15rem;
      @include bis('./../../../images/mobile/ic_chart.svg');
    }
    .business-coin-star-fav {
      @include bis('./../../../images/mobile/ic_collection_current_s.svg');
    }
  }
}

.business-show-data {
  border-bottom: none;
  @include wh(auto, auto);
  @include flex(flex, center, flex-start);
  .business-show-data-left,
  .business-show-data-right {
    margin-bottom: 0.18rem;
  }
}
.business-show-data-left {
  width: calc(50% - #{$marginwidth});
  margin-right: $marginwidth;
  .business-tab {
    @include wh(auto, 0.34rem);
    margin: 0.24rem 0 0.2rem;
    @include flex(flex, center, center);
    .business-tab-buy {
      @include flex(flex, center, center);
      // @include wh(50%, 0.34rem);
      @include font(400, 0.13rem, 0.18rem, 'PingFangSC-Regular');
      color: rgba(141, 141, 141, 1);
      @include wh(50%, 0.34rem);
      // line-height: 0.34rem;
      // display: inline-block;
      border: 1px solid rgba(242, 245, 251, 1);
    }
    .active {
      background-color: rgba(7, 199, 78, 1);
      color: #fff;
      border: none;
      @include borderRadius(2px);
    }
    .active.tab2 {
      background-color: rgba(255, 0, 0, 1);
      border: none;
    }
  }
  .left-title {
    margin: 0 0 0.2rem;
    padding: 0 0.08rem;
    @include wh(100%, 0.34rem);
    border: 1px solid rgba(242, 245, 251, 1);
    @include borderRadius(2px);
    @include flex(flex, center, space-between);
    span {
      @include font(400, 0.15rem, 0.21rem, 'PingFangSC-Regular');
      color: rgba(0, 0, 0, 1);
    }
    i {
      margin-left: 0.06rem;
      @include wh(0.12rem, 0.12rem);
      @include bis('./../../../images/mobile/ic_arrow_under.svg');
    }
  }
  .business-price,
  .business-mount {
    margin: 0.13rem 0;
    @include wh(100%, 0.34rem);
    @include borderRadius(0.02rem);
    border: 1px solid rgba(216, 216, 216, 1);
    @include flex(flex, center, space-between);
    flex-direction: row;
  }
  .business-price {
    .business-price-down,
    .business-price-up {
      @include flex(flex, center, center);
      @include wh(0.24rem, 100%);
      @include font(400, 0.15rem, 0.21rem, 'PingFangSC-Light');
      color: rgba(141, 141, 141, 1);
      &:active {
        background-color: rgb(235, 235, 235);
      }
    }
    .business-price-show {
      @include font(400, 0.15rem, 0.21rem, 'PingFangSC-Light');
      color: rgba(0, 0, 0, 1);
    }
    .business-price-down {
      border-right: 1px solid rgba(216, 216, 215, 1);
    }
    .business-price-up {
      border-left: 1px solid rgba(216, 216, 215, 1);
    }
  }
  .business-price-market {
    display: flex;
    justify-content: center;
    > span {
      color: #8d8d8d;
    }
  }
  .business-mount {
    padding: 0 0.08rem;
    margin: 0.26rem 0 0;
    input,
    span {
      @include font(400, 0.15rem, 0.21rem, 'PingFangSC-Light');
    }
    input {
      width: 100%;
      border: none;
      color: rgba(0, 0, 0, 1);
    }
    span {
      color: rgba(141, 141, 141, 1);
    }
  }
  .business-change-eos {
    margin-top: 0.06rem;
    @include font(400, 0.12rem, 0.17rem, 'PingFangSC-Light');
    display: flex;
    text-align: left;
    color: rgba(141, 141, 141, 1);
  }
  .use-mount {
    margin-bottom: 0.24rem;
    @include flex(flex, center, space-between);
    .use-mount-left,
    .use-mount-right {
      @include font(400, 0.12rem, 0.17rem, 'PingFangSC-Regular');
      color: rgba(0, 0, 0, 1);
    }
    .use-mount-right {
      color: rgba(141, 141, 141, 1);
    }
  }
  .goBusiness {
    height: 0.34rem;
    width: 100%;
    @include flex(flex, center, center);
    @include font(500, 0.16rem, 0.22rem, 'PingFangSC-Medium');
    color: rgba(255, 255, 255, 1);
    border-radius: 2px;
  }
  .businessBuy {
    background-color: rgba(7, 199, 78, 1);
  }
  .businessSell {
    background-color: rgba(255, 0, 0, 1);
  }
}
.business-show-data-right {
  width: calc(50% - #{$marginwidth});
  margin-left: $marginwidth;
  margin-top: 0.24rem;
  font-size: 0.12rem;
  display: flex;
  flex-direction: column;
  .right-top,
  .right-middle,
  .right-bottom {
    width: 100%;
    height: auto;
    display: flex;
    height: 1.45rem;
  }
  .right-top {
    width: 100%;
    height: auto;
    display: flex;
    height: 1.765rem;
  }
  .right-top {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .coin-item-box {
      overflow-y: scroll;
    }
    .coin-items {
      display: flex;
      @include wh(100%, auto);
      position: relative;
      & > div {
        width: 50%;
        color: rgba(255, 0, 0, 1);
        @include font(400, 0.12rem, 0.26rem, 'PingFangSC-Regular');
      }
      .coin-price {
        text-align: left;
      }
      .coin-mount {
        text-align: right;
      }
      i {
        height: 50%;
        position: absolute;
        top: 26%;
        left: 0;
        background: rgba(255, 0, 0, 0.1);
      }
    }
    .header {
      height: 1.5rem;
      & > div {
        color: rgba(141, 141, 141, 1);
        @include font(400, 0.14rem, 0.2rem, 'PingFangSC-Regular');
      }
    }
  }
  .right-middle {
    height: 0.23rem;
    border: 1px solid rgba(238, 238, 238, 1);
    border-left: none;
    border-right: none;
    margin: 0.03rem 0;
    @include flex(flex, center, center);
    span,
    i {
      color: rgba(255, 0, 0, 1);
      @include font(400, 0.14rem, 0.2rem, 'PingFangSC-Regular');
    }
    i {
      @include wh(5px, 12px);
      margin-left: 0.04rem;
      @include bis('./../../../images/mobile/ic_Fall_s.svg');
    }
  }
  .middle-active {
    span,
    i {
      color: rgba(7, 199, 78, 1);
    }
    i {
      @include bis('./../../../images/mobile/ic_rise_s.svg');
    }
  }
  .middle-red {
    span {
      color: rgba(255, 0, 0, 1);
    }
    i {
      @include bis('./../../../images/mobile/ic_rise_s.svg');
    }
  }
  .right-bottom {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .coin-item-box {
      overflow-y: scroll;
    }
  }
}
.business-entrust {
  width: auto;
  padding-top: 0.04rem;
  background-color: rgba(242, 245, 251, 1);
  @include flex(flex, center, space-between);
  flex-direction: column;
}
.business-entrust-header {
  padding: 0 0.2rem;
  background-color: rgba(255, 255, 255, 1);
  @include flex(flex, center, space-between);
  height: 0.5rem;
  width: 100%;
  border-bottom: 1px solid rgba(242, 245, 251, 1);
  .entrust-tabs {
    display: flex;
    flex-direction: row;
    .entrust-tab-item {
      @include flex(flex, center, space-between);
      flex-direction: column;
      margin-right: 0.36rem;
    }
    span {
      @include flex(flex, center, center);
      height: 0.47rem;
      color: rgba(141, 141, 141, 1);
      @include font(300, 0.13rem, 0.18rem, 'PingFangSC-Light');
    }
    .entrust-active {
      span {
        color: rgba(0, 122, 255, 1);
        @include font(600, 0.13rem, 0.18rem, 'PingFangSC-Semibold');
      }
      i {
        @include wh(24px, 3px);
        background: rgba(0, 122, 255, 1);
        border-radius: 2px;
      }
    }
  }
  .entrust-img {
    @include flex(flex, center, flex-end);
    i {
      @include wh(0.12rem, 0.12rem);
      @include bis('./../../../images/mobile/ic_prompt.svg');
    }
    span {
      @include flex(flex, center, center);
      margin-left: 0.04rem;
      @include font(300, 0.12rem, 0.17rem, 'PingFangSC-Light');
    }
  }
}
.business-entrust-body {
  width: 100%;
  background: rgba(247, 247, 247, 1);
  @include flex(flex, center, center);
  max-height: inherit;
  .loadmore-list {
    @include wh(100%, auto);
  }
}
.show-item {
  @include flex(flex, flex-start, flex-start);
  background: rgba(255, 255, 255, 1);
  height: 100%;
  // margin-bottom: 0.5rem;
}
.show-no-item {
  height: 1.7rem;
}
.entrust-item:nth-last-child(1) {
  .entrust-item-body {
    border-bottom: none;
  }
}
</style>
