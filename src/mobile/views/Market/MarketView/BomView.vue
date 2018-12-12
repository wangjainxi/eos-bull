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
 #bom-container{
   position: relative;
   #tab-box{
     height: 42px;
     background-color: #ddd;
     line-height: 42px;
     padding-left: 20px;
     .tab-item{
       margin-right: 25px;
     }
   }
   .transaction-box{

   }
 }
</style>


