<template>
<div>
    <li
        class="list-group-item-child"
        @click="handleDetail(element2.id)"
    >
        <div class="label">
        nhãn
        </div>
        {{ element2.title }}
    </li>
    <TaskDetail/>
</div>
    
</template>

<script>
import { mapMutations, mapState } from "vuex";
import TaskDetail from "./TaskDetail.vue";
// import TaskDetail from "./TaskDetail.vue";
    export default {
    name: "TaskComponent",
    props: ["element2"],
    data() {
        return {
        };
    },
    methods: {
        ...mapMutations('task',['handleDrawer']),
        handleDetail(id){
            let data = {
                drawer:true,
                id:id
            }
            this.handleDrawer(data)
        },
    },
    components: { TaskDetail },
    computed: {
        ...mapState(['drawer']),
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
    }
</style>