const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/resources/game/wechat/szq/szapph5/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components',resolve('src/components'))
      .set('common',resolve('src/common'))
      .set('base',resolve('src/base'))
      .set('api',resolve('src/api'))
  },
  devServer: {
    //host: '127.0.0.1',
    host: '10.253.100.29',
    port: 8008,
    // host: '10.211.0.78',
    // port: 8008,
    // proxy: {
    //   '/api': {
    //     //target: 'http://10.253.114.18:1080/indicator/rest/ind/execution/query', //对应自己的接口
    //     target: 'http://192.168.33.244:82/ioc-sz-appService/', //对应自己的接口
    //     // target: 'https://game.flyh5.cn/game/wuhui/wxapplet/applet/public/api/meituan', //对应自己的接口
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   }
    // }
  },
  css: {
    sourceMap: true, // 开启 CSS source maps
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
  // presets: ["@vue/app"],
  // plugins:[
  //     [
  //       "component",
  //       {
  //         "libraryName": "mint-ui",
  //         "style": true
  //       }
  //     ]
  // ]
};