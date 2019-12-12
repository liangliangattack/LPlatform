import Axios from 'axios'
import router from '../router'

//token检查
if (window.localStorage.getItem('token')) {
  Axios.defaults.headers.common['token'] = window.localStorage.getItem('token')
}

// Axios.defaults.headers.common['Content-Type'] = `Bearer ` + window.localStorage.getItem('application/json')

//build.js中定义process.env.NODE_ENV 是否是生产环境来使用不同的url
export let instance = Axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://120.55.124.53:8230' : 'http://localhost:8230'
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
        // this.$notify({
        //   title: 'token过期',
        //   message: '登录失效,请重新登录',
        //   type: 'warning'
        // });
        router.replace({
          path: 'login'//登录过期（token失效）重新登录
        })
      }
    }
    return Promise.reject(error.response)
  }
)

export const login = ({ userName, password }) => {
  return instance.post('author/login', {
    userName: userName,
    password: password
  })
}

export const getMessage = () => {
  return instance.get('author/getMessage')
}

export const addQuestion = (inputData) => {
  return instance.post('ques/addQuestion',{
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
