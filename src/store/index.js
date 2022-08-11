import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    list1:[
            {
            "id": 1,
            "title": "group 1",
            "user_id": 110,
            "index": 1,
            "created_at": "2022-08-03T11:14:27.000000Z",
            "updated_at": "2022-08-03T11:14:27.000000Z",
            "status":true,
            "cards": [
                {
                "id": 822,
                "title": "task 1",
                "description": null,
                "status": null,
                "directory_id": 649,
                "index": 0,
                "deadline": null,
                "user_id": 110,
                "created_at": "2022-08-03T11:14:41.000000Z",
                "updated_at": "2022-08-03T11:14:43.000000Z",
                "labels": []
                },
                {
                "id": 823,
                "title": "task 2",
                "description": null,
                "status": null,
                "directory_id": 649,
                "index": 1,
                "deadline": null,
                "user_id": 110,
                "created_at": "2022-08-03T12:22:35.000000Z",
                "updated_at": "2022-08-03T12:22:35.000000Z",
                "labels": []
                },
                {
                "id": 824,
                "title": "task 3",
                "description": null,
                "status": null,
                "directory_id": 649,
                "index": 2,
                "deadline": null,
                "user_id": 110,
                "created_at": "2022-08-03T12:22:37.000000Z",
                "updated_at": "2022-08-03T12:22:37.000000Z",
                "labels": []
                },
                {
                "id": 825,
                "title": "task 4",
                "description": null,
                "status": null,
                "directory_id": 649,
                "index": 3,
                "deadline": null,
                "user_id": 110,
                "created_at": "2022-08-03T12:22:39.000000Z",
                "updated_at": "2022-08-03T12:22:39.000000Z",
                "labels": []
                }
            ]
            },
            {
            "id": 2,
            "title": "group 2",
            "user_id": 110,
            "index": 1,
            "created_at": "2022-08-03T11:14:29.000000Z",
            "updated_at": "2022-08-03T11:14:29.000000Z",
            "status":true,
            "cards": [
                {
                "id": 821,
                "title": "task 5",
                "description": null,
                "status": null,
                "directory_id": 650,
                "index": 0,
                "deadline": null,
                "user_id": 110,
                "created_at": "2022-08-03T11:14:39.000000Z",
                "updated_at": "2022-08-03T11:14:43.000000Z",
                "labels": []
                },
                {
                "id": 826,
                "title": "task 6",
                "description": null,
                "status": null,
                "directory_id": 650,
                "index": 1,
                "deadline": null,
                "user_id": 110,
                "created_at": "2022-08-03T12:22:43.000000Z",
                "updated_at": "2022-08-03T12:22:43.000000Z",
                "labels": []
                },
                {
                "id": 827,
                "title": "task 7",
                "description": null,
                "status": null,
                "directory_id": 650,
                "index": 2,
                "deadline": null,
                "user_id": 110,
                "created_at": "2022-08-03T12:22:45.000000Z",
                "updated_at": "2022-08-03T12:22:45.000000Z",
                "labels": []
                },
                {
                "id": 828,
                "title": "task 8",
                "description": null,
                "status": null,
                "directory_id": 650,
                "index": 3,
                "deadline": null,
                "user_id": 110,
                "created_at": "2022-08-03T12:22:47.000000Z",
                "updated_at": "2022-08-03T12:22:47.000000Z",
                "labels": []
                }
            ]
            }
          ],
  },
  mutations: {
    addList(state,data){
      if(data == ''){
          return 
      }else{
          state.list1.push(
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
    addTag(state,data){
        state.list1.find((list,index) => {
          if(list.id == data.id){
              state.list1[index].cards.push({
                 "id": Math.random(),
                "title": data.tag,
                "description": null,
                "status": null,
                "directory_id": 650,
                "index": 0,
                "deadline": null,
                "user_id": 110,
                "created_at": "2022-08-03T11:14:39.000000Z",
                "updated_at": "2022-08-03T11:14:43.000000Z",
                "labels": []
              })
          }
        })
    }
  },
  modules:{
    auth
  }
})

export default store