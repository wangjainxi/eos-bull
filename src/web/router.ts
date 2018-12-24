import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home/index.vue';
import Mex from './views/mex/index.vue';
import MyWallet from './views/mex/myWallet/myWallet.vue';
import Market from './views/market/index.vue';
import OrderDetails from './views/orderDetails/index.vue';
import WebPackage from './WebPackage.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/mex',
      component: WebPackage,
      children: [
        {
          path: 'mex',
          component: Mex,
        },
        {
          path: 'market',
          component: Market,
        },
        {
          path: 'order-details',
          component: OrderDetails,
        },
        {
          path: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        {
          path: 'myWallet',
          component: MyWallet,
        },
      ],
    },
  ],
});
