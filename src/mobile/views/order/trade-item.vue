<template>
  <div class="details-item gray">
    <div class="details-item-header">
      <div class="item-header-left">
        <span>TrxID</span>
        <span
          class="show-address"
        >{{ trxId }}</span>
      </div>
      <div class="item-header-right">
        <span></span>
      </div>
    </div>
    <div class="details-item-body details-item-body-gray">
      <div class="item-body-top">
        <div class="entrust-box1">
          <div class="box-title">
            <Language resource="transaction.deal_price"/>({{ priceSymbolName }})
          </div>
          <div class="box-data">{{ trade.price.amount }}</div>
        </div>
        <div class="entrust-box2">
          <div class="box-title">
            <Language resource="transaction.deal_amount"/>({{ sizeSymbolName }})
          </div>
          <div class="box-data">{{ trade.size.amount }}</div>
        </div>
        <div class="entrust-box3">
          <div class="box-title">
            <Language resource="business.total"/>({{ priceSymbolName }})
          </div>
          <div class="box-data">{{ dealVOL }}</div>
        </div>
      </div>
      <div class="item-body-bottom">
        <div class="entrust-box1">
          <div class="box-title">
            <Language resource="business.Deal_Account"/>
          </div>
          <div class="box-data blue-color">{{ dealAccount }}</div>
        </div>
        <div class="entrust-box2">
          <div class="box-title">
            <Language resource="transaction.deal_Time"/>
          </div>
          <div class="box-data">{{ trade.time | formatDate('MM/DD HH:mm') }}</div>
        </div>
        <div class="entrust-box3">
          <div class="box-title">
            <Language resource="business.Fee"/>({{ fee.symbol.symbol.name }})
          </div>
          <div class="box-data">{{ fee.amount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { formatTimes } from '@/utils/formatTime';
import { Trade } from '@/define';

@Component
export default class SellDetailsItem extends Vue {
  @State('accountName')
  accountName!: string;

  @Prop()
  trade!: Trade;

  get isSeller() {
    return this.accountName === this.trade.seller;
  }

  get trxId() {
    if (this.isSeller) {
      return this.trade.trxIds.sellerSettlementTrxId;
    }
    return this.trade.trxIds.buyerSettlementTrxId;
  }

  get priceSymbolName() {
    return this.trade.price.symbol.name;
  }

  get sizeSymbolName() {
    return this.trade.size.symbol.name;
  }

  get fee() {
    if (this.isSeller) {
      return this.trade.sellerFee;
    }
    return this.trade.buyerFee;
  }

  get dealAccount() {
    if (this.isSeller) {
      return this.trade.seller;
    }
    return this.trade.buyer;
  }

  get dealVOL() {
    const size = parseFloat(this.trade.size.amount);
    const price = parseFloat(this.trade.price.amount);
    return (size * price).toFixed(4);
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/mixin.scss';

.details-item {
  padding: 0.16rem 0.2rem;
  @include wh(100%, auto);
  display: flex;
  flex-direction: column;
}
.gray {
  background-color: rgba(242, 245, 251, 1);
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
.details-item-body-gray {
  border-top: 0.01rem solid rgba(216, 216, 216, 1);
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
