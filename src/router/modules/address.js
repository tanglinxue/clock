// router/modules/address.js
//ok
const address = [
   {
       path:'/pages/address/index',
       name:'address',
       component:() => import('@/pages/address/index'),
   },
   {
       path:'/pages/address/addSite',
       name:'addSite',
       component:() => import('@/pages/address/addSite'),
   }  
]
export default address