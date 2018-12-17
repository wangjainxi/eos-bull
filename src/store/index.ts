import Vue from 'vue';
import Vuex from 'vuex';
import language from './modules/languages';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    language,
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});
export default store;
