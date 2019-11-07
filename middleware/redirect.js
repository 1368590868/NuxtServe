/*
 * @Author: your name
 * @Date: 2019-10-29 09:00:04
 * @LastEditTime: 2019-10-29 09:00:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \nuxt_demo2\middleware\redirect.js
 */
export default function ({ app, req, redirect, route }) {
  // 该中间件用于解决路由redirect的问题，当直接访问/根路有时候，跳转到/dashboard
  // console.log('middle-redirect')
  if (route.path === '/') {
    redirect({ path: '/dashboard' })
  }
}
