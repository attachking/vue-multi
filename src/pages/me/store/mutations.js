import * as types from './mutation-types'

const mutations = {
  [types.SET_DICTIONARIES](state, o) {
    state.dictionaries = o
  }
}

export default mutations
