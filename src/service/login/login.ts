import hyRequest from '@/service'
import { IAccount, ILoginResult, IDataType } from './types'
//登录操作存token
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: '/login',
    data: account
  })
}
//通过id请求用户的信息
export function requestUserInfoById(id: number) {
  return hyRequest.get({
    url: '/users/' + id
  })
}
//请求用户菜单
export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: '/role/' + id + '/menu',
    showLoading: false
  })
}
