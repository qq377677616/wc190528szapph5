<template>
  <div class="welcome">
    <transition name="fadeOut">
      <div class="loading" v-show="isReady"></div>
    </transition>
    <!-- <div class="loading" v-show="isReady"></div> -->
    <div class="li" v-for="item in 93" :key="item" :style="{backgroundImage: 'url('+require('../assets/effect/effect1/effect_'+item+'.jpg')+')'}" v-show="curIndex == item"></div>
    <transition name="bottom-top" enter-active-class="bounceInUp animated" leave-active-class="bounceIn animated">
      <div class="btn" v-show="isLoingOk" @click="enter">Get Into</div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      curIndex: 1,//序列帧当前索引
      speed: 60,//序列帧播放速率
      allNum: 93,//序列帧总张数
      isLoingOk: false,//是否显示按钮
      isReady: true,//
      imgReady: false,//
      auto: null
    }
  },
  created() {
    let _imgReady = setInterval(() => {
      if (this.imgReady) {
        clearInterval(_imgReady)
        this.isReady = false
        this.effect(1)
      }
    }, 1000)
    this.effect()
  },
  methods: {
    effect(isOk) {
      //if (isOk == 1) this.curIndex = 1
      this.auto = setInterval(() => {
        // this.curIndex > (this.allNum - 1) ? ( clearInterval(_auto)) : this.curIndex++
        //this.curIndex > (this.allNum - 1) ? this.curIndex = 1 : this.curIndex++
        if (this.curIndex > (this.allNum - 1)) {
          clearInterval(this.auto)
          if (isOk != 1) {
            this.imgReady = true
            this.curIndex = 1
          } else {
            this.isLoingOk = true
          }
        } else {
          this.curIndex++
        }
      }, this.speed)
    },
    enter() {
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
  .welcome{position: fixed;width:100%;height:100%;left:0;top:0;z-index: 9999;}
  .box, .li{width:100%;height:100%;background-position: center top;background-size: cover;}
  .btn{width:3rem;height:.8rem;line-height: .8rem;text-align: center;border-radius: .1rem;border: .02rem solid #1DB9FE;color:#1DB9FE;position: fixed;bottom:10%;left:calc(50% - 1.5rem);box-sizing: border-box;font-size: .4rem;}
  .loading{position: absolute;width:100%;height:100%;z-index: 100;background: url(../assets/bg_01.png) no-repeat center;background-size: cover;transition: all .5s;}
  .loading::after{content:"";display: block;width:100%;height: 4.28rem;background: url(../assets/icon_03.png) no-repeat center;background-size:cover;position: absolute;left: 0;top:0;z-index: 1;position: absolute;left:0;top:10%;animation: luminescence 1s infinite alternate;}
  .fadeOut-leave-to{opacity: 0;}
  @keyframes luminescence {
    from {transform: scale(.2);}
    to {transform: scale(1);}
  }
</style>