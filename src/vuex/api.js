// //api.js
// // import service from './request'
// import router from '../main.js'//router
// import axios from "axios";
//
// export function getXX(url, data1)
// {
//   let baseURL='http://localhost:8230';
//   baseURL+=url;
//
//   //token 检查
//   //头里面添加token，后台会判断登录
//   if (window.localStorage.getItem('token')) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ` + window.localStorage.getItem('token')
//   }else{
//     console.log("当前不存在token！！");
//   }
//   console.log(data1);
//   return axios({
//     url: baseURL,
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: data1
//   });
// }
//
// //拦截 401 请求（原因是401为token失效 跳转登录页面重新登录）
// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     //非200情况下 判断code
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           //401的情况下 一般就是请求之后后台 token判断为空
//           router.replace({
//             path: 'Login',
//             query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           });
//         default:break;
//       }
//     }
//     return Promise.reject(error.response)
//   }
// )
