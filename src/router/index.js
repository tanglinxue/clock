// router/index.js

import modules from './modules'
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'

Vue.use(Router)
//初始化
const router = new Router({
    h5: {
        vueRouterDev:true,  //完全使用vue-router开发 默认 false
        useUniConfig:false
    },
    routes: [...modules]//路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
 //    console.log("前置守卫")
	// console.log(from)
 //    console.log(to)
    next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {
    // console.log("后置守卫")
    // console.log(from)
})
export default router;
