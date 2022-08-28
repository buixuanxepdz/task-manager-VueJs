<template>
    <div>
       <el-drawer
        title="I am the title"
        :visible.sync="drawer"
        :with-header="false"
        :before-close="changeDrawer"
        size="50%">
        <div class="head">
            <div class="left">
            </div>
            <div class="right"> 
                <div>
                    <el-popover
                        placement="bottom"
                        width="300"
                        trigger="click" >
                        <div style="width:100%;max-height:200px;overflow-y: scroll;" class="container-label">
                            <div v-for="(label,index) in labels" :key="index" style="display:flex;align-items: center;">
                                <div @click="handleAttachLabel(label)" :style="`cursor:pointer;width:80%;margin-top:10px;color:white;font-size:16px;font-weight:bold;background-color:${label.color};border-radius:5px;padding:5px;font-family:arial`"> 
                                    {{ label.name }}
                                    <i style="float:right" class="fa-solid fa-check"
                                        v-for="(lb,index) in detail.labels"
                                        :key="index"
                                        v-show="label.id == lb.id"
                                    ></i>
                                </div>          
                                <div style="width: 18%;height: 33px;margin: 9px 0 0 5px;background-color: green;color:white;border-radius: 5px;line-height: 33px;text-align: center;cursor: pointer;">
                                    <el-popover
                                        placement="top-start"
                                        width="250"
                                        trigger="click"
                                        v-model="label.popshow"
                                        after-leave
                                        ref="pop">
                                        <div style="width:100%;margin-top: 10px;display:flex;justify-content: space-between;flex-wrap: wrap;">
                                            <el-input v-model="editLabel.name" style="width:80%"></el-input> <el-color-picker v-model="editLabel.color" @change="selectColor"></el-color-picker>
                                            <el-button type="primary" style="width: 40%;margin-top: 10px;" @click="handleUpdateLabel(label),$refs.pop.doClose">Cập nhật</el-button>
                                            <el-button type="danger" style="width: 40%;margin-top: 10px;margin-left: 0;" @click="removeLabel(label),$refs.pop.doClose">Xóa nhãn</el-button>
                                        </div>
                                        <i style="width: 100%;height: 100%;" @click="handleEditLabel(label)" class="fa-solid fa-pen" slot="reference"></i>  
                                    </el-popover>
                                </div>
                            </div>
                        </div>
                        <div style="width:100%;margin-top: 10px;display:flex;justify-content: space-between;flex-wrap: wrap;">
                            <el-input v-model="labelName" style="width:85%"></el-input> <el-color-picker v-model="color" @change="selectColor"></el-color-picker>
                            <el-button type="primary" style="width: 100%;margin-top: 10px;" @click="createLabel()">Tạo mới nhãn</el-button>
                        </div>
                        <el-button style="width: 100%;height: 100%;" slot="reference" type="warning" plain><i class="fa-solid fa-tags"></i></el-button>
                    </el-popover>
                </div>
                <div @click="attachFile()">
                    <i class="fa-solid fa-paperclip" title="Đính kèm"></i>
                    <input ref="file" v-show="false" @change="handleFile" type="file">
                </div>
                <div>
                    <el-popover
                        placement="bottom"
                        width="280"
                        trigger="click" >
                         <div class="block">
                            <el-date-picker
                            v-model="deadline"
                            type="datetime"
                            style="width: 100%;"
                            @change="handleDealine"
                            placeholder="Select date and time">
                            </el-date-picker>
                        </div>
                        <el-button style="width: 100%;height: 100%;" type="primary" slot="reference" plain><i class="fa-regular fa-clock" title="Ngày"></i></el-button>
                    </el-popover>
                </div>
                <div>
                    <el-popover
                        placement="bottom"
                        width="200"
                        trigger="click">
                        <div>
                            <el-input v-model="checkList"></el-input>
                            <el-button type="primary" @click="handleCheckList()" style="margin-top: 10px;width: 100%;">Thêm công việc</el-button>
                        </div>
                        <el-button slot="reference" type="success" style="width: 100%;height: 100%;" plain><i class="el-icon-s-claim" title="Việc cần làm"></i></el-button>
                    </el-popover>
                    
                </div>
                <!-- <div><i class="fa-solid fa-trash-can"></i> -->
                    <el-popconfirm
                        icon="el-icon-info"
                        @confirm="removeTag(detail)"
                        icon-color="red"
                        title="Bạn chắc chắn muốn xóa thẻ này ?"
                    >
                    <el-button type="danger" style="width: 82px;height: 42px;font-size: 18px;"
                     icon="el-icon-delete-solid" slot="reference" plain></el-button>
                    </el-popconfirm>
                <!-- </div> -->
            </div>
        </div>
        <div class="detail">
            <div style="display:flex;align-items: center; margin-bottom: 15px;" class="titleTo">
                <i class="el-icon-bank-card"></i>
                <div>
                    <h3 @click="toggleTitle = false,data.title = detail.title" v-if="toggleTitle == true">{{ detail.title }}</h3>
                    <input v-else type="text" @blur="closeTitle" v-model="data.title" @keyup.enter="updateTitle(detail)">
                   
                </div>
               
            </div>
            <div style="margin-left: 20px;">
                <span class="label" v-for="(label,index) in detail.labels" :key="index">
                    <span :style="`background-color:${label.color}`">
                        {{ label.name }}
                    </span>
                </span>
            </div>
            
            <div class="description">
                <i class="fa-solid fa-bars"></i>
                <h3>Mô tả</h3>
                <el-button v-if="toggleDes == true" @click="toggleDes = false" style="margin-left: 10px;font-weight: bold;" plain>{{ !detail.description ? '+':'Sửa' }}</el-button>
                <span style="margin-left: 20px;font-size: 18px;display: block;font-weight: bold;" v-if="toggleDes == true" @click="toggleDes = false">{{ detail.description }}</span>
                <div v-else>
                    <textarea placeholder="Thêm mô tả" name="" id="" v-model="detail.description"></textarea>
                    <div class="btn">
                        <el-button type="primary" @click="updateDescription(detail)">Lưu</el-button>
                        <el-button @click="toggleDes = true">Hủy</el-button>
                    </div>
                </div>
            </div>
            <div class="deadline" v-if="detail.deadline">
                <i style="margin-right:10px;font-size:30px" class="fa-regular fa-clock"></i><h3>Ngày hết hạn</h3>
                <div class="child-dead">
                    <input type="checkbox" v-if="detail.status === 1" checked @click="handleStatus" class="checkdead">
                    <input type="checkbox" v-else @click="handleStatus" class="checkdead">
                    <div>
                        <i class="fa-regular fa-clock" style="margin-right: 5px;font-weight: bold;"></i>
                        <h4 style="display:inline-block">{{ formatDate(detail.deadline) }}</h4>
                        <span v-if="this.detail.status == 1" style="background-color:green;color:white">
                            Hoàn tất
                        </span> 
                        <span v-if="this.detail.deadline <= formatDate(new Date()) && this.detail.status == 0" style="background-color:red;color:white">
                            Quá hạn
                        </span> 
                        <span v-else-if="this.detail.deadline <= formatDate(new Date().setDate(new Date().getDate() + 1)) && this.detail.status == 0" style="background-color:orange;color:white">
                            Gần hết hạn
                        </span> 
                    </div>
                </div>
            </div>
            <div class="attach">
                <i class="el-icon-paperclip" style="margin-right: 10px;font-size:30px;font-weight: bold;"></i><h3>Đính kèm</h3>
                <div class="attach">
                    <div class="contentAttach" v-for="(file,index) in detail.files" :key="index">
                        <img :src="`http://vuecourse.zent.edu.vn/storage/${file.path}`" alt="">
                        <div>
                            <h4>{{ formatName(file.name) }}</h4>
                            <el-popover
                                placement="top"
                                width="400"
                                trigger="click">
                                <el-input style="width: 300px;" size="small" v-model="editName.name"></el-input><el-button style="margin-left: 10px;" type="primary" size="small" @click="updateName(editName)">Cập nhật</el-button>   
                                <el-button type="primary"  slot="reference" icon="el-icon-edit" @click="handleEditName(file)" circle></el-button>   
                            </el-popover>
                            <el-button type="danger" icon="el-icon-delete" @click="removeFile(file.id)" circle></el-button>                         
                        </div>
                    </div>
                </div>
            </div>
            <div class="todo" style="margin-bottom: 20px;" v-for="(checklist,indexcheck) in detail.check_lists" :key="checklist.id">
                <div class="checklist" v-if="checklist.id == toggleCheckList">
                    <div class="editCheck">
                        <el-input class="textListEdit"
                        type="textarea"
                        placeholder="Nhập công việc"
                        v-model="editCheckList"
                        style="width: 100%;"
                        @keyup.enter="handleEditCheckList(checklist)"
                        @blur="handleEditCheckList(checklist)"
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
                <el-progress class="bar" :percentage="percenTage"></el-progress>
                <div class="listChild" v-for="(listChild) in checklist.check_list_childs" :key="listChild.id">
                    <div class="contentChild">
                        <div class="editChildForm" v-if="editChild == listChild.id">
                            <el-input class="titleListChildEdit"
                                type="textarea"
                                placeholder="Nhập công việc con"
                                v-model="editTitleChild"
                                style="width: 100%;"
                                >
                                </el-input>
                            <el-button type="primary" size="small" @click="handleEditChild(listChild)" style="margin-top: 10px;">Lưu</el-button>  
                            <el-button type="text" size="small" icon="el-icon-close" @click="editChild = '',editTitleChild=''" ></el-button>  
                        </div>
                        <div v-else class="checkboxTitle">
                            <div>
                                <input v-if="listChild.status === 1" checked @click="handleChangeStatusChild(listChild),handleProgressBar(indexcheck)" class="checkBox" type="checkbox" name="" id="">
                                <input v-else @click="handleChangeStatusChild(listChild),handleProgressBar(indexcheck)" class="checkBox" type="checkbox" name="" id="">
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
                        type="textarea"
                        placeholder="Nhập công việc con"
                        v-model="dataListChild"
                        style="width: 100%;"
                        >
                        </el-input>
                    <el-button type="primary" size="small" @click="handleAddChild(checklist)" style="margin-top: 10px;">Thêm</el-button>  
                    <el-button type="text" size="small" icon="el-icon-close" @click="addChild = ''" ></el-button>  
                </div>
                <el-button type="primary" size="small" v-else @click="addChild = checklist.id">Thêm một mục</el-button>
                
            </div>
        </div>
    </el-drawer>
    </div>
