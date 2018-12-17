import Vue from 'vue';
import Router from 'vue-router';
import TabPackage from './TabPackage.vue';
import MarketView from './views/Market/MarketView/index.vue';
import MarketSearch from './views/Market/MarketSearch.vue';
import MarketOptional from './views/Market/MarketOptional.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TabPackage',
      component: TabPackage,
      children: [
        {
          path: '/',
          name: 'homepage',
          component: () =>
            import(/* webpackChunkName: "homepage" */ './views/HomePage/HomePage.vue'),
        },
        {
          path: '/market',
          // name:'market',
          component: () => import(/* webpackChunkName: "market" */ './views/Market/Market.vue'),
          children: [],
        },
        {
          path: '/assets',
          name: 'assets',
          component: () => import(/* webpackChunkName: "assets" */ './views/Assets.vue'),
        },
        {
          path: '/more',
          name: 'more',
          component: () => import(/* webpackChunkName: "more" */ './views/More/More.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/market-search',
      name: 'market-search',
      component: MarketSearch,
    },
    {
      path: '/market-optional',
      name: 'market-optional',
      component: MarketOptional,
    },
    {
      path: '/business',
      name: 'business',
      component: () => import(/* webpackChunkName: "business" */ './views/HomePage/Business.vue'),
    },
    {
      path: '/market-view',
      name: 'market-view',
      component: MarketView,
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import(/* webpackChunkName: "orders" */ './views/Order/index.vue'),
    },
  ],
});
