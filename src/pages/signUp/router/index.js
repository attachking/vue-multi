import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由组件懒加载,每个路由组件单独生成一个js,需要时通过创建script标签引入,需要配置webpack的output.chunkFilename
// import(url)返回的是一个Promise对象实例
const entry = () => import('../routes/entry/entry.vue')
const personal = () => import('../routes/personal/personal.vue')
const corp = () => import('../routes/corp/corp.vue')
const expert = () => import('../routes/expert/expert.vue') // 专家报名
const expertCheck = () => import('../routes/expert-check/expert-check.vue') // 专家报名check

const router = new Router({
  routes: [{
    path: '/entry',
    name: 'entry',
    component: entry
  }, {
    path: '/personal',
    name: 'personal',
    component: personal
  }, {
    path: '/corp',
    name: 'corp',
    component: corp
  }, {
    path: '/expert',
    name: 'expert',
    component: expert
  }, {
    path: '/expert-check',
    name: 'expertCheck',
    component: expertCheck
  }]
})

router.beforeEach((to, from, next) => {
  if (!to.name) {
    next({
      name: 'entry'
    })
  } else {
    next(true)
  }
})

export default router
