import Vue from 'vue';
import Router from 'vue-router';
import TabPackage from '@/mobile/TabPackage.vue';
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
          path: '/orders',
          name: 'orders',
          component: () => import(/* webpackChunkName: "orders" */ './views/Order/index.vue'),
        },
        {
          path: '/more',
          name: 'more',
          component: () => import(/* webpackChunkName: "more" */ './views/More/More.vue'),
        },
        {
          path: '/assets',
          name: 'assets',
          component: () => import(/* webpackChunkName: "assets" */ './views/Assets/Assets.vue'),
        },
      ],
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
      path: '/business/:id',
      name: 'business',
      component: () => import(/* webpackChunkName: "business" */ './views/business/Business.vue'),
    },

    {
      path: '/businessHistory',
      name: 'businessHistory',
      component: () =>
        import(/* webpackChunkName: "businessHistory" */ './views/business/businessSellDetails.vue'),
    },
    {
      path: '/market-view/:id',
      name: 'market-view',
      component: MarketView,
    },
  ],
});
