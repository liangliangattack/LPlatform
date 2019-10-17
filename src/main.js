// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Login from "./components/Login";
import Home from "./components/Home";
//饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);

//配置路由
const router = new VueRouter({
  mode:"history",
  routes:[
    {path:"/Login",component:Login},
    {path:"/",component:Home},

  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
