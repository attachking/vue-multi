import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由组件懒加载,每个路由组件单独生成一个js,需要时通过创建script标签引入,需要配置webpack的output.chunkFilename
// import(url)返回的是一个Promise对象实例
const corp = () => import('../routes/corp/corp.vue')

const router = new Router({
  routes: [{
    path: '/corp',
    name: 'corp',
    component: corp
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
