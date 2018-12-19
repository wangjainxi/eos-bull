<template>
  <div  class="item-out-box">
    <div class="item-box" v-for="item in data">
      <span class="time-mark time">{{item.time|formatTime}}</span>
      <span class="price-mark price">{{item.price}}</span>
      <span class="size-mark size" >{{item.size}}</span>
    </div>
  </div>
</template>
<script>
import { formatTimes } from '@/utils/formatTime';
export default {
  name: 'deal-item',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  filters:{
    formatTime:function(time){
      return formatTimes(time)
    }
  }

};
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

