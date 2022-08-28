export default {
  namespaced: true,
  state: {
    avatar:''
  },
  getters: {
    // Khai báo getters
  },
  mutations: {
    handleAvatar(state,data){
      state.avatar =  data
    },
  },
}