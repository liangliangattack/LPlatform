import * as types from './types'
//引入 Axios实例、login、getUserInfo
import { instance, login, getMessage } from '../api'

export default {
  //commit是存放结果 info是username和password
  toLogin ({ commit }, info) {
    return new Promise((resolve, reject) => {
      login(info).then(res => {
        if (res.status === 200) {
          console.log(res)
          commit(types.LOGIN, res.data.token)//token
          commit(types.USERINFO, res.data.data.user)//用户信息
          commit(types.LOGINSTATUS, true)//登录状态
          instance.defaults.headers.common['Authorization'] = `Bearer ` + res.data.token
          window.localStorage.setItem('token', res.data.token)//token
          resolve(res)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  toGetMessage ({ commit }) {
    return new Promise((resolve, reject) => {
      getMessage().then(res => {
        if (res.status === 200) {
          commit(types.USERINFO, res.data)
        }
        // if (res.status === 401) {
        //   commit(types.USERINFO, res.status)
        // }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  loginOut ({ commit }) {
    return new Promise((resolve, reject) => {
      commit(types.USERINFO, null)
      commit(types.LOGINSTATUS, false)
      commit(types.LOGIN, '')
      window.localStorage.removeItem('token')
    })
  }
}
