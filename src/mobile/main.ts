import Vue from 'vue';
import {
  Button,
  Popup,
  Actionsheet,
  Range,
  Header,
  Navbar,
  TabItem,
  TabContainer,
  TabContainerItem,
  Loadmore,
} from 'mint-ui';
import Language from '@/components/Language';
import App from './App.vue';
import router from './router';
import VueTradingView from 'vue-trading-view';
import '../registerServiceWorker';
import '../stores/data';
import VueHighcharts from 'vue2-highcharts';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Popup);
Vue.use(Actionsheet);
Vue.use(Range);
Vue.use(Header);
Vue.use(Navbar);
Vue.use(TabItem);
Vue.use(TabContainer);
Vue.use(TabContainerItem);
Vue.use(Loadmore);
Vue.use(VueHighcharts, { VueHighcharts });

Vue.component('Language', Language);
Vue.component('VueTradingView', VueTradingView);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
