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
                        group="1"
                    >
                        <transition-group class="box" type="transition" :name="!drag ? 'flip-list' : null">
                        <li
                            class="list-group-item"
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
                            <h4>{{ element.title }}</h4>
                            <draggable
                                class="list-group"
                                tag="ul"
                                v-model="element.cards"
                                v-bind="dragOptions"
                                @start="drag = true"
                                @end="drag = false"
                                group="2"
                            >
                                <!-- <transition-group type="transition" :name="!drag ? 'flip-list' : null"> -->
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
                                <!-- </transition-group> -->
                            </draggable>
                            <div class="addTag">
                                <i class="el-icon-plus"></i>Thêm thẻ
                            </div>
                            <!-- <div class="addTag addTagActive">
                                <textarea name="" id="" rows="3" autofocus v-model="element.cards.title" placeholder="Nhập tiêu đề cho thẻ..." ></textarea>
                                <div class="addHandle"> 
                                    <button>Thêm thẻ</button><i class="el-icon-close" @click="checkTag = true"></i>
                                </div>
                            </div> -->
                        </li>
                        </transition-group>
                    </draggable>
                    <div class="addList" v-if="checkList == true" @click="checkList = false">
                        <i class="el-icon-plus"></i>Thêm danh sách
                    </div>
                    <div class="addListActive" v-else>
                        <input type="text" @keyup.enter="handleAddList()" v-model="title" autofocus>
                        <div class="addHandle">
                            <button  @click="handleAddList()">Thêm danh sách</button><i class="el-icon-close" @click="checkList = true"></i>
                        </div>
                    </div>
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
                checkList:true,
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
                title:'',
                drag:false
            }
        },
        methods: {
            handleAddList(){
                if(this.title == ''){
                    return 
                }else{
                    this.list1.push(
                        {
                            "id": Math.random(),
                            "title": this.title,
                            "user_id": 110,
                            "index": 1,
                            "created_at": "2022-08-03T11:14:27.000000Z",
                            "updated_at": "2022-08-03T11:14:27.000000Z",
                            "cards":[]
                        }
                    )
                    this.title = ''
                }
            },
            handleAddTag(){
               this.list1.map((tag) => {
                if(tag.cards.title == null){
                    return
                }
               })
            },
            
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
        },
        mounted(){
            
        }
    }
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  .content{
    width: max-content;
    height: 100%;
    display: flex;
    .addList{
        width: 250px;
        height: max-content;
        background-color: #ebecf0;
        border-radius: 5px;
        margin: 30px 0 0 20px;
        line-height: 40px;
        font-weight: bold;
        transition: 0.4s;
        cursor: pointer;
        
        i{
            margin-right: 5px;
        }
    }
    .addList:hover{
        background-color: #dddde1;
        transition: 0.4s;
    }
    .addListActive{
        width: 250px;
        height: max-content;
        background-color: #ebecf0;
        border-radius: 5px;
        margin: 30px 0 0 20px;
        line-height: 40px;
        font-weight: bold;
        transition: 0.4s;
        cursor: pointer;
         .addHandle{
            width: max-content;
            align-items: center;
            display: flex;
            justify-content: space-between;
            button{
                width: max-content;
                height: max-content;
                background-color: #409EFF;
                border: none;
                padding: 10px;
                margin-bottom: 10px;
                color: white;
                float: left;
                margin-left: 6px;
                border-radius: 5px;
                margin-top: 5px;
            }
            button:hover{
                cursor: pointer;
                background-color: #2781dc;
                transition: 0.5s;
            }
            i{
                margin-bottom: 10px;
                margin-left: 5px;
                font-weight: bold;
                font-size: 20px;
                margin-top: 8px;
            }
        }
         input{
                width: 95%;
                margin: 0 auto;
                height: 28px;
                outline: none;
                border: none;
            }
    }
    .list-group{
      .box{
        display: flex;
        width: 100%;
        text-align: left;
        .list-group-item{
           background-color: #ebecf0;
           margin-left: 20px;
           list-style: none;
           width: 250px;
           border-radius: 5px;
           padding: 10px 0;
           height: max-content;
           h4{
            margin-left: 20px;
           }
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
             .addTag{
                width: 90%;
                margin: 0 auto;
                height: max-content;
                border-radius: 5px;
                line-height: 40px;
                font-weight: bold;
                transition: 0.4s;
                cursor: pointer;
                .addHandle{
                    width: max-content;
                    align-items: center;
                    display: flex;
                    justify-content: space-between;
                    button{
                        width: max-content;
                        height: max-content;
                        background-color: #409EFF;
                        border: none;
                        padding: 10px;
                        margin-bottom: 10px;
                        color: white;
                        float: left;
                        border-radius: 5px;
                    }
                    button:hover{
                        cursor: pointer;
                        background-color: #2781dc;
                        transition: 0.5s;
                    }
                    i{
                        margin-bottom: 10px;
                        margin-left: 10px;
                        font-weight: bold;
                        font-size: 20px;
                    }
                }
                textarea{
                    width: 100%;
                    outline: none;
                    border: none;
                    font-family: arial;
                    font-size: 16px;
                    padding: 5px;
                }
                i{
                    margin-right: 5px;
                    margin-left: 10px;
                    font-weight: bold;
                }
            }
            .addTag:hover{
                background-color: #d6d7da;
                transition: 0.4s;
            }
            .addTagActive:hover{
                background-color: #ebecf0;
                transition: 0.4s;
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