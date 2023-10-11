
// router/modules/therapist.js
// ok
const therapist = [
   {
       path:'/pages/therapist/index',
       name:'therapist',
	   meta:{
	   	 hasTab: 1,
	   },
       component:() => import('@/pages/therapist/index.vue'),
   },
]
export default therapist
