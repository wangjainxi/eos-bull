import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MarketView from './views/HomePage/MarketView.vue'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/',
          name:'homepage',
          component: () => import(/* webpackChunkName: "homepage" */ './views/HomePage/HomePage.vue'),

        },
        {
          path: '/market',
          // name:'market',
          component: () => import(/* webpackChunkName: "market" */ './views/Market.vue'),
          children:[

          ]
        },
        {
          path: 'assets',
          name:'assets',
          component: () => import(/* webpackChunkName: "assets" */ './views/Assets.vue'),
        },
        {
          path: 'orders',
          name:'orders',
          component: () => import(/* webpackChunkName: "orders" */ './views/Orders.vue'),
        },
        {
          path: 'more',
          name:'more',
          component: () => import(/* webpackChunkName: "more" */ './views/More.vue'),
        },
      ]
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
        path:'/market-view',
        name: 'market-view',
        component: MarketView,
      }
  ],
});
