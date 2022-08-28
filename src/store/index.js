import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import task from './modules/Task'
import user from './modules/user'
import directory from './modules/directory'
import createPersistedState from "vuex-persistedstate";
import api from '@/api'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      directories:[]
  },
  mutations: {
      getAll(state){
        api.getDirectory()
        .then(res => {
          res.data.data.map((n) => {
              Object.assign(n,{status:true})
          })
          state.directories = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
      },
      toggleAddTag(state,id){
        state.directories.map((direc,index) => {
            if(direc.id == id){
                state.directories[index].status = false
            }else{
                state.directories[index].status = true
            }
        })
      }
  },
  modules:{
    auth,
    task,
    user,
    directory
  },
  plugins: [createPersistedState({ paths: ['auth'] })]
})

export default store