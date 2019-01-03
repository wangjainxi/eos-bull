import Vue from 'vue';
import Router from 'vue-router';
import Layout from './layout.vue';
import Market from './views/market/index.vue';
import MarketSearch from './views/market-search/index.vue';
import ReportActivity from './views/ReportActivity/index.vue';
import ReportActivityPage from './views/ReportActivity/report.vue';
import MarketOptional from './views/markets/MarketOptional.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import(/* webpackChunkName: "homepage" */ './views/home/index.vue'),
        },
        {
          path: '/markets',
          name: 'markets',
          component: () => import(/* webpackChunkName: "market" */ './views/markets/index.vue'),
          children: [],
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import(/* webpackChunkName: "orders" */ './views/orders/index.vue'),
        },
        {
          path: '/more',
          name: 'more',
          component: () => import(/* webpackChunkName: "more" */ './views/more/index.vue'),
        },
        {
          path: '/assets',
          name: 'assets',
          component: () => import(/* webpackChunkName: "assets" */ './views/assets/index.vue'),
        },
      ],
    },
    {
      path: '/market-search',
      name: 'market-search',
      component: MarketSearch,
    },
    {
      path: '/business/:id',
      name: 'business',
      component: () => import(/* webpackChunkName: "business" */ './views/business/Business.vue'),
    },
    {
      path: '/market-optional',
      name: 'market-optional',
      component: MarketOptional,
    },

    {
      path: '/businessHistory',
      name: 'businessHistory',
      component: () =>
        import(/* webpackChunkName: "businessHistory" */ './views/business/businessSellDetails.vue'),
    },
    {
      path: '/makets/:id',
      name: 'market',
      component: Market,
    },
    {
      path: '/report-activity',
      name: 'report-activity',
      component: ReportActivity,
    },
    {
      path: '/report-page',
      name: 'report-page',
      component: ReportActivityPage,
    },
  ],
});
