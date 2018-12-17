<template>
   <div id="more-page">
    <div class="home-banner-box">
      <img src="../../../images/mobile/logo_eosmex.svg" alt>
      <p>全球首家EOS去中心化交易所</p>
    </div>
    <div class="action-box">
      <div class="account-item" v-for="(item,index1) in accountData" @click="onClick(item.type)">
        <div class="left-part">
          <img :src="item.icon" alt=""><span>{{item.text}}</span><span>{{item.common}}</span>
        </div>
        <img :src="item.rightIcon" alt="">
      </div>
    </div>
      <mt-popup
             :visible.sync="popupVisible"
             position="bottom">
            <div>dddd</div>
            <div>dddd</div>
      </mt-popup>
   </div>

</template>
<script>
export default {
  name:'more-page',

  data(){
    return {
      popupVisible:false,
      accountData:[
        {
          icon:require('../../../images/mobile/ic_account.svg'),
          text:'账户委托',
          common:'',
          rightIcon:require('../../../images/mobile/ic_arrow_right.svg'),
          type:1
        },
        {
          icon:require('../../../images/mobile/ic_Language.svg'),
          text:'切换语言',
          common:'',
          rightIcon:require('../../../images/mobile/ic_arrow_right.svg'),
          type:2
        },
        {
          icon:require('../../../images/mobile/ic_help.svg'),
          text:'帮助中心',
          common:'常见问题与在线客服',
          rightIcon:require('../../../images/mobile/ic_arrow_right.svg'),
          type:3
        },
        {
          icon:require('../../../images/mobile/ic_submit.svg'),
          text:'提交工单',
          common:'问题反馈',
          rightIcon:require('../../../images/mobile/ic_arrow_right.svg'),
          type:4
        },
        {
          icon:require('../../../images/mobile/ic_aboutus.svg'),
          text:'关于我们',
          common:'',
          rightIcon:require('../../../images/mobile/ic_arrow_right.svg'),
          type:5
        },
      ]
    }
  },
  methods:{
    onClick:function(type){
     this.popupVisible=true
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
#more-page{
   .home-banner-box{
    width: 100%;
    height: 1.7rem;
    background-image: url('../../../images/mobile/bg_banner.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0 0;
    padding-top: 0.5rem;
     p {
      font-size: 0.16rem;
      color: #fff;
      margin-top: 0.12rem;
    }

   }
   .action-box{
      padding-left: 0.2rem ;
      padding-right: 0.2rem;
    }
   .account-item{
     height: 0.54rem;
     border-bottom: 0.01rem solid rgba(242,245,251,1);
    @include flexLayout(row,space-between,center);
   }
   .left-part{
     img{
       margin-right: 0.1rem;
     }
     span:nth-child(2){
      font-size:0.16rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,0,0,1);
      margin-right: 0.24rem;
     }
     span:nth-child(3){
       font-size:0.14rem;
       font-family:PingFangSC-Regular;
       font-weight:400;
       color:rgba(141,141,141,1);
     }
   }
   .line{
     height:0.01rem;
     background:rgba(242,245,251,1);
   }

}
</style>
