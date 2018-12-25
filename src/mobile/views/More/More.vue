<template>
  <div id="more-page">
    <div class="home-banner-box">
      <img src="../../../images/mobile/logo_eosmex.svg" alt>
      <p>
        <Language resource="home.banner_text_one"/>
        <Language resource="home.banner_text_two"/>
      </p>
    </div>
    <div class="action-box">
      <div class="account-item" v-for="(item,index1) in accountData" @click="onClick(item.type)">
        <div class="left-part">
          <img :src="item.icon" alt>
          <span>{{item.text}}</span>
          <span>{{item.common}}</span>
        </div>
        <img :src="item.rightIcon" alt>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <h4 @click="onClick(2)">确定</h4>
      <div
        v-for="(item,index) in language.locales"
        :key="index"
        @click="onLanguageSwich(item.mark)"
      >{{item.label}}</div>
    </mt-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import userStore from '@/stores/user';
import languageStore from '@/stores/language';
import { Observer } from 'mobx-vue';

@Observer
@Component
export default class extends Vue {
  popupVisible = false;
  language = languageStore;
  accountData = [
    {
      icon: require('../../../images/mobile/ic_account.svg'),
      text: '账户委托',
      common: '',
      rightIcon: require('../../../images/mobile/ic_arrow_right.svg'),
      type: 1,
    },
    {
      icon: require('../../../images/mobile/ic_Language.svg'),
      text: '切换语言',
      common: '',
      rightIcon: require('../../../images/mobile/ic_arrow_right.svg'),
      type: 2,
    },
    {
      icon: require('../../../images/mobile/ic_help.svg'),
      text: '帮助中心',
      common: '常见问题与在线客服',
      rightIcon: require('../../../images/mobile/ic_arrow_right.svg'),
      type: 3,
    },
    {
      icon: require('../../../images/mobile/ic_submit.svg'),
      text: '提交工单',
      common: '问题反馈',
      rightIcon: require('../../../images/mobile/ic_arrow_right.svg'),
      type: 4,
    },
    {
      icon: require('../../../images/mobile/ic_aboutus.svg'),
      text: '关于我们',
      common: '',
      rightIcon: require('../../../images/mobile/ic_arrow_right.svg'),
      type: 5,
    },
  ];

  onClick(type: number) {
    if (type === 2) {
      this.popupVisible = !this.popupVisible;
    }
  }
  onLanguageSwich(type: string) {
    console.log(type);
    languageStore.changeLanguage(type);
  }
  created() {
    userStore.setCurrency('5');
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
#more-page {
  .home-banner-box {
    width: 100%;
    height: 1.7rem;
    background-image: url('../../../images/mobile/bg_banner.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0 0;
    padding-top: 0.5rem;
    p {
      span {
        font-size: 0.16rem;
        color: #fff;
        margin-top: 0.12rem;
      }
    }
  }
  .action-box {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
  .account-item {
    height: 0.54rem;
    border-bottom: 0.01rem solid rgba(242, 245, 251, 1);
    @include flexLayout(row, space-between, center);
  }
  .left-part {
    img {
      margin-right: 0.1rem;
    }
    span:nth-child(2) {
      font-size: 0.16rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-right: 0.24rem;
    }
    span:nth-child(3) {
      font-size: 0.14rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(141, 141, 141, 1);
    }
  }
  .line {
    height: 0.01rem;
    background: rgba(242, 245, 251, 1);
  }
}
.mint-popup-bottom {
  width: 100%;
  h4 {
    text-align: right;
    font-size: 0.16rem;
    padding: 10px;
    color: #007aff;
    bottom: #eff0f2;
  }
  div {
    padding: 10px 0;
    width: 100%;
    border-bottom: 1px solid rgba(141, 141, 141, 0.6);
    background: #d2d3d7;
    font-size: 0.18rem;
  }
  div:last-child {
    border: none;
  }
}
</style>
