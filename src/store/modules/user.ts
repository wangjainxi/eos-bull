import { Action, ActionContext } from 'vuex';
import { SET_CURRENCY_MUTATION } from './mutations-types';

interface State {
  currency: string;
  account: string;
  marketId: number;
}

const state: State = {
  currency: 'BTC',
  account: 'admin',
  marketId: 1,
};

const getters = {
  geCurrency(state: any) {
    return state.currency;
  },

  getMarket(state:any){
    return state.marketId
  }
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
