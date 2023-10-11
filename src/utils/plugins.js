import methods from 'utils/method.js'
import {jump} from 'utils/method.js'
import API from '@/api' 
// import Tabbar from '@/components/tabbar/index.vue'
// import Technician from '@/components/technician/index.vue'
// import TechList from '@/components/techList/index.vue'
// import Empty from '@/components/empty/index.vue'
import mixin from '@/mixins/index.js' 
export default {
	install(Vue){
		//全局过滤器
		Vue.filter('mySlice',function(value){
			return value.slice(0,4)
		})

		//给Vue原型上添加一个方法（vm和vc就都能用了）
		// 任意组件可以使用API相关的接口
		Vue.prototype.$API = API
		Vue.prototype.$jump = jump
		Vue.prototype.$methods = methods
		// Vue.component('Tabbar',Tabbar)
		// Vue.component('Technician',Technician)
		// Vue.component('TechList',TechList)
		// Vue.component('Empty',Empty)
		Vue.mixin(mixin)
	}
}
