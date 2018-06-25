import * as types from './mutation-types'
import {post} from '../../../common/js/utils'

export const getDictionaries = function ({commit, state}, name) {
  post('service/sys/iccParameter/iccParameter/getConditionList.xf', {
    tabStr: '2,3,4,5,6'
  }).then(res => {
    dispatchDictionary(res.result[3].children)
    commit(types.SET_DICTIONARIES, {
      express: res.result[2],
      cities: res.result[3].children,
      corpNature: res.result[4],
      issuesType: res.result[5],
      deviceType: res.result[6]
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
