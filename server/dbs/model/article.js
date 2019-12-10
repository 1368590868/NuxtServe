/*
 * @Author: your name
 * @Date: 2019-10-29 09:59:30
 * @LastEditTime: 2019-11-17 15:40:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt_demo2\server\dbs\model\user.js
 */
const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  title: {
    unique: true,
    type: String
  },
  author: {
    type: String,
    default: '冉林'
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

module.exports = mongoose.model('article', articleSchema, 'article')
