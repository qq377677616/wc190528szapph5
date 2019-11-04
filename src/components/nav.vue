<template>
  <div class="nav">
    <dl class="wrap flex-cen">
      <dd v-for="(item, $index) in navList" :key="$index" @click="switchs($index)">{{item}}</dd>
      <dd class="bg" :style="{left: (curIndex * .33 + .065 + initLeft) * 100 + '%'}"></dd>  
    </dl>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  props: {
    navList: Array,
    curIndex: {
      type: Number,
      default: 0
    }    
  },
  data() {
    return {
      //curIndex: 0,
      navLength: []
    }
  },
  created() {
    this.navLength = this.navList.length     
  },
  methods: {
    switchs($index) {
      //this.curIndex = $index
      this.$emit("selectNav", {curIndex: $index})
    }    
  },
  computed:{
    initLeft() {
      if (this.navLength == 1) {
        return .33
      } else if (this.navLength == 2) {
        return .17
      } else if (this.navLength == 3) {
        return 0
      }  
    }    
  }
}
</script>

<style scoped>
  .nav{background: #4AC4F9;box-shadow: 0px 6px 9px 0px rgba(33, 82, 119, 0.53);position: fixed;width: 100%;left:0;top:.92rem;z-index: 150;}
  .nav dl{position: relative;}
  .nav dd:not(.bg){height:.88rem;line-height: .88rem;font-size: .34rem;color:#fff;width: 28%;margin:0 2.5%;text-align: center;}
  .nav dd.bg{width:20%;height:.08rem;background: #fff;position: absolute;left:4%;bottom:0;transition: all .2s;}
</style>