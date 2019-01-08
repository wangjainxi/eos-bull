<template>
  <div id="mex-head-info-page">
    <div class="head-info-title">
      <div class="head-info-title-logo">
        <img class="symbol-icon" :src="market && market.baseCurrencyIcon">
        <div @click="setInfoTitleState" class="click-range">
          <h4 v-if="market">
            <span>{{ market.pair.baseCurrency.symbol.name }}</span>
            /{{ market.pair.quoteCurrency.symbol.name }}
          </h4>
          <h4 v-else>
            <span>-</span>
            /-
          </h4>
          <p>
            <Language resource="exchange.Introduction"/>
          </p>
        </div>
      </div>
      <div class="head-info-title-info">
        <div>
          <h4>
            <Language resource="exchange.Last_price"/>
          </h4>
          <p>
            <span>{{ market ? market.lastPrice : '-' }}</span>
            EOS
          </p>
        </div>
        <div>
          <h4>
            <Language resource="exchange.Change24H"/>
          </h4>
          <p>
            <span>{{ market ? market.change : '-' }}</span>
            EOS
          </p>
        </div>
        <div>
          <h4>
            <Language resource="exchange.High24H"/>
          </h4>
          <p>
            <span>{{ market ? market.high : '-' }}</span>
            EOS
          </p>
        </div>
        <div>
          <h4>
            <Language resource="exchange.Low24H"/>
          </h4>
          <p>
            <span>{{ market ? market.low : '-' }}</span>
            EOS
          </p>
        </div>
        <div>
          <h4>
            <Language resource="exchange.Volume24H"/>
          </h4>
          <p>
            <span>{{ market ? market.volumeQuote : '-' }}</span>
            EOS
          </p>
        </div>
      </div>
    </div>

    <div class="head-info-inner" v-if="infoTitleState">
      <div>
        <h4>
          <Language resource="exchange.Introduction"/>
        </h4>
        <p>
          EOSMax is a gaming entertainment platform based
          on the intelligent contract of Eos main network.
          The platform's gambling games all adopt the original
          random number generation technology, and the team has
          made the algorithm open source, supporting the result
          verification. Meanwhile, the platform will airdrop
          the platform token MAX free of charge to the players
          through the mode of "game is mining". In the future,
          100% of the profits of the platform will be distributed
          to the holders of the MAX token, making the player a shareholder of the platform
        </p>
      </div>
      <div>
        <div>
          <h4>
            <Language resource="exchange.Max_Supply"/>
          </h4>
          <p>10,000,000,000</p>
        </div>
        <div>
          <h4>
            <Language resource="exchange.Contract"/>
          </h4>
          <p>10,000,000,000</p>
        </div>
      </div>
      <div>
        <div>
          <h4>
            <Language resource="exchange.Circulating_Supply"/>
          </h4>
          <p>10,000,000,000</p>
        </div>
        <div>
          <h4>
            <Language resource="exchange.Website"/>
          </h4>
          <p>10,000,000,000</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Market } from '@/define';

@Component
export default class MexHead extends Vue {
  infoTitleState = false;

  @Prop()
  market?: Market;

  setInfoTitleState() {
    this.infoTitleState = !this.infoTitleState;
  }
}
</script>

<style lang="scss" scoped>
.symbol-icon {
  width: 44px;
  height: 44px;
}

#mex-head-info-page {
  height: 100%;
  width: 100%;
  padding: 0 10px;
  .head-info-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .head-info-title-logo {
      display: flex;
      align-items: center;
      padding: 0 0 0 51px;
      border-right: 1px solid #2a4a72;
      color: #677bb7;
      width: 23%;
      margin-right: 2%;
      div {
        margin-left: 10px;
      }
      h4 > span {
        font-size: 24px;
        color: #fff;
      }
      p {
        padding-left: 15px;
        background-image: url('../../../images/web/ic_order.svg');
        background-repeat: no-repeat;
        background-size: 10px 12px;
        background-position: 0 4px;
        font-size: 12px;
        text-align: left;
        line-height: 20px;
      }
    }
    .head-info-title-info {
      width: 75%;
      display: flex;
      justify-content: space-between;
      color: #677bb7;
      padding-right: 20px;
      padding-top: 10px;
      text-align: left;
      h4 {
        font-size: 14px;
      }
      p {
        font-size: 14px;
        span {
          color: #e53757;
        }
      }
      div:nth-child(n + 3) {
        p {
          span {
            color: #fff;
          }
        }
      }
    }
  }
  .head-info-inner {
    display: flex;
    justify-content: flex-start;
    color: #677bb7;
    padding: 20px 26px;
    border-top: 1px solid #2a4a72;
    > div:nth-child(1) {
      width: 60%;
      margin-right: 60px;
      text-align: left;
      h4 {
        font-size: 18px;
      }
      p {
        font-size: 14px;
        line-height: 30px;
      }
    }
    > div:nth-child(2),
    > div:nth-child(3) {
      text-align: left;
      padding-top: 30px;
      margin-right: 60px;
      h4 {
        font-size: 12px;
      }
      p {
        color: #92a7c5;
        font-size: 14px;
        margin-bottom: 20px;
      }
    }
  }
  .head-info-title-info-no {
    display: block;
  }
  .el-collapse-item .is-active {
    border-bottom: 1px solid #2a4a72;
  }
  .el-collapse {
    border: none;
  }
  .el-collapse-item__arrow {
    display: none;
  }
  .el-collapse-item__wrap {
    background: none;
    border: none;
  }
  .el-collapse-item__header {
    border: none;
    background: none;
    line-height: 20px;
    height: 70px;
  }
}
.click-range {
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
</style>