</template>

<script>
// import api from '@/api';
import api from '@/api';
import { mapMutations, mapState } from 'vuex';
import moment from 'moment';

    export default {
    name: "TaskDetail",
    props: ["element2"],
    data() {
        return {
            editTitleChild:'',
            editChild:'',
            dataListChild:'',
            toggleCheckList:'',
            addChild:'',
            percenTage: 0,
            editCheckList:'',
            checkList: "Việc cần làm",
            deadline: "",
            toggleTitle: true,
            toggleDes: true,
            data: {
                id: "",
                title: "",
            },
            description: "",
            attach: {
                file: "",
                fileName: ""
            },
            toggleName: true,
            name: "",
            editName: {
                id: "",
                name: ""
            },
            visible: false,
            color: "#409EFF",
            labelName: "",
            editLabel: {
                id: "",
                name: "",
                color: ""
            },
        };
    },
    computed: {
        ...mapState("task", ["drawer", "detail", "labels"]),
    },
    methods: {
        ...mapMutations("task", ["closeDrawer", "handleDrawer", "getLabels"]),
        ...mapMutations(["getAll"]),
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
                api.getTag(this.detail).then(res => {
                        this.handleDrawer(res.data.data);
                        this.getAll();
                        this.getLabels();
                    })
                // this.handleProgressBar()
                })
                .catch((error) => {
                console.log(error);
                });
        },
        // handleProgressBar(index){
        //     let complete = 0;
        //     let target = 0;
        //     api.getTag(this.detail)
        //     .then((res) => {
        //         res.data.data.check_lists[index].check_list_childs.forEach(
        //             (li) => {
        //             if (li.status == 0) {
        //                 complete += 1;
        //             }
        //             target += 1;
        //             this.percenTage = Math.ceil((complete / target) * 100);
        //             }
        //         );
        //         })
        //     .catch((err) => {
        //     console.log(err);
        //     });  
        // },
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
                    .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err)
            })
        },
        removeCheckList(id){
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
                console.log(err)
            })
        },
        handleEditCheckList(checklist){
                let data = new URLSearchParams()
                data.append('id',checklist.id)
                data.append('title',this.editCheckList)
                api.updateCheckList(data)
                .then(() => {
                    this.editCheckList = ""
                    this.toggleCheckList = ''
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
            },
        handleCheckList() {
            if(this.checkList == ''){
                this.$notify.error({
                title: 'Lỗi',
                message: 'Vui lòng nhập công việc'
                });
                return false
            }else{
                 let data = {
                    card_id: this.detail.id,
                    title: this.checkList
                };
                api.addCheckList(data)
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
                .catch();
            }
           
        },
        handleStatus() {
            let stt = {
                status: 0
            };
            let stt2 = {
                status: 1
            };
            if (this.detail.status == 1) {
                api.changeStatusTag(this.detail.id, stt)
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
                    .catch();
            }
            else {
                api.changeStatusTag(this.detail.id, stt2)
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
                    .catch();
            }
        },
        formatDate(date) {
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        handleDealine() {
            let stt = {
                status: 0
            };
            let data = {
                deadline: moment(this.deadline).format("Y-M-D H:m:s")
            };
            api.changeDeadlineTag(data, this.detail.id)
                .then(res => {
                    if (res.status == 200) {
                        api.getTag(this.detail).then(res => {
                            this.handleDrawer(res.data.data);
                            this.getAll();
                            this.getLabels();
                            this.deadline = "";
                        })
                            .catch(err => {
                            console.log(err);
                        });
                        api.changeStatusTag(this.detail.id, stt)
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
                        .catch();
                    }
                })
                .catch(err => {
                console.log(err);
            });
        },
        selectColor(e) {
            this.color = e;
        },
        removeAttachLabel() {
            console.log("remove");
        },
        handleAttachLabel(label) {
            let a;
            for (let index = 0; index < this.detail.labels.length; index++) {
                if (this.detail.labels[index].id == label.id) {
                    a = this.detail.labels[index].id;
                }
            }
            if (!a) {
                    let data = new URLSearchParams();
                    data.append("id", this.detail.id);
                    data.append("label_id", label.id);
                    api.attachLabelTag(data)
                        .then(res => {
                        if (res.status == 200) {
                            api.getTag(this.detail).then(res => {
                                this.handleDrawer(res.data.data);
                                this.getAll();
                                this.getLabels();
                            })
                                .catch(err => {
                                console.log(err);
                            });
                        }
                    })
                        .catch(err => {
                        console.log(err);
                    });
            }
            else {
                let data = new URLSearchParams();
                data.append("id", this.detail.id);
                data.append("label_id", label.id);
                api.deleteLabelTag(data)
                    .then(res => {
                    if (res.status == 200) {
                        api.getTag(this.detail).then(res => {
                            this.handleDrawer(res.data.data);
                            this.getAll();
                            this.getLabels();
                        })
                            .catch(err => {
                            console.log(err);
                        });
                    }
                })
                    .catch(err => {
                    console.log(err);
                });
            }
        },
        handleEditLabel(label) {
            this.editLabel = {
                id: label.id,
                name: label.name,
                color: label.color
            };
        },
        handleUpdateLabel(label) {
            let data = new URLSearchParams();
            data.append("id", label.id);
            data.append("name", this.editLabel.name);
            if (this.editLabel.color) {
                data.append("color", this.editLabel.color);
            }
            api.updateLabel(data)
                .then(res => {
                if (res.status == 200) {
                    api.getTag(this.detail).then(res => {
                        this.handleDrawer(res.data.data);
                        this.getAll();
                        this.getLabels();
                    })
                        .catch(err => {
                        console.log(err);
                    });
                    label.popshow = false;
                }
            })
                .catch(err => {
                console.log(err);
            });
        },
        removeLabel(label) {
            api.deleteLabel(label)
                .then(res => {
                if (res.status == 200) {
                    api.getTag(this.detail).then(res => {
                        this.handleDrawer(res.data.data);
                        this.getAll();
                        this.getLabels();
                    })
                        .catch(err => {
                        console.log(err);
                    });
                    label.popshow = false;
                }
            })
                .catch(err => {
                console.log(err);
            });
        },
        createLabel() {
            if (this.labelName == '') {
                this.$notify.error({
                    title: 'Lỗi',
                    message: 'Vui lòng nhập tên nhãn'
                    });
                return false;
            }
            else {
                let data = {
                    id: this.detail.id,
                    name: this.labelName,
                    color: this.color,
                };
                api.addLabelTag(data)
                    .then(res => {
                    if (res.status == 200) {
                        api.getTag(this.detail).then(res => {
                            this.handleDrawer(res.data.data);
                            this.getAll();
                            this.getLabels();
                        })
                            .catch(err => {
                            console.log(err);
                        });
                        this.labelName = "";
                    }
                })
                    .catch(err => {
                    console.log(err);
                });
            }
        },
        changeDrawer() {
            this.closeDrawer();
            document.title = "Trang chủ";
        },
        closeTitle() {
            this.toggleTitle = true;
        },
        updateTitle(detail) {
            this.data = {
                id: detail.id,
                title: this.data.title,
            };
            api.editTag(this.data)
                .then(res => {
                if (res.status == 200) {
                    this.toggleTitle = true;
                    detail.title = this.data.title;
                    this.getAll();
                }
            })
                .catch(err => {
                console.log(err);
            });
        },
        updateDescription(detail) {
            let data = {
                id: detail.id,
                description: detail.description,
            };
            api.editTag(data)
                .then(res => {
                if (res.status == 200) {
                    this.toggleDes = true;
                    this.getAll();
                }
            })
                .catch(err => {
                console.log(err);
            });
        },
        removeTag(detail) {
            api.deleteTag(detail.id)
                .then(res => {
                if (res.status == 200) {
                    this.getAll();
                    this.closeDrawer();
                }
            })
                .catch(err => {
                console.log(err);
            });
        },
        attachFile() {
            this.$refs.file.click();
        },
        handleFile(e) {
            this.attach.file = e.target.files[0];
            this.attach.fileName = e.target.files[0].name;
            let data = new FormData();
            data.append("id", this.detail.id);
            data.append("file", this.attach.file);
            data.append("name", this.attach.fileName);
            api.uploadFileInTag(data)
                .then(res => {
                if (res.status == 200) {
                    api.getTag(this.detail).then(res => {
                        this.handleDrawer(res.data.data);
                        this.getAll();
                    })
                        .catch(err => {
                        console.log(err);
                    });
                }
            })
                .catch(err => {
                console.log(err);
            });
        },
        formatName(name) {
            if (name.length > 20) {
                return name.slice(0, 25) + "...";
            }
            else {
                return name;
            }
        },
        handleEditName(file) {
            this.editName = {
                id: file.id,
                name: file.name
            };
        },
        updateName(file) {
            if (file.name == "") {
                this.$notify.error({
                    title: 'Lỗi',
                    message: 'Vui lòng nhập tên file'
                });
                return false;
            }
            else {
                let data = new URLSearchParams();
                data.append("id", file.id);
                data.append("name", file.name);
                api.updateNameFile(data)
                    .then(res => {
                    if (res.status == 200) {
                        api.getTag(this.detail).then(res => {
                            this.handleDrawer(res.data.data);
                            this.getAll();
                        })
                            .catch(err => {
                            console.log(err);
                        });
                    }
                })
                    .catch(err => {
                    console.log(err);
                });
            }
        },
        removeFile(id) {
            api.deleteFile(id)
                .then(res => {
                if (res.status == 200) {
                    api.getTag(this.detail).then(res => {
                        this.handleDrawer(res.data.data);
                        this.getAll();
                    })
                        .catch(err => {
                        console.log(err);
                    });
                }
            })
                .catch(err => {
                console.log(err);
            });
        },
    },
    mounted() {
        this.getLabels();
        // this.handleProgressBar()
    },
}
</script>

<style lang="scss" scoped>
    .head{
        display: flex;
        width: 100%;
        margin: 20px 0;
        justify-content: space-between;
        .left{
            width: 38%;
        }
        .right{
            width: 60%;
            display: flex;
            justify-content: space-evenly;
            div{
                width: 80px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                border-radius: 7px;
                i{
                    font-size:20px;
                    font-weight: bold;
                }
            }
            div:nth-child(1){
                border: 1px solid orange;
                color:orange
            }
            div:nth-child(2){
                border: 1px solid rgb(9, 46, 147);
                color:rgb(9, 46, 147)
            }
            div:nth-child(2):hover{
                background-color:rgb(9, 46, 147);
                color:white;
                cursor: pointer;
                transition: 0.3s;
            }
            div:nth-child(3){
                border: 1px solid rgb(120, 8, 113);
                color:rgb(120, 8, 113)
            }
            div:nth-child(4){
                border: 1px solid rgb(17, 237, 87);
                color:rgb(17, 237, 87)
            }
            div:nth-child(5){
                border: 1px solid rgb(250, 70, 70);
                color:rgb(250, 70, 70)
            }
        }
    }
    .detail{
        width: 95%;
        margin: 0 auto;
        margin-top: 20px;
        .titleTo{
            i{
                font-size: 30px;
                font-weight: bold;
                margin-right: 10px;
            }
            h3{
            font-size: 23px;
            margin: 0;
            }
            input{
                width: 100%;
                outline: none;
                border: 2px solid  #0079bf;
                font-size: 23px;
                font-weight: bold;
                height: 35px;
            }
        }
       
        // input:focus{
        //     border: 2px solid #0079bf;
        // }
         .label{
            display: inline-block;
            margin:10px 0;
            span{
                width: max-content;
                font-size: 15px;
                margin: 15px 0; 
                padding: 3px 5px;
                border-radius: 4px;
                color: white;
                font-weight: bold;
                margin-right: 7px;
            }
        }
        .description{
            width: 100%;
            i{
                font-size: 25px;
                margin-right: 10px;
            }
            h3{
                font-size: 23px;
                display: inline-block;
            }
            textarea{
                width: 98%;
                height: 60px;
                outline: none;
                border: 2px transparent;
                background-color: rgb(229, 237, 247);
                font-size: 17px;
                padding: 10px;
                border-radius: 4px;
            }
            textarea:focus{
                border: 2px solid #0079bf;
            }
        }
        .attach{
            width: 100%;
             margin: 20px 0;
            h3{
                font-size: 23px;
                margin: 0;
                display: inline-block;
            }
            .contentAttach{
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                img{
                    width: 140px;
                }
                div{
                    width: 80%;
                    display: flex;
                    align-items: center;
                    h4{
                        display: inline-block;
                    }
                    button{
                        margin-left: 10px;
                    }
                    
                }
            }
        }
        .deadline{
            h3{
                display: inline-block;
                font-size: 23px;
            }
            .child-dead{
                margin-left: 20px;
                .checkdead{
                    width: 30px;
                    height: 26px;
                }
                display: flex;
                align-items: center;
                div{
                    display: flex;
                    align-items: center;
                    background-color: #4c91b9;
                    padding: 10px;
                    border-radius: 8px;
                    height: max-content;
                    color: white;
                    h4{
                        margin:0
                    }
                    span{
                        margin-left: 8px;
                        font-weight: bold;
                        padding: 5px;
                        border-radius: 5px;
                    }
                }
            }
        }
        .todo{
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
        }
    }
</style>