import Vue from 'vue';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import Language from '@/components/Language';
import App from './App.vue';
import router from './router';
import VueTradingView from 'vue-trading-view';
import '../registerServiceWorker';
import '../stores/data';
import VueHighcharts from 'vue2-highcharts';
Vue.config.productionTip = false;
Vue.use(VueHighcharts, { VueHighcharts });
Vue.use(Mint);
Vue.component('Language', Language);
Vue.component('VueTradingView', VueTradingView);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
