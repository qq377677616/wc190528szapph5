<template>
  <div class="thing body">
    <my-header :title="title" :isBack="isBack"></my-header>
    <div class="search">
      <div class="wrap">  
        <div class="input flex-bet"><div class="box"><input type="text" /><div class="voice"></div></div><div class="history"></div></div>
      </div>
    </div>
    <div class="content">
      <div class="wrap">
        <h3>历史搜索</h3>
        <dl class="flex">
          <dd v-for="(item, $index) in historyList" :key="$index">{{item}}</dd>
        </dl>    
      </div>
    </div>
    <!-- <tab></tab> -->
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
      isBack: true,//是否可以返回
      title: '服务管理数字助手',//页面标题
      historyList: ['宏观经济', '生态', '规上工业产值', '宏观经济', '生态', '规上工业产值', '宏观经济', '生态', '规上工业产值', '宏观经济', '生态', '规上工业产值']   
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
  .body{background: #fff;}
  .content{margin-top: .23rem;background: #fff;}
  .content h3{font-size: .24rem;color:#787878;font-family: "黑体";padding:.4rem 0;}
  .search{padding: .14rem 0;background: #49C4FB;box-shadow: 0px 6px 9px 0px rgba(33, 82, 119, 0.53);}
  .search input{height: .6rem;width:6.3rem;border-radius: .6rem;background: rgba(255,255,255,.5) url(../assets/icon_07.png) no-repeat .2rem center;background-size: .26rem;padding-left: 0.66rem;box-sizing: border-box;}
  .search .box{position: relative;}
  .search .voice{width:.64rem;height: 100%;background: url(../assets/voice.png) no-repeat center;position: absolute;top:0;right:0;background-size: .24rem;}
  .input .history{width: 0.4rem;height: 0.6rem;background: url(../assets/icon_08.png) no-repeat  center;background-size: 100%;}
  .content dl{flex-wrap: wrap;}
  .content dd{height: 0.58rem;line-height: .58rem;border-radius: .58rem;background: #f8f8f8;padding:0 .2rem;margin:0 0.2rem .15rem 0;font-size: .22rem;color:#999;}
</style>