<template>
  <div class="data-list-item" @click="handleClick">
    <div class="data-market">
      <div
        :class="['star',{starActive: item.favourited || localFavourite.indexOf(item.marketId) >= 0}]"
        @click="addStar(item.marketId,$event)"
      ></div>
      <img :src="item.baseCurrencyIcon" class="market-logo">
      <div class="market-content">
        <div
          class="content-name"
        >{{`${item.pair.baseCurrency.symbol.name}/${item.pair.quoteCurrency.symbol.name}`}}</div>
        <div class="content-dec">{{item.pair.baseCurrency.contract}}</div>
      </div>
    </div>
    <div v-show="getShowColor === 1" class="market-price green">{{item.lastPrice}}</div>
    <div v-show="getShowColor === 1" class="market-change green">{{item.change}}</div>

    <div v-show="getShowColor === 2" class="market-price red">{{item.lastPrice}}</div>
    <div v-show="getShowColor === 2" class="market-change red">{{item.change}}</div>

    <div v-show="getShowColor === 0" class="market-price">{{item.lastPrice}}</div>
    <div v-show="getShowColor === 0" class="market-change">{{item.change}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';

@Observer
@Component
export default class MexCurrentcyListDataItem extends Vue {
  @Prop() item: any;

  starStatus: boolean = false;
  localFavourite: Array<any> = [];

  created() {
    const loData = localStorage.getItem('localFavourite');
    if (!loData) return (this.localFavourite = []);
    this.localFavourite = JSON.parse(loData);
    // console.log(this.item.favourited || this.localFavourite.indexOf(this.item.marketId) >= 0);
  }

  handleClick() {
    this.$emit('click', this.item);
  }

  addStar(id: number, $event: any) {
    $event.stopPropagation();
    $event.stopImmediatePropagation();
    this.starStatus = !this.starStatus;

    if (this.localFavourite.indexOf(id) !== -1) {
      this.localFavourite = this.localFavourite.filter((e: any) => e !== id);
      localStorage.setItem('localFavourite', JSON.stringify(this.localFavourite));
    } else {
      this.localFavourite.push(id);
      localStorage.setItem('localFavourite', JSON.stringify(this.localFavourite));
    }
  }

  get getShowColor() {
    if (parseFloat(this.item.change) > 0) {
      return 1;
    } else if (parseFloat(this.item.change) < 0) {
      return 2;
    } else {
      return 0;
    }
  }
}
</script>
<style lang="scss" >
$borderWidth: 12px;
.data-list-item {
  height: 41px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7px;
  border-bottom: 1px solid rgba(36, 65, 102, 1);
  &:hover{
    background-color: rgba(36, 65, 102, 0.4);
  }
  & > div {
    text-align: left;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(103, 123, 183, 1);
  }
  .data-market {
    width: 51%;
    display: flex;
    align-items: center;
    .star {
      width: 12px;
      height: 12px;
      margin-right: 4px;
      background-repeat: no-repeat;
      cursor: pointer;
      background-image: url(../../../images/ic_fav_normal.png);
    }
    .market-logo {
      width: auto;
      max-height: 12px;
      margin-right: 4px;
    }
    .starActive {
      background-image: url(../../../images/ic_star_item_fav.png);
    }
    .market-content {
      display: flex;
      flex-direction: column;
    }
  }
  .market-price,
  .market-change {
    width: 29.5%;
    text-align: right;
    color: #6e84a3;
  }
  .market-change {
    padding-right: 9px;
  }
  .green {
    color: rgba(28, 196, 102, 1);
  }
  .red {
    color: rgba(229, 55, 87, 1);
  }
}
</style>
