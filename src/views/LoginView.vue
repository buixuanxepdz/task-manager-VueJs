<template>
    <div>
        <LoginLayout>
            <template #form>
                <div>
                    <header style="width:100%;margin-bottom: 30px;"><img width="100%" src="../assets/images/login.png" alt=""></header>
                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
                        <el-form-item
                            prop="email"
                            :rules="[
                            { required: true, message: 'Vui lòng nhập Email', trigger: 'blur' },
                            { type: 'email', message: 'Vui lòng nhập địa chỉ email chính xác', trigger: ['blur', 'change'] }
                            ]"
                        >
                            <el-input v-model="dynamicValidateForm.email" placeholder="Email"></el-input>
                        </el-form-item>
                        <el-form-item prop="password"  :rules="[
                            { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
                            { min: 6, message: 'Mật khẩu ít nhất 6 ký tự', trigger: 'blur' }
                            ]">
                            <el-input type="password" v-model="dynamicValidateForm.password" autocomplete="off"  placeholder="Mật khẩu"></el-input>
                        </el-form-item>
                        <el-form-item class="button">
                            <div class="inner">
                            </div>
                            <el-button style="width:100%" type="primary" @click="submitForm('dynamicValidateForm')">Đăng nhập</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="signup">
                        Bạn chưa có tài khoản ? <router-link :to="{name:'register'}">Đăng kí ngay</router-link>
                    </div>
                </div>
            </template>
        </LoginLayout>
    </div>
</template>

<script>
import api from '@/api';
import LoginLayout from '@/layouts/LoginLayout.vue';
import { mapMutations } from 'vuex';
    export default {
    components: { LoginLayout },
     data() {
            return {
                dynamicValidateForm: {
                    domains: [{
                        key: 1,
                        value: ''
                        }],
                    email: '',
                    password:''
                }
            };
            
        },
        methods: {
            ...mapMutations('auth', ['updateAccessToken','updateStatusLogin']),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.login(this.dynamicValidateForm).then(res => {
                            console.log(res.data)
                            this.updateAccessToken(res.data.access_token);
                            this.updateStatusLogin(true);
                            this.$router.push({name: "home"})
                        }).catch(err => {
                            console.log(err)
                            this.$message({
                            message: 'Sai thông tin đăng nhập',
                            type: 'error'
                        });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
}
</script>

<style lang="scss" scoped>

</style>
