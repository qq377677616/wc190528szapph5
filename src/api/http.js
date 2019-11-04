import axios from 'axios';
import Qs from 'qs'

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='http://10.253.100.29:8008/ioc-sz-appService/';

//console.log(token)
//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');
    // var authtoken = localStorage.getItem("token") ? localStorage.getItem("token") : null
    config.data = Qs.stringify(config.data);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
    // if(authtoken){
    //   config.headers["Authorization"] = 'Bearer ' + authtoken
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
		//console.log(response.data.errCode);
    if(response.data.errCode ==2){
      router.push({
        path:"/auth",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
		let data = error.response.data;
		if (error.response && error.response.status === 401) {
					let url = (error.config.url).split("/");
					url = url[url.length - 1]
           if(url!="auth"){ //通过URL 判断不是登录请求回到请求页面；
						  window.location.href ="/#/login";
					 }else{
						  return Promise.reject(data);
					 }
        }else{	
            return Promise.reject(error.message);
				}			
    return Promise.reject(error)
  }
)
/**
 * 封装get方法
 */
export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}
/**
 * 封装post请求
 */
 export function post(url,data = {}){
  //console.log(data)
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
					.catch(err=>{
					 reject(err)
				})
   })
 }