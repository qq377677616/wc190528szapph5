<template>
  <div id="app">
    <transition :name="routerName" mode="in-out">
      <router-view class="router-view"></router-view>
    </transition>
    <!-- <tab></tab> -->
  </div>
</template>

<script>
import Tab from 'components/tab.vue'
import { backPageTop } from 'common/js/util.js'
export default {
  name: 'app',
  data() {
    return {
      routerName: '',
      isTab: true,
      paths: ['/search', '/security', '/assistant', '/ecology', '/assistant/industry', '/assistant/policy', '/thing/newlyBuild']
    }
  },
  created() {
    if (localStorage.getItem("isLogin") != 'true') {
      this.$router.replace('/welcome')    
    }    
  },
  watch: {
    '$route'(to, from) {
      console.log('从from.path---->', from.path)
      console.log('到to.path---->', to.path)
      backPageTop()
      if ((from.path == '/' && to.path != '/') || from.path == '/thing') {
        if (document.getElementsByClassName("body")[0]) {
          document.getElementsByClassName("body")[0].style = 'z-index: -1;'
        }
      }
      if (from.path == '/' && this.isHasPath(to.path) || from.path == '/thing' && this.isHasPath(to.path) || to.path == '/search' || from.path == '/welcome') {
        this.routerName = 'router-right'
      } else if (this.isHasPath(from.path) && to.path == '/' || from.path == '/search') {
        document.getElementsByClassName("body")[0].style = 'z-index: -1;'
        this.routerName = 'router-left'
      } else {
        this.routerName = ''
      }
    }  
  },
  methods: {
    isHasPath(path) {
      return (this.paths.some((item) => { return item == path }))
    }
  },
  components: { 
    Tab: Tab     
  }
}
</script>

<style>
  /* .right-left-enter-active,.right-left-leave-active{transition: all .5s cubic-bezier(.55,0,.1,1);} 
  .right-left-enter,.right-left-leave-to{transform: translateX(100%);} */
  .router-view{transition: all .5s cubic-bezier(.55,0,.1,1); width: 100%; position: absolute; left:0; top:0;}
.router-right-enter, .router-left-leave-active{
  opacity: 0;
  transform: translate(100%, 0);
}  
.router-right-leave-active, .router-left-enter{
  opacity: 0;
  transform: translate(-100%, 0);
}  
</style>
