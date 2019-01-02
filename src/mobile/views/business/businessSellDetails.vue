<template>
  <div class="business-sell-details" :getParams="getParams" >
    <FixHeader :msg="msg"></FixHeader>
    <div class="sell-body">
      <div class="line"></div>
      <div class="details-item">
        <div class="details-item-header">
          <div class="item-header-left">
            <span>{{dataTime}}</span>
            <Language resource="business.Order"/>
          </div>
          <div :class="['item-header-right',{green:thisOrderType === 'buy'}]">
            <Language resource="business.Dealt"/>
          </div>
        </div>
        <div class="details-item-body">
          <div class="item-body-top">
            <div class="entrust-box1">
              <div class="box-title">
                <Language resource="business.Order_Price"/>(EOS)
              </div>
              <div class="box-data">{{tradeItem.price.amount}}</div>
            </div>
            <div class="entrust-box2">
              <div class="box-title">
                <Language resource="business.Order_VOL"/>(POKER)
              </div>
              <div class="box-data">{{tradeItem.size.amount}}</div>
            </div>
            <div class="entrust-box3">
              <div class="box-title">
                <Language resource="business.VOL"/>(POKER)
              </div>
              <div
                class="box-data"
              >{{tradeItem.filled.amount === 0 ? '—' : tradeItem.filled.amount}}</div>
            </div>
          </div>
          <div class="item-body-bottom">
            <div class="entrust-box1">
              <div class="box-title">
                <Language resource="business.AVG_Price"/>(EOS)
              </div>
              <div class="box-data">{{tradeItem.avgPrice.amount}}</div>
            </div>
            <div class="entrust-box2">
              <div class="box-title">
                <Language resource="business.Total"/>(EOS)
              </div>
              <div class="box-data">{{tradeItem.filledQuote.amount}}</div>
            </div>
            <div class="entrust-box3">
              <div class="box-title">
                <Language resource="business.Fee"/>(EOS)
              </div>
              <div class="box-data">{{tradeItem.fees.amount}}</div>
            </div>
          </div>
        </div>
      </div>
      <SellDetailsItem v-for="(item,index) in items" :key="index" :item="item"></SellDetailsItem>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { getOrderFills } from '@/utils/apis';
import { Observer } from 'mobx-vue';
import { Orderbook } from '@/define';
import { formatTimes } from '@/utils/formatTime';
import dataStore from '@/stores/data';
import FixHeader from './components/fixHeader.vue';
import SellDetailsItem from './components/sellDetailsItem.vue';

@Observer
@Component({
  components: {
    FixHeader,
    SellDetailsItem,
  },
})
export default class BusinessSellDetails extends Vue {
  // data
  msg: any = '';
  orderId: number = 0;
  items: any = [];
  dataTime: any = '';
  thisOrderType: string = '';
  tradeItem: any = {
    orderId: 0, // 订单ID
    marketId: 0, // 市场ID
    account: '', // 用户名
    time: '', // 下单时间
    side: '',
    type: '',
    timeInForce: '',
    status: '',
    price: { amount: 0 }, // 订单价格
    size: { amount: 0 }, // 订单数量
    filled: { amount: 0 }, // 已撮合数量
    avgPrice: { amount: 0 }, // 订单价格
    filledQuote: { amount: 0 }, // 订单数量
    fees: { amount: 0 }, // 已撮合数量
    trxId: '', // 下单交易哈希
  };
  get getParams() {
    // 取到路由带过来的参数
    const routerParams = this.$route.params;
    // 将数据放在当前组件的数据内
    this.msg = routerParams;
    console.log(this.msg);
    return this.msg;
  }
  mounted() {
    this.orderId = Number(this.$route.params.orderId);
    this.tradeItem = this.$route.params.tradeItem;
    console.log(this.tradeItem);
    this.dataTime = formatTimes(this.tradeItem.time, 'YYYY-MM-DD HH:mm:ss');
    this.thisOrderType = this.$route.params.type;
    this.orderFills();
  }

  orderFills() {
    getOrderFills(this.orderId).then(res => {
      this.items = res;
      console.log(this.items);
    });

    return this.items;
  }
  // @Watch('this.$route')
  // watchthisRoute() {
  //   // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
  //   this.getParams();
  // }
  // watch: {
  //   // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
  //   $route: 'getParams',
  // },
}
</script>
<style lang="scss" scoped>
@import './../../../style/mixin.scss';
.business-sell-details {
  @include wh(100%, 100%);
}
.sell-body {
  @include wh(100%, 100%);
  margin-top: 0.4rem;
  .line {
    background: rgba(242, 245, 251, 1);
    @include wh(100%, 0.04rem);
  }
  .details-item {
    padding: 0.16rem 0.2rem;
    @include wh(100%, auto);
    display: flex;
    flex-direction: column;
  }
  .gray {
    background-color: rgba(242, 245, 251, 1);
  }
}
.details-item-header,
.details-item-body {
  @include flex(flex, center, space-between);
}
.details-item-header {
  .item-header-left,
  .item-header-right {
    span {
      text-align: left;
      @include font(300, 0.14rem, 0.2rem, 'PingFangSC-Light');
      color: rgba(0, 0, 0, 1);
    }
  }
  .item-header-left {
    width: inherit;
    display: flex;
    align-items: flex-start;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    span:nth-child(2) {
      font-weight: 400;
      margin-left: 0.1rem;
    }
    .show-address {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: rgba(0, 122, 255, 1);
    }
  }
  .item-header-right {
    span {
      color: rgba(255, 0, 0, 1);
      text-align: right;
    }
  }
  .green {
    span {
      color: rgba(7, 199, 78, 1);
    }
  }
}
.details-item-body {
  @include wh(100%, auto);
  @include flex(flex, center, space-between);
  flex-direction: column;
  margin-top: 0.06rem;
  & > div {
    @include wh(100%, auto);
    margin: 0.1rem 0 0;
    @include flex(flex, center, space-between);
    & > div {
      display: flex;
      flex-direction: column;
    }
  }
  .entrust-box1 {
    & > div {
      text-align: left;
    }
  }
  .entrust-box3 {
    & > div {
      text-align: right;
    }
  }
  .box-title {
    color: rgba(102, 102, 102, 1);
    @include font(300, 0.12rem, 0.17rem, 'PingFangSC-Light');
  }
  .box-data {
    margin-top: 0.02rem;
    @include font(500, 0.14rem, 0.2rem, 'PingFangSC-Medium');
    color: rgba(0, 0, 0, 1);
  }
  .blue-color {
    color: rgba(0, 122, 255, 1);
  }
}
</style>
