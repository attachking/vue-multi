import * as types from './mutation-types'
import {post, handleCity} from '../../../common/js/utils'

export const getPhoneOpen = function({commit, state}, name) {
  post('/service/business/login/account/messageIsOpen', {}).then(res => {
    commit(types.SET_PHONE_OPEN, Number(res.result.message_is_open[0].caos04))
  })
}

export const getDictionaries = function ({commit, state}, name) {
  post('/service/sys/config/config/getConditionList', {
    tabStr: 'TAB_CITY,TAB_EDUCATION,TAB_AFFIL,TAB_NATION,TAB_NATURE,TAB_SEX,TAB_SALARY,CRAFT_AS,TAB_MARRIAGE,TAB_CERTIFICATE_TYPE,INDUSTRY_AS,TAB_UNITNATURE,TAB_PSCALE,TAB_SREQUIREMENT,TAB_WORKYEARS,TAB_WELFARE,tab_university_city,tab_major_type,TAB_SECURITY,TAB_FUND_SOURCE,TAB_PROJECT_TYPE,TAB_COOPERATION_TYPE,TAB_INDUSTRYCLASSES,TAB_CATEGORY,TAB_HEALTH,TAB_ECONOMIC'
  }).then(res => {
    let tabMajorType = []
    res.result.tab_major_type.forEach((item, i) => {
      tabMajorType[i] = {
        id: item.code,
        text: item.name,
        parentId: 0,
        children: item.list.map(val => {
          return {
            id: val.code,
            text: val.name,
            parentId: item.code
          }
        })
      }
    })
    let TAB_CITY3 = handleCity(res.result.TAB_CITY.children)
    commit(types.SET_DICTIONARIES, {
      TAB_CITY3: TAB_CITY3,
      CRAFT_AS: handleCity(res.result.CRAFT_AS.children),
      TAB_EDUCATION: res.result.TAB_EDUCATION,
      TAB_AFFIL: res.result.TAB_AFFIL,
      TAB_NATION: res.result.TAB_NATION,
      TAB_NATURE: res.result.TAB_NATURE,
      TAB_SEX: res.result.TAB_SEX,
      TAB_SALARY: res.result.TAB_SALARY,
      TAB_MARRIAGE: res.result.TAB_MARRIAGE,
      TAB_CERTIFICATE_TYPE: res.result.TAB_CERTIFICATE_TYPE,
      INDUSTRY_AS: res.result.INDUSTRY_AS,
      TAB_UNITNATURE: res.result.TAB_UNITNATURE,
      TAB_PSCALE: res.result.TAB_PSCALE,
      TAB_SREQUIREMENT: res.result.TAB_SREQUIREMENT,
      TAB_WORKYEARS: res.result.TAB_WORKYEARS,
      TAB_WELFARE: res.result.TAB_WELFARE,
      tab_university_city: res.result.tab_university_city,
      tab_major_type: tabMajorType,
      TAB_SECURITY: res.result.TAB_SECURITY,
      TAB_FUND_SOURCE: res.result.TAB_FUND_SOURCE,
      TAB_PROJECT_TYPE: res.result.TAB_PROJECT_TYPE,
      TAB_COOPERATION_TYPE: res.result.TAB_COOPERATION_TYPE,
      TAB_INDUSTRYCLASSES: res.result.TAB_INDUSTRYCLASSES,
      TAB_CATEGORY: res.result.TAB_CATEGORY,
      TAB_HEALTH: res.result.TAB_HEALTH,
      TAB_ECONOMIC: res.result.TAB_ECONOMIC
    })
  })
}
