import axios from 'axios'
import Qs from 'qs'
let REQUESTURL = '/api' //跨域请求代理
//接口请求头部配置// h5_undefined_cf07c37c-0fbc-4709-a260-08f9351747fd
let access_token = 'h5_official_5dc81639-7f9e-4ca7-abcf-d8a3bf26de80'
const device_uuid = 'ce2b347168ec4a9b8d45cefe7c34075e'
const lang = 'zh-CHS'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true; 
if (process.env.NODE_ENV == 'development'){//本地开发模式
  console.log("【本地开发模式】")
  REQUESTURL = 'http://10.253.100.29:8008/ioc-sz-appService/'
  // axios.interceptors.request.use(
  //   config => { 
  //     config.headers.access_token = access_token
  //     config.headers.device_uuid = device_uuid
  //     config.headers.lang = lang
  //     config.headers.request_uuid = Math.random().toString(36).substr(2) + new Date().getTime() + Math.floor(Math.random() * 100000)
  //     config.headers.user_timezone = (new Date().getTimezoneOffset() / 60) * -1
  //     return config
  //   },
  //   error => {
  //     return Promise.reject(error)
  //   })
  } else {//线上部署模式
    console.log("【线上部署模式】")
    //REQUESTURL = 'http://allbet-game.wiccdev.org:9090/game'
    REQUESTURL = 'http://10.253.100.29:8008/ioc-sz-appService/'
    // axios.interceptors.request.use(
    // config => { 
    //   config.headers.device_uuid = device_uuid
    //   config.headers.lang = lang
    //   config.headers.request_uuid = Math.random().toString(36).substr(2) + new Date().getTime() + Math.floor(Math.random() * 100000)
    //   config.headers.user_timezone = (new Date().getTimezoneOffset() / 60) * -1
    //   return config
    // },
    // error => {
    //     return Promise.reject(error)
    // })
}

// 添加响应拦截器
// axios.interceptors.response.use((response)=> {
//   console.log("响应拦截器", response)
//   // 对响应数据做点什么
// //   if (response.data.code === 2011) {
// //       if (typeof wayki != 'undefined' ) {
// //           wayki.loginOut(); 
// //       } else {
// //           bridge.callhandler('notifyAppSignOut', {token: localStorage.getItem('token'), code: response.data.code, api: response.config.url})
// //       }
// //   }
//   return response;
// // }, (error)=> {
// //   return Promise.reject(error);
// });

 
//pm2.5年均浓度及目标值
// var isOk = [9, 20];
// if ((new Date().getMonth() + 1 == isOk[0] && new Date().getDate() >= isOk[1]) || new Date().getMonth() + 1 >= isOk[0] + 1) { isOk = false; }
export function getGuoxin(u,data) {
    let url = REQUESTURL+u
    console.log(url)
    return axios.post(url,Qs.stringify(data)).then((res) => {
      console.log("chenggong")
      return Promise.resolve(res.data)
    }).catch((err) => {
      console.log("shibai")
      return Promise.reject(err)
    })      
}