<template>
  <div id="home-list-box">
    <div class="home-list-name-box">
      <h4>{{item.pair.baseCurrency.symbol.name}}/{{item.pair.quoteCurrency.symbol.name}}</h4>
      <p>24小时成交量 {{item.volumeBase}}</p>
    </div>
    <div class="home-list-price-box">
      <h4>{{item.lastPrice}}</h4>
      <p :class="changeStyle">{{item.change}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop()
  item: any;

  get changeStyle() {
    if (this.item.change.indexOf('+') !== -1) return 'rise';
    if (this.item.change.indexOf('-') !== -1) return 'fail';
    return '';
  }
}
</script>

<style lang="scss">
#home-list-box {
  display: flex;
  justify-content: space-between;
  height: 0.6rem;
  border-bottom: 1px solid #f2f5fb;
  align-items: center;
  .home-list-name-box {
    text-align: left;
    h4 {
      font-size: 0.16rem;
      color: #000;
    }
    p {
      font-size: 0.1rem;
      color: #666;
    }
  }
  .home-list-price-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    > h4 {
      font-size: 0.14rem;
      color: #000;
      font-weight: bold;
      margin-right: 0.2rem;
    }
    > p {
      width: 0.77rem;
      height: 0.29rem;
      background: #9a9a9a;
      color: #ffffff;
      border-radius: 0.03rem;
      line-height: 0.29rem;
    }
    > .fall {
      background: #ff0000;
    }
    > .rise {
      background: #07c74e;
    }
  }
}
</style>
