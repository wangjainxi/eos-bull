import Vue from 'vue';
import Router from 'vue-router';
import TabPackage from './TabPackage.vue';
import MarketView from './views/Market/MarketView/MarketView.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
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
          path: 'market',
          // name:'market',
          component: () => import(/* webpackChunkName: "market" */ './views/Market/Market.vue'),
          children: [],
        },
        {
          path: 'assets',
          name: 'assets',
          component: () => import(/* webpackChunkName: "assets" */ './views/Assets.vue'),
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import(/* webpackChunkName: "orders" */ './views/Orders.vue'),
        },
        {
          path: 'more',
          name: 'more',
          component: () => import(/* webpackChunkName: "more" */ './views/More.vue'),
        },
        {
          path: 'market-view',
          name: 'market-view',
          component: MarketView,
        },
      ],
    },
    {
      path: 'about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: "/business",
      name: "business",
      component: () =>
        import(/* webpackChunkName: "business" */ "./views/business/Business.vue")
    },

    {
      path: "/businessHistory",
      name: "businessHistory",
      component: () =>
        import(/* webpackChunkName: "businessHistory" */ "./views/business/businessSellDetails.vue")
    },
  ]
});
