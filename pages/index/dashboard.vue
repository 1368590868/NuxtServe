<!--
 * @Author: your name
 * @Date: 2019-10-29 08:45:42
 * @LastEditTime: 2019-10-29 08:46:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt_demo2\pages\index\index.vue
 -->
<template>
  <div><h1 v-for="(item,index) in db" :key="item.id">{{db[index].age}}{{db[index].username}}{{db[index].password}}</h1></div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {
      db:[]
    }
  },

  //  asyncData() {
  //     return axios.get(`/api/users`).then(res =>{
  //         console.log(res.data.data)
  //          return { db : res.data.data}
  //       })
  //  },
  methods:{
      getData(){
        return  axios.get(`/api/users`).then(res =>{
          console.log(res.data.data)
           {this.db = res.data.data}
        })
      }
  },
mounted(){
  this.getData()
},
};
</script>
<style scoped>
</style>