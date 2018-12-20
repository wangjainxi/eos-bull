<template>
  <div class="mex-tran-history-list">
    <div class="list-header">Latest Deal</div>
    <div class="list-title">
      <span class="left-text">Price(EOS)</span>
      <span class="center-text">Amount(MAX)</span>
      <span class="right-text">Time</span>
    </div>
    <div class="list-content">
      <div>
        <div class="sell-part">
          <ListItem v-bind:sellData="sellData" class="sell-box"/>
        </div>
        <div class="buy-part">
          <ListItem v-bind:sellData="sellData" class="buy-box"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ListItem from './ListItem.vue';

@Component({
  components: {
    ListItem,
  },
})
export default class extends Vue {
  weight = 400;
  sellData = [];
  shows = 1;

  beforeMount() {
    console.log(this.sellData.length);
    const obj = {
      price: 0.0004,
      size: 141194.1235,
      time: '12-06 20:28:37',
      width: '12%',
    };
    while (true) {
      obj.width = Math.random() * 100 + '100%';
      this.sellData.push(obj);
      if (this.sellData.length > 17) return;
    }
  }

  showView(type: any) {
    this.shows = type;
    const obj = {
      price: 0.0004,
      size: 141194.1235,
      time: 56.3365,
    };
    this.sellData = [];
    while (true) {
      if (this.shows === 1) {
        if (this.sellData.length > 17) return;
      } else {
        if (this.sellData.length > 29) return;
      }
      this.sellData.push(obj);
    }
  }
};
</script>
<style lang="scss">
.mex-tran-history-list {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  .list-header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 42px;
    background: rgba(20, 46, 77, 1);
    color: #fff;
    text-align: left;
    line-height: 42px;
    padding-left: 12px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .left-text {
    width: 75px;
    max-width: 75px;
    text-align: left;
  }
  .center-text {
    width: 80px;
    max-width: 80px;
    color: rgba(103, 123, 183, 1);
    text-align: right;
  }
  .right-text {
    width: 100px;
    max-width: 100px;
    text-align: right;
    color: rgba(221, 221, 221, 1);
  }
  .list-content {
    height: 310px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .list-content::-webkit-scrollbar {
    display: none;
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
      font-size: 12px;
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
