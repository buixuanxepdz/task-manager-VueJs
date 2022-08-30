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
        .then(async(res) => {
          // res.data.data.map((n) => {
          //     Object.assign(n,{status:true})
          // })
          // state.directories = res.data.data
          let result = res.data.data;
          for (const data of result) {
            Object.assign(data, {status: true});
            await Promise.all(data.cards.map(async (value) => {
              await api.getTag(value)
                .then((res) => {
                  Object.assign(value, {files: res.data.data.files, check_lists: res.data.data.check_lists});
                })
            }))
          }
          state.directories = result;
          // console.log(state.directories)
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