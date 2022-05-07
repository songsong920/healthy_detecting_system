const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  build: {
    sitEnv: require('./sit.env'),
    prodEnv: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/', //请根据自己路径配置更改
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8888,
    host: '0.0.0.0',
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://124.222.228.91:8080', //后端接口地址
        changeOrigin: true,//是否允许跨越
        pathRewrite: {
          '^/api': ''
        }
      },
    },
    cssSourceMap: false
  },
}
