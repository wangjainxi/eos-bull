<template>
  <div class="deal-box">
    <div class="order-top">
      <div class="tab-box">
        <span class="tab-title time-mark"><Language resource="transaction.time"/></span>
        <span class="tab-title price-mark"><Language resource="transaction.price"/>(EOS)</span>
        <span class="tab-title size-mark"><Language resource="transaction.amount"/>(WIZBOX)</span>
      </div>
    </div>
    <div class="order-content">
      <div class="buy-part">
        <DealItem :data="recentDealData"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getMarketTrades } from '@/utils/apis';
import DealItem from './DealItem.vue';

@Component({
  components: {
    DealItem,
  },
})
export default class DealTab extends Vue {
  @Prop() recentDealData!: any;
  dealData: any[] = [];
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';

.deal-box {
  .order-top {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    height: 0.35rem;
    line-height: 0.35rem;

    .tab-box {
      @include flexLayout(row, space-between, center);
      border-bottom: 0.01rem solid rgba(242, 245, 251, 1);
      font-size: 0.12rem;

      > span {
        flex: 1;
      }

      .time-mark {
        text-align: left;
      }

      .price-mark {
        text-align: center;
        width: 0.6rem;
      }

      .size-mark {
        text-align: right;
      }

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
