<template>
  <div class="detail-container" @click="onChange" @touchmove.prevent>
    <div class="detail-content" @click.stop>
      <div class="title">{{marketViewStore.itemData.buyerFee.symbol.symbol.name}}/{{marketViewStore.itemData.sellerFee.symbol.symbol.name}}
        <Language resource="transaction.deal_Details"/>
      </div>
      <div class="tans-detail-top">
        <div class="detail-box">
          <div class="detail-item">
            <p>
              <Language resource="transaction.deal_price"/>
            </p>
            <p>{{marketViewStore.itemData.price}}</p>
          </div>
          <div class="detail-item">
            <p>
              <Language resource="transaction.deal_amount"/>
            </p>
            <p>{{marketViewStore.itemData.size}}</p>
          </div>
        </div>
        <div class="detail-box">
          <div class="detail-item">
            <p>
              <Language resource="transaction.total"/>
            </p>
            <p>{{marketViewStore.itemData.size}}</p>
          </div>
          <div class="detail-item">
            <p>
              <Language resource="transaction.deal_Time"/>
            </p>
            <p>{{marketViewStore.itemData.time|formatTime}}</p>
          </div>
        </div>
      </div>
      <div class="trans-buy">
        <div class="trans-type buy-text">
          <Language resource="transaction.buyer"/>
        </div>
        <div class="detail-text-box">
          <p class="text-item">
            <span>
              <Language resource="transaction.eos_Account_Name"/>：
            </span>
            <span class="account account-text">{{marketViewStore.itemData.buyer}}</span>
          </p>
          <p class="text-item">
            <span>
              <Language resource="transaction.settle_total"/>：
            </span>
            <span class="account">{{marketViewStore.itemData.size}}</span>
          </p>
          <p class="text-item">
            <span>
              <Language resource="transaction.fee"/>：
            </span>
            <span class="account">{{marketViewStore.itemData.buyerFee.amount}}</span>
          </p>
          <p class="text-item">
            <span>
              <Language resource="transaction.entrusted_TrxID"/>：
            </span>
            <span class="account">{{marketViewStore.itemData.tradeId}}</span>
          </p>
          <p class="text-item trxBox">
            <span>
              <Language resource="transaction.dealt_TrxID"/>：
            </span>
            <span class="trxId">{{marketViewStore.itemData.trxId}}</span>
          </p>
        </div>
      </div>
      <div class="trans-sell">
        <div class="trans-type buy-text">
          <Language resource="transaction.seller"/>
        </div>
        <div class="detail-text-box">
          <p class="text-item">
            <span>
              <Language resource="transaction.eos_Account_Name"/>：
            </span>
            <span class="account account-text">{{marketViewStore.itemData.seller}}</span>
          </p>
          <p class="text-item">
            <span>
              <Language resource="transaction.settle_total"/>：
            </span>
            <span class="account">{{marketViewStore.itemData.seller}}</span>
          </p>
          <p class="text-item">
            <span>
              <Language resource="transaction.fee"/>：
            </span>
            <span class="account">{{marketViewStore.itemData.sellerFee.amount}}</span>
          </p>
          <p class="text-item">
            <span>
              <Language resource="transaction.entrusted_TrxID"/>：
            </span>
            <span class="account">{{marketViewStore.itemData.tradeId}}</span>
          </p>
          <p class="text-item trxBox">
            <span>
              <Language resource="transaction.dealt_TrxID"/>：
            </span>
            <span class="trxId">{{marketViewStore.itemData.trxId}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import marketViewStore from './marketViewStore';
import { formatTimes } from '@/utils/formatTime';

@Component({
  filters: {
    formatTime: formatTimes,
  },
})
export default class extends Vue {
  @Prop({ required: true }) onTransaction!: string;

  marketViewStore = marketViewStore;

  onChange() {
    marketViewStore.changeStatus(false);
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.trxId {
  width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.detail-container {
  position: fixed;
  top: 0rem;
  left: 0rem;
  width: 100%;
  height: 100%;
  background: rgba(31, 31, 31, 0.67);
  z-index: 9999;
  @include flexLayout(column, center, center);
  .detail-content {
    width: 2.95rem;
    background-color: #fff;
    padding: 0.18rem 0.2rem 0.2rem 0.2rem;
    border-radius: 0.08rem;
    .title {
      font-size: 0.16rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 0.14rem;
    }
  }
  .tans-detail-top {
    .detail-box {
      @include flexLayout(row, flex-start, flex-start);
    }
    .detail-item {
      flex: 1;
      @include flexLayout(column, flex-start, flex-start);
      p:nth-child(2) {
        height: 0.2rem;
        font-size: 0.14rem;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 0.2rem;
      }
    }
    .detail-box:nth-child(1) {
      margin-bottom: 0.1rem;
    }
    .detail-box:nth-child(2) {
      margin-bottom: 0.19rem;
    }
  }
  .trans-buy,
  .trans-sell {
    @include flexLayout(row, flex-start, flex-start);
  }
  .trans-buy {
    margin-bottom: 0.11rem;
  }
  .trans-type {
    width: 0.46rem;
    height: 0.18rem;
    line-height: 0.18rem;
    text-align: center;
    border-radius: 0.02rem;
    font-size: 0.14rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-right: 0.13rem;
  }
  .buy-text {
    background: rgba(7, 199, 78, 1);
  }
  .sell-text {
    background: rgba(255, 0, 0, 1);
  }
  .text-item {
    text-align: left;
    margin-bottom: 0.05rem;
    span:nth-child(1) {
      font-size: 0.12rem;
      font-family: PingFangSC-Light;
      font-weight: 300;
      color: rgba(102, 102, 102, 1);
    }
    span:nth-child(2) {
      font-size: 0.14rem;
      font-family: PingFangSC-Light;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }
    .account-text {
      color: rgba(0, 122, 255, 1) !important;
    }
  }
}
.trxBox {
  @include flexLayout(row, flex-start, center);
}
</style>


