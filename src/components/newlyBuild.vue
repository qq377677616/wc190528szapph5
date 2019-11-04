<template>
  <div class="newlyBuild body">
    <my-header :title="title" :isBack="isBack"></my-header> 
    <div class="content">
      <build></build>      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
import Build from 'components/build.vue'
export default {
  name: "",
  props: {
    clickAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {  
      isBack: true,//是否可以返回
      title: '服务管理数字助手',//页面标题 
    }
  },
  components: {
    MyHeader: MyHeader,
    Build: Build      
  }
}
</script>

<style scoped>
  .body{padding:0;min-height: auto;background: #fff;}
  .content{height: 100vh;}
</style>