<template>
  <div id="mobile-homt-introduce">
    <div class="advantage-box">
      <h3>
        <Language resource="home.advantages"/>
      </h3>
      <div class="advantage-inner-box">
        <img src="@/images/mobile/home_inturo1.png" alt>
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
        <img src="@/images/mobile/home_inturo2.png" alt>
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
      </div>
      <div class="advantage-inner-box">
        <img src="@/images/mobile/home_inturo3.png" alt>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';

@Observer
@Component
export default class HomeIntroduce extends Vue {
  created() {
    //
  }
}
</script>

<style lang="scss">
#mobile-homt-introduce {
  .advantage-box {
    background: #191a2a;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    text-align: center;
    > h3 {
      span {
        color: #fff;
        font-size: 0.18rem;
      }
    }
  }
  .advantage-inner-box {
    img {
      width: 2.04rem;
      height: 2.04rem;
    }
    h4 {
      span {
        color: #01d6f9;
        font-size: 0.18rem;
      }
      margin-bottom: 0.05rem;
    }
    p {
      span {
        font-size: 0.1rem;
        color: #bbccff;
      }
    }
  }
  .cooperation-box {
    padding-top: 0.2rem;
    padding-bottom: 0.15rem;
    h4 {
      span {
        font-size: 0.16rem;
        color: #000;
      }
    }
    > div {
      display: flex;
      justify-content: flex-start;
      padding: 0 0.3rem;
      img {
        width: 0.52rem;
        height: 0.23rem;
        margin-right: 0.18rem;
        flex: 0 0;
        margin-bottom: 0.1rem;
      }
      img:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
