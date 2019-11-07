/*
 * @Author: your name
 * @Date: 2019-10-28 09:28:39
 * @LastEditTime: 2019-10-29 10:03:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt_demo2\server\index.js
 */
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const { connect } = require('./dbs/init.js');

const userRouter = require('./interface/users.js')

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

  app.use(userRouter.routes())
    .use(userRouter.allowedMethods());

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  // app.use(proxy('/api', { target: 'https://127.0.0.1:8080', changeOrigin: true })); 

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
