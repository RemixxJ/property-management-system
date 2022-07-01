import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'
import App from './App'
import router from './router'
import store from './store/'
import menuData from '@/config/menu.config'
import '@/assets/less/common.less'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.$menuData = menuData
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts


// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const userStr = localStorage.getItem('userInfo')
        //判断是否登录 未登录跳转到登录页面 
    if (!userStr && to.path !== '/login') {
        next('/login')
    } else {
        next()
    }
})
new Vue({
    el: '#app',
    axios,
    router,
    store,
    template: '<App/>',
    components: { App }
})