export default {
  namespaced: true,
  state: {
    directory:[],
    title:'',
    index:''
  },
  getters: {
    // Khai báo getters
  },
  mutations: {
    addList(state,data){
      if(data == ''){
          return 
      }else{
          state.directory.push(
              {
                  "id": Math.random(),
                  "title": data,
                  "user_id": 110,
                  "index": 1,
                  "status":true,
                  "created_at": "2022-08-03T11:14:27.000000Z",
                  "updated_at": "2022-08-03T11:14:27.000000Z",
                  "cards":[]
              }
          )
      }
    },
  },
}