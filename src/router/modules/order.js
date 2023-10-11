// router/modules/home.js
//ok
const order = [
   {
       path:'/pages/order/index',
       name:'order',
	   meta:{
	   	 hasTab: 1,
	   },
       component:() => import('@/pages/order/index.vue'),
   },
   {
	   path:'/pages/order/createOrder',
	   name:'createOrder',
	   component:() => import('@/pages/order/createOrder.vue'),
   },
   {
   	   path:'/pages/order/cancelOrder',
   	   name:'cancelOrder',
   	   component:() => import('@/pages/order/cancelOrder.vue'),
   },
   {
   	   path:'/pages/order/rating',
   	   name:'rating',
   	   component:() => import('@/pages/order/rating.vue'),
   },
   {
   	   path:'/pages/order/orderDetail',
   	   name:'orderDetail',
   	   component:() => import('@/pages/order/orderDetail.vue'),
   }
]
export default order
