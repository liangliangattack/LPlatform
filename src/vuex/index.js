import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'

import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

const state = {
  token: window.localStorage.getItem('token'),
  userInfo: {},
  loginStatus: false,
  avatarUrl: "",
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
