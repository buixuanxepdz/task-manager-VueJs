<template>
    <div>
       <div class="checklist" v-if="checklist.id == toggleCheckList">
            <div class="editCheck">
                <el-input class="textListEdit"
                type="textarea"
                placeholder="Nhập công việc"
                v-model="editCheckList"
                style="width: 100%;"
                @keyup.enter.native="handleEditCheckList(checklist)"
                >
                </el-input>
                <el-button class="btnEdit" type="primary" @click="handleEditCheckList(checklist)">Sửa</el-button>   
                <el-button type="text" @click="(toggleCheckList = ''), (editCheckList = '')"
                    ><i class="el-icon-close"></i
                ></el-button>  
            </div>
        </div>
        <div class="checklist" v-else>
            <div class="titleCheck">
                <h3  @click="editCheckList=checklist.title,toggleCheckList = checklist.id"><i class="el-icon-s-claim" style="margin-right: 10px;font-size:30px"></i>{{ checklist.title }}</h3>
                <el-popconfirm
                    icon="el-icon-info"
                    @confirm="removeCheckList(checklist.id)"
                    icon-color="red"
                    title="Bạn chắc chẳn muốn xóa ?"
                >
                <el-button type="danger" slot="reference" icon="el-icon-delete" size="small" plain></el-button>
                </el-popconfirm>
            </div>
        </div>
        <el-progress class="bar" :percentage="percenTage" :stroke-width="10"></el-progress>
        <div class="listChild" v-for="(listChild) in checklist.check_list_childs" :key="listChild.id">
            <div class="contentChild">
                <div class="editChildForm" v-if="editChild == listChild.id">
                    <el-input class="titleListChildEdit"
                        placeholder="Nhập công việc con"
                        v-model="editTitleChild"
                        style="width: 100%;"
                        @keyup.enter.native="handleEditChild(listChild)"
                        >
                        </el-input>
                    <el-button type="primary" size="small" @click="handleEditChild(listChild)" style="margin-top: 10px;">Lưu</el-button>  
                    <el-button type="text" size="small" icon="el-icon-close" style="margin-top: 10px;" @click="editChild = '',editTitleChild=''" ></el-button>  
                </div>
                <div v-else class="checkboxTitle">
                    <div>
                        <input v-if="listChild.status === 1" checked @click="handleChangeStatusChild(listChild)" class="checkBox" type="checkbox" name="" id="">
                        <input v-else @click="handleChangeStatusChild(listChild)" class="checkBox" type="checkbox" name="" id="">
                        <del v-if="listChild.status === 1" @click="editChild=listChild.id,editTitleChild=listChild.title">{{ listChild.title }}</del>
                        <span v-else @click="editChild=listChild.id,editTitleChild=listChild.title">{{ listChild.title }}</span>
                    </div>
                        <el-popconfirm
                        icon="el-icon-info"
                        @confirm="removeCheckListChild(listChild.id)"
                        icon-color="red"
                        title="Bạn chắc chẳn muốn xóa ?"
                    >
                    <el-button type="danger" slot="reference" icon="el-icon-delete" size="mini" plain></el-button>
                    </el-popconfirm>
                </div>
            </div>
        </div>
        <div class="checklistChild" v-if="addChild == checklist.id">
            <el-input class="textListChildEdit"
                placeholder="Nhập công việc con"
                v-model="dataListChild"
                style="width: 100%;"
                @keyup.enter.native="handleAddChild(checklist)"
                >
                </el-input>
            <el-button type="primary" size="small" @click="handleAddChild(checklist)" style="margin-top: 10px;">Thêm</el-button>  
            <el-button type="text" size="small" icon="el-icon-close" @click="addChild = ''" ></el-button>  
        </div>
        <el-button type="primary" size="small" v-else @click="addChild = checklist.id">Thêm một mục</el-button>
    </div>
</template>

