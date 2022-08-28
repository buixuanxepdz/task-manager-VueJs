<template>
    <div>
        <LoginLayout>
            <template #form>
                <div>
                    <header>Đăng kí</header>
                    <el-form :model="dynamicValidateForm" :rules="rules" ref="dynamicValidateForm" class="demo-dynamic">
                        <el-form-item prop="name">
                            <el-input v-model="dynamicValidateForm.name" autocomplete="off" placeholder="Họ và tên"></el-input>
                        </el-form-item>
                        <el-form-item
                            prop="email"
                            :rules="[
                            { required: true, message: 'Vui lòng nhập Email', trigger: 'blur' },
                            { type: 'email', message: 'Vui lòng nhập địa chỉ email chính xác', trigger: ['blur', 'change'] }
                            ]"
                        >
                            <el-input v-model="dynamicValidateForm.email" placeholder="Email"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="dynamicValidateForm.password" autocomplete="off"  placeholder="Mật khẩu"></el-input>
                        </el-form-item>
                        <el-form-item prop="checkPass">
                            <el-input type="password" v-model="dynamicValidateForm.checkPass" autocomplete="off"  placeholder="Nhập lại mật khẩu"></el-input>
                        </el-form-item>
                        <el-form-item class="button">
                            <div class="inner">
                            </div>
                            <el-button style="width:100%" type="primary" @click="submitForm('dynamicValidateForm')">Đăng kí</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="signup">
                        <router-link to="login">Quay lại trang đăng nhập</router-link> 
                    </div>
                </div>
            </template>
        </LoginLayout>
    </div>
</template>

<script>
import api from '@/api';
import LoginLayout from '@/layouts/LoginLayout.vue';
    export default {
    components: { LoginLayout },
     data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('Vui lòng nhập mật khẩu'));
                } else {
                if (this.dynamicValidateForm.checkPass !== '') {
                    this.$refs.dynamicValidateForm.validateField('checkPass');
                }
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('Vui lòng nhập lại mật khẩu'));
                } else if (value !== this.dynamicValidateForm.password) {
                callback(new Error('Mật khẩu nhập lại chưa khớp'));
                } else {
                callback();
                }
            };
            return {
                dynamicValidateForm: {
                    domains: [{
                        key: 1,
                        value: ''
                        }],
                    name:'',
                    email: '',
                    password:'',
                    checkPass:''
                },
                 rules: {
                     name: [
                        { required: true, message: 'Vui lòng nhập họ tên', trigger: 'blur' },
                        { min: 3, max: 15, message: 'Họ tên phải ít nhất 3 kí tự và tối đa 15', trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' },
                        { min: 6, message: 'Mật khẩu ít nhất 6 kí tự', trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' },
                        { min: 6, message: 'Mật khẩu ít nhất 6 kí tự', trigger: 'blur' }
                    ],
                },
                error:{}
            };
            
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.register(this.dynamicValidateForm).then(res => {
                            console.log(res.data)
                            this.$message({
                                message: 'Đăng kí thành công',
                                type: 'success'
                            });
                            this.dynamicValidateForm.name = ''
                            this.dynamicValidateForm.email = ''
                            this.dynamicValidateForm.password = ''
                            this.dynamicValidateForm.checkPass = ''
                        }).catch(err => {
                            console.log(err)
                            this.error = err.response.data.error
                            if(this.error.email){
                                this.$message({
                                message: 'Email đã tồn tại',
                                type: 'error'
                            });
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
        },
        mounted() {
            document.title = 'Đăng kí tài khoản'
        },
}
</script>

<style lang="scss" scoped>
header{
  font-size: 40px;
  margin-bottom: 60px;
  font-family: 'Montserrat', sans-serif;
}
.signup{
  margin-top: 20px;
  font-family: 'Noto Sans', sans-serif;
}
.signup a{
  color: #3498db;
  text-decoration: none;
}
.signup a:hover{
  text-decoration: underline;
}
</style>
