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
        <select id="ch" :value="language.currentLocale" @change="changeLanguageType">
          <option
            v-for="(item,index) in language.locales"
            :key="index"
            :value="item.mark"
          >{{item.label}}</option>
        </select>
        <!-- {{$t('m.transaction.homepage')}} -->
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
  activeName = 'first';
  language = language;
  goWallet() {
    this.$router.push({
      path: '/myWallet',
      name: 'myWallet',
    });
  }
  changeLanguageType(data: any) {
    language.changeLanguage(data.currentTarget.value);
  }
}
</script>

<style lang="scss">
#top-page {
  background: #142e4d;
  height: 50px;
  width: 100%;
  select {
    color: #fff;
    padding-left: 10px;
    height: 22px;
    width: 90px;
    border-radius: 10px;
    border: 1px solid #007aff;
    /*很关键：将默认的select选择框样式清除*/
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    padding-right: 14px;
    background: url('../../images/mobile/ic_arrow_under.svg') 70px 4px no-repeat #142e4d;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
  }
  /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
  select::-ms-expand {
    display: none;
  }
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
