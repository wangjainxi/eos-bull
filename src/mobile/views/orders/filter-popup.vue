
<template>
  <div class="popup-box-out filterPopup"  @touchmove.prevent @click="onCloseMethod">
    <div class="popup-box" @click.stop >
      <p class="ptilte">
        <Language resource="order.Pair"/>
      </p>
      <div class="trans-box">
        <input type="text">
        <span class="pop">/</span>
        <button>EOS</button>
      </div>
      <p class="ptilte">
        <Language resource="order.Order_Status"/>
      </p>
      <div class="btn-box mb11">
        <mt-button  :class="isAll? 'border-blue':''" @click="onClick(1)">  <Language resource="order.All"/></mt-button>
        <mt-button  :class="isProcess? 'border-blue':''" @click="onClick(2)">  <Language resource="order.In_progress"/></mt-button>
      </div>
      <div class="btn-box">
        <mt-button :class="isComplete? 'border-blue':''" @click="onClick(3)">  <Language resource="order.Completed"/></mt-button>
        <mt-button :class="isRevoke? 'border-blue':''" @click="onClick(4)">  <Language resource="order.Revoked"/></mt-button>
      </div>
      <p class="ptilte">
        <Language resource="order.Trade_Type"/>
      </p>
      <div class="btn-box">
        <mt-button :class="isBuy? 'border-green':''" @click="onClick(5)">  <Language resource="order.buy"/></mt-button>
        <mt-button :class="isSell? 'border-red':''" @click="onClick(6)">  <Language resource="order.sell"/></mt-button>
      </div>
      <p class="defaut-select">
        <input type="checkbox" @change="onChecked" checked="isChecked">
        <span>
          <Language resource="order.Hide_Revoked_Order"/>
        </span>
      </p>
      <div class="btn-box handle-box">
        <mt-button  @click="onReset">
          <Language resource="order.Reset"/>
        </mt-button>
        <mt-button  @click="onOk">
          <Language resource="order.OK"/>
        </mt-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class FilterPopup extends Vue {
  isAll = false;
  isProcess = false;
  isComplete = false;
  isRevoke = false;
  isBuy = false;
  isSell = false;
  isChecked = true;
  onCloseMethod() {
    this.$emit('onClose');
  }

  onClick(type: number) {
    if (type === 1) {
      this.isAll = !this.isAll;
    }
    if (type === 2) {
      this.isProcess = !this.isProcess;
    }
    if (type === 3) {
      this.isComplete = !this.isComplete;
    }
    if (type === 4) {
      this.isRevoke = !this.isRevoke;
    }
    if (type === 5) {
      this.isBuy = !this.isBuy;
      this.isSell = false;
    }
    if (type === 6) {
      this.isBuy = false;
      this.isSell = !this.isSell;
    }
  }

  onChecked() {
    this.isChecked = !this.isChecked;
  }

  onReset() {
    this.isAll = false;
    this.isProcess = false;
    this.isComplete = false;
    this.isRevoke = false;
    this.isBuy = false;
    this.isSell = false;
  }

  onOk() {
    this.$emit('onClose');
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.filterPopup {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(31, 31, 31, 0.67);
  top: 0;
  left: 0;
  z-index: 999999;
}
.pop {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
}
.popup-box-out {
  @include flexLayout(column, center, center);
  .mb11 {
    margin-bottom: 0.11rem;
  }
  div {
    width: 100%;
  }
  .handle-box {
    button:nth-child(2) {
      background: rgba(0, 122, 255, 1);
      color: #fff;
    }
  }
  .defaut-select {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    span {
      font-size: 0.15rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
  }
  .ptilte {
    height: 0.22rem;
    font-size: 0.16rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 0.22rem;
    text-align: left;
    margin-bottom: 0.14rem;
    margin-top: 0.3rem;
  }
}
.btn-box {
  @include flexLayout(row, space-between, center);
  > button {
    flex: 1;
    background: rgba(242, 245, 251, 1);
    color: #000;
  }
  button:nth-child(1) {
    margin-right: 0.11rem;
  }
}
.trans-box {
  @include flexLayout(row, space-between, center);
  .pop {
    // width: 0.3rem;
    // margin-left: 0.14rem;
    // margin-right: 0.14rem;
  }
  button {
    width: 1.5rem;
    height: 0.34rem;
    border-radius: 0.02rem;
    border: 0.01rem solid rgba(141, 141, 141, 1);
    background-color: #fff;
    border-radius: 2px;
    opacity: 0.3;
    font-size: 0.15rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(141, 141, 141, 1);
  }
  input {
    width: 1.5rem;
    height: 0.34rem;
    border-radius: 0.02rem;
    border: 0.01rem solid rgba(141, 141, 141, 1);
    background-color: #fff;
    text-align: center;
    font-size: 0.15rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
}
.popup-box {
  left: 0rem;
  padding: 0 0.2rem 0.3rem;
  height: 4.9rem;
  background-color: #fff;
  z-index: 999999;
  @include flexLayout(column, flex-start, flex-start);
}
.border-blue {
  border: 1px solid rgba(0, 122, 255, 1);
  color: rgba(0, 122, 255, 1) !important;
}
.border-red{
  border: 1px solid rgba(255,0,0,1);
  color: rgba(255,0,0,1) !important;
}


.border-green{
  border: 1px solid rgba(0,204,55,1);;
  color: rgba(0,204,55,1) !important;
}

div {
  z-index: 999;
  color: #fff;
}
</style>


