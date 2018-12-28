<template>
  <div>
    <div>111</div>
    <el-dialog
      title="MEV/EOS Deal Details"
      :visible.sync="dialogVisible"
      width="900"
      @close="close"
      center
    >
      <div class="popup-inner-package">
        <div class="popup-top-info-package">
          <div class="popup-top-info-box">
            <h4>Deal Price</h4>
            <p class="popup-top-info-p">
              0.01221
              <span>EOS</span>
            </p>
          </div>
          <div class="popup-top-info-box">
            <h4>Amount</h4>
            <p class="popup-top-info-p">
              0.01221
              <span>MEV</span>
            </p>
          </div>
          <div class="popup-top-info-box">
            <h4>Total</h4>
            <p class="popup-top-info-p">
              0.01221
              <span>EOS</span>
            </p>
          </div>
          <div class="popup-top-info-box">
            <h4>Deal Time</h4>
            <p class="popup-top-info-p">2018-12-09 14:56:06</p>
          </div>
        </div>
        <div class="popup-moddle-info-package">
          <div class="popup-moddle-info-box">
            <button class="buttonBuy">Buyer</button>
            <div class="moddle-info">
              <h4>EOS Account Name:</h4>
              <p class="blue">gqztinrqgige</p>
            </div>
            <div class="moddle-info">
              <h4>Total:</h4>
              <p class="white">73.0519 MEV</p>
            </div>
            <div class="moddle-info">
              <h4>Fee:</h4>
              <p class="white">0.0731 MEV</p>
            </div>
            <div class="moddle-info">
              <h4>Entrusted TrxID:</h4>
              <p class="blue">gqztinrqgige</p>
            </div>
            <div class="moddle-info">
              <h4>Dealt TrxID:</h4>
              <p class="blue">gqztinrqgige</p>
            </div>
          </div>
          <div class="popup-moddle-info-box">
            <button class="buttonSell">Seller</button>
            <div class="moddle-info">
              <h4>EOS Account Name:</h4>
              <p class="blue">gqztinrqgige</p>
            </div>
            <div class="moddle-info">
              <h4>Total:</h4>
              <p class="white">73.0519 MEV</p>
            </div>
            <div class="moddle-info">
              <h4>Fee:</h4>
              <p class="white">0.0731 MEV</p>
            </div>
            <div class="moddle-info">
              <h4>Entrusted TrxID:</h4>
              <p class="blue">gqztinrqgige</p>
            </div>
            <div class="moddle-info">
              <h4>Dealt TrxID:</h4>
              <p class="blue">gqztinrqgige</p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class OrderPopup extends Vue {
  @Prop(Boolean) dialogVisible!: false;

  close() {
    this.$emit('closePopup');
  }
}
</script>
<style lang="scss" spends>
.el-icon-close:before {
  color: #e26565;
}
.el-dialog__header {
  text-align: left;
  border-bottom: 1px solid #1e3a5d;

  span {
    color: #fff;
    font-size: 18px;
    padding: 17px 0;
  }
}
.el-dialog--center {
  background: #142e4d;
  border-radius: 8px;
}
.el-dialog--center .el-dialog__body {
  padding: 30px 40px 0;
}
.popup-top-info-package {
  display: flex;
  justify-content: space-between;
  padding: 0 60px 30px;
  border-bottom: 1px solid #1e3a5d;
  .popup-top-info-box {
    h4 {
      font-size: 14px;
      color: #677bb7;
    }
    .popup-top-info-p {
      font-size: 14px;
      color: #fff;
      margin-top: 5px;
      span {
        color: #677bb7;
      }
    }
  }
}
.popup-moddle-info-package {
  padding: 30px 60px 24px;
  display: flex;
  justify-content: space-between;
  .buttonBuy {
    width: 66px;
    height: 20px;
    background: #1cc466;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .buttonSell {
    width: 66px;
    height: 20px;
    background: #e53757;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    margin-bottom: 10px;
  }
  .moddle-info {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 6px;
    h4 {
      color: #677bb7;
      font-size: 14px;
      margin-right: 10px;
    }
    .white {
      color: #fff;
      font-size: 14px;
    }
    .blue {
      color: #2d7be5;
      font-size: 14px;
    }
  }
}
</style>