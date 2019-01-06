<template>
  <div>
    <div class="item-box" v-for="(item, index) in sellData" :key="index">
      <span class="total-bg-mark" :style="{width:item.width}"></span>
      <span class="left-text price-text">{{item.price}}</span>
      <span class="center-text">{{item.size}}</span>
      <!-- <span class="right-text">{{item.total}}</span> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import language from '@/stores/language';
import { Observer } from 'mobx-vue';

@Observer
@Component({})
export default class ListItem extends Vue {
  // name: 'list-item',
  @Prop() sellData!: {
    type: Array<any>;
    required: true;
  };
}
</script>
<style lang="scss">
@import '@/style/mixin.scss';
.sell-box {
  .price-text {
    color: rgba(229, 55, 87, 1);
  }
  .total-bg-mark {
    position: absolute;
    right: 0px;
    top: 0px;
    position: absolute;
    background: rgba(229, 55, 87, 0.08);
  }
}
.buy-box {
  .price-text {
    color: rgba(28, 196, 102, 1);
  }
  .total-bg-mark {
    position: absolute;
    right: 0px;
    top: 0px;
    position: absolute;
    background: rgba(28, 196, 102, 0.08);
  }
}
.item-box {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  height: 20px;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  margin-bottom: 0.6px;
  @include flexLayout(row, space-between, center);
  &:hover{
    font-weight: 600;
  }
  .total-mark {
    position: absolute;
    right: 0px;
    top: 0px;
  }
  span {
    height: 20px;
    display: inline-block;
    overflow: hidden;
  }

  .left-text {
    width: 74px;
    max-width: 74px;
    text-align: left;
    padding-left: 12px;
  }
  .center-text {
    width: 100px;
    max-width: 100px;
    color: rgba(103, 123, 183, 1);
    text-align: right;
    padding-right: 10px;
  }
  .right-text {
    width: 76px;
    max-width: 76px;
    text-align: right;
    color: rgba(221, 221, 221, 1);
    padding-right: 10px;
  }
}
</style>


