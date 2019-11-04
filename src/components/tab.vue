<template>
  <div class="tab">
    <dl class="flex-bet">
      <dd v-for="(item, $index) in tabList" :key="$index" @click="jumps($index)" :class="[curIndex == $index ? 'cur' : '']"> 
        <img :src="require('../assets/tab_0'+($index + 1)+'.png')" alt="">
        <!-- <img :src="require('../assets/tab_0'+($index + 1)+'.png')" alt="" v-show="curIndex != $index">
        <img :src="require('../assets/tab_0'+($index + 1)+'s.png')" alt="" v-show="curIndex == $index"> -->
        <p v-if="item">{{item}}</p>
      </dd>
      <!-- <dd class="bg" :style="{left: curIndex * 20 + '%'}"></dd> -->
    </dl>  
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "",
    props: {
      // curIndex: {
      //   type: Number,
      //   default: 0
      // }
    },
    data() {
      return {
        tabList: ['监测', '事项', '', '会议', '智库'],
        curIndex: 0
      }
    },
    created() {
      let _url = window.location.href.toLowerCase() || ''
      if (_url.indexOf('thing') != -1) {
        this.curIndex = 1    
      } else if (_url.indexOf('chats') != -1) {
        this.curIndex = 2    
      } else if (_url.indexOf('meeting') != -1) {
        this.curIndex = 3    
      }  else if (_url.indexOf('library') != -1) {
        this.curIndex = 4    
      }  
    },
    mounted() {
      
    },
    methods: {
      jumps($index) {
        if ($index == 0) {
          this.$router.replace('/')    
        } else if ($index == 1) {
          this.$router.replace('/thing')    
        } else if ($index == 2) {
          this.$router.replace('/chats')   
        } else if ($index == 3) {
          this.$router.replace('/meeting')    
        } else if ($index == 4) {
          this.$router.replace('/library')    
        }
        this.curIndex = $index  
      }    
    }
  }
</script>

<style scoped>
  .tab{width: 100%;position: fixed;left:0;bottom:0;z-index: 9999;text-align: center;background: #221F33;box-shadow: -5px 0px 6.32px 1.68px rgba(82, 86, 90, 0.81);}
  .tab img{height:.52rem;}
  .tab dd:nth-child(3) img{height:.75rem;}
  .tab dd{font-size: 0;padding:.1rem 0;width: 20%;position: relative;z-index: 5;}
  .tab dd p{font-size: .24rem;color:#fff;padding-top: .04rem;}
  .tab dd.cur{background: rgba(255,255,255,.2);}
  /* .tab dd.bg{width:20%;background: rgba(255,255,255,.2);position: absolute;left:0;top:0;z-index: 1;height:100%;transition: all 1s;} */
</style>