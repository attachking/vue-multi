// 启用插件 babel-plugin-transform-runtime 后，Babel 就会使用 babel-runtime 下的工具函数
import 'babel-polyfill'
import Vue from 'vue'
import Element from 'element-ui'
import App from './me.vue'
import base from '../../common/js/base'
import router from './router'
import store from './store'
import '../../common/style/index.scss'
import '../../common/font/iconfont.css'
import '../../common/style/_me.scss'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(base)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
