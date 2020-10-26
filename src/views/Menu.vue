<template>
    <div class="bm-menu bm-flex layout-column ai-center">
        <h1>Burger menu</h1>
        <el-select v-model="cart.sales_rep_id"
                   @change="setSalesRep"
                   placeholder="Select sales rep">
            <el-option
                    v-for="rep in salesReps"
                    :key="rep.id"
                    :label="rep.name"
                    :value="rep.id"/>
        </el-select>
        <flipper :flip-key="!!activeDish" translate scale>
            <div class="menu bm-flex jc-center flex-wrap" v-if="activeDish === null">
                <div :key="dish.id" v-for="dish in dishes">
                    <flipped :flip-id="`dish-${dish.id}`">
                        <div class="menu-item bm-flex layout-column ai-center">
                            <flipped :flip-id="`dish-image-${dish.id}`">
                                <div class="image bm-flex" :style="getImgUrl(dish.image)"/>
                            </flipped>
                            <flipped :flip-id="`dish-name-${dish.id}`">
                                <div class="name">
                                    {{dish.name}}
                                </div>
                            </flipped>
                            <div class="bm-flex ai-center bottom">
                                <div class="price bm-flex ai-center jc-center">
                                    ${{dish.startingFrom}}
                                </div>
                                <el-button @click="customize(dish)">
                                    Add to cart
                                </el-button>
                            </div>
                        </div>
                    </flipped>
                </div>
            </div>
            <flipped :flip-id="`dish-${activeDish.id}`" v-else>
                <div class="customize-container bm-flex layout-column ai-center">
                    <div class="close" @click="activeDish = null">
                        Close
                    </div>
                    <flipped :flip-id="`dish-image-${activeDish.id}`">
                        <div class="image" :style="getImgUrl(activeDish.image)"/>
                    </flipped>
                    <flipped :flip-id="`dish-name-${activeDish.id}`">
                        <div class="name">
                            {{activeDish.name}}
                        </div>
                    </flipped>
                    <div class="customize">
                        <div :key="ig.id" v-for="ig in activeDish.ingredients.filter(i => i.customizable)">
                            <div>
                                {{ig.name}}
                            </div>
                            <el-input-number v-model="ig.orderedAmount"
                                             :min="ig.min_amount" :max="ig.max_amount"/>
                        </div>
                    </div>
                    <div class="bottom bm-flex">
                        <div class="price bm-flex ai-center jc-center">
                            ${{orderCost}}
                        </div>
                        <el-button @click="addToCart">
                            Add to cart
                        </el-button>
                    </div>
                </div>
            </flipped>
        </flipper>
        <div class="checkout-container" v-if="!activeDish">
            <div class="cart-total bm-flex ai-center jc-center" v-if="getCartTotal(cart) > 0">
                Cart Total ${{getCartTotal(cart)}}
            </div>
            <div class="bm-flex">
                <el-button @click="clearCart"
                           icon="el-icon-delete"
                           :disabled="cart.items.length === 0">
                    Clear cart
                </el-button>
                <el-button icon="el-icon-shopping-cart-full"
                           :disabled="cart.items.length === 0"
                           @click="checkout">
                    Checkout <span v-if="cart.items.length > 0">{{cart.items.length}}</span>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>

    import {computed, onMounted, reactive, toRefs} from '@vue/composition-api';
    import {InputNumber, Select, Option} from 'element-ui';
    import {usePriceService} from '@/composables/usePriceService';
    import {Flipped, Flipper} from 'vue-flip-toolkit';
    import {NAMESPACE as MENU_NAMESPACE, ACTIONS as MENU_ACTIONS} from '@/store/modules/menu';
    import {NAMESPACE as CART_NAMESPACE, ACTIONS as CART_ACTIONS} from '@/store/modules/cart';
    import {NAMESPACE as USER_NAMESPACE, ACTIONS as USER_ACTIONS} from '@/store/modules/user';
    import {getImageUrl} from '@/utils/image';

    export default {
        name: 'Menu',
        components: {
            [InputNumber.name]: InputNumber,
            [Select.name]: Select,
            [Option.name]: Option,
            Flipped,
            Flipper
        },
        setup(props, {root}) {
            const {getDishCost, getCartTotal} = usePriceService();
            const {$message, $router, $store} = root;
            const state = reactive({
                activeDish: null
            });

            const dishes = computed(() => $store.state.menu.dishes);
            const salesReps = computed(() => $store.state.user.salesReps);
            const cart = computed(() => $store.state.cart.cart);

            const customize = dish => {
                state.activeDish = {
                    ...dish,
                    ingredients: dish.ingredients.map(i => {
                        return {
                            ...i,
                            orderedAmount: i.min_amount
                        };
                    })
                };
            };

            const addToCart = () => {
                $store.dispatch(`${CART_NAMESPACE}/${CART_ACTIONS.ADD_TO_CART}`, {dish: state.activeDish})
                    .then(() => {
                        state.activeDish = null
                    });
            };

            const clearCart = () => $store.dispatch(`${CART_NAMESPACE}/${CART_ACTIONS.CLEAR_CART}`);

            const checkout = () => {
                const {id: cartId, sales_rep_id: salesRepId} = cart.value;
                if (!salesRepId) {
                    $message({
                        message: 'Please select your sales rep',
                        type: 'error'
                    });
                    return;
                }
                $store.dispatch(`${CART_NAMESPACE}/${CART_ACTIONS.GET_CART}`, {cart: state.cart})
                    .then(() => {
                        $router.push({
                            name: 'checkout',
                            params: {
                                cartId
                            }
                        });
                    })
                    .catch(() => {
                        $message({
                            message: 'Oops! Something went wrong',
                            type: 'error'
                        });
                    })
            };

            const setSalesRep = repId => $store.dispatch(`${CART_NAMESPACE}/${CART_ACTIONS.UPDATE_CART_REP}`, {repId});

            const orderCost = computed(() => getDishCost(state.activeDish));

            const getImgUrl = url => {
                return {
                    'background-image': `url(${getImageUrl(url)}`,
                    'background-size': 'contain'
                };
            };

            onMounted(() => {
                $store.dispatch(`${MENU_NAMESPACE}/${MENU_ACTIONS.GET_DISHES}`);
                $store.dispatch(`${USER_NAMESPACE}/${USER_ACTIONS.GET_SALES_REPS}`);
                $store.dispatch(`${CART_NAMESPACE}/${CART_ACTIONS.GET_CART}`);
            });

            return {
                ...toRefs(state),
                cart,
                dishes,
                orderCost,
                salesReps,
                // Methods
                customize,
                addToCart,
                clearCart,
                checkout,
                getImgUrl,
                getCartTotal,
                setSalesRep
            }
        }
    }
