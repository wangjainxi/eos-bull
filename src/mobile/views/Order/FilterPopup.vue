<template>
  <div class="popup-box-out" @click="onClose">
   <div class="popup-box"  @click.stop>
    <p class="ptilte">交易对</p>
    <div class="trans-box">
      <input type="number"><span class="pop">/</span><button>EOS</button>
    </div>
    <p class="ptilte">订单状态</p>
    <div class="btn-box mb11">
      <mt-button type="defalut"  :class="isSelected? 'border-blue':''" @click="onClick">全部</mt-button>
      <mt-button type="defalut"  :class="isSelected? 'border-blue':''" @click="onClick">进行中</mt-button>
    </div>
    <div class="btn-box">
      <mt-button type="defalut"  :class="isSelected? 'border-blue':''" @click="onClick">全部</mt-button>
      <mt-button type="defalut"  :class="isSelected? 'border-blue':''" @click="onClick">进行中</mt-button>
    </div>
    <p class="ptilte">交易方向</p>
    <div class="btn-box">
      <mt-button type="defalut"  :class="isSelected? 'border-blue':''" @click="onClick">全部</mt-button>
      <mt-button type="defalut"  :class="isSelected? 'border-blue':''" @click="onClick">进行中</mt-button>
    </div>
    <p class="defaut-select">
      <span>不看已撤销订单</span>
    </p>
    <div class="btn-box handle-box">
      <mt-button type="defalut" @click="onClick">重置</mt-button>
      <mt-button type="defalut" @click="onClick">确认</mt-button>
    </div>
  </div>
</div>

</template>
<script>
export default {
  name: 'filter-popup',
  methods:{
   onClose: function(){
     console.log(111)
      this.$emit('onClose')
  },
  onClick:function(){
    console.log(1);
    this.isSelected=!this.isSelected;
  }
  },
  data(){
   return{
   isSelected:true,
   }
  },
}
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.popup-box-out{
  @include flexLayout(column,center,center);
  .mb11{
    margin-bottom: 0.11rem;
  }
  div{
      width: 100%;
  }
  .handle-box{
    button:nth-child(2){
      background:rgba(0,122,255,1);
      color: #fff;
    }
  }
  .defaut-select{
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    span{
      font-size:0.15rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,0,0,1);
    }
  }
  .ptilte{
    height: 0.22rem;
    font-size:0.16rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,1);
    line-height:0.22rem;
    text-align: left;
    margin-bottom: 0.14rem;
    margin-top: 0.3rem;
  }

}
.btn-box{
    @include flexLayout(row,space-between,center);
    >button{
      flex: 1;
      background:rgba(242,245,251,1);
      color: #000;
    }
    button:nth-child(1){
      margin-right: 0.11rem;
    }
}

.trans-box{
    @include flexLayout(row,space-between,center);
    .pop{
      // width: 0.3rem;
      // margin-left: 0.14rem;
      // margin-right: 0.14rem;
    }
    button{
    width: 1.5rem;
    height:0.34rem;
    border-radius:0.02rem;
    border:0.01rem solid rgba(141,141,141,1);
    background-color: #fff;
    border-radius:2px;
    opacity:0.3;
    font-size:0.15rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(141,141,141,1);
    }
    input{
    width: 1.5rem;
    height:0.34rem;
    border-radius:0.02rem;
    border:0.01rem solid rgba(141,141,141,1);
    background-color: #fff;
    text-align: center;
    font-size:0.15rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,1);
    }
}
.popup-box{
  left: 0rem;
  padding:0 0.2rem 0.3rem;
  height: 4.9rem;
  background-color: #fff;
  @include flexLayout(column,flex-start,flex-start);
}
  .border-blue{
   border: 1px solid rgba(0,122,255,1);
   color:  rgba(0,122,255,1)!important;
  }


div{
  z-index: 999;
  color: #fff;
}

</style>


