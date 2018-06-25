import Vue from 'vue'
import Router from 'vue-router'
import {storage, STORAGE_TYPE} from '../../../common/js/utils'

Vue.use(Router)

const ccmu17 = Number(storage.get(STORAGE_TYPE.ccmu17))

// 路由组件懒加载,每个路由组件单独生成一个js,需要时通过创建script标签引入,需要配置webpack的output.chunkFilename
// import(url)返回的是一个Promise对象实例
const user = () => import('../routes/user-index/user-index.vue')
const message = () => import('../routes/message/message.vue')
const account = () => import('../routes/account/account.vue')
const head = () => import('../routes/account/head/head.vue')
const password = () => import('../routes/account/password/password.vue')
const pics = () => import('../routes/account/pics/pics.vue')
// 职位搜索页面直接复用二级页面的职位搜索
const jobSearch = () => import('../routes/job-search/job-search.vue')

const router = new Router({
  routes: [{
    path: '/user',
    name: 'user',
    component: user,
    meta: {ccmu17: 1}
  }, {
    path: '/message',
    name: 'message',
    component: message
  }, {
    path: '/account',
    name: 'account',
    component: account,
    children: [{
      path: 'head',
      name: 'head',
      component: head
    }, {
      path: 'password',
      name: 'password',
      component: password
    }, {
      path: 'pics',
      name: 'pics',
      component: pics
    }]
  }, {
    path: '/jobSearch',
    name: 'jobSearch',
    component: jobSearch
  }]
})

router.beforeEach((to, from, next) => {
  // 默认跳转路由
  if (!to.name) {
    next({name: ccmu17 === 1 ? 'user' : 'corp'})
    // 限制访问非登录类型的路由
  } else if (to.matched.some(record => typeof record.meta.category !== 'undefined' && record.meta.category !== ccmu17)) {
    next({name: ccmu17 === 1 ? 'user' : 'corp'})
  } else {
    next(true)
  }
})

export default router
