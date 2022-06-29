import hYRequest from './request'

const hyRequest = new hYRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      // const token = ''
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
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
