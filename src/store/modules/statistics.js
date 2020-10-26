import {getOrders} from '@/services/orders';

export const MUTATIONS = {
    SET_ORDERS: 'setOrders'
};

export const ACTIONS = {
    GET_ORDERS: 'getOrders'
};

export const NAMESPACE = 'statistics';

export default {
    strict: true,
    namespaced: true,
    state: {
        orders: []
    },
    mutations: {
        [MUTATIONS.SET_ORDERS](state, {orders}) {
            state.orders = orders;
        }
    },
    actions: {
        [ACTIONS.GET_ORDERS]({commit}) {
            return getOrders().then(orders => {
                commit(MUTATIONS.SET_ORDERS, {orders});
            });
        }
    }
};
