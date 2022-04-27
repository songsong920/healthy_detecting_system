import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import 'default-passive-events'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'assets/custom-theme/font.css';
import 'assets/iconfont/iconfont'; // iconfont 具体
import IconSvg from 'components/Icon-svg'; // svg 组件
import errLog from 'store/errLog'; // error log组件
import {
  getToken
} from 'utils/auth';
import 'babel-polyfill'; //支持IE执行原生script
import {
  parseTime,
  resetForm,
  addDateRange,
} from "@/utils/common";
Vue.component('icon-svg', IconSvg)
Vue.use(ElementUI);
//全局方法挂载
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
const whiteList = ['/login', '/register']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  document.title = to.name
  let roleId = localStorage.getItem('roleId')
  if (roleId) { // 判断是否有角色
    if (to.path === '/login') {
      if (roleId == 1) {
        next({
          path: '/admin'
        });
      } else if (roleId == 2) {
        next({
          path: '/admin'
        });
      } else {
        next({
          path: '/patient'
        });
      }
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
});
Vue.config.productionTip = false;
// 生产环境错误日志
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function (err, vm) {
    console.log(err, window.location.href);
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  };
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
