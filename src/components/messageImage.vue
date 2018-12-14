<template>
  <div class="message-iamge">
    <i :class="imgUrl"></i>
    <span>{{imgMsg}}</span>
  </div>
</template>
<script>
export default {
  name: "show-message-img",
  props: ["imgUrl", "imgMsg"],
};
</script>
<style lang="scss" scoped>
@import "../style/mixin.scss";
.message-iamge {
  @include flex(flex, center, center);
  flex-direction: column;
  i {
    @include wh(0.78rem, 0.78rem);
  }
  .noMsg{
    @include bis("./../images/mobile/ic_nodata.png");
  }
  span {
    margin-top: 0.12rem;
    @include font(300, 0.13rem, 0.34rem, "PingFangSC-Light");
  }
}
</style>
