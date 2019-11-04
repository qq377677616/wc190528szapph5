<template>
  <div class="thing body">
    <my-header :title="title"></my-header>
    <navs :navList="navList"></navs>
    <div class="content">
      <div class="wrap">  
        <div class="meeting">
          <h3>创建会议</h3>
          <dl class="flex">
            <dd v-for="(item, $index) in meetingList" :key="$index" @click="selectMeeting">
              <img :src="require('../assets/meeting_0'+($index+1)+'.png')" alt=""> 
              <p>{{item}}</p>   
            </dd>
          </dl>    
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
export default {
  name: "",
  data() {
    return {
      title: '服务管理数字助手',//页面标题
      navList: ['会议'],//tab切换导航 
      meetingList: ['电话会议', '视频会议']   
    }
  },
  components: {
    MyHeader: MyHeader, 
    Navs: Navs, 
    Tab: Tab       
  },
  methods: {
    selectMeeting() {
      this.$toast('暂未开放，敬请期待')
    }
  }
}
</script>

<style scoped>
  .body{padding-top: 1.8rem;}
  .content{padding-top: .23rem;}
  .content .meeting{background: #fff;border-radius: .1rem;}
  .content h3{font-size: .24rem;color:#787878;font-family: "黑体";height: 0.63rem;line-height: .63rem;padding-left: .2rem;}
  .content dl{padding:.2rem .28rem;border-top: 1px solid #ccc;}
  .content dl dd{text-align: center;margin-right: 0.98rem;}
  .content dl dd img{width: 1.2rem;}
  .content dl dd p{font-size:.24rem;color:#9A9A9A;padding-top: 0.12rem;}
</style>