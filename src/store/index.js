import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex);

export const MUTATIONS = {
    SET_SALES_REP: 'setSalesRep'
};

export const ACTIONS = {
    LOAD_CUSTOMER_CONTEXT: 'loadCustomerContext'
};

export default new Vuex.Store({
    state: {
        salesRep: null
    },
    mutations: {
        [MUTATIONS.SET_SALES_REP](state, {salesRep}) {
            state.salesRep = salesRep
        }
    },
    actions: {},
    modules
})
