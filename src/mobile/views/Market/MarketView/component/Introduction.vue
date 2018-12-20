<template>
 <div class="intro-box">
   <div class="intro-top">
     <img src="@/images/mobile/logo_eosmex.svg" alt="">
     <p>这是一个由这是一个由这是一个由这是一个由这是一个由这是一个由这是一个由</p>
   </div>
   <div class="intro-bom">
     <p class="base-info">基本信息</p>
    <p class="info-title"><span>流通总量</span><span>info-title</span></p>
    <p class="info-title"><span>发行总量</span><span>info-title</span></p>
    <p class="info-title"><span>合约名称</span><span>info-title</span></p>
    <p class="info-title"><span>官    网</span><span>info-title</span></p>

   </div>
 </div>
</template>
<script lang="ts">
export default {
  name: 'introduction',
};
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.intro-box {
  width: 100%;
  padding: 0.13rem 0.2rem 0.31rem 0.2rem;
  .intro-top {
    @include flexLayout(column, flex-start, flex-start);
    padding-bottom: 0.12rem;
    border-bottom: 0.01rem solid rgba(242, 245, 251, 1);

    img {
      margin-bottom: 0.13rem;
    }
    text-align: left;
  }
  .intro-bom {
    padding-top: 0.13rem;
    @include flexLayout(column, flex-start, flex-start);
    .base-info {
      font-size: 0.14rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 0.08rem;
    }
    .info-title {
      height: 0.22rem;
      line-height: 0.22rem;
      > span:nth-child(1) {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(141, 141, 141, 1);
        margin-right: 0.14rem;
      }
      > span:nth-child(2) {
        font-size: 12px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
      }
    }
  }
}
</style>

