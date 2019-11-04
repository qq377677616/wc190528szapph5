<template>
  <div class="chat body">
    <my-header :title="title"></my-header>
    <navs :navList="navList"></navs>
    <div class="content">
      <div class="chat">
        <dl class="wrap" ref="chatBox">
          <dd v-for="(item, index) in thingList" :key="index" :class="[item.type == 1 ? 'my' : '']" @click="jump_assistant(item.type, index,item.name)">
            <div class="avatar"></div>
            <div class="message">{{item.con}}</div>  
          </dd>
        </dl>
      </div>
      <div class="inputs">
        <div class="flex-bet">
          <div class="voice"></div>
          <div class="input">
            <input type="text" id="inputs" v-model="message" @blur="blur" @focus="focus" ref="input">
            <div class="voice-box"></div>
          </div>
          <div class="expression"></div>
          <div class="send-out" @click="submit" @keydown.enter="submit">发送</div>  
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
import { backPageTop } from 'common/js/util.js'
import { getGuoxin } from 'api/request.js'
export default {
  name: "",
  data() {
    return {
      title: '服务管理数字助手',//页面标题
      navList: ['数字助手'],//header切换导航 
      message: '',
      isSubmit: false,
      thingList: [],
      texts: ['不要急，容我想想~', '稍等，我给您查询下这个问题', '这个我还真不知道~', '这个问题数字小i表示也爱莫能助~', '这个问题您可以去百度~', '查询系统故障，请稍后再试~']   
    }
  },
  mounted() {
    setTimeout(() => {
      this.thingList.push({type: 0, con: '数字小i 为您服务，请问您需要查询什么内容？'})
    }, 600)  
  },
  methods:{
    jump_assistant(type, index,name) {
      if (type == 0 && index > 0) {
        //this.$router.replace('assistant')
        //{name:'home',query: {id:'1'}}
        this.$router.replace({name:'ecology',query: {name:name}})
      }
    },
    submit() {
      if (this.message == '' || this.isSubmit) return
      this.isSubmit = true
      this.thingList.push({type: 1, con: this.message,name:""})
      
      this.$nextTick(() => { this.scrollTopMax() })
      
      setTimeout(() => {
        this.isSubmit = false
        getGuoxin('appDataService/findIndexList?indexName='+this.message,{}).then(res => {
          this.message = ''
        if(res.state.code == 500){
          this.$toast(res.state.message)
          this.$router.push({path:'/login'});
        }else if(res.state.code == 200){
          if(res.result.length>0){
            for(let i=0; i<res.result.length; i++){
              this.thingList.push({type: 0, con: res.result[i].f_name,name:res.result[i].module_name})
            }
          }else{
            this.thingList.push({type: 0, con: "暂无数据",name:""})
          }
          console.log(res.result) 
          //if()
        }
        console.log(res)
      }).catch(err => {
        this.$toast("请求失败")
        console.log(err)
      }) 
        // this.thingList.push({type: 0, con: this.texts[Math.floor(Math.random() * this.texts.length)]})
        this.$nextTick(() => { this.scrollTopMax() })
        console.log(this.thingList)
      }, 1000)
    },
    scrollTopMax() {
      document.body.scrollTop = this.$refs.chatBox.offsetHeight
      document.documentElement.scrollTop = this.$refs.chatBox.offsetHeight
    },
    focus() {
      setTimeout(() => {
        document.body.scrollTop = 100000000
      }, 200)
    },
    blur() {
      backPageTop()
      setTimeout(() => {
        this.scrollTopMax()
      }, 50)
      // this.$nextTick(() => { this.scrollTopMax() })
    }
  },
  components: {
    MyHeader: MyHeader, 
    Navs: Navs, 
    Tab: Tab       
  },
}
</script>

<style scoped>
  .body{padding-top: 1.8rem;}
  .content h3{font-size: .34rem;color:#282828;font-family: "黑体";}
  .chat{padding-bottom:.9rem;}
  .chat dl{padding:.4rem 0;}
  .chat dd{margin:.2rem 0;position: relative;display: flex;} 
  .chat dd .avatar{width:.75rem;height: .75rem;border-radius: 50%;background: url(../assets/chat_01.png) no-repeat center;background-size: cover;}
  .chat dd.my .avatar{background-image: url(../assets/avatar.jpg);}
  .chat dd .message{max-width:1.95rem;background: #e4e4e4;border-radius: .1rem;padding:.26rem .45rem;font-size: .24rem;line-height: .4rem;color:#282828;margin:0 .2rem;position: relative;word-break: break-all;font-weight: bold;}
  .chat dd .message::after{content: "";display: block;width:0;height: 0;border:.13rem solid transparent;border-right-color: #e4e4e4;position: absolute;right:100%;top:.23rem;}
  .chat dd.my{flex-direction: row-reverse;}
  .chat dd.my .message::after{border-right-color: transparent;border-left-color: #e4e4e4;left:100%;right:auto;} 
  .inputs{position: fixed;width: 100%;left:0;bottom:1rem;background: #fff;}
  .inputs>div{height: 0.9rem;}
  .inputs .voice{width:.9rem;height: 100%;background: url(../assets/chat_02.png) no-repeat center;
  background-size: .48rem;}
  .inputs .input{flex:1;height:.7rem;line-height: .7rem;}
  .inputs .input input{width:100%;height: 100%;border:1px solid #44CACF;padding-left: 0.12rem;box-sizing: border-box;font-size: .3rem;}
  .inputs .expression{width:.7rem;height: 100%;background: url(../assets/chat_03.png) no-repeat center;
  background-size: .48rem;}
  .inputs .send-out{width:.75rem;height: 0.7rem;line-height: .7rem;background: #3AAEFF;text-align: center;font-size: .22rem;color: #fff;margin-right: 0.14rem;}
</style>