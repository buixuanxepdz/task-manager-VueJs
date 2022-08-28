<template>
    <div>
        <div class="checklist">
            <h3 v-if="toggleCheck == true" @click="toggleCheck = false,editCheckList=checkList.title">{{ checkList.title }}</h3>
            <input v-else class="inptitle" type="text" @blur="toggleCheck = true,handleEditCheckList(checklist)" @keyup.enter="toggleCheck = true,handleEditCheckList(checklist)" v-model="editCheckList">
            <el-button type="danger" icon="el-icon-delete" size="small" plain></el-button>
        </div>
        <el-progress class="bar" :percentage="percenTage"></el-progress>
    </div>
</template>

<script>
import api from '@/api';
import { mapMutations, mapState } from 'vuex';

    export default {
        name:'CheckListComponent',
        props:['checklist'],
        computed: {
        ...mapState("task", ["drawer", "detail", "labels"]),
        ...mapMutations("task", ["closeDrawer", "handleDrawer", "getLabels"]),
        },
        data() {
            return {
                checkList:this.checklist,
                toggleCheck:true,
                percenTage: 0,
                editCheckList:''
            };
        },
        methods: {
            ...mapMutations(["getAll"]),
            handleEditCheckList(checklist){
                let data = new URLSearchParams()
                data.append('id',checklist.id)
                data.append('title',this.editCheckList)
                api.updateCheckList(data)
                .then(()=>{
                    this.getAll()
                })
                .catch(err => {
                    console.log(err)
                })
            },
        },
        mounted() {
        },
    }
</script>

<style lang="scss" scoped>
    .inptitle{
        width: 70%;
        height: 30px;
        font-size: 18px;
        font-weight: bold;
        outline: none;
        border: 2px solid rgb(30, 9, 169);
    }
    .checklist{
        display: flex;
        justify-content: space-between;
        align-items: center;
        button{
            height: 40px;
        }
    }
    .bar{
        margin: 20px 0;
    }
</style>