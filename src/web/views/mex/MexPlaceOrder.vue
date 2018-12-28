<template>
  <div id="mex-place-order-page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Limit Orde" name="first">
        <div class="place-order-info">
          <div class="buy">
            <div class="place-order-info-title">
              <h4>
                <Language resource="exchange.Buy_In"/>MAX
              </h4>
              <p>
                <Language resource="exchange.Balance"/>:5.8501 EOS
              </p>
            </div>
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Buy_In_Price"/>
              </p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Buy_In_Amount"/>
              </p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <div class="slider-box">
              <el-slider v-model="sliderValueBuy" :step="25" show-stops></el-slider>
            </div>
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Exchange_Total"/>
              </p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <el-button type="primary">
              <Language resource="exchange.Buy_In"/>
            </el-button>
          </div>
          <div class="sell">
            <div class="place-order-info-title">
              <h4>
                <Language resource="exchange.Sell_out"/>MAX
              </h4>
              <p>
                <Language resource="exchange.Balance"/>:5.8501 EOS
              </p>
            </div>
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Sell_Out_Price"/>
              </p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Sell_Out_Amount"/>
              </p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <div class="slider-box">
              <el-slider v-model="sliderValueSell" :step="25" show-stops></el-slider>
            </div>
            <div class="place-order-info-input">
              <p>
                <Language resource="exchange.Exchange_Total"/>
              </p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <el-button type="primary">
              <Language resource="exchange.Sell_out"/>
            </el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Market Order" name="second">Market Order</el-tab-pane>
    </el-tabs>
    <el-popover
      placement="bottom"
      width="300"
      trigger="hover"
      content="EOSmex is a decentralized exchange，which does not make subjective judgment on any project and is not responsible for the investment results. It is strongly recommended that you make investment decisions after knowing the project in details."
    >
      <div class="mex-place-order" slot="reference">
        <img src="@/images/mobile/ic_warning.svg" alt>
        <p>Tips</p>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: 'mex-place-order',
  data() {
    return {
      activeName: 'first',
      sliderValueBuy: 0,
      sliderValueSell: 0,
    };
  },
};
</script>
<style lang="scss">
.el-popover {
  text-align: left;
}
#mex-place-order-page {
  position: relative;
  .place-order-info {
    display: flex;
    .buy {
      h4 {
        color: #1cc466;
      }
      button {
        background: #1cc466;
        border-color: #1cc466;
        width: 100%;
        margin-top: 17px;
      }
    }
    .sell {
      h4 {
        color: #e53757;
      }
      button {
        background: #e53757;
        border-color: #e53757;
        width: 100%;
        margin-top: 17px;
      }
    }
    > div {
      width: 50%;
      padding: 0 16px;
      border-right: 1px solid #1e3a5d;
      color: #7b8db9;
      .place-order-info-title {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        p {
          font-size: 12px;
        }
      }
      .place-order-info-input {
        margin-top: 15px;
        background: #1e3a5d;
        height: 40px;
        width: 100%;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        input {
          width: 100%;
          text-align: right;
          padding-right: 20px;
          background: none;
          border: none;
          font-size: 16px;
          flex: 1 1;
        }
      }
      .slider-box {
        margin-top: 17px;
        .el-slider {
          padding: 0 5px;
        }
      }
    }
    > div:nth-child(2) {
      border-right: none;
    }
  }
  .mex-place-order {
    color: #d6a93b;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
    img {
      margin-right: 5px;
    }
  }
  .el-tabs__nav-scroll {
    padding: 0 20px;
  }
  .el-tabs__nav-wrap::after {
    height: 1px;
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
}
</style>
