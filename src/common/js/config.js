const product = process.env.NODE_ENV === 'production'

export const BASE_URL = product ? '' : 'http://192.168.1.11:2019'

export const AUTHEN_URL = 'https://yw.zhihuijob.com/'
