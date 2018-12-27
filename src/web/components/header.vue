<template>
  <div id="top-page">
    <div class="top-view">
      <div class="tleft-view flex-start">
        <div class="logo-view">
          <a href="/">
            <img src="@/images/web/logo_eosmex.svg" alt>
          </a>
        </div>
      </div>
      <div class="tright-view">
        <span class="use-box" @click="goWallet">
          <img src="@/images/web/ic_eos.svg" alt>
          <span class="text-style">{{ dataStore.accountName }}</span>
        </span>
        <span class="text-style switch">Switch</span>
        <span class="text-style exit">Exit</span>
        <span class="order-box flex-start">
          <img src="@/images/web/ic_order.svg" alt>
          <span class="text-style exit">Orders</span>
        </span>
        <!-- {{$t('m.transaction.homepage')}} -->
        <span class="language-box">
          <img class="mark" src="@/images/web/ic_eos.svg" alt>
          <select class="text-style" v-model="selected" @change="selectPamas">
            <option
              v-for="option in options"
              :key="option.text"
              v-bind:value="option.value"
            >{{ option.text }}</option>
          </select>
          <img class="arrow" src="@/images/web/ic_arrow_down.svg" alt>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import language from '@/stores/language';
import dataStore from '@/stores/data';

@Observer
@Component
export default class extends Vue {
  dataStore = dataStore;
  lang = 'en-US';
  selected = 'en-US';
  activeName = 'first';
  options = [{ text: 'chinese', value: 'zh-CN' }, { text: 'english', value: 'en-US' }];

  selectPamas() {
    if (this.selected === 'en-US') {
      this.lang = 'en-US';
    } else {
      this.lang = 'zh-CN';
    }
    language.changeLanguage(this.lang);
  }

  created() {
    this.selectPamas();
  }
  goWallet() {
    this.$router.push({
      path: '/myWallet',
      name: 'myWallet',
    });
  }
}
</script>

<style lang="scss">
#top-page {
  background: #142e4d;
  height: 50px;
  width: 100%;

  .top-view {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 1200px;

    .tright-view {
      display: flex;
      flex-direction: row;
      align-items: center;

      .use-box {
        cursor: pointer;
        margin-right: 10px;

        .text-style {
          margin-left: 5px;
        }
      }

      .exit {
        margin-right: 20px;
        margin-left: 10px;
      }

      .language-box {
        margin-right: 5px;

        .text-style {
          margin-left: 5px;
          margin-right: 5px;
          background: rgba(20, 46, 77, 1);
          border: none;
        }
      }

      .order-box {
        margin-right: 22px;

        .text-style {
          margin-left: 5px;
        }
      }
    }

    .text-style {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(146, 167, 197, 1);
    }

    .logo-view {
      margin-right: 50px;
    }

    .el-tabs__header {
      margin: 0px;
      margin-top: 5px;
    }

    .tleft-view {
      height: 50px;
    }

    .flex-start {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }

    .mex-place-order {
      color: #d6a93b;
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 14px;
    }

    .el-tabs__nav-wrap::after {
      height: 0px !important;
      background: #1e3a5d;
    }

    .el-tabs__nav {
      .is-active {
        color: #fff;
      }
    }

    .el-tabs__item {
      color: #92a7c5;
    }

    .el-tabs__active-bar {
      background: #2d7be5;
    }

    .el-tabs__nav .is-active {
      color: rgba(45, 123, 229, 1);
    }

    .el-tabs__nav-wrap.is-scrollable {
      padding: 0px;

      span {
        display: none;
      }
    }
  }

  .top {
    height: 100%;
    color: #fff;
  }

  .tab-view {
    width: 155px;
  }
}
</style>
