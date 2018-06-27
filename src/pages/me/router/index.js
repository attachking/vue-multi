import Vue from 'vue'
import Router from 'vue-router'
import {storage, STORAGE_TYPE} from '../../../common/js/utils'

Vue.use(Router)

const ccmu17 = Number(storage.get(STORAGE_TYPE.ccmu17))

// 路由组件懒加载,每个路由组件单独生成一个js,需要时通过创建script标签引入,需要配置webpack的output.chunkFilename
// import(url)返回的是一个Promise对象实例
const user = () => import('../routes/user-index/user-index.vue') // 个人中心首页
const message = () => import('../routes/message/message.vue') // 我的消息
const account = () => import('../routes/account/account.vue') // 账户管理
const head = () => import('../routes/account/head/head.vue') // 头像
const password = () => import('../routes/account/password/password.vue') // 密码
const pics = () => import('../routes/account/pics/pics.vue') // 风采
const jobSearch = () => import('../routes/job-search/job-search.vue') // 岗位搜索
const resume = () => import('../routes/resume/resume.vue') // 简历

// 企业中心
const corp = () => import('../routes/corp-index/corp-index.vue')
const info = () => import('../routes/account/info/info.vue')
const job = () => import('../routes/job/job.vue') // 职位管理
const jobList = () => import('../routes/job/jobList/jobList.vue') // 职位列表
const jobEdit = () => import('../routes/job/jobEdit/jobEdit.vue') // 职位编辑
const jobPreview = () => import('../routes/job/jobPreview/jobPreview.vue') // 职位预览

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
    }, {
      path: 'info',
      name: 'info',
      component: info,
      meta: {ccmu17: 2}
    }]
  }, {
    path: '/jobSearch',
    name: 'jobSearch',
    component: jobSearch
  }, {
    path: '/resume',
    name: 'resume',
    component: resume,
    meta: {ccmu17: 1}
  }, {
    path: '/corp',
    name: 'corp',
    component: corp,
    meta: {ccmu17: 2}
  }, {
    path: '/job',
    name: 'job',
    component: job,
    meta: {ccmu17: 2},
    children: [{
      path: 'jobList',
      name: 'jobList',
      component: jobList
    }, {
      path: 'jobEdit',
      name: 'jobEdit',
      component: jobEdit
    }, {
      path: 'jobPreview',
      name: 'jobPreview',
      component: jobPreview
    }]
  }]
})

router.beforeEach((to, from, next) => {
  // 默认跳转路由
  if (!to.name) {
    next({name: ccmu17 === 1 ? 'user' : 'corp'})
    // 限制访问非登录类型的路由
  } else if (to.matched.some(record => typeof record.meta.ccmu17 !== 'undefined' && record.meta.ccmu17 !== ccmu17)) {
    next({name: ccmu17 === 1 ? 'user' : 'corp'})
  } else {
    next(true)
  }
})

export default router
