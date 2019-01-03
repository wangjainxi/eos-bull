<template>
  <div id="top-page">
    <div class="top-view">
      <div class="tleft-view flex-start">
        <div class="logo-view">
          <router-link to="/">
            <img src="@/images/web/logo_eosmex.svg">
          </router-link>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="tabName('home.Exchange')" name="first"></el-tab-pane>
          <el-tab-pane :label="tabName('home.Markets')" name="second"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="tright-view">
        <div class="un-sign-in" v-if="!accountName" @click="showDilog">
          <Language resource="home.sign_in"/>
        </div>
        <div class="signed" v-else>
          <span class="use-box" @click="goWallet">
            <img src="@/images/web/ic_eos.svg">
            <span class="text-style">{{ accountName }}</span>
          </span>
          <span class="text-style switch">Switch</span>
          <span class="text-style exit">Exit</span>
          <router-link to="/orders" class="order-box flex-start">
            <img src="@/images/web/ic_order.svg">
            <span class="text-style exit">Orders</span>
          </router-link>
        </div>
        <img v-if="selectValue === 'zh-CN'" src="./../../images/web/ic_flag_cn.svg" alt>
        <img v-else src="./../../images/web/ic_flag_en.svg" alt>
        <el-select v-model="selectValue" @change="changeLanguageType">
          <el-option
            v-for="(item,index) in language.locales"
            :key="index"
            :label="item.label"
            :value="item.mark"
          >
            <img
              :src="item.mark === 'zh-CN'?require('./../../images/web/ic_flag_cn.svg'):require('./../../images/web/ic_flag_en.svg')"
              alt
            >
            <span>{{item.label}}</span>
          </el-option>
        </el-select>
        <!-- <select id="ch" :value="language.currentLocale" @change="changeLanguageType">
          <option
            v-for="(item,index) in language.locales"
            :key="index"
            :value="item.mark"
          >{{item.label}}</option>
        </select>-->
        <!-- {{$t('m.transaction.homepage')}} -->
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
        <div class="div-sign" @click="handleScatterSignInBtnClick">
          <Language resource="home.Sign_Sca"/>
        </div>
        <div class="sign-foot">
          <p>
            <Language resource="home.Scatter_allows"/>
          </p>
          <span class="how-ues-page" @click="openNewPage">
            <Language resource="home.How_use_Scatter"/>
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>

    <el-dialog :visible.sync="dialog2Visible" custom-class="scatter-dialog1" width="500px">
      <div slot="title">111</div>
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
import { State, Action } from 'vuex-class';
import { Observer } from 'mobx-vue';
import language from '@/stores/language';

@Observer
@Component
export default class extends Vue {
  @State('accountName')
  accountName!: string;

  @Action('login')
  login!: Function;

  activeName = 'first';
  selectValue = language.currentLocale;
  dialogVisible = false;
  dialog2Visible = false;
  noTitle = `  `;
  options = [{ text: 'chinese', value: 'zh-CN' }, { text: 'english', value: 'en-US' }];

  language = language;
  goWallet() {
    this.$router.push({
      path: '/myWallet',
      name: 'myWallet',
    });
  }

  tabName(obj: string) {
    return language.getIntlText(obj);
  }

  openNewPage() {
    window.open(
      'https://dadex.zendesk.com/hc/zh-cn/articles/360021134692-%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8Scatter%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6%E7%89%88-'
    );
  }

  showDilog() {
    this.dialogVisible = true;
  }

  handleClick(tab: any, event: any) {
    if (tab.name === 'first') {
      this.$router.push({
        path: '/mex',
      });
    } else if (tab.name === 'second') {
      this.$router.push({
        path: '/market',
        name: 'market',
      });
    }
  }

  async handleScatterSignInBtnClick() {
    try {
      await this.login();
      this.dialogVisible = false;
    } catch (err) {
      debugger;
    }
  }

  changeLanguageType(data: any) {
    language.changeLanguage(this.selectValue);
    this.selectValue = language.currentLocale;
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
      .un-sign-in,
      .signed {
        display: flex;
      }
      .signed {
        width: 205px;
        align-items: center;
        // justify-content: center;
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
        display: flex;
        align-items: center;
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
      padding: 9px 23px;
    }
  }
  .scatter-dialog {
    .el-button {
      width: 100px;
      height: 40px;
    }
    .el-dialog__header {
      span {
        height: 25px;
        padding: 0;
      }
    }
  }
  .scatter-dialog1 {
    .el-dialog__header {
      span {
        padding: 0;
      }
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
      .how-ues-page{
        cursor: pointer;
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
  .el-select {
    input {
      border: none;
      width: 100px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(146, 167, 197, 1);
      background: rgba(20, 46, 77, 1);
      padding-left: 5px;
      padding-right: 10px;
    }
  }
}
</style>
