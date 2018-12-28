<template>
<div class="item-out-box">
  <div class="item-box" v-for="(item,index) in data" :key="index" @click="onTapItem(item)">
    <span class="time-mark time">{{item.time|formatTime}}</span>
    <span class="price-mark price">{{item.price}}</span>
    <span class="size-mark size">{{item.size}}</span>
  </div>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { formatTimes } from '@/utils/formatTime';
import marketViewStore from '@/mobile/views/Market/MarketView/component/marketViewStore';

@Component({
  filters: {
    formatTime: formatTimes,
  },
})
export default class extends Vue {
  @Prop({ required: true })
  data = [];
  onTapItem(item: any) {
    marketViewStore.onTap(item);
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.buy-part {
  .item-box {
    @include flexLayout(row, space-between, center);
    .price {
      color: rgba(7, 199, 78, 1);
    }
  }
}

.sell-part {
  .item-box {
    @include flexLayout(row-reverse, space-between, center);
  }
}

.item-out-box {
  width: 100%;
  .item-box {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    > span {
      flex: 1;
    }
    .price {
      color: rgba(255, 0, 0, 1);
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
    width: 100%;
    position: relative;
    .total {
      position: absolute;
      right: 0;
      top: 0;
      height: 0.13rem;
      line-height: 0.13rem;
      width: 50%;
    }
    .price {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
    }
  }
}
</style>
