<template>
  <div class="business" id="business">
    <div class="business-coin-title">
      <div class="business-coin-name" @click="showCoinData">
        <span>{{coinName}}</span>
        <i></i>
      </div>
      <div class="business-coin-image">
        <i
          :class="['business-coin-star',{'business-coin-star-fav' : isFavorite.indexOf(routeId) !== -1}]"
          @click="getFav"
        ></i>
        <i class="business-coin-img1"></i>
      </div>
    </div>
    <div class="business-show-data">
      <div class="business-show-data-left">
        <div class="business-tab">
          <div
            :class="['business-tab-buy', {active : currrentTab === tab}, {tab2: index === 1}]"
            @click="changeTab(tab)"
            v-for="(tab,index) in tabs"
            :key="tab"
          >{{tab}}</div>
        </div>
        <div class="left-title" @click="showNowPrice">
          <span>{{showSheetName}}</span>
          <i></i>
        </div>
        <div class="business-price">
          <div class="business-price-down" @click="businessPrice--">-</div>
          <div class="business-price-show">{{businessPrice}}</div>
          <div class="business-price-up" @click="businessPrice++">+</div>
        </div>
        <div class="business-mount">
          <input type="text" v-model="inputVal">
          <span>WIZBOX</span>
        </div>
        <div class="business-change-eos">{{`≈${changeEos}EOS`}}</div>
        <BusinessRange
          :currrentTab="currrentTab"
          @getRangeValue="getRangeValue"
          :rangeValue="rangeValue"
          :cricleMount="cricleMount"
        ></BusinessRange>
        <div class="use-mount">
          <div class="use-mount-left">{{`${thisBal}EOS：${getUseMount}`}}</div>
          <div class="use-mount-right">{{`${rangeValue}%`}}</div>
        </div>
        <div
          id="goBusiness"
          :class="currrentTab === '买入' || currrentTab === 'Buy' ? 'businessBuy' : 'businessSell'"
          @click="goBusiness"
        >{{currrentTab}}</div>
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
              v-for="(item, index) in tradeData"
              :item="item"
              :key="index"
              :tradeDataMountSum="tradeDataMountSum"
            ></BusinessTradeItem>
          </div>
        </div>
        <div
          :class="['right-middle',{'middle-active':currrentTab === '买入' || currrentTab === 'Buy'}]"
        >
          <span>0.0200</span>
          <i></i>
        </div>
        <div class="right-bottom">
          <div class="coin-item-box">
            <BusinessTradeItem
              :tradeType="'buy'"
              :changePriceAndMount="changePriceAndMount"
              v-for="(item, index) in tradeData"
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
        :class="['business-entrust-body',{'show-item':entrustData.pendingOrders.length !== 0}]"
        v-if="entrustType === 0"
      >
        <ShowMessageImg
          v-if="entrustData.pendingOrders.length === 0"
          :imgUrl="imgUrl"
          :imgMsg="imgMsg"
        ></ShowMessageImg>
        <div class="loadmore-list" v-else>
          <BusinessEntrust
            v-for="(item,index) in entrustData.pendingOrders"
            :item="item"
            :routeParam="routeParam"
            :entrustType="entrustType"
            :key="index"
          ></BusinessEntrust>
        </div>
      </div>
      <div
        :class="['business-entrust-body',{'show-item':entrustData.historyOrders.orders.length !== 0}]"
        v-else
      >
        <ShowMessageImg
          v-if="entrustData.historyOrders.orders.length === 0"
          :imgUrl="imgUrl"
          :imgMsg="imgMsg"
        ></ShowMessageImg>
        <div class="loadmore-list" v-else>
          <Loadmore
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            @bottom-status-change="handleBottomChange"
            ref="loadmore"
          >
            <BusinessEntrust
              v-for="(item,index) in entrustData.historyOrders.orders"
              :item="item"
              :routeParam="routeParam"
              :entrustType="entrustType"
              :key="index"
            ></BusinessEntrust>
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
    <mt-actionsheet :actions="sheetActions" :cancelText="cancel" v-model="sheetVisible"></mt-actionsheet>
    <ShowCoinList
      :popupVisible="popupVisible"
      :dataCoinList="dataCoinList"
      @changePopupVisible="changePopupVisible"
    ></ShowCoinList>
    <!-- <mt-popup v-model="popupVisible" popup-transition="popup-fade"></mt-popup> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import onfire from 'onfire.js';
import { Observer } from 'mobx-vue';
import ShowMessageImg from './../../../components/messageImage.vue';
import BusinessTradeItem from './components/businessTrade.vue';
import BusinessEntrust from './components/businessEntrust.vue';
import BusinessRange from './components/businessRange.vue';
import ShowCoinList from './components/businessCoin.vue';
import { MessageBox, Toast, Loadmore } from 'mint-ui';
import languageStore from '@/stores/language';
import { Market } from '@/define';
import { orderHistory } from '../../../utils/restful';
import dataStore from '@/stores/data';

const tradeData = [
  {
    price: 0.00231,
    mount: 12,
  },
  {
    price: 0.00231,
    mount: 122,
  },
  {
    price: 0.10231,
    mount: 1,
  },
  {
    price: 0.00231,
    mount: 34,
  },
  {
    price: 0.00231,
    mount: 132,
  },
  {
    price: 0.10231,
    mount: 1,
  },
  {
    price: 0.00231,
    mount: 34,
  },
  {
    price: 0.00231,
    mount: 132,
  },
];
const dataList = [
  //币种及价格
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0002094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.02333094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0002094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.02333094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0002094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.02333094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0002094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.02333094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0002094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.02333094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
  {
    name: 'LTC/EOS',
    price: 0.0000094,
    change: '+ 104.019%',
  },
];
const entrustData = [{}];
interface PageParam {
  page?: number;
  pageSize?: number;
}

