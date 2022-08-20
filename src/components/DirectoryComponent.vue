<template>
    <div>
        <div class="content">
            <draggable
                class="list-group"
                tag="ul"
                :list="list1"
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
                    <input class="title" type="text" :value="element.title">
                    <draggable
                        class="list-group"
                        tag="ul"
                        v-model="element.cards"
                        v-bind="dragOptions"
                        @start="drag = true"
                        @end="drag = false"
                        group="2"
                    >
                    <TaskComponent v-for="element2 in element.cards" :key="element2.id" :element2="element2" />
                    </draggable>
                    <div class="addTag" v-if="element.status" @click="checkIndx(element.id)">
                        <i class="el-icon-plus"></i>Thêm thẻ
                    </div>
                    <div class="addTag addTagActive" v-else>
                        <textarea name="" id="" @keyup.enter="handleAddTag(element.id)" rows="3" autofocus v-model="tag" placeholder="Nhập tiêu đề cho thẻ..." ></textarea>
                        <div class="addHandle"> 
                            <button @click="handleAddTag(element.id)">Thêm thẻ</button><i class="el-icon-close" @click="element.status  =! element.status"></i>
                        </div>
                    </div>
                </li>
                </transition-group>
            </draggable>
            <div class="addList" v-if="checkList == true" @click="checkList = false">
                <i class="el-icon-plus"></i>Thêm danh sách
            </div>
            <div id="abc" class="addListActive" v-else>
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
// import api from '../api/index'
import { mapMutations, mapState } from 'vuex'
import TaskComponent from './TaskComponent.vue'
    export default {
        name:'DirectoryComponent',
        display: "Transitions",
        components: {
            draggable,
            TaskComponent
        },
        data(){
            return {
                drawer: false,
                checkList:true,
                drag:false,
                title:'',
                tag:'',
            }
        },
        methods: {
            ...mapMutations(['addList','addTag','checkIndex']),
            handleAddList(){
               this.addList(this.title)
               this.title=''
               setTimeout(()=>{
                    document.getElementById('abc').scrollIntoView()
               },200)
            },
            handleAddTag(id){
                let data = {
                    id:id,
                    tag:this.tag
                }
                this.addTag(data)
                this.tag = ''
            },
            checkIndx(id){
                this.checkIndex(id)
            }
            
        },
        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost",
                  
                };
            },
            ...mapState([
                'list1',
            ])
        },
        mounted(){
        
        //    api.getDirectory().then(res =>{
        //         console.log(res)
        //    }).catch(err => {
        //          console.log(err)
        //    })
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
        margin-right: 30px;
        line-height: 40px;
        font-weight: bold;
        font-size: 18px;
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
        margin-right: 30px;
        line-height: 40px;
        font-weight: bold;
        transition: 0.1s;
        padding: 9px 0;
        cursor: pointer;
         .addHandle{
            width: max-content;
            align-items: center;
            display: flex;
            margin-left: 6px;
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
                margin-top: 9px;
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
                width: 90%;
                margin: 0 auto;
                height: 28px;
                outline: none;
                border: none;
                padding-left: 3px;
                font-size: 18px;
                border: 2px solid #3689c3;
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
           .title{
                height: 28px;
                font-size: 18px;
                font-weight: bold;
                background-color: transparent;
                outline: none;
                border: none;
                width: 90%;
                margin: 0 auto;
                display: block;
                padding-left: 5px;
                margin-top: 5px;
                border-radius: 3px;
                border: 2px solid transparent;
           }
           .title:hover{
                cursor: pointer;
           }
           .title:focus{
                border: 2px solid #3689c3;
                background-color: white;
                cursor:text;
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