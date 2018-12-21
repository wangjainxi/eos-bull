import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '../registerServiceWorker';
import Mint from 'mint-ui';
import { Button, Navbar, TabItem, TabContainer, TabContainerItem, Popup } from 'mint-ui';
import Language from '@/components/Language';
import 'mint-ui/lib/style.css';
Vue.component(Button.name, Button);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Popup.name, Popup);
Vue.component('Language', Language);
Vue.use(Mint);
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