<script>
import api from '@/api';
import { mapMutations, mapState } from 'vuex';

    export default {
        name:'CheckListComponent',
        props:['checklist','index'],
        computed: {
        ...mapState("task", ["drawer", "detail"]),
        },
        data() {
            return {
                editTitleChild:'',
                editChild:'',
                dataListChild:'',
                toggleCheckList:'',
                addChild:'',
                percenTage: 0,
                editCheckList: "",
                labels:[],
                searchLabel:'',
            };
        },
        methods: {
            ...mapMutations(["getAll"]),
            ...mapMutations("task", ["closeDrawer", "handleDrawer"]),
            getLabels(){
                api.getListLabel(this.searchLabel)
                .then(res => {
                    this.labels =  res.data.data
                    this.labels.map((n) => {
                    Object.assign(n,{popshow:false})
                    })
                }
                )
                .catch(err => {
                console.log(err)
                })
            },
            removeCheckList(id) {
            api.deleteCheckList(id)
                .then(() => {
                api.getTag(this.detail).then(res => {
                    this.handleDrawer(res.data.data);
                    this.getAll();
                    this.getLabels();
                    })
                        .catch(err => { 
                        console.log(err);
                    });
                })
                    .catch(err => {
                    console.log(err);
                });
            },
            handleEditCheckList(checklist) {
                if(this.editCheckList == ''){
                    this.$notify.error({
                    title: 'Lỗi',
                    message: 'Vui lòng nhập công việc'
                    });
                    return false
                }else{
                    let data = new URLSearchParams();
                    data.append("id", checklist.id);
                    data.append("title", this.editCheckList);
                    api.updateCheckList(data)
                        .then(() => {
                        this.editCheckList = "";
                        this.toggleCheckList = "";
                        api.getTag(this.detail).then(res => {
                            this.handleDrawer(res.data.data);
                            this.getAll();
                            this.getLabels();
                        })
                            .catch(err => {
                            console.log(err);
                        });
                    })
                        .catch(err => {
                        console.log(err);
                    });
                }
                
            },
            getCard(){
                api.getTag(this.detail).then(res => {
                    this.handleDrawer(res.data.data);
                })
            },
            handleChangeStatusChild(listChild){
                let stt = 0;
                if (listChild.status) {
                    stt = 0;
                } else {
                    stt = 1;
                }
                let data = {
                    status:stt
                }
                api.updateStatusCheckListChild(listChild.id,data)
                    .then(() => {
                    this.getCard()
                    this.getAll();
                    this.getLabels();
                    this.handleProgressBar()
                    })
                    .catch((error) => {
                    console.log(error);
                    });
            },
            handleProgressBar(){
                let complete = 0;
                let target = 0;
                api.getTag(this.detail)
                .then((res) => {
                    res.data.data.check_lists[this.index].check_list_childs.forEach(
                        (li) => {
                        if (li.status == 1) {
                            complete += 1;
                        }
                        target += 1;
                        this.percenTage = Math.ceil((complete / target) * 100);
                        }
                    );
                    })
                .catch((err) => {
                console.log(err);
                });  
            },
            handleEditChild(checklist){
                if(this.editTitleChild == ''){
                    this.$notify.error({
                    title: 'Lỗi',
                    message: 'Vui lòng nhập công việc'
                    });
                    return false
                }else{
                    let data = new URLSearchParams()
                    data.append('id',checklist.id)
                    data.append('title',this.editTitleChild)
                    api.updateCheckListChild(data)
                    .then(() => {
                        this.editTitleChild = ""
                        this.editChild = ''
                        api.getTag(this.detail).then(res => {
                            this.handleDrawer(res.data.data);
                            this.getAll();
                            this.getLabels();
                        })
                        .catch(err => {
                        console.log(err);
                        });
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            
            },
            handleAddChild(checklist){
                if(this.dataListChild == ''){
                    this.$notify.error({
                    title: 'Lỗi',
                    message: 'Vui lòng nhập công việc'
                    });
                    return false
                }else{
                    let data = {
                    check_list_id:checklist.id,
                    title:this.dataListChild
                    }
                    api.addCheckListChild(data)
                    .then(() => {
                        this.dataListChild = ""
                        this.addChild = ''
                        api.getTag(this.detail).then(res => {
                            this.handleDrawer(res.data.data);
                            this.getAll();
                            this.getLabels();
                            this.handleProgressBar()
                        })
                        .catch(err => {
                            console.log(err);
                        });
                        })
                    .catch()
                }
            
            },
            removeCheckListChild(id){
                api.deleteCheckListChild(id)
                .then(() => {
                    api.getTag(this.detail).then(res => {
                        this.handleDrawer(res.data.data);
                        this.getAll();
                        this.getLabels();
                    })
                    this.handleProgressBar()
                    .catch(err => {
                    console.log(err);
                    });
                })
                .catch(err => {
                    console.log(err)
                })
            },
        },
        mounted() {
            this.handleProgressBar()
        },
    }
</script>

<style lang="scss" scoped>
    h3{
        margin: 0;
        font-size: 23px;
    }
    .inptitle{
        width: 70%;
        height: 30px;
        font-size: 22px;
        font-weight: bold;
        outline: none;
    }
    .checklist{
        display: flex;
        align-items: center;
        width: 100%;
        flex-wrap: wrap;
        .editCheck{
            width: 100%;
            font-family: Arial;
            .textListEdit{
                font-family: arial;
                font-size: 20px;
            }
            .btnEdit{
                margin-top: 10px;
            }
        }
        .titleCheck{
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        button{
            height: 40px;
        }
    }
    .bar{
        margin: 20px 0;
    }

    .checklistChild{
        width: 100%;
        .textListChildEdit{
            width:100%;
        }
    }
    .listChild{
        .contentChild{
            width:95%;
            margin:0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
            padding:10px;
            border-radius: 7px;
            .checkboxTitle{
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 100%;
                div{
                    display: flex;
                    align-items: center;
                }
                .checkBox{
                    display: inline-block;
                    width: 20px;
                    margin: 0;
                    height: 20px;
                }
                span{
                    display: inline-block;
                    margin-left:10px;
                    font-size:18px;
                    font-weight: bold;
                }
                del{
                    display: inline-block;
                    margin-left:10px;
                    font-size:18px;
                    font-weight: bold;
                }
            }
            .editChildForm{
                display: flex;
                align-items: center;
                width: 100%;
                flex-wrap: wrap;
                .titleListChildEdit{
                    margin-right: 10px;
                }
                
            }
            
        }
        
    }
</style>