<template>
    <div class="container">
        <el-container>
            <el-main>
                <div class="content">
                    <div class="image">
                        <form>
                            <div id="preview">
                                <img v-if="url" :src="url" />
                            </div>    
                            <input id="inpt" type="file" @change="onFileChange" />
                            <el-row>
                                <el-button type="danger" style="margin-top: 15px;">Lưu</el-button>
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
                                        <el-input v-model="dynamicValidateForm.email" placeholder="Email"></el-input>
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
                                    <el-form-item prop="pass">
                                        <el-input type="password" v-model="changePass.pass" autocomplete="off"  placeholder="Mật khẩu"></el-input>
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
    export default {
        name:'ProfileView',
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('Vui lòng nhập mật khẩu'));
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
                } else if (value !== this.changePass.pass) {
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
                    email: 'buixuanxep@gmail.com',
                    name:'Bùi Xuân Xếp'
                },
                changePass:{
                    pass:'',
                    checkPass:''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                url:'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            };
        },
        methods:{
             submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                        message: 'Cập nhật thành công',
                        type: 'success'
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            formChangePass(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       this.$message({
                        message: 'Cập nhật mật khẩu thành công',
                        type: 'success'
                        });
                    } else {
                        return false;
                    }
                });
            },
            onFileChange(e) {
                const file = e.target.files[0];
                this.url = URL.createObjectURL(file);
            }
        },
        mounted(){
           
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        background-image: url(../assets/images/bg-profile.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        .content{
            width: 800px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            padding: 30px;
            background-color: white;
            border: 1px solid gray;
            border-radius: 10px;
            box-shadow: 0px 2px 9px 1px;
            margin-top: 100px;
            .image{
                width: 40%;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                #preview{
                    width: 150px;
                    height: 150px;
                    margin: 0 auto;
                    margin-bottom: 20px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        border: 5px solid rgb(17, 147, 240);
                    }
                }
                #inpt{
                    width: 70%;
                    margin: 0 auto;
                }
            }
        }
    }
</style>