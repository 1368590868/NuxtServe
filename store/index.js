import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    title: "",
    desc:"",
    content:"",
    imgUrl:""
  },
  mutations: {
    
  }
})

export default store