import Vue from 'vue';
import Vuex from 'vuex';
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
export default new Vuex.Store({
  modules: {
    tabnum,
  },
});
