import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Language from '@/components/Language';
import store from '@/vuex';
import '@/utils/socket';

import {
  Button,
  Collapse,
  CollapseItem,
  Radio,
  Tabs,
  TabPane,
  Input,
  Slider,
  Checkbox,
  Table,
  TableColumn,
  Pagination,
  Tooltip,
  Popover,
  Form,
  FormItem,
  Select,
  Option,
  DatePicker,
  Dialog,
  Loading,
  Carousel,
  CarouselItem,
} from 'element-ui';
import { formatDate, byte2Kilobyte } from '@/utils/common';

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Collapse);
Vue.use(Dialog);
Vue.use(CollapseItem);
Vue.use(Radio);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Input);
Vue.use(Slider);
Vue.use(Checkbox);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(Loading);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.component('Language', Language);
Vue.filter('formatDate', formatDate);
Vue.filter('byte2Kilobyte', byte2Kilobyte);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
