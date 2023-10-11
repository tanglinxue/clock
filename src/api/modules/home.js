import request from '../request.js'
export default {
	//首页banner
	async getHomeData(url='156.239.153.53'){
		let res = await request({
			url:'http://'+url, //仅为示例，并非真实接口地址。
			method: 'POST',
			data:{}
		})
		return res
	},
	async login(data={}) {
		let res = await request({
			url: '/api/user/wxlogin', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//首页推荐
	async getHomeList(data={}){
		let res = await request({
			url: '/api/index/index_recommend', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//首页banner
	async getBanner(data={}){
		let res = await request({
			url: '/api/index/banner', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	// 获取签名配置
	async getConfig(data={}){
		let res = await request({
			url: '/api/user/getSignPackage', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	// app登录
	async applogin(data={}){
		let res = await request({
			url: '/api/user/applogin', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	async passLogin(data={}){
		let res = await request({
			url: '/api/user/account_login', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	
}  