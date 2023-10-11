module.exports = {
	transpileDependencies: ['uview-ui', 'uni-simple-router'],
	devServer: {
		// 调试时允许内网穿透，让外网的人访问到本地调试的H5页面
		disableHostCheck: true,
		"proxy": {
			// '/api': {
			// 	target: 'https://djtnservice.dongjiaoapp.com',
			// 	changeOrigin: true,
			// 	pathRewrite: {
			// 		'/api': ''
			// 	},
			// },
			'/api': {
				// target: 'http://xcx10.datikeji.com',
				target:'https://user.lespa.cn',
				changeOrigin: true,
				pathRewrite: {
					'/api': ''
				},
			},
		}
	}
}
