<template>
  <div id="mex-place-order-page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Limit Orde" name="first">
        <div class="place-order-info">
          <div class="buy">
            <div class="place-order-info-title">
              <h4>Buy MAX</h4>
              <p>Balance:5.8501 EOS</p>
            </div>
            <div class="place-order-info-input">
              <p>Price</p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <div class="place-order-info-input">
              <p>Price</p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <div class="slider-box">
              <el-slider v-model="sliderValueBuy" :step="25" show-stops></el-slider>
            </div>
            <div class="place-order-info-input">
              <p>Price</p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <el-button type="primary">Buy</el-button>
          </div>
          <div class="sell">
            <div class="place-order-info-title">
              <h4>Sell MAX</h4>
              <p>Balance:5.8501 EOS</p>
            </div>
            <div class="place-order-info-input">
              <p>Price</p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <div class="place-order-info-input">
              <p>Price</p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <div class="slider-box">
              <el-slider v-model="sliderValueSell" :step="25" show-stops></el-slider>
            </div>
            <div class="place-order-info-input">
              <p>Price</p>
              <input type="number" placeholder="0.009999">
              <p>EOS</p>
            </div>
            <el-button type="primary">Sell</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Market Order" name="second">Market Order</el-tab-pane>
    </el-tabs>
    <div class="mex-place-order">
      <p>Gentle Warning</p>
    </div>
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
