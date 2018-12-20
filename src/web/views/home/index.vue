<template>
  <div id="home-page">
    <div v-bind:class="bgClass"></div>
    <div class="package" v-on:scroll="scrollEvent" id="scrollPackage">
      <div class="top-box-page">
        <div class="top-box">
          <div class="logo">
            <img src="./home-page-img/logo_eosmex01.svg" alt>
          </div>
          <div class="nav">
            <p>
              <Language resource="home.homepage"/>
            </p>
            <p>
              <Language resource="home.exchange"/>
            </p>
            <p>
              <Language resource="home.white_paper"/>
            </p>
            <select id="ch" :value="language.currentLocale" @change="changeLanguageType">
              <option v-for="item in language.locales" :value="item.mark">{{item.label}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="banner-box-page">
        <div class="banner-box">
          <h4>EOSmex</h4>
          <p>
            <Language resource="home.banner_text_one"/>
          </p>
          <p>
            <Language resource="home.banner_text_two"/>
          </p>
        </div>
      </div>
      <div class="introduce-box-page">
        <div class="introduce-box">
          <h4>
            <Language resource="home.what_EOSmex"/>
          </h4>
          <p>
            <Language resource="home.EOSmex_community"/>
          </p>
          <p>
            <Language resource="home.built_with_smart"/>
          </p>
          <p>
            <Language resource="home.no_registration"/>
          </p>
        </div>
      </div>
      <div class="advantage-box-page">
        <div class="advantage-box">
          <h3>
            <Language resource="home.advantages"/>
          </h3>
          <div class="advantage-inner-box">
            <img src="./home-page-img/ic_advantage1.svg" alt>
            <div>
              <h4>
                <Language resource="home.high_efficiency"/>
              </h4>
              <p>
                <Language resource="home.EOS_community"/>
              </p>
              <p>
                <Language resource="home.security_auditing"/>
              </p>
              <p>
                <Language resource="home.meet_various"/>
              </p>
            </div>
          </div>
          <div class="advantage-inner-box">
            <div>
              <h4>
                <Language resource="home.digital_asset"/>
              </h4>
              <p>
                <Language resource="home.privacy_protection"/>
              </p>
              <p>
                <Language resource="home.portfolio_management"/>
              </p>
              <p>
                <Language resource="home.true_decentralization"/>
              </p>
            </div>
            <img src="./home-page-img/ic_advantage2.svg" alt>
          </div>
          <div class="advantage-inner-box">
            <img src="./home-page-img/ic_advantage3.svg" alt>
            <div>
              <h4>
                <Language resource="home.high_Quality"/>
              </h4>
              <p>
                <Language resource="home.international_marketing"/>
              </p>
              <p>
                <Language resource="home.trading_services"/>
              </p>
              <p>
                <Language resource="home.customer_service"/>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="programme-box-page">
        <div class="programme-box">
          <h3>
            <Language resource="home.workflow_Solution"/>
          </h3>
          <img src="./home-page-img/program.png" alt v-if="language.currentLocale === 'zh-CN'">
          <img src="./home-page-img/bg_english.png" alt v-else>
        </div>
      </div>
      <div class="roadmap-box-page">
        <div :class="language.currentLocale === 'zh-CN'?'roadmap-box':'roadmap-box_en'">
          <div>
            <Language resource="home.project_started"/>
            <br>
            <Language resource="home.project_started_two"/>
          </div>
          <div>
            <Language resource="home.core_product"/>

            <br>
            <Language resource="home.core_product_two"/>
          </div>
          <div>
            <Language resource="home.core_development"/>
            <br>
            <Language resource="home.core_development_two"/>
          </div>
          <div>
            <Language resource="home.launch_testnet"/>
          </div>
          <div>
            <Language resource="home.mainnet_goes_live"/>

            <br>
            <Language resource="home.mainnet_goes_live_two"/>
          </div>
          <div>2018/9</div>
          <div>2018/10</div>
          <div>2018/11</div>
          <div>2018/12</div>
          <div>2019......</div>
          <h3>
            <Language resource="home.roadmap"/>
          </h3>
        </div>
      </div>
      <div class="introduce-box-page">
        <div class="introduce-box desire-box">
          <h4>
            <Language resource="home.our_visions"/>
          </h4>
          <p>
            <Language resource="home.a_truly_decentralized"/>
          </p>
          <p>
            <Language resource="home.an_EOS_DApp"/>
          </p>
          <p>
            <Language resource="home.working_on_cross_chain"/>
          </p>
        </div>
      </div>
      <div class="cooperation-page-box">
        <div class="cooperation-box">
          <h4>
            <Language resource="home.cooperative_partner"/>
          </h4>
          <div>
            <img src="./home-page-img/logo_p01.svg" alt>
            <img src="./home-page-img/logo_p02h.svg" alt>
            <img src="./home-page-img/logo_p02.svg" alt>
            <img src="./home-page-img/logo_p03.svg" alt>
            <img src="./home-page-img/logo_p04.svg" alt>
          </div>
          <div>
            <img src="./home-page-img/logo_p05.svg" alt>
            <img src="./home-page-img/logo_p05f.svg" alt>
          </div>
          <div>
            <img src="./home-page-img/logo_p06.svg" alt>
            <img src="./home-page-img/logo_p07.svg" alt>
            <img src="./home-page-img/logo_p08.svg" alt>
            <img src="./home-page-img/logo_p09.svg" alt>
            <img src="./home-page-img/logo_p10.svg" alt>
          </div>
          <div>
            <img src="./home-page-img/logo_p11.svg" alt>
            <img src="./home-page-img/logo_p12.svg" alt>
            <img src="./home-page-img/logo_p13.svg" alt>
          </div>
          <div>
            <img src="./home-page-img/logo_p14.svg" alt>
            <img src="./home-page-img/logo_p15.svg" alt>
            <img src="./home-page-img/logo_p16.svg" alt>
            <img src="./home-page-img/logo_p17.svg" alt>
            <img src="./home-page-img/logo_p18.svg" alt>
          </div>
          <div>
            <img src="./home-page-img/logo_p14b.svg" alt>
          </div>
        </div>
      </div>
      <div class="foot-page-box">
        <div class="foot-box">
          <div>
            <img src="./home-page-img/logo_eosmex011.svg" alt>
            <p>
              <Language resource="home.banner_text_one"/>
              <Language resource="home.banner_text_two"/>
            </p>
            <p>Copyright &copy; 2018 EOSmex.io. All rights reserved</p>
          </div>
          <div>
            <img src="./home-page-img/ic_weixin.svg" alt>
            <img src="./home-page-img/ic_qq.svg" alt>
            <img src="./home-page-img/ic_weibo.svg" alt>
          </div>
          <div>
            <h4>
              <Language resource="home.contact_us"/>
            </h4>
            <p>info@eosmex.io</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import languageStore from '@/stores/language';
import { Observer } from 'mobx-vue';

@Observer
@Component
export default class extends Vue {
  bgClass = 'bg-img-box-s1';

  language = languageStore;

  scrollEvent() {
    const scrollPackage = document.getElementById('scrollPackage');
    if (!scrollPackage) {
      return;
    }
    if (scrollPackage.scrollTop > 1500) {
      this.bgClass = 'bg-img-box-s2';
    } else {
      this.bgClass = 'bg-img-box-s1';
    }
  }
  changeLanguageType(data: any) {
    languageStore.changeLanguage(data.currentTarget.value);
  }
}
</script>

<style lang="scss">
#home-page {
  background: #0c1f35;
  width: 100%;
  height: 100%;

  .bg-img-box-s1 {
    position: fixed;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1440px;
    background-image: url('./home-page-img/bg_s1.png');
    background-size: 100% 100%;
  }
  .bg-img-box-s2 {
    position: fixed;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1440px;
    background-image: url('./home-page-img/bg_s2.png');
    background-size: 100% 100%;
  }
  .package {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .top-box-page {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background: #0c1f35;
  }
  .top-box {
    width: 1440px;
    margin: 0 auto;
    padding: 20px 120px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav {
      display: flex;
      justify-content: space-between;
      color: #fff;
      p {
        margin-right: 40px;
        font-size: 16px;
      }
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
        background: url('./home-page-img/ic_arrow_under.svg') 70px 4px no-repeat #0d1f35;
        -webkit-appearance: none;
        -moz-appearance: none;
        outline: none;
      }
      /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
      select::-ms-expand {
        display: none;
      }
    }
  }
  .banner-box-page {
    width: 100%;
    padding-top: 123px;
    background: #0c1f35;
  }
  .banner-box {
    width: 1440px;
    height: 676px;
    padding: 0 120px;
    position: relative;
    background: url('./home-page-img/bg.png') 250px 0 no-repeat;
    background-size: 1040px 629px;
    margin: 0 auto;
    h4 {
      position: absolute;
      top: 154px;
      left: 182px;
      color: #007aff;
      font-size: 67px;
    }
    p:nth-child(2) {
      position: absolute;
      top: 257px;
      left: 182px;
      font-size: 44px;
      font-weight: bold;
      color: #fff;
    }
    p:nth-child(3) {
      position: absolute;
      top: 323px;
      left: 182px;
      font-size: 44px;
      color: #fff;
    }
  }
  .introduce-box-page {
    width: 100%;
  }
  .introduce-box {
    width: 1440px;
    padding: 80px 230px;
    margin: 0 auto;
    h4 {
      font-size: 32px;
      color: #fff;
      margin: 40px;
    }
    p {
      font-size: 16px;
      color: #fff;
      text-align: left;
      margin-bottom: 10px;
      line-height: 24px;
    }
  }
  .desire-box {
    p {
      text-align: center;
    }
  }
  .advantage-box-page {
    width: 100%;
    background: #0c2641;
  }
  .advantage-box {
    width: 932px;
    margin: 0 auto;
    padding-top: 80px;
    padding-bottom: 56px;
    h3 {
      font-size: 32px;
      color: #fff;
      margin-bottom: 20px;
    }
  }
  .advantage-box {
    > div {
      display: flex;
      justify-content: space-between;
      > div {
        width: 400px;
        padding-top: 104px;
        h4 {
          font-size: 32px;
          color: #01d6f9;
          margin-bottom: 17px;
          text-align: left;
        }
        p {
          font-size: 16p;
          color: #bbccff;
          text-align: left;
          margin-bottom: 5px;
        }
      }
    }
    > div:nth-child(3) {
      > div {
        h4 {
          text-align: right;
        }
        p {
          text-align: right;
        }
      }
    }
  }
  .programme-box-page {
    width: 100%;
    padding-top: 80px;
    padding-bottom: 70px;
    background: #0c1f35;

    .programme-box {
      width: 1440px;
      margin: 0 auto;
      h3 {
        font-size: 32px;
        color: #fff;
        margin-bottom: 30px;
      }
    }
  }
  .roadmap-box-page {
    width: 100%;
    padding-top: 80px;
    padding-bottom: 70px;
    background: #142e4d;

    .roadmap-box {
      width: 1440px;
      height: 645px;
      margin: 0 auto;
      background: url('./home-page-img/bg_time.png') no-repeat;
      background-position: 293px 314px;
      position: relative;
      h3 {
        color: #fff;
        font-size: 32px;
      }
      > div {
        color: #bbccff;
        position: absolute;
        top: 324px;
        left: 295px;
      }
      > div::after {
        content: '';
        position: absolute;
        bottom: -140px;
        left: 50%;
        width: 1px;
        height: 135px;
        border-left: 1px dashed #01d6f9;
      }
      > div:nth-child(n + 6)::after {
        display: none;
      }
      div:nth-child(2) {
        top: 289px;
        left: 450px;
      }
      div:nth-child(3) {
        top: 274px;
        left: 635px;
      }
      div:nth-child(4) {
        top: 234px;
        left: 820px;
      }
      div:nth-child(5) {
        top: 175px;
        left: 1006px;
      }
      div:nth-child(6) {
        top: 543px;
        left: 301px;
      }
      div:nth-child(7) {
        top: 499px;
        left: 484px;
      }
      div:nth-child(8) {
        top: 462px;
        left: 670px;
      }
      div:nth-child(9) {
        top: 420px;
        left: 857px;
      }
      div:nth-child(10) {
        top: 398px;
        left: 1045px;
      }
    }
    .roadmap-box_en {
      width: 1440px;
      height: 645px;
      margin: 0 auto;
      background: url('./home-page-img/bg_time.png') no-repeat;
      background-position: 293px 314px;
      position: relative;
      h3 {
        color: #fff;
        font-size: 32px;
      }
      > div {
        color: #bbccff;
        position: absolute;
        top: 324px;
        left: 305px;
      }
      > div::after {
        content: '';
        position: absolute;
        bottom: -140px;
        left: 50%;
        width: 1px;
        height: 135px;
        border-left: 1px dashed #01d6f9;
      }
      > div:nth-child(n + 6)::after {
        display: none;
      }
      div:nth-child(2) {
        top: 289px;
        left: 457px;
      }
      div:nth-child(3) {
        top: 250px;
        left: 630px;
      }
      div:nth-child(4) {
        top: 234px;
        left: 832px;
      }
      div:nth-child(5) {
        top: 175px;
        left: 966px;
      }
      div:nth-child(6) {
        top: 543px;
        left: 301px;
      }
      div:nth-child(7) {
        top: 499px;
        left: 484px;
      }
      div:nth-child(8) {
        top: 462px;
        left: 670px;
      }
      div:nth-child(9) {
        top: 420px;
        left: 857px;
      }
      div:nth-child(10) {
        top: 398px;
        left: 1045px;
      }
    }
  }
  .cooperation-page-box {
    width: 100%;
    padding-top: 80px;
    padding-bottom: 20px;
    background: #fff;
    .cooperation-box {
      width: 1440px;
      margin: 0 auto;
      padding: 0 120px;
      h4 {
        color: #000;
        font-size: 32px;
        margin-bottom: 50px;
      }
      > div {
        text-align: left;
        margin-bottom: 40px;
        img {
          width: 198px;
          height: 88px;
          border: 1px dashed #ddd;
          margin-right: 52px;
          display: inline-block;
        }
        img:nth-child(5) {
          margin: 0;
        }
      }
    }
  }
  .foot-page-box {
    width: 100%;
    height: 188px;
    background: #001936;
    .foot-box {
      width: 1440px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 190px;
      padding-right: 180px;
      div:nth-child(1) {
        text-align: left;
        img {
          width: 149px;
          height: 42px;
          margin-bottom: 5px;
        }
        p {
          font-size: 14px;
          color: #fff;
          margin-bottom: 5px;
        }
      }
      div:nth-child(2) {
        img {
          margin-right: 35px;
        }
        img:last-child {
          margin: 0;
        }
      }
      div:nth-child(3) {
        h4 {
          font-size: 32px;
          color: #fff;
          margin-bottom: 5px;
        }
        p {
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
}
</style>
