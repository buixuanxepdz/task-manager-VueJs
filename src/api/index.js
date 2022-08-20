import axios from 'axios'
import store from "../store";
import router from "../router";

const baseUrl = 'http://vuecourse.zent.edu.vn';

export const apiAxios = axios.create({
  baseURL:`${baseUrl}/api`,
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  }
})

apiAxios.interceptors.request.use(config => {
  let token = store.state.auth.accessToken
  if (token) {
    config.headers.common['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

apiAxios.interceptors.response.use(undefined, (error) => {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && router.currentRoute.name !== 'login') {
      store.commit('auth/updateStatusLogin', false)
      store.commit('auth/updateAccessToken', '')
      return router.push({name: 'login'})
    }
  }
  return Promise.reject(error);
})

export default {
    getDirectory(){
        return apiAxios({
            method: 'get',
            url: '/directories'
        })
    },
    addDirectory(){
        return apiAxios({
            method: 'post',
            url: '/directories'
        })
    },
    editDirectory(id){
        return apiAxios({
            method: 'post',
            url: `/directories/${id}`
        })
    },
    deleteDirectory(id){ 
        return apiAxios({
            method: 'delete',
            url: `/directories/${id}`
        })
    },
    indexDirectory(id){ 
        return apiAxios({
            method: 'put',
            url: `/directories/${id}/index`
        })
    },
    addTag(){ 
        return apiAxios({
            method: 'post',
            url: `/cards`
        })
    },
    editTag(id){ 
        return apiAxios({
            method: 'put',
            url: `/cards/${id}`
        })
    },
    deleteTag(id){ 
        return apiAxios({
            method: 'delete',
            url: `/cards/${id}`
        })
    },
    changeTag(id){ 
        return apiAxios({
            method: 'put',
            url: `/cards/${id}/directory`
        })
    },
    indexTag(id){ 
        return apiAxios({
            method: 'put',
            url: `/cards/${id}/index`
        })
    },
    getTag(id){ 
        return apiAxios({
            method: 'get',
            url: `/cards/${id}`
        })
    },
    uploadFileInTag(id){ 
        return apiAxios({
            method: 'post',
            url: `/cards/${id}/upload-file`
        })
    },
    changeStatusTag(id){ 
        return apiAxios({
            method: 'put',
            url: `/cards/${id}/change-status`
        })
    },
    changeDeadlineTag(id){ 
        return apiAxios({
            method: 'put',
            url: `/cards/${id}/change-status-deadline`
        })
    },
    attachLabelTag(id){ 
        return apiAxios({
            method: 'post',
            url: `/cards/${id}/attach-labels`
        })
    },
    deleteLabelTag(id){
        return apiAxios({
            method: 'delete',
            url: `/cards/${id}/detach-labels`
        })
    },
    addLabelTag(id){
        return apiAxios({
            method: 'delete',
            url: `/cards/${id}/label`
        })
    },
    getAuthUser () {
        return apiAxios({
        method: 'get',
        url: '/auth/me'
        })
    },
    login (data) {
        return apiAxios({
        method: 'post',
        url: '/auth/login',
        data: data
        })
    },
    logout() {
        return apiAxios({
        method: 'post',
        url: '/auth/logout',
        })
    },
    register(data) {
        return apiAxios({
        method: 'post',
        url: '/auth/register',
        data: data
        })
    },
    getListLabel(){
        return apiAxios({
        method: 'get',
        url: '/labels',
        })
    },
    updateLabel(id){
        return apiAxios({
        method: 'get',
        url: `/labels/${id}`,
        })
    },
    deleteLabel(id){
        return apiAxios({
        method: 'delete',
        url: `/labels/${id}`,
        })
    },
    updateNameFile(id){
        return apiAxios({
        method: 'put',
        url: `/files/${id}`,
        })
    },
    deleteFile(id){
        return apiAxios({
        method: 'delete',
        url: `/files/${id}`,
        })
    },
    getCheckList(){
        return apiAxios({
        method: 'get',
        url: `/check-lists`,
        })
    },
    updateCheckList(id){
        return apiAxios({
        method: 'put',
        url: `/check-lists/${id}`,
        })
    },
    deleteCheckList(id){
        return apiAxios({
        method: 'delete',
        url: `/check-lists/${id}`,
        })
    },
    addCheckListChild(){
        return apiAxios({
        method: 'post',
        url: `/check-list-childs`,
        })
    },
    updateCheckListChild(id){
        return apiAxios({
        method: 'put',
        url: `/check-list-childs/${id}`,
        })
    },
    deleteCheckListChild(id){
        return apiAxios({
        method: 'delete',
        url: `/check-list-childs/${id}`,
        })
    },
    updateStatusCheckListChild(id){
        return apiAxios({
        method: 'put',
        url: `/check-list-childs/${id}/change-status`,
        })
    },
    updateProfile(){
        return apiAxios({
        method: 'post',
        url: `/users`,
        })
    },
    updatePassword(){
        return apiAxios({
        method: 'put',
        url: `/users/password`,
        })
    },
}