import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale';
import Language from '@/components/Language';
import lang from 'element-ui/lib/locale/lang/en';
import '../registerServiceWorker';
import '../stores/data';

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
Vue.component('Language', Language);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
