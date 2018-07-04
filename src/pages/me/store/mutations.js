import * as types from './mutation-types'

const mutations = {
  [types.SET_DICTIONARIES](state, o) {
    state.dictionaries = o
  },
  [types.SET_PHONE_OPEN](state, o) {
    state.phoneOpen = o
  },
  [types.SET_CORP_INFO](state, o) {
    state.corpInfo = o
  },
  [types.SET_AUTHEN_INFO](state, o) {
    state.authenInfo = o
  },
  [types.SET_PERSONAL_INFO](state, o) {
    state.personalInfo = o
  }
}

export default mutations
