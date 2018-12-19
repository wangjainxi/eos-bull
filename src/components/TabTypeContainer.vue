<template>
  <div class="tab-type-box flex-row-start">
    <div @click="setCurrentNum('1')">
      <router-link to="/" v-if="$store.state.tabnum.currentNum === '1'">
        <img src="../images/mobile/ic_nav_assets_press.svg" alt>
        <p class="special">首页</p>
      </router-link>
      <router-link to="/" v-else>
        <img src="../images/mobile/ic_nav_assets_normal.svg" alt>
        <p>首页</p>
      </router-link>
    </div>

    <div @click="setCurrentNum('2')">
      <router-link to="/" v-if="$store.state.tabnum.currentNum === '2'">
        <img src="../images/mobile/ic_nav_home_press.svg" alt>
        <p class="special">行情</p>
      </router-link>
      <router-link to="/market" v-else>
        <img src="../images/mobile/ic_nav_home_normal.svg" alt>
        <p>行情</p>
      </router-link>
    </div>

    <div @click="setCurrentNum('3')">
      <router-link to="/" v-if="$store.state.tabnum.currentNum === '3'">
        <img src="../images/mobile/ic_nav_more_press.svg" alt>
        <p class="special">订单</p>
      </router-link>
      <router-link to="/orders" v-else>
        <img src="../images/mobile/ic_nav_more_normal.svg" alt>
        <p>订单</p>
      </router-link>
    </div>

    <div @click="setCurrentNum('4')">
      <router-link to="/" v-if="$store.state.tabnum.currentNum === '4'">
        <img src="../images/mobile/ic_nav_order_press.svg" alt>
        <p class="special">资产</p>
      </router-link>
      <router-link to="/assets" v-else>
        <img src="../images/mobile/ic_nav_order_normal.svg" alt>
        <p>资产</p>
      </router-link>
    </div>

    <div @click="setCurrentNum('5')">
      <router-link to="/" v-if="$store.state.tabnum.currentNum === '5'">
        <img src="../images/mobile/ic_nav_quotes_press.svg" alt>
        <p class="special">更多</p>
      </router-link>
      <router-link to="/more" v-else>
        <img src="../images/mobile/ic_nav_quotes_normal.svg" alt>
        <p>更多</p>
      </router-link>
    </div>
  </div>
</template>
<script>
import store from '@/store';
export default {
  name: 'tab-type-container',
  data() {
    return {
      count: 1,
    };
  },
  methods: {
    setCurrentNum(num) {
      sessionStorage.setItem('currentNum', num);
      store.commit('setCurrentNum', num);
    },
  },
  created() {
    store.commit('setCurrentNum', sessionStorage.getItem('currentNum'));
  },
};
</script>

<style lang="scss">
.tab-type-box {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 0.5rem;
  border-top: 1px solid #f2f5fb;
  background: #fff;
  z-index: 1000;
  > div {
    display: flex;
    width: 20%;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 0.1rem;
    img {
      display: inline-block;
    }
    p {
      font-size: 0.1rem;
      padding-bottom: 2px;
      color: #b3bfd0;
    }
  }
  .special {
    color: #007aff;
  }
}
</style>

