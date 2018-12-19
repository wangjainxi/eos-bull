<template>
  <div id="foot-page">
    <div class="foot">
      <div class="foot-top">
        <div class="foot-dec-left">
          <a href>FAQ</a>
          <a href>Bulletin</a>
          <a href>Rate standard</a>
          <a href>Submit Request</a>
        </div>
        <div class="foot-dec-right">Cryptocurrency investment is risky, please be cautious.</div>
      </div>
      <div class="foot-bottom">
        <div class="foot-dec-left">Copyright © 2018 EOSmex Inc. All rights reserved.</div>
        <div class="foot-dec-right">
          <div>24H Total：265172.3326 EOS</div>
          <div>GBI：3980.3</div>
          <div class="wifi" @click="showAddress">
            <img src="@/images/web/ic_wifi.svg" alt>
            <span>HongKong</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'element-ui';
import chooseNode from './chooseNode.vue';
export default {
  name: 'foot',
  components:{
    chooseNode,
  },
  methods: {
    showAddress() {
      MessageBox({
        title: 'EOSmex',
        message: <choose-node />,
        showCancelButton: false,
        showConfirmButton: false,
        customClass: 'foot-choose-node',
      });
    },
  },
};
</script>
<style lang="scss">
#foot-page {
  width: 100%;
  height: 110px;
  background: #142e4d;
  .foot {
    width: 1200px;
    color: #fff;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  .foot-top,
  .foot-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .foot-dec-left,
    .foot-dec-right {
      color: rgba(110, 132, 163, 1);
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .foot-dec-right {
      text-align: right;
    }
  }
  .foot-top {
    margin: 15px 0 37px;
  }
  .foot-top {
    .foot-dec-left {
      justify-content: flex-start;
      a {
        margin-right: 60px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(221, 221, 221, 1);
        text-decoration-line: none;
      }
    }
  }
  .foot-dec-right {
    & > div {
      margin-right: 21px;
      color: rgba(221, 221, 221, 1);
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
    }
    & > div:nth-child(3) {
      margin-right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 15px;
        height: 11px;
        margin-right: 5px;
      }
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: rgba(28, 196, 102, 1);
        font-weight: 400;
      }
    }
  }
  .wifi {
    cursor: pointer;
  }
}
</style>
