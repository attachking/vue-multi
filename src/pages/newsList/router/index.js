import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由组件懒加载,每个路由组件单独生成一个js,需要时通过创建script标签引入,需要配置webpack的output.chunkFilename
// import(url)返回的是一个Promise对象实例
const module = () => import('../routes/module/module.vue')
const photo = () => import('../routes/photo/photo.vue')
const pic = () => import('../routes/pic/pic.vue')
const corp = () => import('../routes/corp/corp.vue')
const job = () => import('../routes/job/job.vue')

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
