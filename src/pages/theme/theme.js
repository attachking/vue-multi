// 启用插件 babel-plugin-transform-runtime 后，Babel 就会使用 babel-runtime 下的工具函数
import 'babel-polyfill'
import Vue from 'vue'
import Element from 'element-ui'
import App from './theme.vue'
import base from '../../common/js/base'
import '../../common/style/index.scss'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(base)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
