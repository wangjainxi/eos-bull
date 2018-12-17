import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '../store/language';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import '../registerServiceWorker';

Vue.use(Mint);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
