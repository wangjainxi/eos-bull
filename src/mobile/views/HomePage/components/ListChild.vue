<template>
  <router-link :to="{ name: 'market-view', params: { id: item.marketId ,} }" class="wrapper">
    <div class="name-box">
      <h4 class="name">
        {{item.pair.baseCurrency.symbol.name}}/{{item.pair.quoteCurrency.symbol.name}}
      </h4>
      <p class="volumn">
        <Language resource="asset.VOL24H"/>
        {{item.volumeBase}}
      </p>
    </div>
    <div class="price-box">
      <h4 class="price">{{item.lastPrice}}</h4>
      <p :class="changeStyle">{{item.change}}</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop()
  item: any;

  get changeStyle() {
    const classes = ['change'];
    const changeValue = parseFloat(this.item.change);
    if (changeValue > 0) {
      classes.push('rise');
    } else if (changeValue < 0) {
      classes.push('fall');
    }
    return classes;
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  height: 0.6rem;
  border-bottom: 1px solid #f2f5fb;
  align-items: center;
}

.name-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 0.6rem;
  border-bottom: 1px solid #f2f5fb;
  text-align: left;

  .name {
    font-size: 0.16rem;
    color: #000;
  }

  .volumn {
    font-size: 0.1rem;
    color: #666;
  }
}

.price-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .price {
    font-size: 0.14rem;
    color: #000;
    font-weight: bold;
    margin-right: 0.2rem;
  }

  .change {
    width: 0.77rem;
    height: 0.29rem;
    background: #9a9a9a;
    color: #ffffff;
    border-radius: 0.03rem;
    line-height: 0.29rem;

    &.fall {
      background: #ff0000;
    }

    &.rise {
      background: #07c74e;
    }
  }
}
</style>
