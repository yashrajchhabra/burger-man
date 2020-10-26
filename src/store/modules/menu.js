import {getDishes} from '@/services/dishes';

export const MUTATIONS = {
    SET_DISHES: 'setDishes'
};

export const ACTIONS = {
    GET_DISHES: 'getDishes'
};

export const NAMESPACE = 'menu';

export default {
    strict: true,
    namespaced: true,
    state: {
        dishes: [],
        user: null
    },
    mutations: {
        [MUTATIONS.SET_DISHES](state, {dishes}) {
            state.dishes = dishes;
        }
    },
    actions: {
        [ACTIONS.GET_DISHES]({commit}) {
            return getDishes().then(dishes => {
                commit(MUTATIONS.SET_DISHES, {dishes});
            });
        }
    }
};
