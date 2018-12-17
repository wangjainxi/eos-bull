import Vue from 'vue';
import Vuex from 'vuex';
import language from './modules/languages';
// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    language,
    // cart,
    // products
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});
export default store;
