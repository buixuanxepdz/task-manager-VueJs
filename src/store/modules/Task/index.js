import api from "@/api"

export default {
  namespaced: true,
  state: {
    drawer:false,
    detail:{},
    labels:[],
    files:[],
    test:{}
  },
  getters: {
    // Khai báo getters
  },
  mutations: {
    getTest(state,data){
      state.test = data 
      console.log(state.test)
    },
    getFiles(state,data){
      state.files = data
      console.log(state.files)
    },
    handleDrawer(state,data){
        state.drawer = true
        state.detail = data
    },
    closeDrawer(state){
        state.drawer = false
    },
    getLabels(state){
        api.getListLabel()
        .then(res => {
            state.labels =  res.data.data
            state.labels.map((n) => {
              Object.assign(n,{popshow:false})
            })
          }
        )
        .catch(err => {
          console.log(err)
        })
    }
  },
}