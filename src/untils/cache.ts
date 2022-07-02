class LocalCache {
  //localStorage存值
  setCache(key: string, value: string) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  //localStorage取值
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  //删除单独的key的localStorage
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  //删除localStorage所有的
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
