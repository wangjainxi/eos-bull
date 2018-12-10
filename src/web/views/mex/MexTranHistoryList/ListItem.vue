<template>
  <div>
    <div class="item-history-box" v-for="item in sellData">
      <span class="left-text price-text">{{item.price}}</span>
      <span class="center-text">{{item.size}}</span>
      <span class="right-text">{{item.time}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'list-item',
  props:{
    sellData:{
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss">
.sell-box{
 .price-text{
    color:rgba(229,55,87,1);
  }
}
.buy-box{
 .price-text{
    color:rgba(28,196,102,1);
  }
}
.item-history-box{
  font-size:12px;
  font-family:PingFangSC-Regular;
  height: 20px;
  line-height: 20px;
  position: relative;
  margin-bottom: 0.6px;
  padding-left: 20px;
  padding-right: 10px;
  span{
    height: 20px;
    display: inline-block;
  }
 .left-text{
    width: 75px;
    max-width: 75px;
    text-align: left;
  }
  .center-text{
    width: 80px;
    max-width: 80px;
    color:rgba(103,123,183,1);
    text-align: right;
     font-weight:bold;
  }
  .right-text{
    width: 100px;
    max-width: 100px;
    text-align: right;
    color:rgba(221,221,221,1);
  }
}
</style>


