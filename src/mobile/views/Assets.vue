<template>
  <div id="about-page">
    <div class="about-banner-box">
      <img src="../../images/mobile/ic_correct.svg" alt>
      <h3>WantLine</h3>
      <div>
        <h4>8888.93</h4>
        <span>EOS</span>
      </div>
      <p>总估值</p>
    </div>
    <div class="about-CPU-info-box" v-on:click="onpopupState">
      <div>
        <h4>CPU</h4>
        <p>已用 5048.2%</p>
      </div>
      <div>
        <h4>NET</h4>
        <p>已用 5048.2%</p>
      </div>
      <div>
        <h4>RAM</h4>
        <p>已用 5048.2%</p>
      </div>
    </div>
    <div class="currency-input-box">
      <div>
        <p>非小额资产</p>
        <img src="../../images/mobile/ic_arrow_under.svg" alt>
      </div>
      <div>
        <input type="text" placeholder="搜索">
      </div>
    </div>
    <div class="currener-info-box-package">
      <div class="currener-info-box">
        <div>
          <h4>EOS</h4>
        </div>
        <div>
          <h4>可用：808.19</h4>
          <p>冻结：0.0000</p>
        </div>
      </div>
      <div class="currener-info-box" v-for="(item,index) in currendcrInfo">
        <div>
          <h4>{{item.name}}</h4>
          <p>{{item.value}}</p>
        </div>
        <div>
          <h4>可用：{{item.available}}</h4>
          <p>冻结：{{item.Frozen}}</p>
        </div>
      </div>
    </div>

    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <h4>资源用量</h4>
      <div>
        <h4>
          CPU：
          <span>已用 5048.2%</span>
        </h4>
        <p>已用 0.00us/总45.00us(0.1000 EOS)</p>
        <h4>NET：已用 1.9%</h4>
        <p>已用 0.00B/总77.15KB(0.1000 EOS)</p>
        <h4>RAM：已用 57.0%</h4>
        <p>已用 2.92KB/总5.34KB</p>
      </div>
      <mt-button v-on:click="onpopupState" type="primary">确认</mt-button>
    </mt-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import userStore from '@/stores/user';

const currendcrInfo = [
  {
    name: 'DPY',
    available: 3333,
    value: 3333,
    Frozen: 3333,
    id: 1,
  },
  {
    name: 'DPY',
    available: 3333,
    value: 3333,
    Frozen: 3333,
    id: 2,
  },
  {
    name: 'DPY',
    available: 3333,
    value: 3333,
    Frozen: 3333,
    id: 3,
  },
];
export default class extends Vue {
  popupVisible = false;
  currendcrInfo = [];

  onpopupState() {
    this.popupVisible = !this.popupVisible;
  }
  setCurrendcrInfo(list: any) {
    this.currendcrInfo = list;
  }

  created() {
    this.setCurrendcrInfo(currendcrInfo);
    userStore.setCurrency('4');
  }
}
</script>
<style lang="scss">
#about-page {
  width: 100%;
  .about-banner-box {
    height: 2rem;
    width: 100%;
    padding-top: 0.4rem;
    background-image: url('../../images/mobile/bg_banner.svg');
    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
    > img {
      width: 0.34rem;
      height: 0.34rem;
      border-radius: 50%;
      margin-bottom: 0.12rem;
    }
    > h3 {
      font-size: 0.12rem;
      font-weight: bold;
      margin-bottom: 0.3rem;
      color: #fff;
      line-height: 0.12rem;
    }
    > div {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      h4 {
        font-size: 0.18rem;
        color: #fff;
        line-height: 0.18rem;
        font-weight: bold;
      }
      span {
        font-size: 0.14rem;
        color: #fff;
        font-weight: bold;
        line-height: 0.18rem;
        margin-left: 0.05rem;
      }
    }
    p {
      font-size: 0.11rem;
      color: #fff;
      margin-top: 0.05rem;
    }
  }
  .about-CPU-info-box {
    padding: 0.16rem 0.2rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 6px solid #f2f5fb;
    h4 {
      color: #8d8d8d;
      font-size: 0.15rem;
      font-weight: bold;
    }
    p {
      font-size: 0.15rem;
      color: #000000;
      font-weight: bold;
      margin-top: 0.05rem;
    }
    > div:nth-child(1) {
      p {
        color: #ff0000;
      }
    }
  }
  .currency-input-box {
    display: flex;
    justify-content: space-between;
    padding: 0.16rem 0.2rem;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 0.15rem;
        color: #000;
      }
      img {
        width: 0.12rem;
        height: 0.12rem;
        margin-left: 0.05rem;
      }
      input {
        height: 0.22rem;
        width: 1.6rem;
        background: #f2f5fb;
        color: #8d8d8d;
        padding-left: 0.16rem;
        line-height: 0.22rem;
        border-radius: 0.11rem;
        background-image: url('../../images/mobile/ic_find.svg');
        background-repeat: no-repeat;
        background-size: 0.12rem 0.12rem;
        background-position: 1.38rem 0.06rem;
      }
    }
  }
  .currener-info-box-package {
    padding: 0 0.2rem;
  }
  .currener-info-box:last-child {
    border: none;
  }
  .currener-info-box {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f2f5fb;
    padding: 0.1rem 0;

    div:nth-child(1) {
      width: 60%;
      text-align: left;

      h4 {
        color: #007aff;
        font-size: 0.16rem;
        margin-bottom: 0.05rem;
        font-weight: bold;
      }
    }
    div:nth-child(2) {
      width: 40%;
      text-align: left;
      h4 {
        color: #000;
        margin-bottom: 0.05rem;
        font-size: 0.13rem;
        font-weight: bold;
      }
      p {
        color: #8d8d8d;
        font-size: 0.13rem;
        font-weight: bold;
      }
    }
  }
  .mint-popup {
    padding: 0.2rem;
    width: 70%;
    border-radius: 0.08rem;
    > h4 {
      font-size: 0.16rem;
      color: #007aff;
      margin-bottom: 14px;
    }
    > div {
      text-align: left;

      > h4 {
        font-size: 0.15rem;
        color: #000;
        font-weight: bold;
        span {
          color: #ff0000;
          font-weight: bold;
        }
      }
      > p {
        font-size: 0.13rem;
        margin-bottom: 14px;
      }
    }
    .mint-button {
      color: #fff;
      height: 0.3rem;
      width: 1.54rem;
      font-size: 0.14rem;
      background: #007aff;
    }
  }
}
</style>
