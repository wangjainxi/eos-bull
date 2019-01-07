<template>
  <div>
    <Top/>
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in 2" :key="item">
        <div class="banner-package">
          <div class="banner-box">
            <img class="banner-img" src="../../../images/web/img_banner.png" alt>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="notice_package">
      <div class="notice_box">
        <div class="notice_inner">
          <p class="notice_text">Introduction of Newdex Platform Ecological…</p>
          <p class="notice_date">12-21</p>
        </div>
        <div class="notice_inner">
          <p class="notice_text">Introduction of Newdex Platform Ecological…</p>
          <p class="notice_date">12-21</p>
        </div>
        <div class="notice_inner">
          <p class="notice_text">Introduction of Newdex Platform Ecological…</p>
          <p class="notice_date">12-21</p>
        </div>
        <p class="notice_link" @click="goMoreNotice">
          <Language resource="asset.More"/>
        </p>
      </div>
    </div>
    <div class="market-package">
      <div class="market-box">
        <Market />
        <div class="market-link-box">
          <router-link to="/market">
            <Language resource="asset.View_More"/>
          </router-link>
        </div>
      </div>
    </div>
    <div class="advantage-box-page">
      <div class="advantage-box">
        <h3>
          <Language resource="home.advantages"/>
        </h3>
        <div class="advantage-inner-box">
          <img src="@/web/views/home/home-page-img/ic_advantage1@2x.png" width="340" height="340">
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
          <img src="@/web/views/home/home-page-img/ic_advantage2@2x.png" width="340" height="340">
        </div>
        <div class="advantage-inner-box">
          <img src="@/web/views/home/home-page-img/ic_advantage3@2x.png" width="340" height="340">
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
    <div class="cooperation-page-box">
      <div class="cooperation-box">
        <h4>
          <Language resource="home.cooperative_partner"/>
        </h4>
        <div>
          <img src="@/web/views/home/home-page-img/logo_p01.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p02h.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p02.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p03.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p04.svg" alt>
        </div>
        <div>
          <img src="@/web/views/home/home-page-img/logo_p05.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p05f.svg" alt>
        </div>
        <div>
          <img src="@/web/views/home/home-page-img/logo_p06.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p07.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p08.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p09.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p10.svg" alt>
        </div>
        <div>
          <img src="@/web/views/home/home-page-img/logo_p11.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p12.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p13.svg" alt>
        </div>
        <div>
          <img src="@/web/views/home/home-page-img/logo_p14.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p15.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p16.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p17.svg" alt>
          <img src="@/web/views/home/home-page-img/logo_p18.svg" alt>
        </div>
        <div>
          <img src="@/web/views/home/home-page-img/logo_p14b.svg" alt>
        </div>
      </div>
    </div>
    <Foot/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Top from '@/web/components/header.vue';
import Foot from '@/web/components/footer.vue';
import Market from '@/web/views/market/index.vue';
import language from '@/stores/language';
import { Observer } from 'mobx-vue';

@Observer
@Component({
  components: {
    Top,
    Foot,
    Market,
  },
})
export default class HomeExchange extends Vue {
  goMoreNotice() {
    if (language.currentLocale === 'en-US') {
      window.open('https://dadex.zendesk.com/hc/en-us/categories/360001324452');
    } else if (language.currentLocale === 'zh-CN') {
      window.open('https://dadex.zendesk.com/hc/zh-cn/categories/360001324452');
    }
  }
}
</script>
<style lang="scss">
.market-package {
  width: 100%;
  background: #0d1f35;
}
.market-box {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.market-link-box {
  width: 100%;
  padding-top: 18px;
  padding-bottom: 60px;
  p {
    width: 200px;
    height: 42px;
    border: 1px solid rgb(30, 58, 93);
    color: #2d7be5;
    margin: 0 auto;
    line-height: 42px;
    border-radius: 4px;
  }
}
.notice_package {
  width: 100%;
  height: 40px;
  background: #0a1727;
}
.notice_box {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.notice_inner {
  display: flex;
  justify-content: flex-start;
}
.notice_text {
  margin-right: 20px;
  color: #fff;
  font-size: 12px;
}
.notice_date {
  font-size: 12px;
  color: #6e84a3;
}
.notice_link {
  color: #2d7be5;
  font-size: 12px;
  cursor: pointer;
}
.el-carousel {
  background: #0a1727;
  height: 560px;
}
.el-carousel__container {
  height: 560px;
}
.el-carousel__arrow {
  background: #0a1727;
}
.banner-package {
  width: 100%;
  background: #142e4d;
}
.banner-box {
  width: 100%;
  max-width: 1200px;
  height: 560px;
  margin: 0 auto;
}
.banner-img {
  width: 1200px;
  height: 560px;
}
.advantage-box-page {
  width: 100%;
  min-width: 1200px;
  background: #142e4d;
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
.cooperation-page-box {
  width: 100%;
  padding-top: 80px;
  padding-bottom: 20px;
  background: #fff;
  min-width: 1200px;
  .cooperation-box {
    width: 1200px;
    margin: 0 auto;
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
        margin-right: 50px;
        display: inline-block;
      }
      img:nth-child(5) {
        margin: 0;
      }
    }
  }
}
</style>
