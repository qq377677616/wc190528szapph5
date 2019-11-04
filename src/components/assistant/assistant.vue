<template>
  <div class="assistant body">
    <my-header :title="title" :isBack="isBack" :isEmit="true" @clickAdd="clickAdd"></my-header>
    <navs :navList="navList" @selectNav="selectNav" :curIndex="curIndex"></navs>
    <router-view :clickAdd="isClickAdd"></router-view>
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
      navList: ['宏观经济', '产业发展', '政策扶持'],
      curIndex: 0,
      isClickAdd: false    
    }
  },
  mounted(){
    console.log(this.$route.query.id)
  },
  created() {
    let _url = window.location.href.toLowerCase() || ''
      if (_url.indexOf('industry') != -1) {
        this.curIndex = 1    
      } else if (_url.indexOf('policy') != -1) {
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
        this.$router.replace('/assistant')
      } else if (params.curIndex == 1) {
        this.$router.replace('/assistant/industry')
      } else if (params.curIndex == 2) {
        this.$router.replace('/assistant/policy')
      }
    },
    clickAdd(params) {
      this.isClickAdd = params.isClickAdd
    }
  }
}
</script>

<style scoped>
  .assistant{padding-top:1.8rem;background: #fff;}
</style>