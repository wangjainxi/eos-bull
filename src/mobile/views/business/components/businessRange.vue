<template>
  <div
    :class="['business-range',currrentTab === thisTabLang ? 'business-range-buy' : 'business-range-sell']"
    :getRangeVal="getRangeVal"
  >
    <i
      :class="classArr[index]"
      @click="changeRangeValue(item)"
      v-for="(item, index) in cricleMount"
      :key="index"
    ></i>
    <mt-range v-model="rangeVal" :min="0" :max="100" :step="1" :bar-height="5">
    </mt-range>
    <br>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import languageStore from '@/stores/language';

@Observer
@Component
export default class BusinessRange extends Vue {
  @Prop() rangeValue!: number;
  @Prop() cricleMount!: any;
  @Prop() getRangeValue!: any;
  @Prop() currrentTab!: any;

  classArr: string[] = ['cricle', 'cricle', 'cricle', 'cricle', 'cricle'];
  rangeVal: number = this.rangeValue;
  thisTabLang = languageStore.getIntlText('business.Buy');
  changeRangeValue(num: number) {
    this.rangeVal = num * 25;
    return this.rangeVal;
  }

  get getRangeVal() {
    const thisColor = this.currrentTab === this.thisTabLang ? 'cricle-green' : 'cricle-red';
    const getCount = Math.floor(this.rangeVal / 25) + 1;
    if (getCount === 0) {
      this.classArr = ['cricle', 'cricle', 'cricle', 'cricle', 'cricle'];
    } else {
      this.classArr = ['cricle', 'cricle', 'cricle', 'cricle', 'cricle'];
      for (let i = 0; i < getCount; i++) {
        this.classArr[i] = `cricle ${thisColor}`;
      }
    }
    return this.$emit('getRangeValue', this.rangeVal);
  }
}
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
    left: 0px;
    @include wh(0.13rem, 0.13rem);
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
    left: 91.89%;
  }
  .cricle-green{
    border-color: #07c74e;
  }
  .cricle-red{
    border-color: red;
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
