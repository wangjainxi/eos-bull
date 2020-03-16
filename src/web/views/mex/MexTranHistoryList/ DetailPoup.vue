<template>
<div class="outPoup">
  <div class="alertPoup">
    <div class="top">
      <div class="left">MEV/EOS  <Language resource="transaction.deal_Details"/></div>
      <div class="close" @click="onClose">
        <img src="../../../../images/web/ic_popup_closed.svg" alt="">
      </div>
    </div>
    <div class="bom">
      <div class="content-top">
        <div class="item">
          <p class="ptitle"><Language resource="transaction.deal_price"/></p>
          <p class="ptext">Deal Price <span class="ptext">EOS</span>  </p>
        </div>
         <div class="item">
          <p class="ptitle"><Language resource="transaction.deal_amount"/></p>
          <p class="ptext">Deal Price</p>
        </div>
         <div class="item">
          <p class="ptitle"><Language resource="transaction.total"/></p>
          <p class="ptext">Deal Price</p>
        </div>
         <div class="item">
          <p class="ptitle"><Language resource="transaction.deal_Time"/></p>
          <p class="ptext">Deal Price</p>
        </div>
      </div>
      <div class="content-bom">
        <div class="trans-box">
          <div class="handler handler-buy"><Language resource="transaction.buyer"/></div>
          <div class="handler-item">
            <span class="tTitle"><Language resource="transaction.eos_Account_Name"/>:</span>
            <span class="tText">gqztinrqgige</span>
          </div>
           <div class="handler-item">
            <span class="tTitle"><Language resource="transaction.settle_total"/>:</span>
            <span class="tTextWhite">73.0519 MEV</span>
          </div>
           <div class="handler-item">
            <span class="tTitle"><Language resource="transaction.fee"/>:</span>
            <span class="tTextWhite">0.0731 MEV</span>
          </div>

           <div class="handler-item">
            <span class="tTitle"><Language resource="transaction.entrusted_TrxID"/>:</span>
            <span class="tText">43a873eeae27f6632ff17</span>
          </div>
           <div class="handler-item">
            <span class="tTitle"><Language resource="transaction.dealt_TrxID"/>:</span>
            <span class="tText">32b0777936223647ea3670e</span>
          </div>
        </div>

     <div class="trans-box">
          <div class="handler handler-sell"><Language resource="transaction.seller"/></div>
          <div class="handler-item">
            <span class="tTitle"><Language resource="transaction.eos_Account_Name"/>:</span>
            <span class="tText">gqztinrqgige</span>
          </div>
           <div class="handler-item">
            <span class="tTitle"><Language resource="transaction.settle_total"/>:</span>
            <span class="tTextWhite">73.0519 MEV</span>
          </div>
           <div class="handler-item">
            <span class="tTitle"><Language resource="transaction.fee"/>:</span>
            <span class="tTextWhite">0.0731 MEV</span>
          </div>

           <div class="handler-item">
            <span class="tTitle"><Language resource="transaction.entrusted_TrxID"/>:</span>
            <span class="tText">43a873eeae27f6632ff17</span>
          </div>
           <div class="handler-item">
            <span class="tTitle"><Language resource="transaction.dealt_TrxID"/>:</span>
            <span class="tText">32b0777936223647ea3670e</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class extends Vue {
  @Prop() changePoup!: Function;
  onClose() {
    this.$emit('changePoup');
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../style/mixin.scss';
.content-bom {
  @include flexLayout(row, flex-start, flex-start);
  padding-left: 60px;
  padding-right: 60px;
  .handler-item {
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(45, 123, 229, 1);
  }
  .tTitle {
    margin-right: 10px;
    color: rgba(103, 123, 183, 1);
  }
  .tText {
    color: rgba(45, 123, 229, 1);
  }
  .tTextWhite {
    color: #fff;
  }
  .handler {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
    margin-bottom: 11px;
    padding-left: 14px;
    padding-right: 14px;
    border-radius: 4px;
  }
  .handler-buy {
    background: rgba(28, 196, 102, 1);
  }
  .handler-sell {
    background: rgba(229, 55, 87, 1);
  }
  .trans-box {
    flex: 1;
    @include flexLayout(column, flex-start, flex-start);
    padding-top: 29px;
  }
}
.outPoup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 0, 0, 0.5);
  z-index: 9999;
}
.alertPoup {
  width: 900px;
  height: 386px;
  background: rgba(20, 46, 77, 1);
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 200px;
}
.left {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.top {
  height: 59px;
  border-bottom: 1px solid rgba(30, 58, 93, 1);
  @include flexLayout(row, space-between, center);
  padding-left: 18px;
  padding: 18px;
}
.bom {
  padding: 0 40px 40px 40px;
}
.content-top {
  height: 100px;
  padding-left: 60px;
  @include flexLayout(row, flex-start, center);
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  line-height: 20px;
  border-bottom: 1px solid rgba(30, 58, 93, 0.5);
  .item {
    margin-right: 103px;
    text-align: left;
  }
  .ptitle {
    color: rgba(103, 123, 183, 1);
  }
  .ptext {
    color: rgba(255, 255, 255, 1);
  }
}
</style>
