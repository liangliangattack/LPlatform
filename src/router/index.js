import Vue from 'vue'
import Router from 'vue-router'
// import Login from "../components/Login";
// import Home from "../components/Home";

import store from '../vuex/index'
const Index = () => import('../pages/Index.vue')
const SubmitQuestion = () => import('../pages/SubmitQuestion.vue')
const QuestionDetail = () => import('../pages/QuestionDetail.vue')
const Login = () => import('../pages/Login.vue')
const Register = () => import('../pages/Register.vue')
const Error500 = () => import('../pages/error/Error500.vue')

Vue.use(Router)

//main里面引入router才行
//配置路由
const router = new Router({
  mode:"history",
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/submitQuestion',
      name: 'SubmitQuestion',
      component: SubmitQuestion,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/questionDetail',
      name: 'QuestionDetail',
      component: QuestionDetail,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/error500',
      name: 'Error500',
      component: Error500
    },
  ]
})

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token')
  if (to.meta.requiresAuth) {
    if (token) {
      store.dispatch('getMessage')
      next()
    } else {
      store.dispatch('loginOut')
      next({
        path: 'login',
        // query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
