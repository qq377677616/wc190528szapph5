<template>
  <div class="security body">
    <my-header :title="title" :isBack="isBack"></my-header>
    <navs :navList="navList" @selectNav="selectNav" :curIndex="curIndex"></navs>
    <router-view :clickAdd="isClickAdd"></router-view>
    <!-- <tab></tab> -->
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
import Navs from 'components/nav.vue'
import Tab from 'components/tab.vue'
import Build from 'components/build.vue'
export default {
  name: "",
  data() {
    return {
      isBack: true,//是否可以返回
      title: '服务管理数字助手',//页面标题
      navList: ['总体态势','企业服务','便民服务'],//tab切换导航 
      curIndex: 0, 
    }
  },
  created() {
    let _url = window.location.href.toLowerCase() || ''
    if (_url.indexOf('enterprise') != -1) {
      this.curIndex = 1    
    } else if (_url.indexOf('then') != -1) {
      this.curIndex = 2    
    }
  },
  
  components: {
    MyHeader: MyHeader, 
    Navs: Navs, 
    Tab: Tab,
    Build: Build      
  },
  methods: {
    selectNav(params) {
      this.curIndex = params.curIndex
      if (params.curIndex == 0) {
        this.$router.replace('/security')
      } else if (params.curIndex == 1) {
        this.$router.replace('/security/enterprise')
      } else if (params.curIndex == 2) {
        this.$router.replace('/security/then')
      }
    },
    clickAdd(params) {
      this.isClickAdd = params.isClickAdd
    }
  }
}
</script>

<style scoped>
  .body{padding-top: 1.8rem;}
  /* h2{font-display: .4rem}  */
</style>