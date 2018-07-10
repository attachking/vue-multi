import {post, dateFormat, getUserInfo} from './utils'
import $ from 'jquery'

export default {
  install: (Vue) => {
    Vue.prototype.$post = post
    Vue.prototype.$dateFormat = dateFormat
    Vue.prototype.$userInfo = getUserInfo()
    // 自定义指令
    Vue.directive('img', {
      bind(el, binding, vnode) {
        $(el).attr('data-url', binding.value)
        $(el).css('cursor', 'pointer')
        el.addEventListener('click', e => {
          if (e && e.stopPropagation) {
            e.stopPropagation()
          } else {
            window.event.cancelBubble = true
          }
          const shade = $('<div class="preview-shade"></div>')
          const imgBox = $('<div class="preview-img"></div>')
          const rotate = $('<span class="el-icon-refresh preview-rotate"></span>')
          const image = $(`<img src="${el.dataset.url}">`)
          imgBox.append(image).append(rotate)
          $('body').append(shade).append(imgBox)
          imgBox.on('click', () => {
            shade.remove()
            imgBox.remove()
          })
          image.on('click', e => {
            if (e && e.stopPropagation) {
              e.stopPropagation()
            } else {
              window.event.cancelBubble = true
            }
          })
          let currentRotate = 0
          rotate.on('click', e => {
            if (e && e.stopPropagation) {
              e.stopPropagation()
            } else {
              window.event.cancelBubble = true
            }
            currentRotate -= 90
            image.css('transform', `rotate(${currentRotate}deg)`)
          })
        }, false)
      },
      update(el, binding, vnode) {
        $(el).attr('data-url', binding.value)
      }
    })
  }
}
