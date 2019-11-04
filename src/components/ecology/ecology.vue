<template>
  <div class="ecology body">
    <my-header :title="title" :isBack="isBack" :isEmit="false" @clickAdd="clickAdd"></my-header>
    <navs :navList="navList" @selectNav="selectNav" :curIndex="curIndex"></navs>
    <router-view></router-view>
    <screenshot></screenshot>
    <!-- <transition :name="routerName" mode="in-out">
      <router-view class="router-view"></router-view>
    </transition> -->
    <!-- <div class="content">
      <img src="../../assets/abc_03.jpg" alt="">    
    </div> -->
    <!-- <tab></tab> -->
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
import Navs from 'components/nav.vue'
import Tab from 'components/tab.vue'
import Screenshot from 'components/screenshot.vue'
export default {
  name: "",
  data() {
    return {
      isBack: true,//是否可以返回
      title: '服务管理数字助手',//页面标题
      navList: ['总体态势', '水污染治理', '大气改善'],
      curIndex: 0,
      isClickAdd: false    
    }
  },
  mounted(){
    console.log(this.$route.query.name)
    if(this.$route.query.name == this.navList[0]){
      this.curIndex = 0
      this.$router.replace('/ecology')
    }else if(this.$route.query.name == this.navList[1]){
      this.curIndex = 1
      this.$router.replace('/ecology/water')
    }else if(this.$route.query.name == this.navList[2]){
      this.curIndex = 2
      this.$router.replace('/ecology/gas')
    }
  },
  created() {
    let _url = window.location.href.toLowerCase() || ''
    if (_url.indexOf('water') != -1) {
      this.curIndex = 1    
    } else if (_url.indexOf('gas') != -1) {
      this.curIndex = 2    
    }
  },
  components: {
    MyHeader: MyHeader, 
    Navs: Navs, 
    Tab: Tab,
    Screenshot: Screenshot       
  },
  methods: {
    selectNav(params) {
      this.curIndex = params.curIndex
      if (params.curIndex == 0) {
        this.$router.replace('/ecology')
      } else if (params.curIndex == 1) {
        this.$router.replace('/ecology/water')
      } else if (params.curIndex == 2) {
        this.$router.replace('/ecology/gas')
      }
    },
    clickAdd(params) {
      this.isClickAdd = params.isClickAdd
    }
  }
}
</script>

<style scoped>
  .ecology{padding-top:1.8rem;background: #f2f2f2;}
</style>