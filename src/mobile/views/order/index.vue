<template>
  <div class="business-sell-details" v-if="order">
    <div class="sell-body">
      <div class="line"></div>
      <div class="details-item">
        <div class="details-item-header">
          <div class="item-header-left">
            <span>{{ order.time | formatDate('YYYY/MM/DD HH:mm:ss') }}</span>
            <Language resource="business.Order"/>
          </div>
          <div :class="['item-header-right',{green: order.side === 1}]">
            <Language resource="business.Dealt"/>
          </div>
        </div>
        <div class="details-item-body">
          <div class="item-body-top">
            <div class="entrust-box1">
              <div class="box-title">
                <Language resource="business.Order_Price"/>({{ priceSymbolName }})
              </div>
              <div class="box-data">{{order.price.amount}}</div>
            </div>
            <div class="entrust-box2">
              <div class="box-title">
                <Language resource="business.Order_VOL"/>({{ sizeSymbolName }})
              </div>
              <div class="box-data">{{order.size.amount}}</div>
            </div>
            <div class="entrust-box3">
              <div class="box-title">
                <Language resource="business.VOL"/>({{ sizeSymbolName }})
              </div>
              <div
                class="box-data"
              >{{ order.filled.amount === 0 ? '—' : order.filled.amount }}</div>
            </div>
          </div>
          <div class="item-body-bottom">
            <div class="entrust-box1">
              <div class="box-title">
                <Language resource="business.AVG_Price"/>({{ priceSymbolName }})
              </div>
              <div class="box-data">{{ order.avgPrice.amount }}</div>
            </div>
            <div class="entrust-box2">
              <div class="box-title">
                <Language resource="business.Total"/>({{ priceSymbolName }})
              </div>
              <div class="box-data">{{ order.filledQuote.amount }}</div>
            </div>
            <div class="entrust-box3">
              <div class="box-title">
                <Language resource="business.Fee"/>({{ priceSymbolName }})
              </div>
              <div class="box-data">{{order.fees.amount}}</div>
            </div>
          </div>
        </div>
      </div>
      <TradeItem v-for="(item,index) in trades" :key="index" :trade="item"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { getOrderFills, getOrderDetail } from '@/utils/apis';
import { Observer } from 'mobx-vue';
import { Order, Trade } from '@/define';
import { formatTimes } from '@/utils/formatTime';
import TradeItem from './trade-item.vue';

@Observer
@Component({
  components: {
    TradeItem,
  },
})
export default class BusinessSellDetails extends Vue {
  order: Order | null = null;

  trades: Trade[] = [];

  get priceSymbolName() {
    return this.order && this.order.price.symbol.name;
  }

  get sizeSymbolName() {
    return this.order && this.order.size.symbol.name;
  }

  created() {
    this.initData();
  }

  async initData() {
    const id = parseInt(this.$route.params.id, 10);
    [this.order, this.trades] = await Promise.all([getOrderDetail(id), getOrderFills(id)]);
  }
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
