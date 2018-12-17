<template>
  <div :class="['coin-items',{red:tradeType === 'sell'}]" @click="changePriceAndMount(item.price,item.mount)">
    <i :style="{ width: getItemWidth }"></i>
    <div class="coin-price">{{item.price}}</div>
    <div class="coin-mount">{{item.mount}}</div>
  </div>
</template>
<script>
export default {
  name: "business-trade-item",
  props: ["item", "tradeType", "tradeDataMountSum","changePriceAndMount"],
  data() {
    return {
      itemWidth: 0
    };
  },
  computed: {
    getItemWidth() {
      let width = ((this.item.mount / this.tradeDataMountSum) * 100).toFixed(2);
      this.itemWidth = `${width}%`;
      return this.itemWidth;
    }
  }
};
</script>
<style lang="scss">
@import "../../../../style/mixin.scss";
.coin-items {
  display: flex;
  @include wh(100%, auto);
  position: relative;
  & > div {
    width: 50%;
    color: rgba(7, 199, 78, 1);
    @include font(400, 0.12rem, 0.26rem, "PingFangSC-Regular");
  }
  .coin-price {
    text-align: left;
  }
  .coin-mount {
    text-align: right;
  }
  i {
    height: 50%;
    position: absolute;
    top: 26%;
    left: 0;
    background: rgba(7, 199, 78, 0.1);
  }
}
.red {
  & > div {
    color: rgba(255, 0, 0, 1);
  }
  i {
    background: rgba(7, 199, 78, 0.1);
    background: rgba(255, 0, 0, 0.1);
  }
}
</style>
