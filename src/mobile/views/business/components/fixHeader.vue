<template>
  <div class="fix-header">
    <mt-header fixed title="MAX/EOS卖出明细">
      <router-link :to="getRouter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';

@Observer
@Component({
  components: {},
})
export default class FixHeader extends Vue {
  // name: 'fix-header',
  // props,
  @Prop() msg!: any;
  // data
  prevRoute: string = '';
  get getRouter() {
    this.prevRoute = `/${this.msg.name}`;
    console.log(this.prevRoute);
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
