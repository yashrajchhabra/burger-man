<template>
    <div class="bm-login">
        <h1>Burger Man</h1>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Email">
                <el-input v-model="form.email" type="email"/>
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="form.password" type="password"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click="login"
                           :loading="loading">
                    Create
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import {Form, FormItem, Input} from 'element-ui';
    import {reactive, toRefs} from '@vue/composition-api';
    import users from '@/config/users';

    export default {
        name: 'Login',
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input
        },
        setup(props, {root}) {
            const {$message, $router} = root;
            const form = reactive({
                email: '',
                password: ''
            });
            const state = reactive({
                loading: false
            });

            // todo: @yash Form validation
            const login = () => {
                state.loading = true;
                const {email, password} = form;
                setTimeout(() => {
                    const userFound = users.find(u => u.email === email && u.password === password);
                    if (userFound) {
                        localStorage.setItem('user', userFound);
                        $message({
                            message: 'Welcome to burger man.',
                            type: 'success'
                        });
                        $router.push({name: 'menu'});
                    } else {
                        $message({
                            message: 'Wrong user name or password',
                            type: 'warning'
                        });
                    }
                    state.loading = false;
                }, 2000);
            };

            return {
                form,
                login,
                ...toRefs(state)
            };
        }
    }
</script>

<style lang="scss" scoped>

    .bm-login {
        display: flex;
        justify-content: center;
        flex-direction: column;
        min-width: 400px;
    }

</style>