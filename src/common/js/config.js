// 是否为生产环境
const product = process.env.NODE_ENV === 'production'
// 是否为质保环境
const test = !!process.env.TEST

// set page=signUp&& npm run dev
export const BASE_URL = product ? '' : '' // http://192.168.1.11:2019    http://www.zghnrc.gov.cn

export const FILE_URL = product ? (test ? 'http://192.168.1.100:9999' : 'http://www.zghnrc.gov.cn') : 'http://192.168.1.100:9999' // http://zghnrc.gov.cn  http://192.168.1.100:9999

export const AUTHEN_URL = 'https://yw.zhihuijob.com/'
