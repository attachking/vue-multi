const product = process.env.NODE_ENV === 'production'

export const BASE_URL = product ? '' : 'http://192.168.1.192:9119'

export const AUTHEN_URL = 'https://yw.zhihuijob.com/'
