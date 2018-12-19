import Vue from 'vue';
import Vuex from 'vuex';
import language from './modules/languages';
import user from './modules/user';

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
    user,
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});
export default store;
