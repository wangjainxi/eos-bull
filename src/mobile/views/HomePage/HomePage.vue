<template>
  <div id="home-page">
    <div class="home-banner-box">
      <img src="../../../images/mobile/logo_eosmex.svg" alt>
      <p>
        <Language resource="asset.the_Worlds_1st_Decentralized_EOS_Exchange"/>
      </p>
    </div>
    <div class="home-notice-box">
      <img src="../../../images/mobile/ic_announcement.svg" alt>
      <h4>
        <Language resource="asset.Notice"/>:
      </h4>
      <p id="noticeBox">
        <nobr id="notice">EOS新交易对EOSmex上线PSIEOS新交易对EOSmex上线PSIEOS新交易对EOSmex上线PSI/EOS新交易对。</nobr>
      </p>
    </div>
    <div class="home-user-info-box">
      <div>
        <img src="../../../images/mobile/ic_announcement.svg" alt>
        <p>{{ dataStore.accountName }}</p>
      </div>
      <div>
        <p>
          <Language resource="asset.totalValue"/>
        </p>
        <h4>{{ dataStore.totalValuation.amount }}</h4>
        <p>{{ dataStore.totalValuation.name }}</p>
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
        <div class="home-list-page-box" v-for="item in dataStore.riseRank" :key="item.marketId">
          <ListChild :item="item"/>
        </div>
        <div class="home-link-to-market-box">
          <router-link to="market">
            <Language resource="asset.View_More"/>
          </router-link>
          <img src="../../../images/mobile/ic_arrow_under.svg" alt>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div
          class="home-list-page-box"
          v-for="(item, index) in dataStore.exChangeRank"
          :key="item.marketId"
        >
          <ListChild v-if="index<=10" :item="item" :key="index"></ListChild>
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
import ListChild from './components/ListChild.vue';
import dataStore from '@/stores/data';
import { Vue, Component } from 'vue-property-decorator';
import HomeIntroduce from './HomeIntroduce.vue';
import { Observer } from 'mobx-vue';

@Observer
@Component({
  components: {
    ListChild,
    HomeIntroduce,
  },
})
export default class extends Vue {
  dataStore = dataStore;
  selected = '1';
  dealList: any[] = [];
  growList: any[] = [];
  created() {
    //
  }
  mounted() {
    const noticeBox = document.getElementById('noticeBox');
    const notice = document.getElementById('notice');
    if (noticeBox === null || notice === null) {
      return;
    }
    if (noticeBox.offsetWidth > notice.offsetWidth) {
      return;
    }
    const timer = setInterval(() => {
      const text = notice.innerText;
      notice.innerText = text.substring(1, text.length) + text.substring(0, 1);
    }, 300);
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timer);
    });
  }
}
</script>
<style lang="scss">
#home-page {
  padding-bottom: 0.5rem;
  .home-banner-box {
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
      margin-top: 0.12rem;
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
      width: 0.4rem;
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
      font-size: 0.16rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .mint-navbar .mint-tab-item {
      color: #8d8d8d;
    }
    .mint-navbar .mint-tab-item.is-selected {
      margin-bottom: 0;
      border: none;
      color: #007aff;
      position: relative;
      .mint-tab-item-label {
        font-weight: bold;
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
