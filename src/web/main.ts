import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale';
import lang from 'element-ui/lib/locale/lang/en';
import '../registerServiceWorker';

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
  Pagination,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  DatePicker,
  Dialog,
} from 'element-ui';
locale.use(lang);
Vue.config.productionTip = false;

Vue.use(VueI18n); // 通过插件的形式挂载
Vue.use(Button);
Vue.use(Collapse);
Vue.use(Dialog);
Vue.use(CollapseItem);
Vue.use(Radio);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Slider);
Vue.use(Checkbox);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(DatePicker);
const i18n = new VueI18n({
  locale: 'en-US', // 语言标识
  messages: {
    'zh-CN': require('../common/lang/zh'), // 中文语言包
    'en-US': require('../common/lang/en'), // 英文语言包
  },
});

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app');
