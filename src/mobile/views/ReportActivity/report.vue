<template>
  <div class="page">
      <h4 class="titleTOP">活动报名</h4>
    <p class="title">参与份数（每份1EOS，单账户上限100份)</p>
    <div class="inputBox">
      <input type="number" v-model.number="num" v-on:blur="onInput">
      <span>EOS</span>
    </div>
    <p class="tips important">
      <span>*</span> 参与份数以实际投入合约内EOS数量为准不足1EOS部分视为对活动奖励池的捐赠，不退还连续30日打卡，请使用同一EOS账号进行交易，否则将视为出局。
    </p>
    <h4 class="title">每日短信提醒</h4>
    <div class="inputBox">
      <input type="number" v-model.number="iphoneNum">
      <span>(选填)</span>
    </div>
    <p class="tips">每日上午10: 00 / 下午6: 00两次短信提醒。</p>
    <button class="button" @click="onConfirm">确定</button>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class ReportPage extends Vue {
  num = '0.0000';
  iphoneNum = '';
  onInput() {
    this.num = Number(this.num).toFixed(4);
    console.log(this.num);
  }
  onConfirm() {
    console.log(this.num, this.iphoneNum);
  }
}
</script>
<style lang="scss" scoped>
.page {
  padding: 70px 0.5rem;
  background: #fff;
}
.titleTOP {
  font-size: 0.2rem;
  color: #000;
  margin-bottom: 0.2rem;
}
.title {
  font-size: 0.14rem;
  color: #000;
  margin-bottom: 0.2rem;
}
.inputBox {
  border: 1px solid #ddd;
  padding: 0.14rem 0.1rem;
  margin-bottom: 0.12rem;
  display: flex;
  justify-content: space-between;
  input {
    color: #000;
    font-size: 0.17rem;
    width: 1.8rem;
  }
  span {
    color: #007aff;
    font-size: 0.17rem;
  }
}
.tips {
  font-size: 0.12rem;
  color: #666666;
  margin-bottom: 0.2rem;
  text-align: left;
}
.important {
  position: relative;
  span {
    position: absolute;
    top: 0;
    left: -6px;
    color: #e70f0d;
  }
}
.button {
  width: 1.85rem;
  height: 0.42rem;
  background: rgba(0, 122, 255, 1);
  border-radius: 2px;
  color: #fff;
  font-size: 0.18rem;
  margin-top: 0.4rem;
}
</style>
