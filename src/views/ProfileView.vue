<template>
    <div class="container">
        <el-container>
            <el-main>
                <div class="content animate__animated animate__fadeInDown">
                    <div class="image">
                        <form>
                            <div v-if="avatar || url" class="preview"  title="Cập nhật avatar">
                                <img v-if="url" :src="url" />
                                <img :src="`http://vuecourse.zent.edu.vn/storage/users/${avatar}`" alt="" v-else>
                                <i class="fa-solid fa-xmark" title="Hủy" @click="close"></i>
                            </div>
                            <div v-else class="preview" @click="changeImg" title="Cập nhật avatar">
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png"  />
                                <input id="inpt" ref="file" type="file" @change="onFileChange" v-show="false" />
                            </div>        
                           
                            <el-row>
                                <el-button type="danger" style="margin-top: 15px;" @click="updateAvatar">Lưu</el-button>
                            </el-row>
                        </form>
                    </div>
                    <div class="profile">
                        <el-tabs type="border-card">
                            <el-tab-pane label="Thông tin cá nhân">
                                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
                                    <el-form-item
                                        prop="email"
                                        :rules="[
                                        { required: true, message: 'Vui lòng nhập Email', trigger: 'blur' },
                                        { type: 'email', message: 'Vui lòng nhập địa chỉ email chính xác', trigger: ['blur', 'change'] }
                                        ]"
                                    >
                                        <el-input :disabled="true" v-model="dynamicValidateForm.email" placeholder="Email"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="name"  :rules="[
                                        { required: true, message: 'Vui lòng nhập họ tên', trigger: 'blur' },
                                        ]">
                                        <el-input type="text" v-model="dynamicValidateForm.name" autocomplete="off"  placeholder="Họ tên"></el-input>
                                    </el-form-item>
                                    <el-form-item class="button">
                                        <div class="inner">
                                        </div>
                                        <el-button style="width:100%" type="primary" @click="submitForm('dynamicValidateForm')">Cập nhật</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="Đổi mật khẩu">
                                <el-form :model="changePass" :rules="rules" ref="changePass" class="demo-dynamic">
                                    <el-form-item prop="password">
                                        <el-input type="password" v-model="changePass.password" autocomplete="off"  placeholder="Mật khẩu"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="checkPass">
                                        <el-input type="password" v-model="changePass.checkPass" autocomplete="off"  placeholder="Nhập lại mật khẩu"></el-input>
                                    </el-form-item>
                                    <el-form-item class="button">
                                        <div class="inner">
                                        </div>
                                        <el-button style="width:100%" type="primary" @click="formChangePass('changePass')">Cập nhật</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import api from '@/api';
import { mapMutations } from 'vuex';

    export default {
        name:'ProfileView',
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Vui lòng nhập mật khẩu'));
                }else if(value.length < 6){
                    callback(new Error('Mật khẩu phải từ 6 kí tự'));
                } else {
                    if (this.changePass.checkPass !== '') {
                        this.$refs.changePass.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Vui lòng nhập lại mật khẩu'));
                }else if(value.length < 6){
                    callback(new Error('Mật khẩu phải từ 6 kí tự'));
                } else if (value !== this.changePass.password) {
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
                    email: '',
                    name:''
                },
                changePass:{
                    password:'',
                    checkPass:''
                },
                rules: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                url:'',
                avatar:'',
            };
        },
        methods:{
            ...mapMutations('user', ['handleAvatar']),
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       let data = new FormData()
                        data.append('name',this.dynamicValidateForm.name)
                        // data.append('email',this.dynamicValidateForm.email)
                        api.updateProfile(data)
                        .then(res => {
                            if(res.status == 200){
                                this.$notify({
                                    title: 'Thành công',
                                    message: 'Cập nhật thành công',
                                    type: 'success'
                                });
                            }
                        })
                        .catch()
                    } else {
                        return false;
                    }
                });
            },
            formChangePass(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = new URLSearchParams()
                        data.append('password',this.changePass.password)
                        data.append('password_confirmation',this.changePass.checkPass)
                        api.updatePassword(data)
                        .then(res => {
                            if(res.status == 200){
                                this.$notify({
                                    title: 'Thành công',
                                    message: 'Cập nhật mật khẩu thành công',
                                    type: 'success'
                                });
                            }
                        })
                        .catch()
                    } else {
                        return false;
                    }
                });
            },
            updateAvatar(){
                let data = new FormData()
                if(this.avatar){
                    data.append('avatar',this.avatar)
                }
                api.updateProfile(data)
                .then(res => {
                    if(res.status == 200){
                        this.$notify({
                            title: 'Thành công',
                            message: 'Cập nhật avatar thành công',
                            type: 'success'
                        });
                        this.getAuth()
                    }
                })
                .catch()
            },
            onFileChange(e) {
                const file = e.target.files[0];
                this.url = URL.createObjectURL(file);
                this.avatar = file
            },
            changeImg(){
                this.$refs.file.click()
            },
            close(){
                this.url = ''
                this.avatar = ''
            },
            getAuth(){
                 api.getAuthUser().then(res => {
                    // console.log(res.data)
                    this.dynamicValidateForm.name = res.data.name
                    this.dynamicValidateForm.email = res.data.email
                    this.avatar = res.data.avatar
                    this.handleAvatar(res.data.avatar)
                }).catch()
            }
        },
        mounted(){
           this.getAuth()
           document.title = 'Thông tin cá nhân'
        },
        computed:{
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        background-image: url(../assets/images/bg3.png);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        height: 100%;
        .content{
            width: 800px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            padding: 50px;
            background-color: white;
            border: 1px solid gray;
            border-radius: 10px;
            box-shadow: 0px 2px 9px 1px;
            margin-top: 100px;
            .image{
                width: 40%;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                border: 1px solid #DCDFE6;
                box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
                padding: 20px;
                .preview{
                    width: 150px;
                    height: 150px;
                    margin: 0 auto;
                    margin-bottom: 10px;
                    position: relative;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        margin: 0 auto;
                        border: 5px solid rgb(17, 147, 240);
                        
                    }
                    i{
                        position: absolute;
                        top: 14px;
                        right: 4px;
                        font-size: 20px;
                        color: white;
                        padding: 3px 7px;
                        background-color: red;
                        border-radius: 50%;
                        z-index: 12;
                        opacity: 0;
                    }
                }
                .preview::before{
                    content: "";
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    width: 100%;
                    height: 100%;
                    background-color: #0000004f;
                    z-index: 10;
                    opacity: 0;
                    border-radius: 50%;
                }
                .preview:hover::before,.preview:hover i{
                    opacity: 1;
                    cursor: pointer;
                    transition: 0.4s;
                }
                #inpt{
                    width: 70%;
                    margin: 0 auto;
                }
            }
            .profile{
                width: 40%;
                display: flex;
                justify-content: center;
            }
        }
    }
</style>