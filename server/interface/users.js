/*
 * @Author: your name
 * @Date: 2019-10-29 09:18:08
 * @LastEditTime: 2019-11-11 09:47:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt_demo2\server\interface\users.js
 */
var Router = require('koa-router');
const userModel = require('../dbs/model/user.js')
const consola = require('consola')
var router = new Router();

//传统  restful(get post put delete) graphql
router.get('/api/users', async (ctx, next) => {
  const result = await userModel.find({})
  consola.info('result', result)
  ctx.body = {
    result: 'success',
    data: result
  }

})

router.delete('/api/users/:id', async (ctx, next) => {
  const id = ctx.params.id
  // const result = await userModel.find({})
  const result = await userModel.remove({ _id: id })
  consola.info('result', result)
  ctx.body = {
    result: 'success'
  }

})

router.put('/api/users', async (ctx, next) => {
  // const result = await userModel.find({})
  consola.info('result', ctx.request.body)
  const userinfo = ctx.request.body
  const result = await userModel.updateOne({ _id: userinfo._id }, { $set: userinfo });
  // consola.info('result', result)
  ctx.body = {
    result: 'success'
  }

})

router.get('/api/users/page/:index', async (ctx, next) => {
  // 访问easymock提供的模拟数据
  // const res = await axios.get(
  //   'https://www.easy-mock.com/mock/5d5bcb688a9a76077dc8cd2a/mock/users/' +
  //     ctx.params.index +
  //     '?pagesize=' +
  //     ctx.query.pagesize
  // )
  const pageIndex = ctx.params.index
  const pageSize = ctx.query.pageSize
  // console.log('*******', pageIndex)
  // console.log('*******', pageSize)
  // 连接数据库，分页获取users的信息
  const result = await userModel.find({ })
    .skip((pageIndex - 1) * parseInt(pageSize))
    .limit(parseInt(pageSize))
    .exec()

  // console.log(result)

  ctx.body = {
    result: 'success',
    data: result
  }
})


module.exports = router;


