<template>
  <div id="bom-container">
    <div id="tab-box" class="flex-row-start">
        <div class="tab-item">
          <p class="tab-title">委托订单</p>
          <p class="tab-mark"></p>
        </div>
        <div class="tab-item">
          <p class="tab-title">深度</p>
          <p class="tab-mark"></p>
        </div>
         <div class="tab-item">
          <p class="tab-title">最新成交</p>
          <p class="tab-mark"></p>
        </div>

    </div>
    <div class="container-box">

    </div class="transaction-box flex-row-between-center" >
    <div>
       <div><Button text="买入" type="sell38" @onclick="onBuy"/></div>
       <div><Button text="卖出" type="sell38" @onclick="onBuy"/></div>
    </div>
  </div>
</template>
<script>
import Button from '@/components/button.vue'
export default {
  name:'bom-view',
  components:{
    Button,
  },
  methods:{
    onBuy: function(){
      console.log(222);
    }
  }
}
</script>
<style lang="scss">
@import '../../../../style/mixin.scss';
 #bom-container{
    // width: 100%;
   #tab-box{
     height: 4.2rem;
     background-color: #ddd;
     line-height:  4.2rem;
     padding-left: 2rem;
     .tab-item{
       margin-right: 2.5rem;
     }
   }
   .transaction-box{

   }
 }
</style>


