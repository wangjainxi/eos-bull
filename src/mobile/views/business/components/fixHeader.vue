<template>
  <div class="fix-header">
    <mt-header fixed :title="thisTitle">
      <router-link :to="getRouter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class FixHeader extends Vue {
  @Prop() msg!: any;
  prevRoute: any = '';
  thisTitle: string = '';
  created() {
    this.getTitle();
    if (this.msg.type === 'buy') {
      this.thisTitle = `${this.thisTitle}买入明细`;
    } else {
      this.thisTitle = `${this.thisTitle}卖出明细`;
    }
  }

  getTitle() {
    const transPair = localStorage.getItem('transPair');
    if (!transPair) return (this.thisTitle = '');
    this.thisTitle = transPair;
  }
  get getRouter() {
    this.prevRoute = `/${this.msg.name}/${this.msg.id}`;
    this.prevRoute = {
      name: this.msg.name,
      params: { coinName: this.msg.coinName, id: this.msg.id, type: this.msg.type },
    };
    return this.prevRoute;
  }
}
</script>
<style lang="scss">
.fix-header {
  .mint-header {
    background-color: #fff;
  }
  .mint-header-title {
    height: 0.22rem;
    font-size: 0.16rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(25, 26, 42, 1);
    line-height: 0.22rem;
  }
}
</style>
