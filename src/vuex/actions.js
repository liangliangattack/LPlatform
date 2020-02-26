import * as types from './types'
//引入 Axios实例、login、getUserInfo
import { instance, login,register, getMessage, addQuestion ,getQuestions } from '../api'

export default {
  toAddQuestion ({ commit } , inputData) {
    return new Promise((resolve, reject) => {
      addQuestion(inputData).then(res => {
        if (res.status === 200) {
        }
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  toGetQuestions ({ commit } , inputData) {
    return new Promise((resolve, reject) => {
      getQuestions(inputData).then(res => {
        if (res.status === 200) {
        }
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  //commit是存放结果 info是username和password
  toLogin ({ commit }, info) {
    return new Promise((resolve, reject) => { //成功的时候调用resolve 失败的时候调用reject
      login(info).then(res => {
        if (res.status === 200) {
          console.log(res)
          commit(types.LOGIN, res.data.token)   //token
          commit(types.USERINFO, res.data.data.user)  //用户信息
          commit(types.AVATARURL, res.data.data.avatarUrl)  //头像信息
          commit(types.LOGINSTATUS, true)  //登录状态
          instance.defaults.headers.common['Authorization'] = `Bearer ` + res.data.token
          window.localStorage.setItem('token', res.data.token)  //token
          window.localStorage.setItem('avatarUrl', res.data.data.avatarUrl)  //头像
          window.localStorage.setItem('userId', res.data.data.id)  //头像
          window.localStorage.setItem('userName', res.data.data.name)  //用户名
          resolve(res)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  //commit是存放结果 info是username和password
  toRegister ({ commit }, inputData) {
    return new Promise((resolve, reject) => { //成功的时候调用resolve 失败的时候调用reject
      register(inputData).then(res => {
        if (res.status === 200) {
        }
        resolve(res)
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
