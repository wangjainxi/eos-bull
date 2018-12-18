import Vue from 'vue';
import Vuex from 'vuex';
import language from './modules/languages';
import user from './modules/user';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    language,
    user,
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});
export default store;
