import hYRequest from './request'
import localCache from '@/untils/cache'
const hyRequest = new hYRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (config && config.headers) {
        // 多一步判断
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch(error) {
      return error
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch(error) {
      return error
    }
  }
})
export default hyRequest
