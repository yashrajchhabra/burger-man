<template>
    <div class="bm-checkout bm-flex layout-column ai-center jc-center">
        <h1>Your cart</h1>
        <div class="d-flex cart-container">
            <el-table
                    :data="cart.items">
                <el-table-column
                        prop="image">
                    <template slot-scope="scope">
                        <img class="image" :src="getImgUrl(scope.row.image)" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="Item name">
                </el-table-column>
                <el-table-column
                        label="Customizations"
                        prop="ingredients">
                    <template slot-scope="scope">
                        <ul>
                            <li :key="ig.id"
                                v-for="ig in scope.row.ingredients.filter(ig => ig.orderedAmount > 0 && ig.customizable)">
                                <span>
                                    {{ig.name}} - {{ig.orderedAmount}}
                                </span>
                            </li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="items"
                        label="Total cost"
                        width="100">
                    <template slot-scope="scope">
                        ${{getDishCost(scope.row)}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="total bm-flex jc-end ai-center">
                Total: ${{totalCost}}
            </div>
        </div>
        <el-button icon="el-icon-bank-card" :disabled="!cart.id" @click="pay">
            Make Payment
        </el-button>
    </div>
</template>

<script>
    import {computed} from '@vue/composition-api';
    import {usePriceService} from '@/composables/usePriceService';
    import {Table, TableColumn} from 'element-ui';
    import {NAMESPACE as CART_NAMESPACE, ACTIONS as CART_ACTIONS} from '@/store/modules/cart';
    import {getImageUrl} from '@/utils/image';

    export default {
        name: 'Checkout',
        components: {
            [Table.name]: Table,
            [TableColumn.name]: TableColumn
        },
        setup(props, {root}) {
            const {$router, $message, $store} = root;
            const {getDishCost, getCartTotal} = usePriceService();

            const cart = computed(() => $store.state.cart.cart);

            const totalCost = computed(() => getCartTotal(cart.value));

            const pay = () => {
                $store.dispatch(`${CART_NAMESPACE}/${CART_ACTIONS.PLACE_ORDER}`).then(() => {
                    $store.dispatch(`${CART_NAMESPACE}/${CART_ACTIONS.CLEAR_CART}`);
                    $message('Order was placed successfully');
                    $router.push({
                        name: 'menu'
                    });
                }).catch(() => {
                    $message('Oops, something went wrong');
                });
            };

            const getImgUrl = url => getImageUrl(url);

            return {
                cart,
                totalCost,
                getDishCost,
                pay,
                getImgUrl
            }
        }
    }
</script>

<style lang="scss" scoped>

    .bm-checkout {

        h1 {
            text-align: center;
            font-size: 4rem;
            color: $bm-brown;
            margin-bottom: 2rem;
        }

        .cart-container {
            min-width: 600px;

            .image {
                width: 100px;
            }

            .total {
                color: $bm-red;
            }
        }

        .el-button {
            width: 200px;
            height: 50px;
            margin-top: 2rem;
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
    }
</style>