<template>
    <div class="bm-stats bm-flex layout-column ai-center jc-center">
        <h1>Sales Statistics</h1>
        <div class="d-flex table-container">
            <el-input v-model="search" type="text" placeholder="Search rep name"/>
            <el-table :data="itemsPurchased" empty-text="No orders have been placed">
                <el-table-column prop="id"
                                 label="Cart id"/>
                <el-table-column label="Sales rep id"
                                 prop="sales_rep_id"/>
                <el-table-column label="Sales rep name"
                                 prop="sales_rep_name"/>
                <el-table-column prop="items"
                                 label="Total Cost"
                                 width="100">
                    <template slot-scope="scope">
                        ${{getCartTotal(scope.row)}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="total bm-flex jc-end">
                Total: ${{getTotalCost()}}
            </div>
        </div>
    </div>
</template>

<script>
    import {computed, onMounted, ref} from '@vue/composition-api';
    import {usePriceService} from '@/composables/usePriceService';
    import {Input, Table, TableColumn} from 'element-ui';
    import {NAMESPACE as STATS_NAMESPACE, ACTIONS as STATS_ACTIONS} from '@/store/modules/statistics';

    export default {
        name: 'Stats',
        components: {
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Input.name]: Input
        },
        setup(props, {root}) {
            const {$store} = root;
            const search = ref('');
            const {getCartTotal} = usePriceService();

            const itemsPurchased = computed(() =>
                $store.state.statistics.orders
                    .filter(ip => ip.sales_rep_name.toLowerCase().includes(search.value.toLowerCase())));

            const getTotalCost = () =>
                itemsPurchased.value.reduce((sum, item) => {
                    sum += getCartTotal(item);
                    return sum;
                }, 0);

            onMounted(() => {
                $store.dispatch(`${STATS_NAMESPACE}/${STATS_ACTIONS.GET_ORDERS}`);
            })

            return {
                itemsPurchased,
                search,
                getCartTotal,
                getTotalCost
            };
        }
    }
</script>

<style lang="scss">
    .table-container {
        .el-input {
            .el-input__inner {
                border: none;
                border-radius: 0;
                border-bottom: solid 1px lighten($bm-grey, 30%);
            }
        }
    }
</style>

<style lang="scss" scoped>

    .bm-stats {

        h1 {
            text-align: center;
            font-size: 4rem;
            color: $bm-brown;
            margin-bottom: 2rem;
        }

        .table-container {
            min-width: 600px;

            .el-input {
                .el-input__inner {
                    border: none;
                }
            }

            .total {
                margin-top: 0.5rem;
                color: $bm-red;
            }
        }
    }
</style>