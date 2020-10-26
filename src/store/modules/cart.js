import {getCart, updateCart} from '@/services/cart';
import {placeOrder} from '@/services/orders';

export const MUTATIONS = {
    SET_CART: 'setCart',
    ADD_TO_CART: 'addToCart',
    CLEAR_CART: 'clearCart',
    SET_CART_REP: 'setCartRep'
};

export const ACTIONS = {
    GET_CART: 'getCart',
    ADD_TO_CART: 'addToCart',
    CLEAR_CART: 'clearCart',
    UPDATE_CART_REP: 'updateCartRep',
    PLACE_ORDER: 'placeOrder'
};

export const NAMESPACE = 'cart';

export default {
    strict: true,
    namespaced: true,
    state: {
        cart: {
            id: null,
            items: [],
            sales_rep_id: null
        }
    },
    mutations: {
        [MUTATIONS.SET_CART](state, {cart}) {
            state.cart = cart;
        },
        [MUTATIONS.ADD_TO_CART](state, {dish}) {
            if (!state.cart.id) {
                state.cart.id = +new Date();
            }
            state.cart.items.push(dish);
        },
        [MUTATIONS.SET_CART_REP](state, {repId}) {
            state.cart.sales_rep_id = repId;
        },
        [MUTATIONS.CLEAR_CART](state) {
            state.cart.id = null;
            state.cart.items = [];
            state.cart.sales_rep_id = null;
        }
    },
    actions: {
        [ACTIONS.GET_CART]({commit}) {
            return getCart().then(cart => {
                if (!cart) {
                    return commit(MUTATIONS.CLEAR_CART);
                }
                commit(MUTATIONS.SET_CART, {cart})
            });
        },
        [ACTIONS.ADD_TO_CART]({commit, state}, {dish}) {
            commit(MUTATIONS.ADD_TO_CART, {dish});
            return updateCart(state.cart);
        },
        [ACTIONS.UPDATE_CART_REP]({state, commit}, {repId}) {
            commit(MUTATIONS.SET_CART_REP, {repId});
            return updateCart(state.cart);
        },
        [ACTIONS.CLEAR_CART]({commit}) {
            return updateCart(null).then(() => {
                commit(MUTATIONS.CLEAR_CART);
            });
        },
        [ACTIONS.PLACE_ORDER]({state}) {
            return placeOrder(state.cart);
        }
    }
};
