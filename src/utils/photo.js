import { permision } from '@/utils/permission.js';
async function checkPermission(type) {
	let status = permision.isIOS
		? await permision.requestIOS('camera')
		: await permision.requestAndroid('android.permission.CAMERA');
	if (status === null || status === 1) {
		status = 1;
	} else {
		uni.showModal({
			content: '没有开启权限',
			confirmText: '设置',
			success: function(res) {
				if (res.confirm) {
					permision.gotoAppSetting();
				}
			}
		});
	}
	return status;
}
async function  chooseImage() {
	// #ifdef H5
	return new Promise((resolve,reject)=>{
		uni.chooseImage({
			sourceType: ['camera'],
			sizeType: 'compressed ',
			count: 1,
			success: res => {
				resolve(res)
			},
			fail: err => {
				console.log('err: ', err);
			}
		});
	})
	
	// #endif 
	let status = await checkPermission(0);
	return new Promise((resolve,reject)=>{
		if (status !== 1) {
			return reject('权限不允许')
		}
		uni.chooseImage({
			sourceType: ['camera'],
			sizeType: 'compressed ',
			count: 1,
			success: res => {
				resolve(res)
			},
			fail: err => {
				console.log('err: ', err);
			}
		});
	})
	
}
export default chooseImage