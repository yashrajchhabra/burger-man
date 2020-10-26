import {getSalesReps} from '@/services/users';

export const MUTATIONS = {
    SET_SALES_REPS: 'setSalesReps'
};

export const ACTIONS = {
    GET_SALES_REPS: 'getSalesRep'
};

export const NAMESPACE = 'user';

export default {
    strict: true,
    namespaced: true,
    state: {
        salesReps: []
    },
    mutations: {
        [MUTATIONS.SET_SALES_REPS](state, {users}) {
            state.salesReps = users;
        }
    },
    actions: {
        [ACTIONS.GET_SALES_REPS]({commit}) {
            getSalesReps().then(users => {
                commit(MUTATIONS.SET_SALES_REPS, {users});
            });
        }
    }
};
