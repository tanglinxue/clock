import request from '../request.js'
export default {
	// 获取技师列表
	async getList(data={}){
		let res = await request({
			url: '/api/technicians/getTechnician',
			method: 'POST',
			data
		})
		return res
	},
	//已开通城市列表
	async getCitys(data={}){
		let res = await request({
			url: '/api/index/get_city', 
			method: 'POST',
			data
		})
		return res
	},
	//技师的项目列表
	async getProductList(data={}){
		let res = await request({
			url: '/api/technicians/tech_product',
			method: 'POST',
			data
		})
		return res
	},
	//客户对技师的评价详情
	async getComment(data={}){
		let res = await request({
			url: '/api/technicians/te_comment_details',
			method: 'POST',
			data
		})
		return res
	},
	//收藏/取消收藏技师
	async attention(data={}){
		let res = await request({
			url: '/api/technicians/attention',
			method: 'POST',
			data
		})
		return res
	},
	// 技师服务时间
	async technicianTime(data={}){
		let res = await request({
			url: '/api/technicians/technician_time',
			method: 'POST',
			data
		})
		return res
	},
	// 计算车费，距离，交通方式
	async orderMode(data={}){
		let res = await request({
			url: '/api/orders/order_mode',
			method: 'POST',
			data
		})
		return res
	},
	// 下单
	async createOrder(data={}){
		let res = await request({
			url: '/api/orders/submit_order',
			method: 'POST',
			data
		})
		return res
	},
	// 加单
	async submit_order_add(data={}){
		let res = await request({
			url: '/api/orders/submit_order_add',
			method: 'POST',
			data
		})
		return res
	},
}  