<template>
    <div>
       <el-drawer
        title="I am the title"
        :visible.sync="drawer"
        :with-header="false"
        :before-close="changeDrawer"
        size="40%">
        <div class="detail">
            <h3>Tiêu đề</h3>
            <div class="label">
            nhãn
            </div>
            <div class="description">
                <h3>Mô tả</h3>
                <textarea name="" id=""></textarea>
                <div class="btn">
                     <el-button type="primary">Lưu</el-button>
                     <el-button>Hủy</el-button>
                </div>
            </div>
            <div class="attach">
                <h3>Đính kèm</h3>
            </div>
            <div class="todo">
                <h3>Việc cần làm</h3>
                <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
            </div>
        </div>
    </el-drawer>
    </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';

    export default {
        name:'TaskDetail',
        data() {
            return {
                file:'',
                fileName:''
            };
        },
        computed: {
            ...mapState('task',['drawer']),
        },
        methods: {
            ...mapMutations('task', ['closeDrawer']),
            changeDrawer(){
                this.closeDrawer()
            },
            changeFile(e){
                console.log(e.target.files[0])
                this.file = e.target.files[0]
                this.fileName = e.target.files[0].name
            },
            handleUpload(){
                let data = new FormData()
                data.append('file',this.file)
                data.append('file_name',this.fileName)

                axios.post('https://250d-58-187-74-149.ap.ngrok.io/api/upload',data).then(res => {
                   if(res.status == 200){
                    this.$notify({
                        title: 'Success',
                        message: 'This is a success message',
                        type: 'success'
                        });
                   }
                }).catch(err => {
                    console.log(err)
                })
            }   
        },
    }
</script>

<style lang="scss" scoped>
     .detail{
        width: 95%;
        margin: 0 auto;
        margin-top: 20px;
         .label{
            background-color: red;
            width: max-content;
            font-size: 12px;
            margin-bottom: 10px; 
            padding: 3px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
        }
        .description{
            width: 100%;
            textarea{
                width: 98%;
                height: 60px;
                outline: none;
                border: none;
                background-color: rgb(229, 237, 247);
                font-size: 17px;
                padding: 10px;
                border-radius: 4px;
            }
        }
    }
</style>