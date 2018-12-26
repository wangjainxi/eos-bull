import Vue from 'vue';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import Language from '@/components/Language';
import App from './App.vue';
import router from './router';
import '../registerServiceWorker';
import '../stores/data';

Vue.config.productionTip = false;

Vue.use(Mint);
Vue.component('Language', Language);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
