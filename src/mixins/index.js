import {toLogin,getCur} from '@/utils/method.js'
export default{
	data(){
		return{
			firstEnter:true,
			noNeed:false
		}
	},
	onShow(){
		if(this.noNeed) return 
		const isLogin = toLogin()
		if(!isLogin) return
	}
}