<template>
  <div
    :class="['coin-items',{red:tradeType === 'sell'}]"
    @click="changePriceAndMount(item.price,item.size)"
  >
    <i :style="{ width: getItemWidth }"/>
    <div class="coin-price">{{item.price}}</div>
    <div class="coin-mount">{{item.size}}</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class BusinessTradeItem extends Vue {
  @Prop() item!: any;
  @Prop() tradeType!: any;
  @Prop() tradeDataMountSum!: any;
  @Prop() changePriceAndMount!: any;

  itemWidth: any = 0;
  get getItemWidth() {
    const width = ((this.item.size / this.tradeDataMountSum) * 100).toFixed(2);
    this.itemWidth = `${width}%`;
    return this.itemWidth;
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../style/mixin.scss';

.coin-items {
  display: flex;
  @include wh(100%, auto);
  position: relative;
  & > div {
    width: 50%;
    color: rgba(7, 199, 78, 1);
    @include font(400, 0.12rem, 0.26rem, 'PingFangSC-Regular');
  }
  .coin-price {
    text-align: left;
  }
  .coin-mount {
    text-align: right;
    color: rgba(141, 141, 141, 1);
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
