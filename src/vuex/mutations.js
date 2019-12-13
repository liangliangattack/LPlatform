//突变
import * as types from './types.js'

//后来发现这个 vuex保存的东西 一刷新就没了 。。。那有什么鬼用
const mutations = {
  [types.LOGIN]: (state, value) => {
    state.token = value
  },
  [types.USERINFO]: (state, info) => {
    state.userInfo = info
  },
  [types.AVATARURL]: (state, info) => {
    state.avatarUrl = info
  },
  [types.LOGINSTATUS]: (state, bool) => {
    state.loginStatus = bool
  }
}
//布尔值 bool
export default mutations
