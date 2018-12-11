import Vue from 'vue'
import Vuex from 'vuex';
import language from './store/language';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    language
}
});
