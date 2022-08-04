<template>
    <div>
        <LoginLayout>
            <template #form>
                <div>
                    <header>Task Manager</header>
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
                        <el-form-item prop="pass"  :rules="[
                            { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
                            ]">
                            <el-input type="password" v-model="dynamicValidateForm.pass" autocomplete="off"  placeholder="Mật khẩu"></el-input>
                        </el-form-item>
                        <el-form-item class="button">
                            <div class="inner">
                            </div>
                            <el-button style="width:100%" type="primary" @click="submitForm('dynamicValidateForm')">Đăng nhập</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="signup">
                        Bạn chưa có tài khoản ? <router-link to="register">Đăng kí ngay</router-link>
                    </div>
                </div>
            </template>
        </LoginLayout>
    </div>
</template>

<script>
import LoginLayout from '@/layouts/LoginLayout.vue';
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
                    pass:''
                }
            };
            
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$router.push({name:'home'})
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
