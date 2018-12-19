import { ActionContext } from 'vuex';
import { SET_LANGUAGE_MUTATION } from './mutations-types';

interface State {
  language: string;
}

const lang = localStorage.getItem('langguage');
const state = {
  language: lang || 'en-US',
};

const getters = {
  getLanguage(state: any) {
    return state.language;
  },
};

const mutations = {
  [SET_LANGUAGE_MUTATION](state: State, type: string) {
    state.language = type;
  },
};

const actions = {
  [SET_LANGUAGE_MUTATION]({ commit }: ActionContext<State, {}>, type: string) {
    commit(SET_LANGUAGE_MUTATION, type);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
