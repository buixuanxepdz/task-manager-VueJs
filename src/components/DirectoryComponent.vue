<template>
    <div>
                <div class="content">
                     <draggable
                        class="list-group"
                        tag="ul"
                        v-model="list1"
                        v-bind="dragOptions"
                        @start="drag = true"
                        @end="drag = false"
                    >
                        <transition-group class="box" type="transition" :name="!drag ? 'flip-list' : null">
                        <li
                            class="list-group-item" ref="keo"
                            v-for="element in list1"
                            :key="element.id"
                        >
                            <i
                            :class="
                                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
                            "
                            @click="element.fixed = !element.fixed"
                            aria-hidden="true"
                            ></i>
                            <h3>{{ element.title }}</h3>
                            <draggable
                                class="list-group"
                                tag="ul"
                                v-model="element.cards"
                                v-bind="dragOptions"
                                @start="drag = true"
                                @end="drag = false"
                            >
                                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                                <li
                                    class="list-group-item-child"
                                    v-for="element2 in element.cards"
                                    :key="element2.id"
                                >
                                    <i
                                    :class="
                                        element2.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
                                    "
                                    @click="element2.fixed = !element2.fixed"
                                    aria-hidden="true"
                                    ></i>
                                    {{ element2.title }}
                                </li>
                                </transition-group>
                            </draggable>
                        </li>
                        </transition-group>
                    </draggable>
                </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
    export default {
        name:'DirectoryComponent',
        display: "Transitions",
        components: {
            draggable,
        },
        data(){
            return {
                list1: [
                    {
                    "id": 1,
                    "title": "group 1",
                    "user_id": 110,
                    "index": 1,
                    "created_at": "2022-08-03T11:14:27.000000Z",
                    "updated_at": "2022-08-03T11:14:27.000000Z",
                    "cards": [
                        {
                        "id": 822,
                        "title": "task 1",
                        "description": null,
                        "status": null,
                        "directory_id": 649,
                        "index": 0,
                        "deadline": null,
                        "user_id": 110,
                        "created_at": "2022-08-03T11:14:41.000000Z",
                        "updated_at": "2022-08-03T11:14:43.000000Z",
                        "labels": []
                        },
                        {
                        "id": 823,
                        "title": "task 2",
                        "description": null,
                        "status": null,
                        "directory_id": 649,
                        "index": 1,
                        "deadline": null,
                        "user_id": 110,
                        "created_at": "2022-08-03T12:22:35.000000Z",
                        "updated_at": "2022-08-03T12:22:35.000000Z",
                        "labels": []
                        },
                        {
                        "id": 824,
                        "title": "task 3",
                        "description": null,
                        "status": null,
                        "directory_id": 649,
                        "index": 2,
                        "deadline": null,
                        "user_id": 110,
                        "created_at": "2022-08-03T12:22:37.000000Z",
                        "updated_at": "2022-08-03T12:22:37.000000Z",
                        "labels": []
                        },
                        {
                        "id": 825,
                        "title": "task 4",
                        "description": null,
                        "status": null,
                        "directory_id": 649,
                        "index": 3,
                        "deadline": null,
                        "user_id": 110,
                        "created_at": "2022-08-03T12:22:39.000000Z",
                        "updated_at": "2022-08-03T12:22:39.000000Z",
                        "labels": []
                        }
                    ]
                    },
                    {
                    "id": 2,
                    "title": "group 2",
                    "user_id": 110,
                    "index": 1,
                    "created_at": "2022-08-03T11:14:29.000000Z",
                    "updated_at": "2022-08-03T11:14:29.000000Z",
                    "cards": [
                        {
                        "id": 821,
                        "title": "task 5",
                        "description": null,
                        "status": null,
                        "directory_id": 650,
                        "index": 0,
                        "deadline": null,
                        "user_id": 110,
                        "created_at": "2022-08-03T11:14:39.000000Z",
                        "updated_at": "2022-08-03T11:14:43.000000Z",
                        "labels": []
                        },
                        {
                        "id": 826,
                        "title": "task 6",
                        "description": null,
                        "status": null,
                        "directory_id": 650,
                        "index": 1,
                        "deadline": null,
                        "user_id": 110,
                        "created_at": "2022-08-03T12:22:43.000000Z",
                        "updated_at": "2022-08-03T12:22:43.000000Z",
                        "labels": []
                        },
                        {
                        "id": 827,
                        "title": "task 7",
                        "description": null,
                        "status": null,
                        "directory_id": 650,
                        "index": 2,
                        "deadline": null,
                        "user_id": 110,
                        "created_at": "2022-08-03T12:22:45.000000Z",
                        "updated_at": "2022-08-03T12:22:45.000000Z",
                        "labels": []
                        },
                        {
                        "id": 828,
                        "title": "task 8",
                        "description": null,
                        "status": null,
                        "directory_id": 650,
                        "index": 3,
                        "deadline": null,
                        "user_id": 110,
                        "created_at": "2022-08-03T12:22:47.000000Z",
                        "updated_at": "2022-08-03T12:22:47.000000Z",
                        "labels": []
                        }
                    ]
                    }
                ],
                drag:false
            }
        },
        methods: {
            
        },
        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost",
                  
                };
            }
        }
    }
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  .content{
    width: 100%;
    height: 100vh;
    .list-group{
      .box{
        display: flex;
        width: 100%;
       
        .list-group-item{
           background-color: #ebecf0;
           margin-left: 20px;
           list-style: none;
           width: 200px;
           border-radius: 5px;
           padding: 10px 0;
            .list-group-item-child{
                background-color: white;
                list-style: none;
                width: 90%;
                margin: 0 auto;
                padding: 10px;
                margin-top: 10px;
                margin-bottom: 10px;
                border-radius: 5px;
            }
        }
      }
    }
    
  }
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: pointer;
  margin-top: 30px;
}
.list-group-item i {
  cursor: pointer;
}
</style>