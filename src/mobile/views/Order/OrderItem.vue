<template>
  <div>
    <div class="order-item" v-for="item in data" :key="item.orderId">
      <div class="type-buy">
        <div class="top">
          <span class="left-info">
            <img v-if="item.side === 1" class="type" src="@/images/mobile/ic_buy_c.svg" />
            <img v-else class="type" src="@/images/mobile/ic_sell_c.svg" />
            <span class="currency">
              {{ item.size.symbol.name }}/{{ item.price.symbol.name }}
            </span>
            <span class="time">{{ item.time | formatDate('MM-DD') }}</span>
          </span>
          <span>
            <Button class="btn" type="default" v-if="item.status === 1">
              <Language resource="order.Revoke"/>
            </Button>
            <span v-if="item.status === 0">
              <Language resource="order.Revoked"/>
            </span>
            <span v-if="item.status === 2" class="already-deal">
              <span>
                <Language resource="order.Dealt"/>
              </span>
              <img class="type" src="@/images/mobile/ic_sell_c.svg" alt>
            </span>
          </span>
        </div>
        <div class="bom">
          <span>
            <span>
              <Language resource="order.Order_Price"/>
              ({{ item.price.symbol.name }})
            </span>
            <span>{{ item.price.amount }}</span>
          </span>
          <span>
            <span>
              <Language resource="order.Order_VOL"/>
              ({{ item.size.symbol.name }})
            </span>
            <span>{{ item.size.amount }}</span>
          </span>
          <span>
            <span>
              <Language resource="order.VOL"/>
              ({{ item.filled.symbol.name }})
            </span>
            <span>{{ item.filled.amount }}</span>
          </span>
        </div>
        <div class="bom2" v-if="item.type === 2">
          <span>
            <span>
              <Language resource="order.AVG_Price"/>(EOS)
            </span>
            <span>0.000150</span>
          </span>
          <span>
            <span>
              <Language resource="order.Total"/>(EOS)
            </span>
            <span>64274.6666</span>
          </span>
          <span>
            <span>
              <Language resource="order.Fee"/>(EOS)
            </span>
            <span>150</span>
          </span>
        </div>
        <div class="line"></div>
      </div>
    </div>
    <div style="height: 0.5rem;" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'order-item',
  props: {
    data: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.order-item {
  width: 100%;
  padding: 0.15rem 0.2rem 0rem;
  .line {
    height: 0.02rem;
    background-color: rgba(242, 245, 251, 1);
    margin-top: 0.14rem;
  }
  .top {
    width: 100%;
    margin-bottom: 0.16rem;

    @include flexLayout(row, space-between, flex-start);
  }
  .left-info {
    @include flexLayout(row, flex-start, center);
    .type {
      margin-right: 0.05rem;
    }
    .currency {
      font-size: 0.16rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-right: 0.06rem;
    }
    .time {
      font-size: 0.12rem;
      font-family: PingFangSC-Light;
      font-weight: 300;
      color: rgba(102, 102, 102, 1);
    }
  }
  .btn {
    width: 42px;
    height: 22px;
    background: rgba(0, 122, 255, 1);
    border-radius: 3px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .bom2 {
    margin-top: 0.1rem;
  }
  .already-deal {
    @include flexLayout(row, flex-start, center);
    > span {
      margin-right: 0.09rem;
    }
  }
  .bom,
  .bom2 {
    @include flexLayout(row, space-between, flex-start);
    > span {
      word-break: break-all;
      @include flexLayout(column, flex-start, '');
      span:nth-child(1) {
        font-size: 0.12rem;
        font-family: PingFangSC-Light;
        font-weight: 300;
        color: rgba(102, 102, 102, 1);
        line-height: 0.17rem;
      }
      span:nth-child(2) {
        font-size: 0.14rem;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 0.2rem;
      }
    }
    span:nth-child(1) {
      span {
        text-align: left;
      }
    }
    span:nth-child(2) {
      span {
        text-align: right;
      }
    }
    span:nth-child(3) {
      span {
        text-align: right;
      }
    }
  }
}
</style>


