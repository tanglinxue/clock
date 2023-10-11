import config from '@/config'
import store from '@/store'
import storage from '@/utils/storage';
import methods from '@/utils/method.js'
export default function service(options) {
	options.url = config.baseApi + options.url
	const token = store.state.user.token;
	const num = storage.getItem('num')
	return new Promise((resolve, reject) => {
		const header = {
			token,
			'Content-Type': 'application/x-www-form-urlencoded',
			// #ifdef APP-PLUS
			channelfrom: 'app',
			num: 'jishi',
			xitong:uni.getSystemInfoSync().platform === "ios"?"ios":"android",	
			// #endif 
			// #ifdef H5
			channelfrom: 'mp',
			num
			// #endif
		}
		uni.request({
			url: options.url,
			//请求url中如果没有method，默认是get
			method: options.method || 'GET',
			//请求url中如果没有data，默认为空
			data: options.data || {},
			header,
			dataType: 'json',
			success: res => {
				resolve(res.data)
	
			},
			fail: err => {
				uni.hideLoading()
				return uni.showToast({
					title: '请求失败'
				})
				reject(err)
			},
			complete: (res) => {
				console.log("请求的地址为：" + options.url);
				console.log('token' + token)
				console.log("请求的header参数为：" + JSON.stringify(header));
				console.log("请求的body参数为：" + JSON.stringify(options.data));
				console.log("返回结果为：" + JSON.stringify(res));
			},
		})
	})
}
