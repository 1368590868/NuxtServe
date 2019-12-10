/*
 * @Author: your name
 * @Date: 2019-11-12 08:44:40
 * @LastEditTime: 2019-11-20 09:15:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt_demo2\server\interface\article.js
 */
var Router = require('koa-router');
const upload = require('../tools/upload.js')
const jindianModel = require('../dbs/model/jindian.js')
const consola = require('consola')
var router = new Router();

router.get('/api/jindian', async (ctx, next) => {
  const result = await jindianModel.find({})
  consola.info('result', result)
  ctx.body = {
    result: 'success',
    data: result
  }

})
router.get('/api/jindian/page/:index', async (ctx, next) => {
  const pageIndex = ctx.params.index
  const pageSize = ctx.query.pageSize
  // console.log('*******', pageIndex)
  // console.log('*******', pageSize)
  // 连接数据库，分页获取article的信息
  const result = await jindianModel.find({})
    .skip((pageIndex - 1) * parseInt(pageSize))
    .limit(parseInt(pageSize))
    .exec()
  ctx.body = {
    result: 'success',
    data: result
  }
})

router.post('/api/jindian', async (ctx) => {
  const body = ctx.request.body
  consola.info('result', body)
  const jindian = new jindianModel(body);
  await jindian.save()
  ctx.body = { result: 'success' };  //返回数据

})
router.post('/api/jindian/upload', upload.array('avatar', 5), async (ctx) => {
  const file = ctx.req.files[0]; //上传过来的文件
  ctx.body = { data: file.filename, result: 'success' };  //返回数据
})





module.exports = router