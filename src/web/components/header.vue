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
        <div class="un-sign-in" v-if="true" @click="showDilog">
          <Language resource="home.sign_in"/>
        </div>
        <div class="signed" v-else>
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
        </div>
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
    <el-dialog
      :title="noTitle"
      :visible.sync="dialogVisible"
      width="600px"
      custom-class="scatter-dialog"
    >
      <div class="content scatter">
        <img src="./../../images/ic_scatter_sign_in.png" alt>
        <div class="div-sign" @click="showdilog2">
          <Language resource="home.Sign_Sca"/>
        </div>
        <div class="sign-foot">
          <p>
            <Language resource="home.Scatter_allows"/>
          </p>
          <Language resource="home.How_use_Scatter"/>
        </div>
      </div>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>

    <el-dialog
      :title="thisTip"
      :visible.sync="dialog2Visible"
      width="30%"
    >
      <div class="content">
        <img src="./../../images/web/ic_warning_big.svg" alt>
        <Language resource="home.unlocked_Scatter"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog2Visible = false">
          <Language resource="home.Give_up"/>
        </el-button>
        <el-button type="primary" @click="dialog2Visible = false">
          <Language resource="home.Unlocked"/>
        </el-button>
      </span>
    </el-dialog>
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
  dialogVisible = false;
  dialog2Visible = false;
  noTitle = `  `;
  thisTip = language.getIntlText('home.Tips');
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
  showDilog() {
    this.dialogVisible = true;
  }
  showdilog2() {
    this.dialogVisible = false;
    this.dialog2Visible = true;
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
      .un-sign-in,
      .signed {
        display: flex;
      }
      .un-sign-in {
        margin-right: 21px;
        cursor: pointer;
        align-items: center;
        justify-content: flex-start;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        height: 30px;
        background: rgba(45, 123, 229, 1);
        border-radius: 4px;
        padding: 0 10px;
      }
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
  .el-dialog {
    & > div {
      background: rgba(20, 46, 77, 1);
    }
    .el-button {
      width: 100px;
      height: 40px;
    }
  }
  .scatter-dialog {
    .el-button {
      width: 100px;
      height: 40px;
    }
  }
  .el-dialog__header {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid rgba(30, 58, 93, 1);
    span {
      font-size: 18px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    i {
      color: rgba(226, 101, 101, 1);
    }
  }
  .el-button--default {
    border: 1px solid rgba(110, 132, 163, 1);
    background: rgba(20, 46, 77, 1);
    color: rgba(146, 167, 197, 1);
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      margin: 10px auto 30px;
      width: 36px;
      height: 36px;
    }
    span {
      height: 57px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(146, 167, 197, 1);
      line-height: 22px;
    }
  }
  .scatter {
    margin: 0 45px;
    img {
      margin: 5px auto 40px;
      width: 90px;
      height: 90px;
    }
    .div-sign {
      span {
        display: flex;
        border-radius: 4px;
        padding: 0 25px;
        height: 42px;
        font-size: 16px;
        color: rgba(45, 123, 229, 1);
        line-height: 42px;
        margin-bottom: 88px;
        border: 1px solid rgba(110, 132, 163, 1);
      }
    }
    .sign-foot {
      p {
        display: inline;
        & > span {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #2d7be5;
          line-height: 20px;
          color: rgba(146, 167, 197, 1);
        }
      }
      span {
        padding: 0;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #2d7be5;
        line-height: 20px;
        color: rgba(45, 123, 229, 1);
      }
    }
  }
}
</style>
