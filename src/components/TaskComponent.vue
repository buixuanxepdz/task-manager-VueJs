<template>
<div>
    <li
        class="list-group-item-child"
        @click="handleDetail(element2)"
    >
        <div class="image" v-if="handleCheckFile">
            <img :src="`http://vuecourse.zent.edu.vn/storage/${handleCheckFile}`" alt="">
        </div>
        <div  class="contentLabel">
            <span style="display: inline-block;margin-right: 5px;" v-for="(label,index) in element2.labels" :key="index">
                <span class="label" :style="`background-color:${label.color}`">{{ label.name }}</span>
            </span>
        </div>
        {{ element2.title }}
        <div class="bottom">
            <span v-if="element2.deadline">
                <div class="deadline" v-if="element2.status == 1" style="display:inline-block;background-color: green;font-weight:bold;font-size:13px;width: max-content;padding: 4px;border-radius: 5px;color:white;margin-top: 5px;">
                    <i class="el-icon-time" style="margin-right: 3px;"></i>{{ formatDate(element2.deadline) }}
                </div>
                <div class="deadline" v-if="element2.deadline <= formatDatecheck(new Date()) && element2.status == 0" style="display:inline-block;background-color: red;font-weight:bold;font-size:13px;width: max-content;padding: 4px;border-radius: 5px;color:white;margin-top: 5px;">
                    <i class="el-icon-time" style="margin-right: 3px;"></i>{{ formatDate(element2.deadline) }}
                </div>
                <div class="deadline" v-else-if="element2.deadline <= formatDatecheck(new Date().setDate(new Date().getDate() + 1)) && element2.status == 0" style="display:inline-block;background-color: orange;font-weight:bold;font-size:13px;width: max-content;padding: 4px;border-radius: 5px;color:white;margin-top: 5px;">
                    <i class="el-icon-time" style="margin-right: 3px;"></i>{{ formatDate(element2.deadline) }}
                </div>
            </span>
            <span v-if="element2.files.length > 0" style="margin-left: 8px;margin-top: 5px;">
                <i class="el-icon-paperclip" style="font-weight: bold;"></i><h5 style="display:inline-block;margin:0;margin-left: 4px;">{{ element2.files.length }}</h5>
            </span>
            <span v-if="element2.check_lists.length > 0" style="margin-left: 8px;margin-top: 5px;">
                <i class="el-icon-document-checked" style="font-weight: bold;"></i><h5 style="display:inline-block;margin:0;margin-left: 4px;">{{ handleCountWork  }}</h5>
            </span>
        </div>
    </li>
    <TaskDetail :element2="element2" />
</div>

    
</template>

<script>
import api from "@/api";
import { mapMutations, mapState } from "vuex";
import TaskDetail from "./TaskDetail.vue";
import moment from 'moment';
    export default {
    name: "TaskComponent",
    props: ["element2"],
    data() {
        return {
          
        };
    },
    computed:{
        ...mapState('task',['drawer','detail','files']),
        handleCheckFile(){
            let url = ''
            for(let i = 0 ; i < this.element2.files.length ; i++) {
                if(this.element2.files[i].path.includes('.jpg') || this.element2.files[i].path.includes('.png') || this.element2.files[i].path.includes('.jpeg')) {
                    url = this.element2.files[i].path;
                    break;
                }else{
                    url = '';
                }
            }
            return url
        },
        handleCountWork() {
                let work1 = 0;
                let work2 = 0;

                this.element2.check_lists.map((parent) => {
                    parent.check_list_childs.map((child) => {
                        if(child.status == 1) {
                            work1+=1;
                        }
                        work2+=1;
                    })
                })

                return work1 + '/' + work2;
            },
    },
    methods: {
        ...mapMutations('task',['handleDrawer','getFiles','getTest']),
        ...mapMutations(['getAll']),
        formatDate(date){
            return  moment(date).format('Do M')
        },
        formatDatecheck(date){
            return  moment(date).format("YYYY-MM-DD HH:mm:ss")
        },
        handleDetail(element){
            api.getTag(element).then(res => {
                this.handleDrawer(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
            document.title = `Chi tiết thẻ ${element.title}`
        },
    },
    components: { TaskDetail },
    
    mounted() {
        // this.getAll()
        // this.handleCheckFile()
    },
    created() {
        this.handleCheckFile 
    },
}
</script>

<style lang="scss" scoped>
    .list-group-item-child{
        background-color: white;
        list-style: none;
        width: 85%;
        margin: 0 auto;
        padding: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        .contentLabel{
            display: flex;
            flex-wrap: wrap;
            .label{
                width: max-content;
                font-size: 12px;
                margin-bottom: 5px; 
                padding: 3px;
                border-radius: 4px;
                color: white;
                font-weight: bold;
                display: inline-block;
            }
        }
        .image{
            width: 100%;
            height: 150px;
            margin-bottom: 10px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 7px;
            }
        }
        .deadline{
            cursor: pointer;
        }
    }
</style>