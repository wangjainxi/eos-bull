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
} from 'mint-ui';
import Language from '@/components/Language';
import App from './App.vue';
import router from './router';
import '../registerServiceWorker';
import '@/stores/data';
import '@/utils/socket';

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
Vue.component('Language', Language);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
