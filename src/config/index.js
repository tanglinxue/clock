const env = process && process.env && process.env.NODE_ENV;
console.log(env)
const baseApi = ''
 //const baseApi = 'https://bakuser.lespa.cn'
const EnvConfig = {
  development:{
	   baseApi
  },
  production:{
      baseApi
  }
}
export default {
	env,
	...EnvConfig[env]
}