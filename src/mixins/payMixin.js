// #ifdef H5
import {
	wxPay
} from '@/utils/wx.js';
// #endif
import store from '@/store'

export default {
	methods: {
		//addPay加钟支付
		//type1为支付
		async payTap({
			api,
			type = 1, //1-下单，2-加钟，3-充值
			payInfo = {}
		}) {
			try {
				if (!this.canclick) return
				this.canclick = false;
				let title = '支付中'
				if (type == 3) {
					title = '充值中'
				}
				setTimeout(()=>{
					this.canclick = true
				},1500)
				this.$methods.showLoading(title)
				// 调接口
				let res = await api;
				uni.hideLoading()
				if (this.payWay == 2) { // 余额支付
					let order_no = res;
					if (type == 1) {
						//下单支付需要发语言
						this.$API.pay.send_singleCallByTts({
							order_no
						})
					}
					this.$methods.showToast('支付成功')
					setTimeout(() => {
						this.$jump('/pages/order/index', 4)
					}, 1500)
					return
				}
				// #ifdef H5
				if (res.appId) {
					//微信支付以及第三方支付
					this.pay(res, type)
				}
				// #endif 
				// #ifdef APP-PLUS
				if (this.payWay == 0) { // 微信支付	
					if (this.createOrder == 1) { //假如是创建订单页面
						this.$jump('/pages/order/index', 4)
					}
					const {
						appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
						noncestr, // 随机字符串
						package: mypackage, // 固定值
						partnerid, // 微信支付商户号
						prepayid, // 统一下单订单号 
						timestamp, // 时间戳（单位：秒）
						sign // 签名，这里用的 MD5/RSA 签名
					} = res;
					let orderInfo = {
						appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
						noncestr, // 随机字符串
						package: mypackage, // 固定值
						partnerid, // 微信支付商户号
						prepayid, // 统一下单订单号 
						timestamp, // 时间戳（单位：秒）
						sign // 签名，这里用的 MD5/RSA 签名
					}
					console.log(JSON.stringify(orderInfo))
					let that = this;
					uni.requestPayment({
						provider: 'wxpay', //支付类型-固定值
						orderInfo,
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
							that.$methods.showToast('支付成功')
							
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err));
							that.$methods.showToast('支付失败')
							
						}
					});
					return
				}else if (this.payWay == 3) { // app中的微信小程序支付	
					let token = store.state.user.token;		
					let order_no = res;
					let scheme = `token=${token}&order_no=${order_no}&type=${type}`
					
					if (this.createOrder == 1) { //假如是创建订单页面
						this.$jump('/pages/order/index', 4)
					}
					plus.share.getServices(res => {
						this.sweixin = res.find(i => i.id === 'weixin')
						if (this.sweixin) {
							scheme = encodeURIComponent(scheme)
							// 分享跳转到微信小程序
							this.sweixin.launchMiniProgram({
								id: payInfo.wechat_xcxid, // 	关联微信小程序的原始ID（"g_"开头的字符串）
								path: `/pages/index/index?scheme=${scheme}`, //	打开小程序的页面路径，不传默认跳转首页
								type: 0 // 	微信小程序版本类型，可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0。
							}, res => {
								console.log('成功唤起微信小程序');
							}, err => {
								console.log('失败');
							})
						} else {
							// 没有获取到微信分享服务
						}
					}, err => {
						// 获取分享服务列表失败
					});
					return
				}else if (this.payWay == 4) { // app中的支付宝小程序支付
				   let platform = uni.getSystemInfoSync().platform;//获取平台判断
					let token = store.state.user.token;
					let order_no = res;
					let scheme = `token=${token}&order_no=${order_no}&type=${type}`
					if (this.createOrder == 1) { //假如是创建订单页面
						this.$jump('/pages/order/index', 4)
					}
					scheme = encodeURIComponent('?' + scheme)
					const url = "alipays://platformapi/startapp?appId=" + payInfo.ali_xcxid +
						"&page=pages/index/index" + scheme;
					console.log(url)
					if (platform == 'android') { 
						plus.runtime.openURL(url)
					} else if (platform == 'ios') { 
						plus.runtime.launchApplication({
							action: url
						})
					}

				}
				// #endif	
			} catch (err) {
				console.log(err)
				this.canclick = true
			}
		},
		async pay(payInfo, type) {
			try {
				let res = await wxPay(payInfo);
				if (type == 3) {
					return this.$methods.showToast('充值成功')	 
				}
				this.$methods.showToast('支付成功')
				if (this.createOrder == 1) { //假如是创建订单页面
					setTimeout(() => {
						this.$jump('/pages/order/index', 4)
					}, 1500)
				}
			} catch (err) {
				console.log(err)
				this.$methods.showToast('您取消了支付')
				if (this.createOrder == 1) { //假如是创建订单页面
					setTimeout(() => {
						this.$jump('/pages/order/index', 4)
					}, 1000)
				}	
			} 
		},
	}

}
