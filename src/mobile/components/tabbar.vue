<template>
  <div class="tab-type-box flex-row-start">
    <router-link
      v-for="item of navs"
      replace
      :to="item.path"
      :key="item.path"
      :class="{ 'nav-item': true, 'current': $route.path === item.path }">
        <img class="icon" v-if="$route.path === item.path" :src="item.selectIcon" />
        <img class="icon" v-else :src="item.icon" />
        <p class="name">
          <Language :resource="item.key" />
        </p>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AppNavBar extends Vue {
  navs = [
    {
      key: 'foot.Homepage',
      path: '/',
      icon: require('@/images/mobile/ic_nav_home_normal.svg'),
      selectIcon: require('@/images/mobile/ic_nav_home_press.svg'),
    },
    {
      key: 'foot.Markets',
      path: '/markets',
      icon: require('@/images/mobile/ic_nav_quotes_normal.svg'),
      selectIcon: require('@/images/mobile/ic_nav_quotes_press.svg'),
    },
    {
      key: 'foot.Order',
      path: '/orders',
      icon: require('@/images/mobile/ic_nav_order_normal.svg'),
      selectIcon: require('@/images/mobile/ic_nav_order_press.svg'),
    },
    {
      key: 'foot.Asset',
      path: '/assets',
      icon: require('@/images/mobile/ic_nav_assets_normal.svg'),
      selectIcon: require('@/images/mobile/ic_nav_assets_press.svg'),
    },
    {
      key: 'foot.More',
      path: '/more',
      icon: require('@/images/mobile/ic_nav_more_normal.svg'),
      selectIcon: require('@/images/mobile/ic_nav_more_press.svg'),
    },
  ];
}
</script>

<style lang="scss" scoped>
.tab-type-box {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 0.5rem;
  border-top: 1px solid #f2f5fb;
  background: #fff;
  z-index: 1000;

  .nav-item {
    display: flex;
    width: 20%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon {
      display: inline-block;
      margin-bottom: 0.04rem;
    }

    .name {
      font-size: 0.1rem;
      color: #b3bfd0;
    }

    &.current {
      .name {
        color: #007aff;
      }
    }
  }
}
</style>

