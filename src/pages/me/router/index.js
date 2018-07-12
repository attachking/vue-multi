import Vue from 'vue'
import Router from 'vue-router'
import {storage, STORAGE_TYPE} from '../../../common/js/utils'
import event from '../../../common/js/event'

Vue.use(Router)

const ccmu17 = Number(storage.get(STORAGE_TYPE.ccmu17))
const status = Number(storage.get(STORAGE_TYPE.status))

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
const userCollection = () => import('../routes/user-collection/user-collection.vue') // 我的收藏
const collectedJob = () => import('../routes/user-collection/job/job.vue') // 我的收藏（岗位）
const collectedCorp = () => import('../routes/user-collection/corp/corp.vue') // 我的收藏（单位）
const records = () => import('../routes/records/records.vue') // 求职管理
const apply = () => import('../routes/records/apply/apply.vue') // 求职管理（应聘记录）
const invitation = () => import('../routes/records/invitation/invitation.vue') // 求职管理（面试邀请）

// 企业中心
const corp = () => import('../routes/corp-index/corp-index.vue') // 企业中心首页
const info = () => import('../routes/account/info/info.vue') // 基本信息
const job = () => import('../routes/job/job.vue') // 岗位管理
const jobList = () => import('../routes/job/jobList/jobList.vue') // 岗位列表
const jobEdit = () => import('../routes/job/jobEdit/jobEdit.vue') // 岗位编辑
const jobPreview = () => import('../routes/job/jobPreview/jobPreview.vue') // 岗位预览
const talent = () => import('../routes/talent/talent.vue') // 人才搜索
const corpResume = () => import('../routes/corp-resume/corp-resume.vue') // 简历管理
const received = () => import('../routes/corp-resume/received/received.vue') // 收到的简历
const corpCollection = () => import('../routes/corp-resume/corp-collection/corp-collection.vue') // 我的收藏
const invited = () => import('../routes/corp-resume/invited/invited.vue') // 我的收藏
const jobFair = () => import('../routes/job-fair/job-fair.vue') // 招聘会
const jobFairList = () => import('../routes/job-fair/job-fair-list/job-fair-list.vue') // 招聘会列表
const stalls = () => import('../routes/job-fair/stalls/stalls.vue') // 招聘会摊位列表
const reserved = () => import('../routes/job-fair/job-fair-reserved/job-fair-reserved.vue') // 已预定的招聘会列表
const fairJob = () => import('../routes/job/jobEdit/jobEdit.vue') // 招聘会岗位编辑
const positionList = () => import('../routes/job-fair/position-list/position-list.vue') // 招聘会已发布岗位
const fairJobPreview = () => import('../routes/job/jobPreview/jobPreview.vue') // 招聘会预览岗位
const fairCorpList = () => import('../routes/job-fair/fair-corp-list/fair-corp-list.vue') // 招聘会参会企业列表
const authen = () => import('../routes/account/authen/authen.vue') // 企业认证
const project = () => import('../routes/project/project.vue') // 项目申报
const projectList = () => import('../routes/project/project-list/project-list.vue') // 项目申报列表
const projectApply = () => import('../routes/project/project-apply/project-apply.vue') // 项目申报表单
const projectDetail = () => import('../routes/project/project-detail/project-detail.vue') // 项目申报详情

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
    }, {
      path: 'authen',
      name: 'authen',
      component: authen,
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
  }, {
    path: '/userCollection',
    name: 'userCollection',
    component: userCollection,
    meta: {ccmu17: 1},
    children: [{
      path: 'collectedJob',
      name: 'collectedJob',
      component: collectedJob
    }, {
      path: 'collectedCorp',
      name: 'collectedCorp',
      component: collectedCorp
    }]
  }, {
    path: '/records',
    name: 'records',
    component: records,
    meta: {ccmu17: 1},
    children: [{
      path: 'apply',
      name: 'apply',
      component: apply
    }, {
      path: 'invitation',
      name: 'invitation',
      component: invitation
    }]
  }, {
    path: '/talent',
    name: 'talent',
    component: talent,
    meta: {ccmu17: 2}
  }, {
    path: '/corpResume',
    name: 'corpResume',
    component: corpResume,
    meta: {ccmu17: 2},
    children: [{
      path: 'received',
      name: 'received',
      component: received
    }, {
      path: 'corpCollection',
      name: 'corpCollection',
      component: corpCollection
    }, {
      path: 'invited',
      name: 'invited',
      component: invited
    }]
  }, {
    path: '/jobFair',
    name: 'jobFair',
    component: jobFair,
    meta: {ccmu17: 2},
    children: [{
      path: 'jobFairList',
      name: 'jobFairList',
      component: jobFairList
    }, {
      path: 'stalls',
      name: 'stalls',
      component: stalls
    }, {
      path: 'reserved',
      name: 'reserved',
      component: reserved
    }, {
      path: 'fairJob',
      name: 'fairJob',
      component: fairJob
    }, {
      path: 'positionList',
      name: 'positionList',
      component: positionList
    }, {
      path: 'fairJobPreview',
      name: 'fairJobPreview',
      component: fairJobPreview
    }, {
      path: 'fairCorpList',
      name: 'fairCorpList',
      component: fairCorpList
    }]
  }, {
    path: '/project',
    name: 'project',
    component: project,
    meta: {ccmu17: 2},
    children: [{
      path: 'projectList',
      name: 'projectList',
      component: projectList
    }, {
      path: 'projectApply',
      name: 'projectApply',
      component: projectApply
    }, {
      path: 'projectDetail',
      name: 'projectDetail',
      component: projectDetail
    }]
  }]
})

router.beforeEach((to, from, next) => {
  if (status !== 1) {
    setTimeout(() => {
      event.$emit('login')
    }, 20)
    return
  }
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
