<template>
  <div class="message-iamge">
    <i :style="imageUrl"></i>
    <span>{{imgMsg}}</span>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ShowMessageImg extends Vue {
  // name: 'show-message-img',

  @Prop() imgUrl!: any;
  @Prop() imgMsg!: string;
  // props: ['imgUrl', 'imgMsg'],
  // data
  imageUrl: any = { backgroundImage: `url(${this.imgUrl})` };
}
</script>
<style lang="scss" scoped>
@import '../style/mixin.scss';
.message-iamge {
  @include flex(flex, center, center);
  flex-direction: column;
  i {
    @include wh(0.78rem, 0.78rem);
    background-repeat: no-repeat;
    background-size: 100%, 100%;
  }
  // .noMsg{
  //   @include bis("./../images/mobile/ic_nodata.png");
  // }
  span {
    margin-top: 0.12rem;
    @include font(300, 0.13rem, 0.34rem, 'PingFangSC-Light');
  }
}
</style>
