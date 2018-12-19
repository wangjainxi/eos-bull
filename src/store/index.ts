import Vue from 'vue';
import Vuex from 'vuex';
import language from './modules/languages';

Vue.use(Vuex);
const tabnum = {
  state: {
    currentNum: '1',
  },
  mutations: {
    setCurrentNum(state: any, num: string) {
      state.currentNum = num;
    },
  },
};
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    language,
    tabnum,
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});
export default store;
