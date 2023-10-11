// router/modules/setting.js
const setting = [
   {
       path:'/pages/setting/index',
       name:'setting',
       component:() => import('@/pages/setting/index'),
   },
   {
       path:'/pages/setting/about',
       name:'about',
       component:() => import('@/pages/setting/about'),
   },
   {
       path:'/pages/setting/safe',
       name:'setting',
       component:() => import('@/pages/setting/safe'),
   }
]
export default setting