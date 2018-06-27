import * as types from './mutation-types'
import {post} from '../../../common/js/utils'

export const getPhoneOpen = function({commit, state}, name) {
  post('/service/business/login/account/messageIsOpen', {}).then(res => {
    commit(types.SET_PHONE_OPEN, Number(res.result.message_is_open[0].caos04))
  })
}

export const getDictionaries = function ({commit, state}, name) {
  post('/service/sys/config/config/getConditionList', {
    tabStr: 'TAB_CITY,TAB_EDUCATION,TAB_AFFIL,TAB_NATION,TAB_NATURE,TAB_SEX,TAB_SALARY,CRAFT_AS,TAB_MARRIAGE,TAB_CERFORM,INDUSTRY_AS,TAB_UNITNATURE,TAB_PSCALE,TAB_SREQUIREMENT,TAB_WORKYEARS,TAB_WELFARE'
  }).then(res => {
    dispatchDictionary(res.result.TAB_CITY.children)
    dispatchDictionary(res.result.CRAFT_AS.children)
    commit(types.SET_DICTIONARIES, {
      TAB_CITY: res.result.TAB_CITY.children,
      CRAFT_AS: res.result.CRAFT_AS.children,
      TAB_EDUCATION: res.result.TAB_EDUCATION,
      TAB_AFFIL: res.result.TAB_AFFIL,
      TAB_NATION: res.result.TAB_NATION,
      TAB_NATURE: res.result.TAB_NATURE,
      TAB_SEX: res.result.TAB_SEX,
      TAB_SALARY: res.result.TAB_SALARY,
      TAB_MARRIAGE: res.result.TAB_MARRIAGE,
      TAB_CERFORM: res.result.TAB_CERFORM,
      INDUSTRY_AS: res.result.INDUSTRY_AS,
      TAB_UNITNATURE: res.result.TAB_UNITNATURE,
      TAB_PSCALE: res.result.TAB_PSCALE,
      TAB_SREQUIREMENT: res.result.TAB_SREQUIREMENT,
      TAB_WORKYEARS: res.result.TAB_WORKYEARS,
      TAB_WELFARE: res.result.TAB_WELFARE
    })
  })
}

function dispatchDictionary(arr) {
  arr.forEach(item => {
    if (item.children instanceof Array) {
      if (item.children.length) {
        dispatchDictionary(item.children)
      } else {
        delete item.children
      }
    }
  })
}
