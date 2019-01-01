<template>
  <div class="package">
    <div class="about-banner-box">
      <img src="@/images/mobile/ic_avatar.svg" />
      <h3>{{ accountName }}</h3>
      <div>
        <h4>{{ totalValuation.amount }}</h4>
        <span>{{ totalValuation.name }}</span>
      </div>
      <p>
        <Language resource="asset.totalValue"/>
      </p>
    </div>
    <div class="about-CPU-info-box" v-on:click="onpopupState">
      <div>
        <h4>CPU</h4>
        <p>
          <Language resource="asset.Used"/>
          &nbsp;{{ cpuInfo.usageRate }}%
        </p>
      </div>
      <div>
        <h4>NET</h4>
        <p>
          <Language resource="asset.Used"/>
          &nbsp;{{ netInfo.usageRate }}%
        </p>
      </div>
      <div>
        <h4>RAM</h4>
        <p>
          <Language resource="asset.Used"/>
          &nbsp;{{ ramInfo.usageRate }}%
        </p>
      </div>
    </div>
    <div class="currency-input-box">
      <div id="assetsSelectButton" @click="onAssetsSelectTrue">
        <p>
          <Language :resource="selectInput"/>
        </p>
        <img src="@/images/mobile/ic_arrow_under.svg" alt>
      </div>
      <div>
        <input type="text" :placeholder="search">
      </div>
    </div>
    <div class="assets-select-Box" id="assetsSelectBox" v-show="assetsSelectData">
      <p v-for="(item,index) of selectInputs" :key="index" @click="onAssetsSelect(item)">
        <Language :resource="item"/>
      </p>
    </div>
    <div class="currener-info-box-package">
      <div class="currener-info-box" v-for="(item,index) in walletTokens" :key="index">
        <div>
          <h4>{{item.available.symbol.symbol.name}}</h4>
          <p>
            <Language resource="asset.Value"/>
            ：{{item.value}}
          </p>
        </div>
        <div>
          <h4>
            <Language resource="asset.Used"/>
            ：{{item.available.amount}}
          </h4>
          <p>
            <Language resource="asset.Frozen"/>
            ：{{item.onOrder.amount}}
          </p>
        </div>
      </div>
    </div>

    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <h4>
        <Language resource="asset.Resources_Usage"/>
      </h4>
      <div>
        <h4>
          CPU：
          <span>
            <Language resource="asset.Used"/>5048.2%
          </span>
        </h4>
        <p>
          <Language resource="asset.Used"/>0.00us/
          <Language resource="asset.Total"/>45.00us(0.1000 EOS)
        </p>
        <Language resource="asset.Used"/>
        <h4>NET： 1.9%</h4>
        <p>
          <Language resource="asset.Used"/>0.00B/
          <Language resource="asset.Total"/>77.15KB(0.1000 EOS)
        </p>
        <h4>RAM：
          <Language resource="asset.Used"/>57.0%
        </h4>
        <p>
          <Language resource="asset.Used"/>2.92KB/
          <Language resource="asset.Total"/>5.34KB
        </p>
      </div>
      <mt-button v-on:click="onpopupState" type="primary">
        <Language resource="asset.Confirm"/>
      </mt-button>
    </mt-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, namespace } from 'vuex-class';
import languageStore from '@/stores/language';
import { TokenBalance } from '@/define';

const userModule = namespace('user');

@Component
export default class Assets extends Vue {
  @State('accountName')
  accountName!: string;

  @userModule.Getter('walletTokens')
  walletTokens!: TokenBalance[];

  @userModule.Getter('totalValuation')
  totalValuation!: Object;

  @userModule.Getter('cpuInfo')
  cpuInfo!: Object;

  @userModule.Getter('netInfo')
  netInfo!: Object;

  @userModule.Getter('ramInfo')
  ramInfo!: Object;

  selectInput = 'asset.Value_0_01EOS';
  popupVisible = false;
  assetsSelectData = false;
  search = languageStore.getIntlText('asset.search');
  selectInputs = [
    'asset.Total_Asset',
    'asset.Tradable_Assets',
    'asset.Value_0_01EOS',
    'asset.Following',
  ];
  onpopupState() {
    this.popupVisible = !this.popupVisible;
  }
  onAssetsSelectTrue() {
    this.assetsSelectData = !this.assetsSelectData;
    const assetsSelectBox = document.getElementById('assetsSelectBox');
    const assetsSelectButton = document.getElementById('assetsSelectButton');
    if (assetsSelectButton === null || assetsSelectBox === null) return;
    const assetsSelectButtonTop = assetsSelectButton.offsetTop;
    const assetsSelectButtonH = assetsSelectButton.offsetHeight;
    const assetsSelectBoxTop = assetsSelectButtonTop + assetsSelectButtonH + 5;
    assetsSelectBox.style.top = assetsSelectBoxTop + 'px';
  }
  onAssetsSelect(index: string) {
    console.log(index);
    this.selectInput = index;
    this.assetsSelectData = false;
  }
}
</script>
<style lang="scss" scoped>
.about-banner-box {
  height: 2rem;
  width: 100%;
  padding-top: 0.4rem;
  background-image: url('../../../images/mobile/bg_banner.svg');
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
      background-image: url('../../../images/mobile/ic_find.svg');
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
      margin-bottom: 0.02rem;
      font-weight: bold;
    }
    p {
      color: #8d8d8d;
      font-size: 0.13rem;
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
        font-size: 0.15rem;
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
.package {
  position: relative;
}
.assets-select-Box {
  position: absolute;
  left: 0.2rem;
  background: #fff;
  text-align: left;
  padding: 5px 0.1rem;
  border-radius: 4px;
  box-shadow: #eee 0px 0px 5px;
  p {
    color: #333;
    font-size: 0.13rem;
    padding: 5px 0;
  }
}
</style>
