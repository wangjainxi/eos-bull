<template>
  <div  class="item-out-box">
    <div class="item-box" v-for="(item,index) in data" :key="index">
      <span class="total bgColor"></span>
      <span class="price">{{item.price}}</span>
      <span class="size">{{item.size}}</span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'order-item',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.buy-part {
  .item-box {
    @include flexLayout(row, space-between, center);
    .size {
      color: rgba(7, 199, 78, 1);
    }
    .bgColor{
      background:rgba(7,199,78,0.1);
      border-radius:0.01rem;
    }
  }
}
.sell-part {
  .item-box {
    @include flexLayout(row-reverse, space-between, center);
  }
  .size {
    color: rgba(255, 0, 0, 1);
  }
   .bgColor{
      background:rgba(255,0,0,0.1);
      border-radius:0.01rem;
    }
}
.item-out-box {
  width: 100%;
  .item-box {
    width: 100%;
    position: relative;
    .total {
      position: absolute;
      right: 0;
      top: 50%;
      height: 0.13rem;
      line-height: 0.13rem;
      width: 50%;
      transform: translateY(-50%);
    }
    .price {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
  }
}
</style>

