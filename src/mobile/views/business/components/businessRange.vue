<template>
  <div
    :class="['business-range',currrentTab === '买入' || currrentTab === 'buy' ? 'business-range-buy' : 'business-range-sell']"
    :getRangeVal="getRangeVal"
  >
    <i
      class="cricle"
      @click="changeRangeValue(item)"
      v-for="(item, index) in cricleMount"
      :key="index"
    ></i>
    <mt-range v-model="rangeVal" :min="0" :max="100" :step="1" :bar-height="5">
      <!-- <div slot="start">0</div>
      <div slot="end">100</div>-->
    </mt-range>
    <br>
  </div>
</template>
<script>
export default {
  name: 'business-range',
  data() {
    return {
      rangeVal: this.rangeValue,
    };
  },
  props: ['rangeValue', 'cricleMount', 'getRangeValue', 'currrentTab'],
  methods: {
    changeRangeValue(num) {
      this.rangeVal = num * 25;
      return this.rangeVal;
    },
  },
  computed: {
    getRangeVal() {
      this.$emit('getRangeValue', this.rangeVal);
    },
  },
};
</script>
<style lang="scss">
@import '../../../../style/mixin.scss';
.business-range {
  width: auto;
  position: relative;
  margin: 0.19rem 0 0.07rem;
  display: flex;
  @include font(400, 0.12rem, 0.17rem, 'PingFangSC-Light');
  .mt-range {
    width: 100%;
  }
  i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    left: -1px;
    @include wh(0.15rem, 0.15rem);
    background: rgba(255, 255, 255, 1);
    @include borderRadius(50%);
    border: 2px solid rgba(216, 215, 216, 1);
  }
  .cricle:nth-child(2) {
    left: 23%;
  }
  .cricle:nth-child(3) {
    left: 46%;
  }
  .cricle:nth-child(4) {
    left: 69%;
  }
  .cricle:nth-child(5) {
    left: 92%;
  }
}
.business-range {
  .mt-range-thumb {
    z-index: 5;
  }
}
.business-range-buy {
  .mt-range-progress {
    background-color: rgba(7, 199, 78, 1);
  }
}
.business-range-sell {
  .mt-range-progress {
    background-color: rgba(255, 0, 0, 1);
  }
}
</style>
