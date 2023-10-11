import config from '@/utils/storage';
import app from '@/main.js'
//finished(登录需完善)
const user = {
	namespaced: true,
	state: {
		phone: '',
		useInfo: config.getObjItem('useInfo'),
		token: config.getItem('token'),
		// #ifdef APP-PLUS
		//token:'4a7accb4-4e9e-493c-92b5-20e9ebd5ba76',
		// #endif
		// #ifdef H5
		//token: config.getItem('token'),
		// #endif
		uerattentionObj: {},//收藏的技师
		configObj: {},
		myPhone: true,
		settingPhone: true,
		appid: '',
		home:0,
		jszm_kefu:'',
		is_location:1,
		is_reply:1,
		tech_recruit:1,
		recommend:1,
		is_kefu:1,
		is_explain:1,
		is_refund:1,
		lng:0,
		lat:0,
		login_type:0
	},
	mutations: {
		saveLocation(state,{lng,lat}){
			state.lng = lng;
			state.lat = lat;
		},
		setjumpHome(state, home) {
			state.home = home
		},
		//appid
		saveAppid(state, {appid,jszm_kefu,is_location,is_reply,tech_recruit,recommend,is_kefu,is_explain,is_refund,login_type}) {
			state.appid = appid;
			state.jszm_kefu = jszm_kefu;
			// #ifdef APP-PLUS
			state.is_location = is_location;
			state.is_reply = is_reply;
			state.tech_recruit = tech_recruit;
			state.recommend = recommend;
			state.is_kefu = is_kefu;
			state.is_explain = is_explain;
			state.is_refund=is_refund;
			state.login_type=login_type
			// #endif
		},
		//收藏的技师
		saveUerattentionObj(state, uerattentionObj) {
			state.uerattentionObj = uerattentionObj
		},
		updateUseInfo(state, { token, userinfo }) {
			state.token = token
			console.log(state.token)
			state.useInfo = userinfo
		},
		// 更新手机号
		updatePhone(state, phone) {
			state.phone = phone
		},
		updateConfig(state, configObj) {
			state.configObj = configObj
		},
		updateMyphone(state) {
			state.myPhone = false
		},
		updateSettingPhone(state) {
			state.settingPhone = false
		}
	},
	actions: {
		updateUseInfo({ commit }, info) {
			const { token, userinfo } = info;
			commit('updateUseInfo', info)
			config.setObjItem('useInfo', userinfo)
			config.setItem('token', token)
		},
		updatePhone({ commit }, phone) {
			commit('updatePhone', phone)
		},
		async updateUerattentionObj({ commit, state }, params) {
			const res = await app.$API.therapist.attention(params)
			if (params.type == 1) {
				app.$methods.showToast('收藏成功')
				const uerattentionObj = { ...state.uerattentionObj, [params.technicianid]: true }
				commit('saveUerattentionObj', uerattentionObj)
			} else {
				app.$methods.showToast('取消收藏')
				const uerattentionObj = { ...state.uerattentionObj }
				if (uerattentionObj[params.technicianid]) {
					delete uerattentionObj[params.technicianid]
				}
				commit('saveUerattentionObj', uerattentionObj)
			}
		}
	}
}
export default user