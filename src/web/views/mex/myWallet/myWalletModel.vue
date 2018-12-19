<template>
  <div class="wallet-model">
    <div class="model-top">
      <div class="model-inf">Your EOS account information</div>
      <div class="model-name">Adminadm1111</div>
      <img class="model-img" src="@/images/web/ic_eos.svg" alt>
      <div class="model-action">
        <div class="action-l">Copy account</div>
        <div class="action-l">Download QR code</div>
      </div>
      <div
        class="model-dec"
      >Provide your account name to others so that they can transfer coin to you.</div>
    </div>
    <div class="model-bottom">
      <div class="tip-title">Tips</div>
      <p>1.You will transfer the Token that listed on the EOS main chain. Ensure you fill in the correct EOS account number</p>
      <p>2.If you fill in an incorrect EOS account number , you would not be able to retrieve your assets</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'my-wallet-model',
  data() {
    return {};
  },
};
</script>
<style lang="scss">
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
}
</style>
