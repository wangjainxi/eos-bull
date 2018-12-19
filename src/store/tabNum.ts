import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentNum: '1',
  },
  mutations: {
    setCurrentNum(state, num) {
      state.currentNum = num;
    },
  },
});
