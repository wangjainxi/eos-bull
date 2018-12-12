import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "../store";
import "../registerServiceWorker";
import VueI18n from "vue-i18n";

import {
  Button,
  Collapse,
  CollapseItem,
  Radio,
  Tabs,
  TabPane,
  Slider,
  Checkbox,
  Table,
  TableColumn,
  Pagination
} from "element-ui";

Vue.config.productionTip = false;

Vue.use(VueI18n); // 通过插件的形式挂载
Vue.use(Button);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Radio);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Slider);
Vue.use(Checkbox);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
const i18n = new VueI18n({
  locale: "zh-CN", // 语言标识
  messages: {
    "zh-CN": require("../common/lang/zh"), // 中文语言包
    "en-US": require("../common/lang/en") // 英文语言包
  }
});

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app");
