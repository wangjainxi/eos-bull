<template>
  <div id="home-page">
    <div class="home-banner-box-page">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <div class="home-banner-box">
            <img src="../../../images/mobile/logo_dadex.svg" alt>
            <p>
              <Language resource="asset.the_Worlds_1st_Decentralized_EOS_Exchange"/>
            </p>
          </div>
        </mt-swipe-item>
        <mt-swipe-item>
          <div class="home-banner-boxTwo">
            <router-link to="/guide">
              <img src="../../../images/mobile/banner_guide.png" alt>
            </router-link>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <div class="home-notice-box">
      <img src="../../../images/mobile/ic_announcement.svg" alt>
      <h4>
        <Language resource="asset.Notice"/>:
      </h4>
      <p id="noticeBox">
        <nobr
          class="notice"
          v-for="item of announcements"
          :key="item.announcementId"
        >{{ item.title }}</nobr>
      </p>
    </div>
    <div class="home-user-info-box">
      <div>
        <img src="../../../images/mobile/ic_avatar.svg">
        <p>{{ accountName }}</p>
      </div>
      <div>
        <p class="eos-value">
          <Language resource="asset.totalValue"/>
        </p>
        <h4>{{ totalValuation.amount }}</h4>
        <p class="EOS-name">{{ totalValuation.name }}</p>
      </div>
    </div>
    <div class="home-tab-title-box">
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item id="1">
          <Language resource="asset.Top_Gainers"/>
        </mt-tab-item>
        <mt-tab-item id="2">
          <Language resource="asset.VOL_Top24H"/>
        </mt-tab-item>
      </mt-navbar>
    </div>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="home-list-page-box" v-for="item in changeRankingList" :key="item.marketId">
          <MarketItem :market="item"/>
        </div>
        <div class="home-link-to-market-box">
          <router-link to="/markets">
            <Language resource="asset.View_More"/>
          </router-link>
          <img src="../../../images/mobile/ic_arrow_under.svg" alt>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="home-list-page-box" v-for="item in volumeRankingList" :key="item.marketId">
          <MarketItem :market="item"/>
        </div>
        <div class="home-link-to-market-box">
          <router-link to="market">
            <Language resource="asset.View_More"/>
          </router-link>
          <img src="../../../images/mobile/ic_arrow_under.svg" alt>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <HomeIntroduce/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace, State } from 'vuex-class';
import { Market, Announcement } from '@/define';

import MarketItem from '../../components/market-item.vue';
import HomeIntroduce from './home-introduce.vue';

const userModule = namespace('user');
const marketModule = namespace('market');
const announcementModule = namespace('announcement');

@Component({
  components: {
    MarketItem,
    HomeIntroduce,
  },
})
export default class Home extends Vue {
  @State('accountName')
  accountName!: string;

  @userModule.Getter('totalValuation')
  totalValuation!: Object;

  @marketModule.Getter('changeRankingList')
  changeRankingList!: Market[];

  @marketModule.Getter('volumeRankingList')
  volumeRankingList!: Market[];

  @announcementModule.State('announcements')
  announcements!: Announcement[];

  @announcementModule.Action('fetchAnnouncements')
  fetchAnnouncements!: Function;

  selected = '1';
  dealList: any[] = [];
  growList: any[] = [];

  created() {
    this.fetchAnnouncements();
  }
}
</script>
<style lang="scss" scoped>
#home-page {
  padding-bottom: 0.5rem;
  .home-banner-box-page {
    width: 100%;
    height: 1.7rem;
  }
  .home-banner-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 1.7rem;
    background-image: url('../../../images/mobile/bg_banner.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0 0;
    padding-top: 0.5rem;
    p {
      font-size: 0.16rem;
      color: #fff;
      font-weight: 300;
      margin-top: 0.12rem;
    }
  }
  .home-banner-boxTwo {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .home-notice-box {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    border-bottom: 4px solid #f2f5fb;
    height: 0.4rem;
    align-items: center;
    padding: 0 0.2rem;
    h4 {
      color: #0078ff;
      font-size: 0.12rem;
      font-weight: bold;
      margin: 0 0.08rem;
    }
    p {
      overflow: hidden;
      width: 2.5rem;
      nobr {
        width: 100%;
        color: #191a2a;
        font-size: 0.12rem;
      }
    }
  }
  .home-user-info-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 4px solid #f2f5fb;
    height: 0.7rem;
    align-items: center;
    padding: 0 0.2rem;
    .eos-value {
      font-size: 0.11rem;
      font-family: PingFangSC-Medium;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
    .EOS-name {
      font-size: 0.11rem;
      font-family: PingFangSC-Medium;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
    > div {
      display: flex;
      align-items: center;
      img {
        width: 0.34rem;
        height: 0.34rem;
        border-radius: 50%;
        margin-right: 0.08rem;
      }
      p {
        font-weight: bold;
        font-size: 0.12rem;
        color: #24272b;
      }
      h4 {
        color: #007aff;
        font-size: 0.18rem;
        margin: 0 0.03rem;
        font-weight: bold;
      }
    }
  }
  .home-tab-title-box {
    width: 100%;
    height: 0.54rem;
    border-bottom: 1px solid #f2f5fb;
    .mint-navbar {
      height: 100%;
    }
    .mint-tab-item-label {
      font-size: 0.16rem !important;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .mint-navbar .mint-tab-item {
      color: #8d8d8d;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 0.16rem !important;
      }
    }
    .mint-navbar .mint-tab-item.is-selected {
      margin-bottom: 0;
      border: none;
      color: #007aff;
      position: relative;
      .mint-tab-item-label {
        font-weight: bold;
        font-family: PingFangSC-Medium;
      }
    }
    .mint-navbar .mint-tab-item.is-selected::after {
      position: absolute;
      content: '';
      height: 0.03rem;
      width: 0.24rem;
      left: 50%;
      bottom: 0;
      margin-left: -0.12rem;
      background: #007aff;
      border-radius: 0.02rem;
    }
  }

  .home-link-to-market-box {
    height: 0.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      font-size: 0.12rem;
      color: #007aff;
    }
    img {
      width: 0.12rem;
      height: 0.12rem;
      transform: rotate(-90deg);
      margin-left: 5px;
    }
  }
  .home-list-page-box {
    padding: 0 0.2rem;
    background: #fff;
  }
}
</style>
