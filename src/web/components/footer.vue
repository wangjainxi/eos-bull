<template>
  <div id="foot-page">
    <div class="foot">
      <div class="foot-top">
        <div class="foot-dec-left">
          <a target="_blank" :href="goUrl(1)">
            <Language resource="myWallet.FAQ"/>
          </a>
          <a target="_blank" :href="goUrl(2)">
            <Language resource="myWallet.Bulletin"/>
          </a>
          <a target="_blank" :href="goUrl(3)">
            <Language resource="myWallet.Rate_standard"/>
          </a>
          <a target="_blank" :href="goUrl(4)">
            <Language resource="myWallet.Submit_Request"/>
          </a>
        </div>
        <div class="foot-dec-right">
          <Language resource="myWallet.risky"/>
        </div>
      </div>
      <div class="foot-bottom">
        <div class="foot-dec-left">Copyright © 2018 DaDEX Inc. All rights reserved.</div>
        <div class="foot-dec-right">
          <div>
            <Language resource="myWallet.H_Total"/>&nbsp; 265172.3326 EOS
          </div>
          <div>GBI：3980.3</div>
          <!-- <div class="wifi" @click="showAddress">
            <img src="@/images/web/ic_wifi.svg" alt>
            <span>HongKong</span>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { MessageBox } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';
import ChooseNode from './chooseNode.vue';
import language from '@/stores/language';
import { Observer } from 'mobx-vue';

@Observer
@Component({
  components: {
    ChooseNode,
  },
})
export default class Footer extends Vue {
  // data
  pValue: number = 1;
  propVal: number = 1;
  boxKey: number = 10;
  // methods
  showAddress() {
    const h = this.$createElement;
    MessageBox({
      title: 'DaDEX',
      message: h(ChooseNode, { key: this.boxKey++ }),
      showCancelButton: false,
      showConfirmButton: false,
      customClass: 'foot-choose-node',
    });
  }
  goUrl(num: number) {
    let lanT;
    if (num === 1) {
      lanT =
        language.currentLocale === 'zh-CN'
          ? 'https://dadex.zendesk.com/hc/zh-cn/categories/360001321632'
          : 'https://dadex.zendesk.com/hc/en-us/categories/360001321632';
    } else if (num === 2) {
      lanT =
        language.currentLocale === 'zh-CN'
          ? 'https://dadex.zendesk.com/hc/zh-cn/categories/360001324452'
          : 'https://dadex.zendesk.com/hc/ en-us /categories/360001324452';
    } else if (num === 3) {
      lanT =
        language.currentLocale === 'zh-CN'
          ? 'https://dadex.zendesk.com/hc/zh-cn/categories/360001324512'
          : 'https://dadex.zendesk.com/hc/ en-us /categories/360001324512';
    } else if (num === 4) {
      lanT =
        language.currentLocale === 'zh-CN'
          ? 'https://dadex.zendesk.com/hc/zh-cn/requests/new'
          : 'https://dadex.zendesk.com/hc/en-us/requests/new';
    }
    return lanT;
  }
}
</script>
<style lang="scss" scoped>
#foot-page {
  width: 100%;
  height: 110px;
  background: #142e4d;
  .foot {
    width: 1200px;
    color: #fff;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  .foot-top,
  .foot-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .foot-dec-left,
    .foot-dec-right {
      color: rgba(110, 132, 163, 1);
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .foot-dec-right {
      text-align: right;
    }
  }
  .foot-top {
    margin: 15px 0 37px;
  }
  .foot-top {
    .foot-dec-left {
      justify-content: flex-start;
      a {
        margin-right: 60px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(221, 221, 221, 1);
        text-decoration-line: none;
      }
    }
  }
  .foot-dec-right {
    & > div {
      margin-right: 21px;
      color: rgba(221, 221, 221, 1);
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;

      &:last-child {
        margin-right: 0;
      }
    }
    & > div:nth-child(3) {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 15px;
        height: 11px;
        margin-right: 5px;
      }
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: rgba(28, 196, 102, 1);
        font-weight: 400;
      }
    }
  }
  .wifi {
    cursor: pointer;
  }
}
</style>
