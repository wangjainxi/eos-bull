<template>
    <div id="order-tab-container" class="flex-row-start">
      <FilterPopup class="filterPopup" @onClose="showFilter" v-if="showPopup"/>
      <div class="type-select-box">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">委托订单</mt-tab-item>
          <mt-tab-item id="2">深度
          </mt-tab-item>
          <img @click="showFilter" src="@/images/mobile/ic_filter.svg" alt="">
        </mt-navbar>
      </div>
<!-- tab-container -->
     <div class="order-container-box">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <OrderItem :data="transData"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          深度图
        </mt-tab-container-item>
      </mt-tab-container>
      </div>
    </div>
</template>
<script>
import Vue from 'vue';
import OrderItem from './OrderItem.vue';
import FilterPopup from './FilterPopup.vue';
export default {
  name: 'bom-view',
  data: function() {
    return {
      showPopup:true,
      selected: '1',
      transData:[
        {
          type:1, //1买 2卖
          status:1, //1挂单中 0已撤销 2已成交
          language:1,   //1中文 0英文
          price:'',
          size:'',
          amount:'',
        },
        {
          type:1, //1买 2卖
          status:0, //1挂单中 0已撤销 2已成交
          language:1,   //1中文 0英文
          price:'',
          size:'',
          amount:'',
        },
         {
          type:2, //1买 2卖
          status:2, //1挂单中 0已撤销 2已成交
          language:1,   //1中文 0英文
          price:'',
          size:'',
          amount:'',
          evePrice:111,
          totalAmount:1222,
          fee:'111'
        }
      ]
    };
  },
  methods: {
    showFilter: function(){
       this.showPopup=!this.showPopup;
    }
  },
  components: {
    OrderItem,
    FilterPopup,
  },
};
</script>
<style lang="scss">
@import '@/style/mixin.scss';
  .filterPopup{
    position: absolute;
    width: 100%;
    height: 100%;
    background:rgba(31,31,31,0.67);
    z-index: 10;
    top: 0;
    left: 0;
  }
  .mint-tab-item-label {
    font-size: 0.2rem;
  }
  .type-select-box {
    background-color: #ddd;
    width: 100%;
    position: relative;
    img{
      margin-right: 0.18rem;
      position: absolute;
      right: 0;
      top:50%;
      transform: translateY(-50%);
    }
  }

  #order-tab-container {
    font-size: 0.16rem !important;
    > div {
      width: 100%;
    }
    @include flexLayout(column, flex-start, flex-start);
      .order-container-box{
    @include flexLayout(column,flex-start,flex-start);
    div{
      width: 100%;
    }
  }
    .mint-navbar {
      height: 0.54rem;
      border-bottom: 0.01rem solid rgba(242, 245, 251, 1);
    }
    .tab-item {
      margin-right: 0.25rem;
      p {
        font-size: 0.14rem;
      }
    }
    .mint-tab-item-label{
      font-size:0.16rem;
      font-family:PingFangSC-Medium;
      font-weight:300;
     color:rgba(141,141,141,1);
      }
    .mint-navbar .mint-tab-item {
      padding: 0px;
      margin-top: 0.2rem;
    }
    .mint-navbar .mint-tab-item.is-selected {
      border-bottom: none;
      .mint-tab-item-label {
        color: rgba(0, 122, 255, 1);
        font-weight:500;
      }
    }
    .mint-navbar .mint-tab-item.is-selected::after {
      content: '1';
      background-color: red;
      color: transparent;
      display: inline-block;
      width: 0.15rem;
      height: 0.03rem;
      background: rgba(0, 122, 255, 1);
      border-radius: 0.03rem;
      margin-top: 0.14rem;
    }
  }

</style>


