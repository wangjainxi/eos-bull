<template>
  <div class="data-list-item">
    <div class="data-market">
      <div :class="['star',{starActive:starStatus}]" @click="addStar($event)"></div>
      <img src="../../../img/logo_box.png" alt="" class="market-logo">
      <div class="market-content">
        <div class="content-name">{{item.name}}</div>
        <div class="content-dec">{{item.dec}}</div>
      </div>
    </div>
    <div :class="['market-price', {green:item.goTotop}]">{{item.price}}</div>
    <div
      :class="['market-change', {green:item.goTotop}]"
    >{{item.goTotop ? `+${item.change}` : `-${item.change}`}}</div>
  </div>
</template>
<script>
export default {
  name: "mex-currentcy-list-data-item",
  data() {
    return {
      starStatus: false,
    };
  },
  props: ["item"],
  methods: {
    addStar($event) {
      $event.stopPropagation();
      $event.stopImmediatePropagation();
      this.starStatus = !this.starStatus;
      if (this.starStatus) {
        console.log("添加");
      } else {
        console.log("取消");
      }
    }
  }
};
</script>
<style lang="scss" >
$borderWidth:12px;
.data-list-item {
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 7px;
  border-bottom:1px solid rgba(36,65,102,1);
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
      background-image: url(../../../img/ic_fav_normal.png);
    }
    .market-logo {
      width: auto;
      max-height: 12px;
      margin-right: 4px;
    }
    .starActive {
      background-image: url(../../../img/ic_star_item_fav.png);
    }
    .market-content {
      display: flex;
      flex-direction: column;
    }
  }
  .market-price,
  .market-change {
    width: 24.5%;
    text-align: right;
    color: rgba(229, 55, 87, 1);
  }
  .market-change{
    padding-right: 16px;
  }
  .green {
    color: rgba(28, 196, 102, 1);
  }
}
</style>
