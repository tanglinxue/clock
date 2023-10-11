// finished
export default {
	data() {
		return {
			status: 'loadmore',
			total: 0,
			loading: true,
			list: [],
			area:'',//城市
			keywords:'',//姓名
			product_id:'',//项目名
			query:{
				page: 1,
				pagesize:10,
				lng: 0,
				lat: 0,
			},
			canApponitObj:{
				value:true
			},
			api:this.$API.therapist.getList //api
		};
	},
	provide(){
		return {
			canApponit:this.canApponitObj
		}
	},
	methods: {
		// 获取列表
		async getList() {
			// 微信环境才获取经纬度
			// if(this.$Weixin){		
			// 	this.query.lat = 30.246429;
			// 	this.query.lng = 120.210556;
			// }
			// if(!this.canNotGetLocation){
			// 	if(this.from=='myPage'){
			// 		this.canNotGetLocation = true
			// 	}
			// 	const {lat,lng} = await this.$methods.getLocation()
			// 	this.query.lat = lat;
			// 	this.query.lng = lng;
			// 	if(this.from=='myPage' && lat>0){
			// 		this.canNotGetLocation = false
			// 	}
			// }
			const {lat,lng} = await this.$methods.getLocation()
			this.query.lat = lat;
			this.query.lng = lng;
			const {
				loading,
				list,
				query,
				area,
				keywords,
				product_id
			} = this;
			this.status = 'loading'
			let res = await this.getTechInfo({
				...query,
				area,
				keywords,
				product_id
			})
			uni.hideLoading()
			let {list: clist,all_count: total,city} = res;
			if (loading) {
				this.loading = false
			}
			const {page} = query
			if (page !== 1) {
				this.list = [...list, ...clist];
			} else {
				this.list = clist
			}
			this.total = total;
			if (total > this.list.length) {
				this.status = 'loadmore'
			} else {
				this.status = 'nomore'
			}
		},
		async getTechInfo(params){
			let res = await this.api(params)
			if(params.area){
				if (res.city!=params.area){
					this.canApponitObj.value = false
				}else{
					this.canApponitObj.value = true
				}
			}else{
				this.area = res.city || '';
				this.canApponitObj.value = true
			}
			// 关注的对象
			const uerattention = res.uerattention
			if(uerattention&& uerattention instanceof Array){
				const uerattentionObj = {}
				uerattention.forEach(item=>{
					uerattentionObj[item.tecid] = true
				})
				this.$store.commit('user/saveUerattentionObj',uerattentionObj)
			}

			return res.technician
		},
		// 刷新
		async refreshList(){
			this.query.page = 1;
			this.total= 0;
			this.list = []
			await this.getList()
		}
	},
	onReachBottom() {
		// 下拉加载更多
		if (this.status === 'loadmore' && !this.hideLoading) {
			this.query.page = this.query.page + 1;
			this.getList()
		}
	},
}