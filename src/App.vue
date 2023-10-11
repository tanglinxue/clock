<script>
	import storage from '@/utils/storage';
	export default {
		onLaunch() {
		
		},
		onShow: function() {
			console.log("App Show");
		},
		onHide: function() {
			console.log("App Hide");
		},
	};
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "./static/scss/index.scss";

	/*每个页面公共css */
	page {
		background: $backColor;
		font-size: 30rpx;
		color: $maiBlack;
	}
</style>