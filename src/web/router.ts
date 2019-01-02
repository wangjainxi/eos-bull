import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home/index.vue';
import Mex from './views/mex/index.vue';
import MyWallet from './views/mex/myWallet/myWallet.vue';
import Market from './views/market/index.vue';
import OrderDetails from './views/orderDetails/index.vue';
import WebPackage from './WebPackage.vue';
import HomeExchange from './views/homeExchange/homeExchange.vue';
import WhitePaper from './views/white-paper/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/home-exchange',
      name: 'homeExchange',
      component: HomeExchange,
    },
    {
      path: '/white-paper',
      name: 'WhitePaper',
      component: WhitePaper,
    },
    {
      path: '/mex',
      component: WebPackage,
      children: [
        {
          path: '/',
          name: 'mex',
          component: Mex,
        },
        {
          path: '/market',
          name: 'market',
          component: Market,
        },
        {
          path: '/orders',
          name: 'orderDetails',
          component: OrderDetails,
        },
        {
          path: '/myWallet',
          name: 'myWallet',
          component: MyWallet,
        },
      ],
    },
  ],
});
