import $ from 'jquery'
import {BASE_URL} from './config'
import {Message} from 'element-ui'
import event from './event'

// 解决ie9不发送ajax请求的问题
$.support.cors = true

// storage类型
export const STORAGE_TYPE = {
  aac001: '__aac001__',
  aab001: '__aab001__',
  ccmu01: '__ccmu01__',
  ccmu17: '__ccmu17__',
  logo: '__logo__',
  token: '__token__',
  status: '__status__',
  name: '__name__'
}

// 设置storage
export const storage = {
  set(key, value) {
    localStorage.setItem(key, value || '')
  },
  get(key) {
    return localStorage.getItem(key)
  },
  out() { // 退出登录
    localStorage.removeItem(STORAGE_TYPE.aac001)
    localStorage.removeItem(STORAGE_TYPE.aab001)
    localStorage.removeItem(STORAGE_TYPE.ccmu01)
    localStorage.removeItem(STORAGE_TYPE.ccmu17)
    localStorage.removeItem(STORAGE_TYPE.logo)
    localStorage.removeItem(STORAGE_TYPE.token)
    localStorage.removeItem(STORAGE_TYPE.status)
    localStorage.removeItem(STORAGE_TYPE.name)
  }
}

const user = {
  ccmu17: Number(storage.get(STORAGE_TYPE.ccmu17)) || '',
  aac001: storage.get(STORAGE_TYPE.aac001),
  aab001: storage.get(STORAGE_TYPE.aab001),
  token: storage.get(STORAGE_TYPE.token)
}

export function post(url, params = {}) {
  params = Object.assign({}, {
    userId: user.ccmu17 === 1 ? user.aac001 : user.aab001,
    ccmu17: user.ccmu17,
    _token: user.token
  }, params)
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'post',
      data: params,
      url: BASE_URL + url,
      success(data) {
        resolve(data)
        if (data.error && data.error.result === 0) {
          Message({
            showClose: false,
            message: data.error.message,
            type: 'error'
          })
        }
        // 90：失败（查不到该token）  92：超时   93：越权
        if (data.error && (data.error.result === 90 || data.error.result === 92)) { // 访问异常
          event.$emit('login')
        }
      },
      error(err) {
        reject(err)
        Message({
          showClose: false,
          message: '网络错误',
          type: 'warning'
        })
      }
    })
  })
}

// 时间格式化方法
export function dateFormat(date, fmt) {
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'))
  } else if (typeof date === 'number') {
    date = new Date(date)
  } else if (date instanceof Date) {
    // 不处理
  } else {
    return '--'
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

// 延时函数
export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

// 设置title
export function renderTitle(tit) {
  document.title = tit
}

// 解析query
export function queryParse(str) {
  let index = str.indexOf('?')
  str = index === -1 ? str : str.substring(index + 1)
  let arr = str.split('&')
  let o = {}
  arr.forEach(item => {
    let i = item.indexOf('=')
    if (i !== -1) {
      o[item.substring(0, i)] = item.substring(i + 1)
    }
  })
  return o
}

// 地区选择值回显
export class BackCascader {
  constructor({list, id}) {
    this.list = list // 整个字典表
    this.backArr = [] // 回显值
    this.id = id // id
    this.parentArr = [] // 缓存数据
  }
  back() {
    this.findParentArr(this.id, this.list)
    this.backCity(this.parentArr, this.id)
    return this.backArr
  }
  backCity(arr, id) { // 地区选择回填
    if (!id) return
    this.backArr.unshift(id)
    for (let i = 0; i < arr.length; i++) {
      if (Number(arr[i].id) === Number(id)) {
        if (Number(arr[i].parentId) === 0) {
          return
        } else {
          this.findParentArr(arr[i].parentId, this.list)
          this.backCity(this.parentArr, arr[i].parentId)
        }
      }
    }
  }
  findParentArr(id, arr) {
    if (!id) return
    for (let i = 0; i < arr.length; i++) {
      if (Number(arr[i].id) === Number(id)) {
        this.parentArr = arr
        break
      } else {
        if (arr[i].children && arr[i].children.length) {
          this.findParentArr(id, arr[i].children)
        }
      }
    }
  }
}

// 表单值回显
export function echo(target, resource) {
  for (let i in target) {
    if (target.hasOwnProperty(i)) {
      if (resource && resource[i] !== null && typeof resource[i] !== 'undefined') {
        target[i] = resource[i]
      } else {
        target[i] = ''
      }
    }
  }
}
