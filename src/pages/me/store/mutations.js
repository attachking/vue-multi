import * as types from './mutation-types'

const mutations = {
  [types.SET_DICTIONARIES](state, o) {
    state.dictionaries = o
  },
  [types.SET_PHONE_OPEN](state, o) {
    state.phoneOpen = o
  }
}

export default mutations
