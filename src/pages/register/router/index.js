import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由组件懒加载,每个路由组件单独生成一个js,需要时通过创建script标签引入,需要配置webpack的output.chunkFilename
// import(url)返回的是一个Promise对象实例
const corp = () => import('../routes/corp/corp.vue')
const entry = () => import('../routes/entry/entry.vue')
const user = () => import('../routes/user/user.vue')
const boss = () => import('../routes/boss/boss.vue')

const router = new Router({
  routes: [{
    path: '/corp',
    name: 'corp',
    component: corp
  }, {
    path: '/entry',
    name: 'entry',
    component: entry
  }, {
    path: '/user',
    name: 'user',
    component: user
  }, {
    path: '/boss',
    name: 'boss',
    component: boss
  }]
})

router.beforeEach((to, from, next) => {
  if (!to.name) {
    next({
      name: 'corp'
    })
  } else {
    next(true)
  }
})

export default router
