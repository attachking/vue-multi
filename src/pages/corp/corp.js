// 启用插件 babel-plugin-transform-runtime 后，Babel 就会使用 babel-runtime 下的工具函数
import 'babel-polyfill'
import Vue from 'vue'
import Element from 'element-ui'
import App from './corp.vue'
import '../../common/style/index.scss'
import '../../common/font/iconfont.css'
import base from '../../common/js/base'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(base)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
