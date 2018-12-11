import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Market from './views/Market.vue';
import Assets from './views/Assets.vue';
import More from './views/More.vue';
import Orders from './views/Orders.vue';
import HomePage from './views/HomePage.vue';


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
          component: HomePage,
        },
        {
          path: 'market',
          name:'market',
          component: Market,
        },
        {
          path: 'assets',
          name:'assets',
          component: Assets,
        },
        {
          path: 'orders',
          name:'orders',
          component: Orders,
        },
        {
          path: 'more',
          name:'more',
          component: More,
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
