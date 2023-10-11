import request from '../request.js'
export default {
	// 获取订单列表
	async getList(data={}){
		let res = await request({
			url: '/api/orders/orderlist',
			method: 'POST',
			data
		})
		return res
	},
	// 订单详情页
	async getDetail(data={}){
		let res = await request({
			url: '/api/orders/order_detail',
			method: 'POST',
			data
		})
		return res
	},
	//客户评价技师
	async techEvaluation(data={}){
		let res = await request({
			url: '/api/user/evaluation_technician', 
			method: 'POST',
			data
		})
		return res
	},
	//取消订单状态
	async get_orderstatus(data={}){
		let res = await request({
			url: '/api/orders/get_orderstatus', 
			method: 'POST',
			data
		})
		return res
	},
	//取消订单
	async cancel_order(data={}){
		let res = await request({
			url: '/api/orders/cancel_order', 
			method: 'POST',
			data
		})
		return res
	},
	async delorder(data={}){
		let res = await request({
			url: '/api/orders/delorder', 
			method: 'POST',
			data
		})
		return res
	},
	//结束订单
	async close_order(data={}){
		let res = await request({
			url: '/api/orders/complete_order', 
			method: 'POST',
			data
		})
		return res
	},
	// 退款
	async user_withdraw(data={}){
		let res = await request({
			url: '/api/user/user_withdraw', 
			method: 'POST',
			data
		})
		return res
	},
	async getPayMethod(data={}){
		let res = await request({
			url: '/api/orders/paymethod', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	}
}  