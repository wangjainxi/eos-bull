import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "../store";
import "../registerServiceWorker";
import Mint from "mint-ui";
import { Range } from "mint-ui";
import "mint-ui/lib/style.css";

Vue.use(Mint);
Vue.config.productionTip = false;
Vue.component(Range.name, Range);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
