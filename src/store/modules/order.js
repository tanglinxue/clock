
import app from '@/main.js'
import orderApi from '@/api/modules/order'

const user = {
	namespaced: true,
    state: {
      orderDetail:{
		  product_id:'',
		  num:0,
		  total_project:0,
		  useraddressid:''
	  },
	  payMethods:[]
    },
    getters: {
      
    },
    mutations: {
       saveOrder(state, orderDetail) {
           state.orderDetail = orderDetail
	   },
	   setPayMethods(state,payMethods){
		   state.payMethods = payMethods
	   }
    },
    actions: {
		// 删除
		reduceNum({commit,state},info){
			const order = {...state.orderDetail}
			if(order.product_id && order.product_id == info.id){
				if(order.num <= 0 || (info.min ==1 && order.num==1)) return 
				order.num = order.num-1;
				order.total_project = order.num * info.rate
				if(order.num == 0 ){
					order.product_id = '';
					order.total_project = 0;
				}	
				commit('saveOrder',order)
			}		
		},
		// 新增
		addNum({commit,state},info){
			let order = {...state.orderDetail}
			if(!order.product_id){
				order.product_id = info.id;
				order.num = 1;	
				order.total_project = order.num * info.rate
				order = {...order,...info}
			}else{
				if(order.product_id != info.id || order.num>=9) return
				order.num = order.num+1
				order.total_project = order.num * info.rate
			}
			commit('saveOrder',order)
		},
		async getPayMethod({commit},type){
			const {paymethod} = await orderApi.getPayMethod({type})
			commit('setPayMethods',paymethod)
		}
    }
}
export default user