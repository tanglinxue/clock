<template>
	<view class="main column-center">
		<view class="txt1">欢迎登录消息精灵</view>
		<view class="txt1">请求次数{{num}}</view>
		<image src="/static/images/logo.jpg?num=2" class="logo" mode="widthFix"></image>
		<view class='nav'>
			<view v-for="(item, index) in arr" :key="index" class="item">{{ item }}</view>
		</view>
		<template>
			<view class='login-box mgb40'>
				<input type="text" placeholder="请输入消息接口地址" class='input' :inputBorder='false' v-model="apiUrl" />
			</view>
			<button class="main-btn" @click='confirmSure'>确定</button>
		</template>

	</view>
</template>

<script>
	import storage from '@/utils/storage';
	export default {
		data() {
			return {
				apiUrl: '',
				innerAudioContext: null,
				arr: [],
				player:null,
				num:0
			}
		},
		onLoad() {
			if (storage.getItem('apiUrl')) {
				this.apiUrl = storage.getItem('apiUrl')
			}
			this.wakeLock()
			
		},
		methods: {
			wakeLock() {  
				var g_wakelock = null;  
			    //Android  
			    var main = plus.android.runtimeMainActivity();  
			    var Context = plus.android.importClass("android.content.Context");  
			    var PowerManager = plus.android.importClass("android.os.PowerManager");  
			    var pm = main.getSystemService(Context.POWER_SERVICE);  
			    g_wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "ANY_NAME");  
			    g_wakelock.acquire();  
			},
			confirmSure() {
				if (!this.apiUrl) {
					this.$methods.showToast('请输入消息接口地址');
					return;
				}
				storage.setItem('apiUrl', this.apiUrl)
				this.render()
			},
			async setClock() {
				try{
					this.num = this.num+1
					let res = await this.$API.home.getHomeData(this.apiUrl)
					console.log(res)
					let need = false
					if (res) {
						res = res.substr(2, res.length - 6)
						let arr = res.split("','")
						this.arr = arr.map(item => item.split(',')[0] + ',' + item.split(',')[1])
						let arr2 = arr.map(item => item.split(',')[2])
						if (arr2.includes('0')) {
							need = true
						}
					}
					if (!need) {
						return
					}
					if (!this.innerAudioContext) {
						const innerAudioContext = uni.createInnerAudioContext();
						innerAudioContext.src = '../../static/mp3/clock.m4a'; //铃声文件的路径
						this.innerAudioContext = innerAudioContext;
					}
					
					if (uni.getSystemInfoSync().platform == "ios") {
						plus.device.vibrate();
						plus.device.beep();
						this.innerAudioContext.play();
					} else if (uni.getSystemInfoSync().platform == "android") {
						// 震动
						plus.device.vibrate(500);
						console.log('开始播放');
						this.innerAudioContext.play();
					}
				}catch(err){
					console.log(err)
				}
				
			},
			render() {
				this.setClock()
				if(this.player){
					clearInterval(this.player)
					this.player = null
				}
				if (this.innerAudioContext) {
					this.innerAudioContext.stop();
				}
				
				this.player = setInterval(() => {
					this.setClock()
				}, 30000)
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "@/static/scss/index.scss";

	.login-box {
		padding: 20rpx 30rpx;
		border: 1px solid #eeeeee;
		border-radius: 12rpx;
		height: 100rpx;
		width: 600rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.icon1 {
			width: 26rpx;
			height: 36rpx;
			margin-right: 28rpx;
			position: relative;
			top: -3rpx
		}

		.icon2 {
			width: 34rpx;
			height: 34rpx;
			margin-right: 20rpx;
			position: relative;
			top: -3rpx
		}

		.input {
			flex: 1
		}

	}

	.nav {
		margin-bottom: 30px;
		max-height: 300px;
		overflow-y: auto;

		.item {
			margin-bottom: 5px;
		}
	}

	.main {
		padding: 30px 100rpx 0;

		.txt1 {
			font-size: 40rpx;
			margin-bottom: 30rpx;
		}

		.txt2 {
			font-weight: bold;
			margin-bottom: 30rpx;
		}

		.txt3 {
			position: fixed;
			bottom: 50rpx;
			font-size: 26rpx;
			color: $gray;
		}

		.logo {
			width: 140rpx;
			margin-bottom: 100rpx;
		}

		.main-btn {
			width: 100%;
		}
	}
</style>