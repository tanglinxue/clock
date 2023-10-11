var wx = require('jweixin-module')
import store from '@/store'
export function isLogin() {
	const token = store.state.user.token
	//是否登录 /api/user/is_login
	return !!token
}
export function jumpWx(
	REDIRECT_URI = location.href + '/h5/#/pages/home/login',
	appid = '',
) {

	let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
		REDIRECT_URI,
	)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
	location.href = url
}

export function initJssdk(appId, timestamp, nonceStr, signature, jsApiList) {
	console.log(appId, timestamp, nonceStr, signature, jsApiList)

	wx.config({
		debug: false,
		appId,
		timestamp,
		nonceStr,
		signature,
		jsApiList,
	})
}
export function hideMenuItems() {
	// wx.ready({})
	wx.hideAllNonBaseMenuItem()
}
export function wxPay({
	appId,
	timeStamp,
	nonceStr,
	package: mypackage,
	signType,
	paySign,
}) {
	initJssdk(appId, timeStamp, nonceStr, paySign, ['chooseWXPay'])
	return new Promise((resolve, reject) => {
		wx.ready(() => {
			wx.chooseWXPay({
				timestamp: timeStamp,
				nonceStr,
				package: mypackage,
				signType,
				paySign,
				success: function(res) {
					console.log('成功了')
					resolve(true)
				},
				cancel: function(err) {
					console.log('失败了')
					reject(false)
				},
				fail: function(err) {
					console.log('失败了')
					reject(false)
				},
			})


		})
	})
}


export function getLocation({
	appId,
	timestamp,
	nonceStr,
	signature,
}) {
	initJssdk(appId, timestamp, nonceStr, signature, ['checkJsApi','getLocation'])
	return new Promise(function(resolve, reject) {
		
		wx.ready(function() {
      wx.getLocation({
       // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function(res) {
          console.log(res)
          resolve({
            lat: res.latitude,
            lng: res.longitude
          });
        },
        cancel: function() {
    
          uni.showToast({
            title: '定位失败,请重新获取并允许定位',
            duration: 5000,
            icon: 'none'
    
          });
          reject('定位失败,请重新获取并允许定位');
        },
        fail: function() {
    
          uni.showToast({
            title: '定位失败,请检查您设备权限后重新尝试',
            duration: 5000,
            icon: 'none'
    
          });
          reject('定位失败,请检查您设备权限后重新尝试');
        }
      });
    });
		
	})
	
}
export default {
	hideMenuItems
}
