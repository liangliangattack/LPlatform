// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//main.js在渲染的时候会被webpack引入变成app.js文件 app.js文件在index.html中会被引入
import Vue from 'vue'
import App from './App'
import router from './router'

//饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex'

Vue.config.productionTip = false;
Vue.use(ElementUI);

//动态设置font-size
window.onresize = setHtmlFontSize;
function setHtmlFontSize(){
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  const htmlDom = document.getElementsByTagName('html')[0];
  htmlDom.style.fontSize = htmlWidth / 25 + 'px';//我的电脑分辨率开发px为 60=1rem
  // console.log("main.js ---------------");
  // console.log(htmlDom.style.fontSize);
};
// setHtmlFontSize();


//模板参数必须要有,这里引用了app根组件(根组件对应的html标签形式也就是<app/>),定义的template会在main.js转换为app.js时
// 以<app/>的形式写在index.html中 而<app/>在最终的渲染结果中并没有体现 可以改写template:'<h1>{{title}}<app/></h1>'测试得出
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store ,
  components: { App },
  template: '<App/>'
});

