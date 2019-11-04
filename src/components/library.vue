<template>
  <div class="library body">
    <my-header :title="title"></my-header>
    <navs :navList="navList"></navs>
    <div class="content">
      <div class="search" @click="jump_search">
        <div class="wrap">  
          <div class="input flex-bet"><input type="text" disabled></div>
        </div>
      </div>
      <div class="con">
        <div class="wrap">
         
          <dl class="flex-bet">
            <dd v-for="(item, $index) in tabList" :class="[curIndex == $index ? 'cur' : '']" :key="$index" @click="selectClass($index,item)">{{item}}</dd>
          </dl>
        <input v-if="istrue" id="fileBtn" ref="fileBtn" name="file" type="file" value="上传文件" @change="addExcel"/>

          <ul>
            <li v-for="(item, $index) in libraryList" :key="$index" :class="[item.isOpen ? 'on' : '']" @click="open($index)">
              <div class="title flex-bet">
                <h4>{{item.file_name}}</h4>
                <div class="times">{{item.uploadTime}}</div>      
                </div>
              <!-- <a href="item.path" class="text">{{item.file_name}}{{item.file_type}}</a> -->
              <!-- <a href="javascript;:" @click="down(item.path,item.file_name,item.file_type)" class="text">{{item.file_name}}{{item.file_type}}</a> -->
              <div></div>
            </li>    
          </ul>   
        </div>       
      </div>
    </div>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
import Navs from 'components/nav.vue'
import Tab from 'components/tab.vue'
import { Indicator } from 'mint-ui'
import axios from 'axios'
import { getGuoxin } from 'api/request.js'
import qs from 'qs'
export default {
  name: "",
  data() {
    return {
      title: '服务管理数字助手',//页面标题
      navList: ['智库'],//tab切换导航
      tabList: ['专项会议报告', '政策讲话', '事项处理结果'],
      tabiten:"专项会议报告",
      curIndex: 0, 
      istrue:false,
      libraryList: [
 
      ]   
    }
  },
  mounted(){
    var formData = new FormData() // 声明一个FormData对象
// var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
// formData.append('userfile', document.querySelector('input[type=file]').files[0])
    console.log(localStorage.getItem('roleId'));
    if(localStorage.getItem('roleId')== "1"){
        this.istrue = true
      }else{
          this.istrue = false
      }
    this.apost("专项会议报告")
  },
  methods: {
    selectClass($index,item) {
     
      this.tabiten = item
       console.log(this.tabiten)
      this.curIndex = $index
      this.apost(this.tabiten)
    },  
    open($index) {
      this.libraryList[$index].isOpen = !this.libraryList[$index].isOpen     
    },
    jump_search() {
      sessionStorage.setItem('prevPage', '/library')
      this.$router.replace('/search')    
    },
    //请求
    apost(a){
      
      axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/findUploadList?&modul_name='+a).then(res=>{
        console.log(res)
        this.libraryList = res.data.result
        // if(res.data.roleId == "1"){
        //   this.istrue = true
        // }else{
        //   this.istrue = false
        // }
        
      }).catch(err => {
        this.$toast("请求失败")
        console.log(err)
      }) 
    },
    //上传
    addExcel(e){
      let file = e.target.files[0]
      let param = new FormData() //创建form对象
      param.append("file", file);
      console.log(param.get("file"));

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/upload?modual='+this.tabiten, param, config).then((res) => {
            console.log(res)
          })
      // this.$refs.formRef.validate(valid => {
      //   if (valid) {
      //     axios.post('http://192.168.33.244:82/ioc-sz-appService/appDataService/upload', param, config).then((res) => {
      //       console.log(res)
      //     })
      //   }
      // })
    },
    //下载
    down(urls,name,type){
      location.href =encodeURI("http://10.253.100.29:8008/ioc-sz-appService/files/政策讲话-项目工时填报表_伍延龙_7.20至8.20.xlsx"); 
      //http://127.0.0.1:82/ioc-sz-appService/appDataService/download?path= http://192.168.33.247:82/ioc-sz-appService/appDataService/download
    axios.defaults.headers = {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
      var _qs = qs.stringify(urls)

      axios.post('http://192.168.33.247:82/ioc-sz-appService/appDataService/download',qs.stringify({path:urls})).then((res) => {
            console.log(res)
            alert("成功")
          })
          .catch(orr=>{
            alert("失败")
          })
      // alert("1");
      // var fileTransfer = new FileTransfer();
      // console.log(fileTransfer)
      // var uri = encodeURI(urls);
      // var fileURL =  "///storage/emulated/0/DCIM/myFile/1.xlsx";
      // //var fileURL =  "///storage/emulated/0/DCIM/myFile/"+name+type;
      // alert(fileURL);
      // fileTransfer.download(
      //     uri, fileURL, function(entry) {
      //       alert("成功")
      //       console.log("download complete: " + entry.toURL());
      //     },
      //     function(error) {
      //       alert("失败")
      //       console.log("download error source " + error.source);
      //       console.log("download error target " + error.target);
      //       console.log("download error code" + error.code);
      //     },
      //     false, {
      //       headers: {
      //           "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
      //       }
      //     }
      // );
    }     
  },
  components: {
    MyHeader: MyHeader, 
    Navs: Navs, 
    Tab: Tab       
  }
}
</script>

<style scoped>
  .body{padding-top: 1.8rem;}
  .content h3{font-size: .24rem;color:#787878;font-family: "黑体";height: 0.63rem;line-height: .63rem;padding-left: .2rem;}
  .search{margin: .2rem 0 .1rem;}
  .search input{height: .6rem;width: 100%;border-radius: .6rem;background: #fff url(../assets/icon_07.png) no-repeat .2rem center;background-size: .26rem;padding-left: 0.66rem;box-sizing: border-box;}
  .con{background: #fff;min-height: 9.4rem;}
  .con dl{height: 0.63rem;line-height: .63rem;text-align: center;font-size: .24rem;color:#787878;border-bottom: 1px solid #ccc;}
  .con dl dd{padding:0 .3rem;}
  .con dl dd.cur{color:#13b6fe;}
  .con ul{padding-bottom: .6rem;}
  .con li{background: #eee;border-radius: .1rem;padding:.2rem 0 .12rem;margin-top: 0.2rem;}
  .con li .title{padding-right: 0.17rem;}
  .con li h4{font-size: .22rem;color:#181818;padding-left: 0.06rem;border-left: .06rem solid #13b6fe;font-weight: bold;}
  .con li .times{font-size: .22rem;color:#9c9c9c;padding-right: 0.32rem;position: relative;}
  .con li .times::after{content:"";display: block;width:.24rem;height: 100%;background: url(../assets/icon_09.png) no-repeat right center;background-size: .24rem;position: absolute;right:0;top:0;transition: all .5s;}
  .con li.on .times::after{transform: rotate(180deg)}
  .con li .text{font-size: .2rem;line-height: .4rem;color:#717171;padding:.1rem .42rem 0 .14rem;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
  .con li.on .text{-webkit-line-clamp: unset;}
</style>