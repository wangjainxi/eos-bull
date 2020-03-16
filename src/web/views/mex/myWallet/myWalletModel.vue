<template>
  <div class="wallet-model" id="wallet-model">
    <div class="model-top">
      <div class="model-inf">
        <Language resource="myWallet.account_information"/>
      </div>
      <div class="model-name">111</div>
      <img class="model-img" src="@/images/web/ic_eos.svg" alt>
      <div class="model-action">
        <div class="action-l">
          <Language resource="myWallet.Copy_account"/>
        </div>
        <div class="action-l">
          <Language resource="myWallet.Download_code"/>
        </div>
      </div>
      <div class="model-dec">
        <Language resource="myWallet.Provide_you"/>
      </div>
    </div>
    <div class="model-bottom">
      <div class="tip-title">
        <Language resource="myWallet.Tips"/>
      </div>
      <p>
        <Language resource="myWallet.You_trans"/>
      </p>
      <p>
        <Language resource="myWallet.you_fill"/>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MyWalletModel extends Vue {}
</script>

<style lang="scss" scoped>
@import './../../../../style/mixin.scss';
.wallet-model {
  @include wh(100%, auto);
  display: flex;
  flex-direction: column;
  .model-top {
    @include wh(100%, auto);
    @include flex(flex, center, center);
    flex-direction: column;
    background: linear-gradient(135deg, rgba(14, 106, 190, 1) 0%, rgba(14, 80, 175, 1) 100%);
    .model-inf {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(146, 167, 197, 1);
    }
    .model-name {
      margin: 10px 0;
      font-size: 22px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    .model-img {
      width: 188px;
      height: 188px;
    }
    .model-action {
      flex-direction: row;
      @include flex(flex, center, center);
      & > div {
        background: rgba(45, 123, 229, 1);
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin: 20px 13px;
        padding: 9px 20px;
      }
    }
  }
  .model-bottom {
    display: flex;
    @include flex(flex, flex-start, flex-start);
    flex-direction: column;
    @include wh(100%, auto);
    background: rgba(255, 255, 255, 1);
    padding: 30px 140px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    .tip-title {
      color: rgba(45, 123, 229, 1);
      margin-bottom: 10px;
    }
    p {
      color: rgba(102, 102, 102, 1);
    }
  }
  .model-dec {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(221, 221, 221, 1);
    margin-bottom: 9px;
  }
}
</style>
