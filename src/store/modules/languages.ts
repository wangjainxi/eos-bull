const lang = localStorage.getItem('langguage');
const state = {
  language: lang || 'en-US',
};

const getters = {
  getLanguage(state: any) {
    return state.language;
  },
};

const actions = {
  //@ts-ignore
  onSetLanguage({ commit, state }, name) {
    commit('setLanguage', name);
  },
};

const mutations = {
  //@ts-ignore
  setLanguage(state, type) {
    state.language = type;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
