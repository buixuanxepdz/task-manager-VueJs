<template>
<div>
    <li
        class="list-group-item-child"
        @click="handleDetail(element2)"
    >
        <!-- <div class="image">
            {{ hihi.title }}
        </div> -->
        <div  class="contentLabel">
            <span style="display: inline-block;margin-right: 5px;" v-for="(label,index) in element2.labels" :key="index">
                <span class="label" :style="`background-color:${label.color}`">{{ label.name }}</span>
            </span>
        </div>
        {{ element2.title }}
        <span v-if="element2.deadline">
            <div class="deadline" v-if="element2.status == 1" style="background-color: green;font-weight:bold;font-size:13px;width: max-content;padding: 4px;border-radius: 5px;color:white;margin-top: 5px;">
                <i class="el-icon-time" style="margin-right: 3px;"></i>{{ formatDate(element2.deadline) }}
            </div>
            <div class="deadline" v-else style="background-color: red;font-weight:bold;font-size:13px;width: max-content;padding: 4px;border-radius: 5px;color:white;margin-top: 5px;">
                <i class="el-icon-time" style="margin-right: 3px;"></i>{{ formatDate(element2.deadline) }}
            </div>
        </span>
        
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
            hihi:{}
        };
    },
    methods: {
        ...mapMutations('task',['handleDrawer','getFiles','getTest']),
        ...mapMutations(['getAll']),
        formatDate(date){
            return  moment(date).format('Do M')
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
        getCards(){
            api.getTag(this.element2).then(res => {
                if(res.status ==200){
                   this.hihi = res.data.data
                   this.getAll()
                }
                })
            .catch(err => {
                console.log(err)
            })
        }
    },
    components: { TaskDetail },
    computed: {
        ...mapState('task',['drawer','detail','files','test']),
    },
    mounted() {
        this.getCards()
        this.getAll()
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
            img{
                width: 100%;
                height: 100%;
            }
        }
        .deadline{
            cursor: pointer;
        }
    }
</style>