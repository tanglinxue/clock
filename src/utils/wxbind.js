function Toast(data, duration = 1000) {
	uni.showToast(Object.assign({}, data, {
		duration
	}))
}
import API from '@/api'
export function bindWeiXin() {
	return new Promise(resolve => {
		uni.login({
			provider: 'weixin',
			onlyAuthorize: true,
			success: async (res) => {
				console.log(JSON.stringify(res), /res/)
				try {
					resolve(res.code)
				} catch (e) {}

				
			},
			fail: (err) => {
				console.log('login fail:', err);
				// 一键登录点击其他登录方式
				if (err.code == '30002') {
					Toast({
						title: '其他登录方式'
					})
					return;
				}
				// 未开通
				if (err.code == 1000) {
					uni.showModal({
						title: '登录失败',
						content: `${err.errMsg}\n，错误码：${err.code}`,
						confirmText: '开通指南',
						cancelText: '确定',
						success: (res) => {
							if (res.confirm) {
								setTimeout(() => {
									plus.runtime.openWeb(
										'https://ask.dcloud.net.cn/article/37965'
										)
								}, 500)
							}
						}
					});
					return;
				}
				// 一键登录用户关闭验证界面
				if (err.code != '30003') {
					// uni.showModal({
					// 	showCancel: false,
					// 	title: '登录失败',
					// 	content: JSON.stringify(err)
					// });
					uni.showToast({
						title: '登录失败',
						icon:'none'			
					});
				}
			},
			complete: () => {}
		});
	})

}
