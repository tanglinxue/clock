
// router/modules/pay.js
//ok
const pay = [
   {
       path:'/pages/pay/index',
       name:'pay',
       component:() => import('@/pages/pay/index'),
   },
   {
       path:'/pages/pay/record',
       name:'record',
       component:() => import('@/pages/pay/record'),
   },
   {
       path:'/pages/pay/refund',
       name:'refund',
       component:() => import('@/pages/pay/refund'),
   }
]
export default pay
