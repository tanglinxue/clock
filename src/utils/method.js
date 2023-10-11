import store from '@/store'
import API from '@/api'
// #ifdef H5
import {
	getLocation
} from './wx.js'
// #endif
// #ifdef APP-PLUS
import {
  getLocation
} from '@/utils/permission.js'
	// #endif 
export function jump(url, type = 1) {
	let canJump = toLogin(url)
	if (!canJump) return
	if (type === 1) {
		uni.navigateTo({
			url
		});
	} else if (type === 2) {
		uni.redirectTo({
			url
		})
	} else if (type === 3) {
		uni.switchTab({
			url
		})
	} else if (type === 4) {
		uni.reLaunch({
			url
		})
	}
}

export function toLogin(current = getCur()) {
	console.log('token' + store.state.user.token)
	const token = store.state.user.token
	// 白名单
	let list = ['pages/home/login', 'pages/home/index', 'pages/agreement/index','pages/webview/index'];
	// 获取当前页面地址
	if (!current) {
		return false
	}
	const noNeedToken = list.some(item => current.indexOf(item) > -1);
	if (!noNeedToken && !token) {
		uni.navigateTo({
			url: '/pages/home/login'
		});
		return false
	}
	console.log('放行了')
	return true
}
// 获取当前页面
export function getCur() {
	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	if (!routes.length) {
		return false
	}
	return routes[routes.length - 1].route //获取当前页面路由
}
let locationSuccess = true
// finished(权限校验)
// 获取地理位置
export default {
	needToLogin() {
		const token = store.state.user.token;
		if (!token) {
			uni.navigateTo({
				url: '/pages/home/login'
			});
			return false
		}
		return true
	},
	toLogin,
	hasPhone() {
		const phone = store.state.user.phone
		return !!phone
	},
	// 获取位置
	async getLocation() {
		// #ifdef APP-PLUS
		const {is_location} = store.state.user;
		const {lat,lng} = await  getLocation()
		store.commit("user/saveLocation", { lat,lng })
		return new Promise((resolve)=>resolve({lat,lng}))
		// #endif
		// #ifdef H5
		const res = await API.home.getConfig({
			url: location.origin + location.pathname
		})
		return getLocation(res)
		// #endif
	},
	// 地图选择
	chooseLocation() {
		return new Promise((resolve, reject) => {
			var geolocation = new qq.maps.Geolocation("4U4BZ-VP3KU-W5TVC-BFILJ-JPWYE-GNBX2", "myapp");
			var options = {
				timeout: 8000
			};
			geolocation.chooseLocation(showPosition, showErr, options);

			function showPosition(res) {
				resolve(res)
			}

			function showErr() {
				resolve({})
			}
		})
	},
	// 获取上一页
	prePage() {
		let pages = getCurrentPages();
		let prePage = pages[pages.length - 2];
		return prePage;
	},
	showToast(title = '标题', icon = 'none', duration = 2000) {
		uni.showToast({
			title,
			duration,
			icon,

		});
	},
	showLoading(title = '加载中...') {
		uni.showLoading({
			title,
			mask: true
		})
	},
	//获取今天，明天，后天的日期
	getDate(type = 0, count = 3) {
		let day = new Date();
		day.setTime(day.getTime() + 24 * 60 * 60 * 1000 * type);
		if (count == 2) {
			return this.getTwo(day.getMonth() + 1) + "-" + this.getTwo(day.getDate())
		}
		return day.getFullYear() + '-' + this.getTwo(day.getMonth() + 1) + "-" + this.getTwo(day.getDate())
	},
	// 时间+0
	getTwo(date) {
		if (date < 10) {
			return '0' + date
		} else {
			return date
		}
	},
	// 获取时间戳
	getTime(time) {
		let day = new Date();
		return this.getTimeStamp(day.getFullYear() + '-' + (day.getMonth() + 1) + "-" + day.getDate() + ' ' + time)
	},
	getTimeStamp(time) {
		return parseInt(new Date(time.replace(/-/g, '/')).getTime() / 1000)
	},
	// 弹窗
	showModal(content = '', title = '温馨提示', confirmText = '确定', cancelText = '取消', showCancel = true) {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title,
				content,
				confirmText,
				cancelText,
				showCancel,
				success: function(res) {
					if (res.confirm) {
						resolve(true)
					} else if (res.cancel) {
						reject('false')
					}
				}
			});
		})
	},
	//  时间格式化
	format(time = 0, type = 'yyyy-MM-dd HH:mm:ss') {
		if (Number(time).toString().length < 11) {
			time = time * 1000
		} else {
			time = time * 1
		}

		/**
		 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
		 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg: (new
		 * Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
		 * Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
		 * Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
		 * Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
		 * Date()).format("yyyy-M-d h:m:s.S q ") ==> 2006-7-2 8:9:4.18
		 */
		Date.prototype.format = function(fmt) {
			var o = {
				"Y+": this.getFullYear(),
				"M+": this.getMonth() + 1,
				// 月份
				"d+": this.getDate(),
				// 日
				"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
				// 小时
				"H+": this.getHours(),
				// 小时
				"m+": this.getMinutes(),
				// 分
				"s+": this.getSeconds(),
				// 秒
				"q+": Math.floor((this.getMonth() + 3) / 3),
				// 季度
				S: this.getMilliseconds(),
				// 毫秒
			};
			var week = {
				"0": "日",
				"1": "一",
				"2": "二",
				"3": "三",
				"4": "四",
				"5": "五",
				"6": "六",
			};
			if (/(y+)/.test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
			if (/(E+)/.test(fmt)) {
				fmt = fmt.replace(
					RegExp.$1,
					(RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") +
					week[this.getDay() + ""]
				);
			}
			for (var k in o) {
				if (new RegExp("(" + k + ")").test(fmt)) {
					fmt = fmt.replace(
						RegExp.$1,
						RegExp.$1.length == 1 ? "" + o[k] : ("00" + o[k]).substr(("" + o[k]).length)
					);
				}
			}
			return fmt;
		};

		return new Date(time).format(type);
	},

}
