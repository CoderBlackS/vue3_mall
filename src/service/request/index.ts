import axios from 'axios'
import { ElLoading } from 'element-plus'
//引入axios已实现好的接口 AxiosInstance
import type { AxiosInstance } from 'axios'
//基于axios实现好的接口 引入自己的接口数据
import type { HYRequestInterceptors, HYRequestConfig } from './type'
const DEFAULT_LOADING = true
class hYRequest {
  instance: AxiosInstance //axios interface
  interceptors?: HYRequestInterceptors //接口
  loading?: any //可選類型，因新版element-plus沒有loading類型 所以寫為any
  showLoading: boolean //是否要草傳入顯示showLoading
  //HYRequestConfig继承自AxiosRequestConfig进行扩展
  constructor(config: HYRequestConfig) {
    //創建axios實例
    this.instance = axios.create(config)
    //保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors
    //使用拦截器
    //1、从config中取出拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 2、添加所有的实例都有请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //判断传入的showLoading的类型添加Loading状态
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求中...',
            background: 'rgba(0,0,0,.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    //2、添加所有实例都有响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        //將loading移除
        this.loading?.close()
        if (data.returnCode === '-1001') {
          console.log('请求失败~')
        } else {
          return data
        }
      },
      (err) => {
        //判断不同的httpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  }
  //添加请求类型
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //1、單個請求對請求config的處理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          //  不管之前是什麼樣的值最後showLoading一定為 true，這樣不會影響下一次請求
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default hYRequest
