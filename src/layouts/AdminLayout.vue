<template>
    <div>
       <el-container style="height:100vh">
            <el-header style=" font-size: 12px">
                <div class="left-head">
                    <router-link to="/">
                        <img src="../assets/images/logo.png" alt="">
                    </router-link>
                </div>
                <div class="right-head">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-avatar :src="`http://vuecourse.zent.edu.vn/storage/users/${avatar}`" v-if="avatar"></el-avatar>
                            <el-avatar :src="url" v-else></el-avatar>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <router-link to="/profile"><el-dropdown-item><i class="el-icon-s-tools"></i>Thông tin tài khoản</el-dropdown-item></router-link>
                            <!-- <router-link to="/login"> -->
                                <div @click="clickLogout()">
                                    <el-dropdown-item > <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất</el-dropdown-item>
                                </div>
                            <!-- </router-link> -->
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main style="padding: 0;">
                 <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import api from '@/api';
import { mapMutations, mapState } from 'vuex';

    export default {
        name:'AdminLayout',
        data(){
            return {
                url: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                // image:this.avatar
            };
        },
        methods: {
            ...mapMutations('auth', ['updateAccessToken','updateStatusLogin']),
            ...mapMutations('user', ['handleAvatar']),
            clickLogout(){
                // alert('ok')
                 api.logout().then(() => {
                    this.updateAccessToken('')
                    this.updateStatusLogin(false);
                    this.$router.push({name: "login"})

                }).catch(() => {
                    // console.log(err)
                })
            },

        },
        mounted() {
             api.getAuthUser().then(res => {
                    this.handleAvatar(res.data.avatar)
                }).catch(() => {
                })
        },
        computed:{
            ...mapState('user', ['avatar']),
        }
    }
</script>

<style lang="scss" scoped>
    a{
        text-decoration: none;
    }
     .el-header {
            background-image: linear-gradient(45deg, #19178f, #86bbb645);
            color: #333;
            line-height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            h2{
                text-align: left;
            }
            .left-head{
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: bold;
                img{
                    width: 120px;
                    display: flex;
                    align-items: center;
                }
            }
            .right-head{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .item {
                font-size: 25px;
                width: 30px;
                vertical-align: baseline;
                height: 30px;
                margin-right: 50px;
                position: relative;
               
                i{
                    position: absolute;
                    top: 0;
                    right: 0;
                }
                .el-badge__content.is-fixed {
                    position: absolute !important;
                    top: 20px;
                    right: 10px;
                    transform: translateY(-50%) translateX(100%);
                }
            }
            .el-dropdown-link {
                cursor: pointer;
                color: #409EFF;
                display: flex;
                align-items: center;
            }
            .el-icon-arrow-down {
                font-size: 12px;
            }
            }
           
        }
    .el-main{
        background-image: url('../assets/images/bg-home.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>