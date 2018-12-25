<template>
<div class="market-list">
  <div class="list-header">
    <transition>
      <span :class="{active:shows ===3 }" @click="showView(3)">
        <img src="../../../../images/web/ic_top.svg" alt="">
       </span>
    </transition>
    <transition>
      <span :class="{active:shows ===2 }" @click="showView(2)">
         <img src="../../../../images/web/ic_bottom.svg" alt=""></span></transition>
    <transition>
      <span :class="{active:shows ===1 }" @click="showView(1)">
         <img src="../../../../images/web/ic_middle.svg" alt=""></span></transition>
  </div>
  <div class="list-title">
    <span class="left-text">Price(EOS)</span>
    <span class="center-text">Amount(MAX)</span>
    <span class="right-text">Total(EOS)</span>
  </div>
  <div class="list-content">
    <!-- 买卖 -->
    <div v-if="shows === 1 ">
      <div class="sell-part">
        <ListItem v-bind:sellData="sellData" class="sell-box" />
      </div>
      <div class="real-price-part">
        <div>
          <span>0.000360</span><span>!</span>
        </div>
      </div>
      <div class="buy-part">
        <ListItem v-bind:sellData="sellData" class="buy-box" />
      </div>
    </div>

    <!-- 买 -->
    <div v-if="shows === 2 ">
      <div class="real-price-part">
        <div>
          <span>0.000360</span><span>!</span>
        </div>
      </div>
      <div class="buy-part">
        <ListItem v-bind:sellData="sellData" class="buy-box" />
      </div>
    </div>
    <!-- 卖 -->
    <div v-if="shows === 3 ">
      <div class="sell-part">
        <ListItem v-bind:sellData="sellData" class="sell-box" />
      </div>
      <div class="real-price-part">
        <div>
          <span>0.000360</span><span>!</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ListItem from './ListItem.vue';

@Component({
  name: 'mex-market-list',
  components: {
    ListItem,
  },
})
export default class extends Vue {
  sellData = [];
  shows = 1;
  beforeMount() {
    console.log(this.sellData.length);
    const obj = {
      price: 0.0004,
      size: 141194.1235,
      total: 56.3365,
      width: '10%',
    };
  }
  showView(type: any) {
    this.shows = type;
    const obj = {
      price: 0.0004,
      size: 141194.1235,
      total: 56.3365,
      width: '10%',
    };
    this.sellData = [];
    // while (true) {
    //   obj.width = Math.random() * 100 + '100%';
    //   if (this.shows === 1) {
    //     if (this.sellData.length > 17) return;
    //   } else {
    //     if (this.sellData.length > 29) return;
    //   }
    //   // this.sellData.push(obj);
    // }
  }
}
</script>

<style lang="scss">
.market-list {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  .list-header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 42px;
    background: rgba(20, 46, 77, 1);
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-start;
    color: #fff;
  }

  .list-title {
    padding-left: 12px;
    padding-right: 9px;
    height: 34px;
    background: rgba(18, 38, 63, 1);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 11px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(110, 132, 163, 1);
    }
  }

  .real-price-part {
    line-height: 40px;
    height: 40px;
    font-size: 21px;
    font-family: Helvetica;
    color: rgba(28, 196, 102, 1);
  }

  .active {
    border: 1px solid #fff;
  }
}
</style>
