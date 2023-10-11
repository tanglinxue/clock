import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole() 



Vue.use(uView);
//引入插件
import plugins from './utils/plugins'
//应用（使用）插件
Vue.use(plugins)
// 如此配置即可
// uni.$u.config.unit = 'rpx'
 // import router from './router'
import store from './store'
App.mpType = 'app'
//关闭Vue的生产提示
Vue.config.productionTip = false
const app = new Vue({
  ...App,
  // router,
  store,
  beforeCreate() {
  	Vue.prototype.$bus = this
  }
})
app.$mount()
export default app
