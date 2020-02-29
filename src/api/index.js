import Axios from 'axios'
import router from '../router'

console.log("有头么？")
//token检查
if (window.localStorage.getItem('token')) {
  console.log("加入头信息")
  Axios.defaults.headers.common['token'] = window.localStorage.getItem('token')
}

// Axios.defaults.headers.common['Content-Type'] = `Bearer ` + window.localStorage.getItem('application/json')

//build.js中定义process.env.NODE_ENV 是否是生产环境来使用不同的url
export let instance = Axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://120.55.124.53:8230' : 'http://localhost:8769'
})
// respone拦截器
// instance.interceptors.response.use(
//   response => {
//     if (response) {
//       console.log("拦截--error")
//       console.log(response.status)
//       switch (response.status) {
//         //拦截 401 请求（原因是401为token失效 跳转登录页面重新登录）
//         case 401:
//           router.replace({
//             path: 'login',
//             query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           })
//       }
//     }
//     return response
//   },
//   error => {
//     return Promise.reject(error.response)
//   }
// )

instance.interceptors.response.use(
  response => {
    //如果没错 就在这里拦截
    console.log(response)
    return response
  },
  error => {
    //错误的response 就在这里拦截
    console.log(error.response)
    if (error.response) {
      if (error.response.status === 401) {
        console.log(error.response)
        alert("登录过期（token失效），请重新登录")
        router.replace({path: 'login'})//登录过期（token失效）重新登录
      }
      if (error.response.status === 500) {
        router.replace({path: 'error500'})
      }
    }
    return Promise.reject(error.response)
  }
)

export const login = ({ userName, password }) => {

  return instance.post('apiAdmin/admin/login', {
    userName: userName,
    password: password
  })
}

export const register = ( inputData) => {
  return instance.post('apiAdmin/admin/register', {
    userName: inputData.userName,
    password: inputData.password,
    avatarUrl: inputData.avatarUrl,
  })
}

export const getMessage = () => {
  return instance.post('apiAdmin/author/getMessage')
}

export const addQuestion = (inputData) => {
  return instance.post('apiSystem/ques/addQuestion',{
      title:inputData.title,
      creator:inputData.creator,
      tag:inputData.tag,
      content:inputData.content,
  },{
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//login之后需要同时获取数据 如果不特地加入token 跳转index会报401
export const getQuestions = (inputData) => {
  return instance.post('apiSystem/ques/getQuestions/'+inputData.page+"/"+inputData.pageSize,
    {},
    {
    headers:{
      'Content-Type': 'application/json',
      'token': window.localStorage.getItem('token')
    }
  })
}
