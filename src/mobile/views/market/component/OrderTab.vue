<template>
  <div class="order-box">
    <div class="order-top">
      <div class="tab-box">
        <span>
          <span class="buy-text"><Language resource="transaction.buy"/></span>
          <span class="tab-title"><Language resource="transaction.amount"/></span>
        </span>
        <span class="tab-title"><Language resource="transaction.price"/></span>
        <span>
          <span class="tab-title"><Language resource="transaction.amount"/></span>
          <span class="sell-text"><Language resource="transaction.sell"/></span>
        </span>
      </div>
    </div>
    <div class="order-content">
      <div class="buy-part">
        <OrderItem :data="orderData.bids"/>
      </div>
      <div class="sell-part">
        <OrderItem :data="orderData.asks"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import OrderItem from './OrderItem.vue';

@Component({
  components: {
    OrderItem,
  },
})
export default class OrderTab extends Vue {
  @Prop() orderData!: any;
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.order-box {
  .order-top {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    height: 0.35rem;
    line-height: 0.35rem;
    .tab-box {
      @include flexLayout(row, space-between, center);
      border-bottom: 0.01rem solid rgba(242, 245, 251, 1);
      font-size: 0.12rem;
      .buy-text {
        color: rgba(7, 199, 78, 1);
        font-weight: 400;
        margin-right: 0.07rem;
      }
      .sell-text {
        color: rgba(255, 0, 0, 1);
        font-weight: 400;
        margin-left: 0.07rem;
      }
      .tab-title {
        font-size: 0.12rem;
        font-family: PingFangSC-Light;
        font-weight: 300;
        color: rgba(141, 141, 141, 1);
      }
    }
  }
  .order-content {
    @include flexLayout(row, space-between, flex-start);
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    > div {
      flex: 1;
    }
    .buy-part {
      margin-right: 0.07rem;
      > div {
        width: 100%;
      }
    }
    .sell-part {
      > div {
        width: 100%;
      }
    }
  }
}
</style>




