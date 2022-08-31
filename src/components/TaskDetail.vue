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
                        <el-input placeholder="Tìm nhãn" v-model="searchLabel"></el-input>
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
                                    <i style="width: 100%;height: 100%;" @click="handleEditLabel(label),toggleEditLabel = label.id" class="fa-solid fa-pen" slot="reference"></i>  
                                </div>
                            </div>
                        </div>
                        <div style="width:100%;margin-top: 10px;">
                            <div v-if="toggleEditLabel == ''" style="width:100%;margin-top: 10px;display:flex;justify-content: space-between;flex-wrap: wrap;">
                                <el-input v-model="labelName" style="width:85%"></el-input>
                                <el-color-picker v-model="color" @change="selectColor"></el-color-picker>
                                <el-button type="primary" style="width: 100%;margin-top: 10px;" @click="createLabel()">Tạo mới nhãn</el-button>
                            </div>
                            <div v-else style="width:100%;margin-top: 10px;display:flex;justify-content: space-between;flex-wrap: wrap;">
                                <el-input v-model="editLabel.name" style="width:85%"></el-input>
                                <el-color-picker v-model="editLabel.color" @change="selectColor"></el-color-picker>
                                <el-button type="primary" style="width: 40%;margin-top: 10px;" @click="handleUpdateLabel(editLabel),toggleEditLabel = ''">Sửa nhãn</el-button>
                                <el-button type="danger" style="width: 40%;margin-top: 10px;margin-left: 0;" @click="removeLabel(editLabel),toggleEditLabel = ''">Xóa nhãn</el-button>
                            </div>
                            
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
                            placeholder="Chọn ngày giờ">
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
                            <el-input v-model="checkList" @keyup.enter.native="handleCheckList()"></el-input>
                            <el-button type="primary" @click="handleCheckList()" style="margin-top: 10px;width: 100%;">Thêm công việc</el-button>
                        </div>
                        <el-button slot="reference" type="success" style="width: 100%;height: 100%;" plain><i class="el-icon-s-claim" title="Việc cần làm"></i></el-button>
                    </el-popover>
                    
                </div>
                <el-popconfirm
                    icon="el-icon-info"
                    @confirm="removeTag(detail)"
                    icon-color="red"
                    title="Bạn chắc chắn muốn xóa thẻ này ?"
                >
                    <el-button type="danger" style="width: 82px;height: 45px;font-size: 18px;"
                    icon="el-icon-delete-solid" slot="reference" plain></el-button>
                </el-popconfirm>
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
                <el-button v-if="toggleDes == true" size="small" @click="toggleDes = false" style="margin-left: 10px;font-weight: bold;" plain>{{ !detail.description ? '+':'Sửa' }}</el-button>
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
                    <input type="checkbox" :checked="detail.status" @click="handleStatus" class="checkdead">
                    <div>
                        <i class="fa-regular fa-clock" style="margin-right: 5px;font-weight: bold;color: black;"></i>
                        <h4 style="display:inline-block;color: black;">{{ formatDate(detail.deadline) }}</h4>
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
            <div class="attach" v-show="detail.files != ''">
                <i class="el-icon-paperclip" style="margin-right: 10px;font-size:30px;font-weight: bold;"></i><h3>Đính kèm</h3>
                <div class="attach">
                    <div class="contentAttach" v-for="(file,index) in detail.files" :key="index">
                        <img v-if="file.path.includes('.jpg')||file.path.includes('.png')|| file.path.includes('.jpeg')" :src="`http://vuecourse.zent.edu.vn/storage/${file.path}`" alt="">
                        <img v-else src="../assets/images/file.png" alt="">
                        <div class="bao">
                            <div v-if="toggleName == file.id">
                                <el-input style="width: 100%;margin-bottom: 12px;" @keyup.enter.native="updateName(editName)" v-model="editName.name"></el-input>
                                <el-button type="primary" size="small" @click="updateName(editName)">Cập nhật</el-button>
                                <el-button style="margin-left: 10px;" size="small" @click="toggleName = ''">Hủy</el-button>
                            </div>
                            <div v-else>
                                <h4 :title="file.name">{{ formatName(file.name) }}</h4>
                                <el-button type="primary" icon="el-icon-edit" @click="handleEditName(file),toggleName = file.id" circle></el-button> 
                                 <el-popconfirm
                                    icon="el-icon-info"
                                    @confirm="removeFile(file.id)"
                                    icon-color="red"
                                    title="Bạn chắc chắn muốn tệp này ?"
                                    placement="right"
                                >
                                    <el-button style="margin-left: 10px;" type="danger"
                                    icon="el-icon-delete" slot="reference" circle></el-button>
                                </el-popconfirm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="todo" style="margin-bottom: 20px;" v-for="(checklist,index) in detail.check_lists" :key="checklist.id">
                <CheckListComponent :index="index" :checklist="checklist" />
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
import CheckListComponent from './CheckListComponent.vue';

    export default {
    name: "TaskDetail",
    props: ["element2"],
    data() {
        return {
            toggleEditLabel:'',
            searchLabel:'',
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
            toggleName: '',
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
            files:[],
            labels:[]
        };
    },
    watch:{
        searchLabel(){
            this.getLabels()
        }
    },
    computed: {
        ...mapState("task", ["drawer", "detail"]),
    },
    methods: {
        ...mapMutations("task", ["closeDrawer", "handleDrawer"]),
        ...mapMutations(["getAll"]),
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
        handleCheckList() {
            if (this.checkList == "") {
                this.$notify.error({
                    title: "Lỗi",
                    message: "Vui lòng nhập công việc"
                });
                return false;
            }
            else {
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
                deadline: moment(this.deadline).format("YYYY-MM-DD HH:mm:ss")
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
            if(this.editLabel.name == ''){
                 this.$notify.error({
                    title: "Lỗi",
                    message: "Vui lòng tên nhãn"
                });
                return false;
            }else{
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
            }
            
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
            if (this.labelName == "") {
                this.$notify.error({
                    title: "Lỗi",
                    message: "Vui lòng nhập tên nhãn"
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
            if(e.target.files[0].name.includes('.jpg') || e.target.files[0].name.includes('.jpeg') || e.target.files[0].name.includes('.png')
            || e.target.files[0].name.includes('.txt') || e.target.files[0].name.includes('.pdf') || e.target.files[0].name.includes('.doc')
            || e.target.files[0].name.includes('.docx') || e.target.files[0].name.includes('.xlsx') || e.target.files[0].name.includes('.xls')
            || e.target.files[0].name.includes('.mp4')){
            
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
                .catch(() => {
                });
            }else{
                 this.$notify.error({
                        title: "Lỗi",
                        message: "File phải đúng định dạng: jpg, jpeg, png, txt, pdf, doc, docx, xlsx, xls, video/mp4 ."
                    });
                return false
            }
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
                    title: "Lỗi",
                    message: "Vui lòng nhập tên file"
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
                        this.toggleName = ''
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
                        // this.getAll();
                    })
                        .catch(err => {
                        console.log(err);
                    });
                    this.getAll();
                }
            })
                .catch(err => {
                console.log(err);
            });
        },
    },
    mounted() {
        this.getLabels();
    },
    components: { CheckListComponent }
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
                height: 45px;
                line-height: 45px;
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
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                img{
                    width: 140px;
                    height: 100px;
                }
                .bao{
                    width: 80%;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    h4{
                        display: block;
                        width: 100%;
                        margin: 0;
                        margin-bottom: 12px;
                    }
                    div{
                        width: 100%;
                    }
                    button{
                        
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
                    background-color: #7ac2eb42;
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
            margin-top: 18px;
        }
    }
</style>