import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '@/store/types'
import router from '@/router'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import { IAccount } from '@/service/login/types'
import localCache from '@/untils/cache'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    //存token
    changeToken(state, token: string) {
      state.token = token
    },
    //存用户信息
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    //存菜单信息
    changeUserMenus(state, usermenus: any) {
      state.userMenus = usermenus
    }
    //跳转首页
  },
  actions: {
    //账号登录
    async accountLoginAction({ commit }, payload: IAccount) {
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      //请求用户信息
      const userInfoResult: any = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      //请求用户菜单
      const userMenusResult: any = await requestUserMenusByRoleId(
        userInfo.role.id
      )
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      //跳转首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
