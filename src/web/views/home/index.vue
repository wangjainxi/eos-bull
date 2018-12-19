<template>
  <div id="home-page">
    <div class="package">
      <div class="top">
        <div class="logo">
          <img src="./home-page-img/logo_eosmex01.svg" alt>
        </div>
        <div class="nav">
          <p>首页</p>
          <p>币币交易</p>
          <p>白皮书</p>
          <select name id="ch">
            <option value="ch">简体中文</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
      <div class="banner-box">
        <h4>EOSmex</h4>
        <p>一个真实去中心化的</p>
        <p>数字资产交易平台</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>
<style lang="scss">
#home-page {
  background: #0d1f35;
  height: 1000px;
  .package {
    width: 1440px;
    height: 100%;
    margin: 0 auto;
  }
  .top {
    width: 100%;
    padding-top: 55px;
    padding: 55px 120px 15px;
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
  .banner-box {
    width: 100%;
    height: 676px;
    padding: 0 120px;
    background: url('./home-page-img/bg.png');
  }
}
</style>
