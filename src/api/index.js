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
    addDirectory(data){
        return apiAxios({
            method: 'post',
            url: '/directories',
            data
        })
    },
    editDirectory(data){
        return apiAxios({
            method: 'put',
            url: `/directories/${data.get('id')}`,
            data
        })
    },
    deleteDirectory(id){ 
        return apiAxios({
            method: 'delete',
            url: `/directories/${id}`
        })
    },
    indexDirectory(data){ 
        return apiAxios({
            method: 'put',
            url: `/directories/${data.id}/index`,
            data
        })
    },
    addTag(data){ 
        return apiAxios({
            method: 'post',
            url: `/cards`,
            data
        })
    },
    editTag(data){ 
        return apiAxios({
            method: 'put',
            url: `/cards/${data.id}`,
            data
        })
    },
    deleteTag(id){ 
        return apiAxios({
            method: 'delete',
            url: `/cards/${id}`
        })
    },
    changeTag(data){ 
        return apiAxios({
            method: 'put',
            url: `/cards/${data.id}/directory`,
            data
        })
    },
    indexTag(data){ 
        return apiAxios({
            method: 'put',
            url: `/cards/${data.id}/index`,
            data
        })
    },
    getTag(data){ 
        return apiAxios({
            method: 'get',
            url: `/cards/${data.id}`,
        })
    },
    uploadFileInTag(data){ 
        return apiAxios({
            method: 'post',
            url: `/cards/${data.get('id')}/upload-file`,
            data
        })
    },
    changeStatusTag(id,data){ 
        return apiAxios({
            method: 'put',
            url: `/cards/${id}/change-status`,
            data
        })
    },
    changeDeadlineTag(data,id){ 
        return apiAxios({
            method: 'put',
            url: `/cards/${id}/change-status-deadline`,
            data
        })
    },
    attachLabelTag(data){ 
        return apiAxios({
            method: 'post',
            url: `/cards/${data.get('id')}/attach-labels`,
            data
        })
    },
    deleteLabelTag(data){
        return apiAxios({
            method: 'delete',
            url: `/cards/${data.get('id')}/detach-labels`,
            data
        })
    },
    addLabelTag(data){
        return apiAxios({
            method: 'post',
            url: `/cards/${data.id}/label`,
            data
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
    updateLabel(data){
        return apiAxios({
            method: 'put',
            url: `/labels/${data.get('id')}`,
            data
        })
    },
    deleteLabel(data){
        return apiAxios({
        method: 'delete',
        url: `/labels/${data.id}`,
        })
    },
    updateNameFile(data){
        return apiAxios({
        method: 'put',
        url: `/files/${data.get('id')}`,
        data
        })
    },
    deleteFile(id){
        return apiAxios({
            method: 'delete',
            url: `/files/${id}`,
        })
    },
    addCheckList(data){
        return apiAxios({
        method: 'post',
        url: `/check-lists`,
        data
        })
    },
    updateCheckList(data){
        return apiAxios({
        method: 'put',
        url: `/check-lists/${data.get('id')}`,
        data
        })
    },
    deleteCheckList(id){
        return apiAxios({
        method: 'delete',
        url: `/check-lists/${id}`,
        })
    },
    addCheckListChild(data){
        return apiAxios({
        method: 'post',
        url: `/check-list-childs`,
        data
        })
    },
    updateCheckListChild(data){
        return apiAxios({
        method: 'put',
        url: `/check-list-childs/${data.get('id')}`,
        data
        })
    },
    deleteCheckListChild(id){
        return apiAxios({
        method: 'delete',
        url: `/check-list-childs/${id}`,
        })
    },
    updateStatusCheckListChild(id,data){
        return apiAxios({
        method: 'put',
        url: `/check-list-childs/${id}/change-status`,
        data
        })
    },
    updateProfile(data){
        return apiAxios({
            method: 'post',
            url: `/users`,
            data
        })
    },
    updatePassword(data){
        return apiAxios({
            method: 'put',
            url: `/users/password`,
            data
        })
    },
}