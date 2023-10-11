import request from '../request.js'
export default {
	//我的页面
	async mypage(data={}) {
		let res = await request({
			url: '/api/user/mypage', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//我的收藏（关注的技师）
	async getMyattention(data={}){
		let res = await request({
			url: '/api/user/myattention', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//我的优惠券
	async getCouponList(data={}){
		let res = await request({
			url: '/api/user/user_coupon', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//兑换优惠券
	async exchangeCode(data={}){
		let res = await request({
			url: '/api/user/exchange_code', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//技师招募
	async techRecruit(data={}){
		let res = await request({
			url: '/api/user/technician_recruit', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	
	//充值记录
	async rechagelist(data={}){
		let res = await request({
			url: '/api/user/rechagelist', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//我的地址
	async myAddress(data={}){
		let res = await request({
			url: '/api/user/myaddress', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//消费
	async getBillist(data={}){
		let res = await request({
			url: '/api/user/billist', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//退款记录
	async withdrawlist(data={}){
		let res = await request({
			url: '/api/user/withdrawlist', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//用户注销
	async deluser(data={}){
		let res = await request({
			url: '/api/user/deluser', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	// 上传接口
	async upload_qn(data={}){
		let res = await request({
			url: '/api/user/upload_qn', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//退出登录
	async logout(data={}){
		let res = await request({
			url: '/api/user/logout', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//获取手机号验证码
	async getSms(data={}){
		let res = await request({
			url: '/api/sms/send', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	// 设置手机号
	async changemobile(data={}){
		let res = await request({
			url: '/api/user/changemobile', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//获取客服
	async getXt_config(data={}){
		let res = await request({
			url: '/api/user/xt_config', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//获取appid
	async geth5_config(data={}){
		let res = await request({
			url: '/api/user/h5_config', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//获取问题类型
	async get_question_type(data={}){
		let res = await request({
			url: '/api/index/get_question_type', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//提交反馈意见
	async submit_feedback(data={}){
		let res = await request({
			url: '/api/user/submit_feedback', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	//提交反馈意见
	async get_feedback(data={}){
		let res = await request({
			url: '/api/user/get_feedback', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
	async submit_explain(data={}){
		let res = await request({
			url: '/api/user/submit_explain', //仅为示例，并非真实接口地址。
			method: 'POST',
			data
		})
		return res
	},
}
