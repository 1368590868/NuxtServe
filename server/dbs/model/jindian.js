/*
 * @Author: your name
 * @Date: 2019-10-29 09:59:30
 * @LastEditTime: 2019-11-20 09:13:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt_demo2\server\dbs\model\user.js
 */
const mongoose = require('mongoose')

const jindianSchema = mongoose.Schema({
  title: {
    unique: true,
    type: String
  },
  author: {
    type: String,
    default: '匿名'
  },
  desc: {
    type: String
  },
  content: {
    type: String
  },
  logoLocalImageUrl: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  lastUpdateAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('jindian', jindianSchema, 'jindian')
