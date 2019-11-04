<template>
  <div class="thing body">
    <my-header :title="title"></my-header>
    <navs :navList="navList"></navs>
    <div class="content">
      <div class="thing-top">
        <div class="wrap">
          <h3>事项处理</h3>
          <dl class="flex-cen">
          <dd v-for="(item, index) in topList" :key="index" @click="selectItem(index)">
              <img :src="require('../assets/thing_0'+(index + 1)+'.png')" alt="">
              <p>{{item}}</p>
          </dd>    
          </dl>
        </div>      
      </div>    
      <div class="thing-bottom">
        <div class="wrap">
          <h3>处理中事项</h3> 
          <ul>
            <li class="flex" v-for="(item, $index) in thingList" :class="[item.type == 1 ? 'jingji' : (item.type == 2 ? 'jiaotong' : 'shengtai')]" :key="$index">
              <div class="icon">{{item.icon}}</div>
              <div class="text">
                <h4>{{item.title}}({{item.num}})</h4>
                <p>{{item.con}}</p>    
              </div>
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
export default {
  name: "",
  data() {
    return {
      title: '服务管理数字助手',//页面标题
      navList: ['事项'],//tab切换导航 
      topList: ['处理中', '已完结', '新建事项'],
      thingList: [
        {type: 1, icon: '经济', title: 'xx区GDP极速下滑', num: 3, con: 'xxx:事项处理中'},    
        {type: 2, icon: '交通', title: 'xx区GDP极速下滑', num: 5, con: 'xxx:事项处理中'},    
        {type: 3, icon: '生态', title: 'xx区GDP极速下滑', num: 2, con: 'xxx:事项处理中'},       
        {type: 2, icon: '交通', title: 'xx区GDP极速下滑', num: 6, con: 'xxx:事项处理中'}    
      ]   
    }
  },
  methods: {
    selectItem(index) {
      if (index == 0) {
        console.log('处理中')
      } else if (index == 1) {
        console.log('已完结')
      } else {
        sessionStorage.setItem('prevPage', '/thing')
        this.$router.replace('/thing/newlyBuild')
      }
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
  .content h3{font-size: .34rem;color:#282828;font-family: "黑体";}
  .content .thing-top{padding-top: 0.43rem;}
  .thing-top dl{padding: .4rem 0 .6rem;}
  .thing-top dl dd{padding:0 .415rem;text-align: center;}
  .thing-top dl dd img{width: 1.2rem;}
  .thing-top dl dd p{font-size: .24rem;padding-top: 0.12rem;}
  .thing-bottom ul{padding:.52rem 0;}
  .thing-bottom li:not(:last-child){margin-bottom: 0.2rem;}
  .thing-bottom li .icon{width:.75rem;height:.75rem;line-height: .75rem;text-align: center;border-radius: 50%;background: #e4e4e4;margin:.14rem .26rem;font-size: .24rem;color:#fff;}
  .thing-bottom li .text{padding:.2rem .25rem .12rem;background: #e4e4e4;border-radius: .1rem;flex:1;}
  .thing-bottom li h4{font-size: .24rem;}
  .thing-bottom li p{font-size: .2rem;color:#979797;padding-top: 0.18rem;}
  .thing-bottom li.jingji .icon{background: #FFAB34;}
  .thing-bottom li.jiaotong .icon{background: #64B74F;}
  .thing-bottom li.shengtai .icon{background: #D97FE3;}
</style>