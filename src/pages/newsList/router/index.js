import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由组件懒加载,每个路由组件单独生成一个js,需要时通过创建script标签引入,需要配置webpack的output.chunkFilename
// import(url)返回的是一个Promise对象实例
const module = () => import('../routes/module/module.vue') // 文字新闻列表
const photo = () => import('../routes/photo/photo.vue')
const pic = () => import('../routes/pic/pic.vue') // 图片新闻列表
const corp = () => import('../routes/corp/corp.vue') // 企业搜索列表
const job = () => import('../routes/job/job.vue') // 职位搜索列表
const fair = () => import('../routes/fair/fair.vue') // 招聘会列表
const talent = () => import('../routes/talent/talent.vue') // 人才推介
const project = () => import('../routes/project/project.vue') // 项目推介
const beauty = () => import('../routes/beauty/beauty.vue') // 美丽河南

const router = new Router({
  routes: [{
    path: '/module',
    name: 'module',
    component: module
  }, {
    path: '/photo',
    name: 'photo',
    component: photo
  }, {
    path: '/pic',
    name: 'pic',
    component: pic
  }, {
    path: '/corp',
    name: 'corp',
    component: corp
  }, {
    path: '/job',
    name: 'job',
    component: job
  }, {
    path: '/fair',
    name: 'fair',
    component: fair
  }, {
    path: '/talent',
    name: 'talent',
    component: talent
  }, {
    path: '/project',
    name: 'project',
    component: project
  }, {
    path: '/beauty',
    name: 'beauty',
    component: beauty
  }]
})

router.beforeEach((to, from, next) => {
  if (!to.name) {
    next({
      name: 'module',
      query: {
        channel_code: 'RCZC'
      }
    })
  } else {
    next(true)
  }
})

export default router
