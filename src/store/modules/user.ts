import { Action, ActionContext } from 'vuex';

interface State {
  currency: string;
  account: string;
}

const state: State = {
  currency: 'BTC',
  account: 'admin',
};

const getters = {
  geCurrency(state: any) {
    return state.currency;
  },
};

const mutations = {
  setCurrency(state: any, type: string) {
    state.currency = type;
  },
};

const actions = {
  onSetCurrency({ commit, state }: ActionContext<State, {}>, type: string) {
    commit('setCurrency', type);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
