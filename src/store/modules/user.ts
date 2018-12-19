import { Action, ActionContext } from 'vuex';
import { SET_CURRENCY_MUTATION } from './mutations-types';

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
  [SET_CURRENCY_MUTATION](state: any, type: string) {
    console.log(type);
    state.currency = type;
  },
};

const actions = {
  [SET_CURRENCY_MUTATION]({ commit }: ActionContext<State, {}>, type: string) {
    commit(SET_CURRENCY_MUTATION, type);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