@Observer
@Component({
  components: {
    ShowMessageImg,
    BusinessTradeItem,
    BusinessEntrust,
    BusinessRange,
    ShowCoinList,
    Loadmore,
  },
})
export default class extends Vue {
  cricleMount = [0, 1, 2, 3, 4];
  rangeValue = 0;
  entrustType = 0;
  pageparams: PageParam = { page: 1, pageSize: 10 };
  cancel = languageStore.getIntlText('business.cancel');
  popupVisible = false; //币种弹
  sheetVisible = false; //价格弹
  businessPrice = 3422.02; //交易价
  inputVal = 0; //交易
  routeParam: any = '';
  coinName: any = '';
  isFavorite: any = [];
  routeId: number = -1;
  changeEos = 0.00001;
  currrentTab = '卖出';
  thisBal = languageStore.getIntlText('business.Bal');
  tabs = [languageStore.getIntlText('business.Buy'), languageStore.getIntlText('business.Sell')];
  entrustData: any = dataStore;
  imgUrl = require('./../../../images/mobile/ic_nodata.png');
  imgMsg = languageStore.getIntlText('business.nodata');
  tradeData = tradeData;
  tradeDataMountSum = 0;
  useMount = 0;
  showSheetName = languageStore.getIntlText('business.Limit');
  dataCoinList = dataList;

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

  get getUseMount() {
    this.useMount -= this.rangeValue / 100;
    return this.useMount.toFixed(5);
  }

  created() {
    this.getSumMount();

    // this.entrustData = entrustData
    const arr = localStorage.getItem('isFavorite');
    if (!arr) return;
    this.isFavorite = JSON.parse(arr);
    const transPair = localStorage.getItem('transPair');
    if (!transPair) return;
    this.coinName = transPair || this.$route.params.coinName;
  }

  mounted() {
    dataStore.updateMarkets();
    // const eventObj = onfire.on('tickerUpdate', callback);
    this.routeParam = this.$route.params;

    console.log(this.$route.params);
    this.routeId = Number(this.$route.params.id);
    this.currrentTab =
      this.$route.params.type === 'buy'
        ? languageStore.getIntlText('business.Buy')
        : languageStore.getIntlText('business.Sell');
  }

  beforeDestory() {
    // onfire.un(eventObj);
  }

  async getOrderHistory() {
    try {
      const res = await orderHistory('admin', {
        page: 1,
        pageSize: 10,
      });
    } catch (err) {
      console.log(err);
    }
  }
  getFav() {
    if (this.isFavorite.indexOf(this.routeId) !== -1) {
      this.isFavorite = this.isFavorite.filter((e: any) => e !== this.routeId);
      localStorage.setItem('localFavourite', JSON.stringify(this.isFavorite));
    } else {
      this.isFavorite.push(this.routeId);
      localStorage.setItem('localFavourite', JSON.stringify(this.isFavorite));
    }
    dataStore.freeMarketList;
  }

  handleBottomChange(status: any) {
    this.bottomStatus = status;
  }
  loadBottom() {
    // 加载更多数据
    if (!this.pageparams.page) return;
    if (!this.pageparams.pageSize) return;
    this.pageparams.page += 1;
    dataStore.updateHistoryOrders(this.pageparams);
    console.log(dataStore.historyOrders);
    if (
      Math.ceil(dataStore.historyOrders.count / this.pageparams.pageSize) === this.pageparams.page
    ) {
      this.allLoaded = true; // 若数据已全部获取完毕
    }
    this.$refs.loadmore.onBottomLoaded();
  }

  changeTab(val: any) {
    this.currrentTab = val;
  }
  changeEntrustType(type: any) {
    this.entrustType = type;
    if (type === 0) {
      dataStore.updatePendingOrders();
      this.entrustData = dataStore;
      console.log(dataStore);
    } else {
      dataStore.updateHistoryOrders(this.pageparams);
      this.entrustData = dataStore;
      console.log(dataStore);
      // this.entrustData = dataStore.pendingOrders;
    }
  }
  getSumMount() {
    this.tradeData.forEach(item => {
      this.tradeDataMountSum += item.mount;
    });
  }
  changePriceAndMount(obj1: any, obj2: any) {
    this.businessPrice = obj1;
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
    this.showSheetName = languageStore.getIntlText('business.Limit');
    this.sheetVisible = false;
  }
  changeNowPrice2() {
    this.showSheetName = languageStore.getIntlText('business.Market');
    this.sheetVisible = false;
  }
  showNowPrice() {
    this.sheetVisible = true;
  }
  getRangeValue(obj: any) {
    this.rangeValue = obj;
  }
  changePopupVisible(obj: any) {
    this.popupVisible = obj;
  }
  goBusiness() {
    //交易
    Toast({
      message: '已提交，待区块确认',
      iconClass: 'ic_correct',
      duration: 2000,
    });

    // Toast({
    //   message: 'EOS余额不足',
    // });
  }
  showCoinData() {
    this.popupVisible = true;
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin.scss';
$marginwidth: 0.12rem;
.business {
  @include wh(100%, 100%);
  position: relative;
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
      @include font(300, 0.16rem, 0.22rem, 'PingFangSC-Regular');
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
  .business-mount {
    padding: 0 0.08rem;
    margin: 0.26rem 0 0;
    input,
    span {
      @include font(400, 0.15rem, 0.21rem, 'PingFangSC-Light');
    }
    input {
      width: 55%;
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
  #goBusiness {
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
      height: 0.375rem;
      & > div {
        color: rgba(141, 141, 141, 1);
        @include font(400, 0.15rem, 0.21rem, 'PingFangSC-Regular');
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
  @include wh(100%, 1.85rem);
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
}
</style>
