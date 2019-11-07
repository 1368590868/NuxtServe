/*
 * @Author: your name
 * @Date: 2019-10-29 09:57:10
 * @LastEditTime: 2019-10-29 09:59:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt_demo2\server\dbs\init.js
 */
const path = require('path')
const mongoose = require('mongoose')
const db = 'mongodb://127.0.0.1:27017/traveldb'

module.exports = {
  connect() {
    mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true })
    mongoose.connection.on('disconnect', () => {
      console.log('***********数据库断开***********')
      // 重连
      mongoose.connect(db)
    })
    mongoose.connection.on('error', (error) => {
      console.log('***********数据库连接出错***********')
      console.log(error)
      // 重连
      mongoose.connect(db)
    })
    mongoose.connection.on('open', () => {
      console.log('***********mongodb数据库连接成功***********')
    })
  }
}



