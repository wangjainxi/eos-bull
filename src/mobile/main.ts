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

Vue.component(Button.name, Button);
Vue.component(Popup.name, Popup);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Range.name, Range);
Vue.component(Header.name, Header);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(VueHighcharts);

Vue.component('Language', Language);
Vue.component('VueTradingView', VueTradingView);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
