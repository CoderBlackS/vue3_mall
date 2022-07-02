const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './build',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        //uno目标测试环境解决跨域
        // target: 'http://192.168.21.4:55/',
        pathRewrite: {
          '^/api': ''
        },
        //如果设置成true：发送请求头中host会设置成target·
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('views', '@/views')
  }
})
