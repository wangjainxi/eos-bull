<template>
  <div  class="item-out-box">
    <div class="item-box" v-for="item in data">
      <span class="time">{{item.time}}</span>
      <span class="price">{{item.price}}</span>
      <span class="size">{{item.size}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'deal-item',
  props:{
    data:{
      type: Array,
      required:true,
    },

  }
}
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.buy-part{
  .item-box{
    @include flexLayout(row,space-between,center);
      .size{
    color:rgba(7,199,78,1);
    }
  }
}
.sell-part{
  .item-box{
   @include flexLayout(row-reverse,space-between,center);
  }
    .size{
    color:rgba(255,0,0,1);
    }
}
.item-out-box{
  width: 100%;
  .item-box{
    width: 100%;
    position: relative;
    .total{
      position: absolute;
      right: 0;
      top:0;
      height: 0.13rem;
      line-height: 0.13rem;
      width: 50%;
    }
    .price{
      font-size:12px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,0,0,1);
    }

  }
}
</style>

