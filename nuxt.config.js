/*
 * @Author: your name
 * @Date: 2019-10-28 09:28:39
 * @LastEditTime: 2019-11-17 15:05:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt_demo2\nuxt.config.js
 */
const webpack = require('webpack')
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
    '~/assets/css/color-dark.css',
    '~/assets/css/icon.css',
    '~/assets/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/nuxt-quill-plugin.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {},
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        Quill: 'quill/dist/quill.js'
      })
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  router: {
    middleware: 'redirect'
  }
}
