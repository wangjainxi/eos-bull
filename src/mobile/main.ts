import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "../store";
import "../registerServiceWorker";
import Mint from "mint-ui";
import { Button, Navbar, TabItem  } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Button.name, Button);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.use(Mint);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
