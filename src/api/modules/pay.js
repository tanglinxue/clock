import request from '../request.js'
export default {
	// 充值接口
	async pay(data = {}) {
		let res = await request({
			url: '/api/user/recharge',
			method: 'POST',
			data,
		})
		return res
	},
	//充值配置
	async recharge_config(data={}){
		let res = await request({
			url: '/api/user/recharge_config',
			method: 'POST',
			data,
		})
		return res
	},
	//我的余额
	async mymoney(data={}){
		let res = await request({
			url: '/api/user/mymoney',
			method: 'POST',
			data,
		})
		return res
	},
	// 订单里支付
	async payorder_check(data={}){
		let res = await request({
			url: '/api/orders/payorder_check',
			method: 'POST',
			data,
		})
		return res
	},
	//绑定技师
	async charge_bindtech(data={}){
		let res = await request({
			url: '/api/user/charge_bindtech',
			method: 'POST',
			data,
		})
		return res
	},
	//调用语音接口
	async send_singleCallByTts(data={}){
		let res = await request({
			url: '/api/orders/send_singleCallByTts',
			method: 'POST',
			data,
		})
		return res
	},
}
