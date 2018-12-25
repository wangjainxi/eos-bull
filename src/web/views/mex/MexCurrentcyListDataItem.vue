<template>
  <div class="data-list-item">
    <div class="data-market">
      <div
        :class="['star',{starActive:item.favourited || localFavourite.indexOf(item.marketId) >= 0}]"
        @click="addStar(item.marketId,$event)"
      ></div>
      <img src="../../../images/logo_box.png" alt class="market-logo">
      <div class="market-content">
        <div
          class="content-name"
        >{{`${item.pair.baseCurrency.symbol.name}/${item.pair.quoteCurrency.symbol.name}`}}</div>
        <div class="content-dec">{{item.pair.baseCurrency.contract}}</div>
      </div>
    </div>
    <div :class="['market-price', {green:getShowColor}]">{{item.lastPrice}}</div>
    <div :class="['market-change', {green:getShowColor}]">{{item.change}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class MexCurrentcyListDataItem extends Vue {
  // name: 'mex-currentcy-list-data-item',
  // data
  @Prop() item: any;

  starStatus: boolean = false;
  localFavourite: Array<any> = [];
  // props: ['item'],
  create() {
    const loData = localStorage.getItem('localFavourite');
    if (!loData) return;
    this.localFavourite = JSON.parse(loData) || [];
  }
  // methods
  addStar(id: number, $event: any) {
    $event.stopPropagation();
    $event.stopImmediatePropagation();
    this.starStatus = !this.starStatus;
    if (this.starStatus) {
      console.log('添加');
      this.localFavourite.push(id);
      localStorage.setItem('localFavourite', JSON.stringify(this.localFavourite));
    } else {
      console.log('取消');
      this.localFavourite = this.localFavourite.filter((e: any) => e !== id);
      localStorage.setItem('localFavourite', JSON.stringify(this.localFavourite));
    }
  }
  getShowColor() {
    if (this.item.change.indexOf('+') >= 0) {
      return true;
    } else {
      return false;
    }
  }
}
</script>
<style lang="scss" >
$borderWidth: 12px;
.data-list-item {
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 7px;
  border-bottom: 1px solid rgba(36, 65, 102, 1);
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
    color: rgba(229, 55, 87, 1);
  }
  .market-change {
    padding-right: 9px;
  }
  .green {
    color: rgba(28, 196, 102, 1);
  }
}
</style>
