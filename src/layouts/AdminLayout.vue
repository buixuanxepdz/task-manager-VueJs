<template>
    <div>
       <el-container>
            <el-header style=" font-size: 12px">
                <div class="left-head">
                    <router-link to="/"><h2>Trang chủ</h2></router-link>
                    <el-button type="primary" icon="el-icon-star-off"></el-button>
                    <el-button type="primary">Quản lý công việc</el-button>
                </div>
                <div class="right-head">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-avatar :src="url"></el-avatar>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <router-link to="/profile/1"><el-dropdown-item><i class="el-icon-s-tools"></i>Thông tin tài khoản</el-dropdown-item></router-link>
                            <router-link to="/login"><el-dropdown-item> <i class="el-icon-s-unfold"></i> Đăng xuất</el-dropdown-item></router-link>
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
    export default {
        name:'AdminLayout',
        data(){
            return {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            };
        }
    }
</script>

<style lang="scss" scoped>
    a{
        text-decoration: none;
    }
     .el-header {
            background-color: #303133;
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
                h2{
                    margin-right: 10px;
                    color: white;
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
</style>