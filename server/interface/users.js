/*
 * @Author: your name
 * @Date: 2019-10-29 09:18:08
 * @LastEditTime: 2019-10-30 09:10:24
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
//数据库删除ctx.query 查看传值
// router.get('/api/dusers',async(ctx,next)=>{
//   const result = await userModel.remove({_id:ctx.query})
//   consola.info(ctx.query)
//   consola.info('result',result)
//   ctx.body={
//     result : 'success',
//   }
// })
router.delete('/api/users/:id',async(ctx,next)=>{
  //params获取动态路由值
  const id = ctx.params.id
  const result = await userModel.remove({_id:id})
  consola.info(ctx.query)
  consola.info('result',result)
  ctx.body={
    result : 'success',
  }
})
//跟新接口
router.put('/api/users/:id',async(ctx,next)=>{
  const id = ctx.params.id
  let username = ctx.request.body.username
  let tel = ctx.request.body.tel
  consola.info(ctx.request.body)
 
  const result = await userModel.update({_id:id},{$set:{username:username,tel:tel}})
  // consola.info(ctx.query)
  consola.info('result',result)
  ctx.body={
    result : 'success',
  }
})
module.exports = router;


