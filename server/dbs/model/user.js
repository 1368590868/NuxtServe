/*
 * @Author: your name
 * @Date: 2019-10-29 09:59:30
 * @LastEditTime: 2019-10-29 10:00:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \nuxt_demo2\server\dbs\model\user.js
 */
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    unique: true,
    type: String
  },
  password: {
    type: String,
    default: '123456'
  },
  age: {
    type: Number,
    min: 1,
    max: 150
  },
  sex: {
    type: String,
    enum: ['male', 'female'],
    default: 'male'
  },
  tel: {
    type: String,
    default: '000000000'
  },
  email: {
    type: String,
    default: 'xxx@xxx.com'
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('users', userSchema, 'users')
