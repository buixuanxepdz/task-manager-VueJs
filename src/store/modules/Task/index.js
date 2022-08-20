export default {
  namespaced: true,
  state: {
     drawer:false
  },
  getters: {
    // Khai báo getters
  },
  mutations: {
    handleDrawer(state,data){
        state.drawer = data.drawer
        console.log(data.id)
    },
    closeDrawer(state){
        state.drawer = false
    }
  },
}