</script>

<style lang="scss" scoped>

    .bm-menu {
        position: relative;
        min-width: 500px;

        h1 {
            text-align: center;
            font-size: 4rem;
            color: $bm-brown;
            margin-bottom: 2rem;
        }

        .el-select {
            margin-bottom: 2rem;
        }

        .menu {
            .menu-item {
                padding: 2rem;
                border-radius: 8px;
                margin-right: 1.5rem;
                margin-bottom: 1.5rem;
                background: $bm-white;
                width: 290px;
                overflow: hidden;
                transition: box-shadow 0.3s ease;

                &:hover {
                    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 5px 8px 0 rgba(0, 0, 0, .14), 0 1px 14px 0 rgba(0, 0, 0, .12);
                }
            }
        }

        .menu, .customize-container {

            .name {
                color: $bm-red;
                font-size: 2rem;
            }

            .image {
                width: 130px;
                height: 110px;
            }

            .bottom {
                margin-top: 1.5rem;
            }

            .price {
                background: $bm-red;
                color: $bm-white;
                font-style: italic;
                border-radius: 50%;
                height: 40px;
                width: 40px;
                margin-right: 1rem;
            }
        }

        .customize-container {
            position: relative;
            display: flex;
            background: $bm-white;
            padding: 2rem;
            border-radius: 1rem;
            width: 500px;
            box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 5px 8px 0 rgba(0, 0, 0, .14), 0 1px 14px 0 rgba(0, 0, 0, .12);
            overflow: hidden;

            .close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                cursor: pointer;
            }
        }

        .el-button {
            border-radius: 30px;
            border: solid 1px $bm-red;
            color: $bm-red;
            font-weight: 500;

            &:hover {
                background: lighten($bm-red, 40%);
            }

            &:disabled {
                filter: grayscale(100%);

                &:hover {
                    background: $bm-white;
                }
            }
        }

        .checkout-container {
            margin-top: 2rem;

            .cart-total {
                color: $bm-red;
                font-style: italic;
                margin-bottom: 1rem;
            }

            .el-button {
                width: 200px;
                height: 50px;
            }
        }
    }
</style>