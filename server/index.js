/*
 * @Author: your name
 * @Date: 2019-10-28 09:28:39
 * @LastEditTime: 2019-11-20 09:25:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt_demo2\server\index.js
 */
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const { connect } = require('./dbs/init.js');
const bodyParser = require('koa-bodyparser');

const userRouter = require('./interface/users.js')
const articleRouter = require('./interface/article.js')
const jindianRouter = require('./interface/jindian.js')

const app = new Koa()
// const router = new Router();

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  connect();
  app.use(bodyParser());
  app.use(userRouter.routes())
    .use(userRouter.allowedMethods());
  app.use(articleRouter.routes())
    .use(articleRouter.allowedMethods());
  app.use(jindianRouter.routes())
    .use(jindianRouter.allowedMethods());



  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })
//配置跨域
  // app.use('/',function(req,res){
  //   const url = 'http://localhost:3000/article' 
  //   req.pipe(request(url)),pipe(res.set('Access-Control-Allow-Origin','*'))
  // })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
