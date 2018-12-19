<template>
  <div class="tab-type-box flex-row-start">
    <router-link to="/">
      <img src="../images/mobile/ic_nav_assets_normal.svg" alt>
      <p>{{count}}</p>
    </router-link>
    <router-link to="/market">
      <img src="../images/mobile/ic_nav_home_normal.svg" alt>
      <p>行情</p>
    </router-link>
    <router-link to="/orders">
      <img src="../images/mobile/ic_nav_more_normal.svg" alt>
      <p>订单</p>
    </router-link>
    <router-link to="/assets">
      <img src="../images/mobile/ic_nav_order_normal.svg" alt>
      <p>资产</p>
    </router-link>
    <router-link to="/more">
      <img src="../images/mobile/ic_nav_quotes_normal.svg" alt>
      <p>更多</p>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'tab-type-container',
  data() {
    return {
      count: 1,
    };
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
  padding-top: 0.1rem;
  background: #fff;
  z-index: 1000;
  a {
    display: flex;
    width: 20%;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    img {
      display: inline-block;
    }
    p {
      font-size: 0.1rem;
      padding-bottom: 2px;
      color: #b3bfd0;
    }
  }
}
</style>

