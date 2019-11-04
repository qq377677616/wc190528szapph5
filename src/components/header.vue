<template>
  <div class="header">
    <div class="wrap">
      <div class="back" v-if="isBack" @click="back"></div>
      <h3>{{title}}</h3>
      <div :class="['add', isShowAdd || isClickAdd ? 'on' : '']" v-if="isAdd" @click="openAdd"></div>
      <transition name="bottom-top">
        <dl v-show="isShowAdd">
          <dd v-for="(item, index) in addList" :key="index" @click="selectAdd(index)">{{item}}</dd>    
        </dl>
      </transition>
    </div>  
  </div>
</template>

<script type="text/ecmascript-6">
import { MessageBox, Indicator } from 'mint-ui'
export default {
  name: "",
  props: {
    title: {
      type: String,
      default: '服务管理数字助手'    
    },
    isBack: {
      type: Boolean,
      default: false  
    },
    isAdd: {
      type: Boolean,
      default: true  
    },
    isEmit: {
      type: Boolean,
      default: false
    }     
  },
  data() {
    return {
      addList: ['专题分享', '发起会话', '备忘录', '添加好友', '退出登录'],
      isShowAdd: false,
      isClickAdd: false
    }
  },
  methods: {
    openAdd() {
      if (this.isEmit) {
        this.isClickAdd = !this.isClickAdd
        this.$emit('clickAdd', {isClickAdd: this.isClickAdd})
      } else {
        this.isShowAdd = !this.isShowAdd
      }
    },
    selectAdd(index) {
      console.log(index) 
      if (index == 0) {
        console.log('【专题分享】')
      } else if (index == 1) {
        console.log('【发起会话】')
      } else if (index == 2) {
        console.log('【备忘录】')
      }  else if (index == 3) {
        console.log('【添加好友】')
      }  else if (index == 4) {
        MessageBox({
        title: '退出登录',
        message: '退出登录后下次进入需要进行账号登录或者手势登录，是否继续？',
        showCancelButton: true
      }).then(res => {
        if (res == 'confirm') {
          Indicator.open({text: '退出登录', spinnerType: 'fading-circle'})
          setTimeout(() => {
            Indicator.close()
            this.$toast('退出登录成功')
            localStorage.setItem('isLogin', false)
            this.$router.replace('/login')
          }, 1000)
        }
      })
      }   
    },
    back() {
      let _url = sessionStorage.getItem('prevPage') || '/'
      this.$router.replace(_url)
      sessionStorage.setItem('prevPage', '')
    }    
  }
}
</script>

<style scoped>
  .header{height:.92rem;line-height: .92rem;background: #1DB9FE;font-size: .36rem;color:#fff;text-align: center;position: fixed;width:100%;left:0;top:0;z-index: 200;}  
  .header .add,.header .back{width:.4rem;padding-right: 4%;height:100%;position: absolute;right: 0;top:0;background: url(../assets/icon_06.png) no-repeat left center;background-size: .4rem;transition: all .5s;transform-origin: .2rem center;}
  .header .add.on{background-image: url(../assets/icon_06s.png);transform: rotate(135deg);}
  .header .back{right:auto;left:0;background-image: url(../assets/icon_05.png);padding-right: 0;padding-left: 4%;background-position: right .11rem center;}
  .header dl{position: absolute;right:.1rem;top:.72rem;background: rgba(0,0,0,.7);width: 1.82rem;z-index: 200;border-radius: .1rem;padding:.1rem 0;transition: all .5s;}
  .header dl dd{height: 0.45rem;line-height: .45rem;font-size: .2rem;color:#fff;text-align: left;padding-left: 0.63rem;background: url(../assets/add_01.png) no-repeat left .24rem center;background-size: .21rem;}
  .header dl dd:nth-child(2){background-image: url(../assets/add_02.png);background-position: left .22rem center;background-size: .24rem;}
  .header dl dd:nth-child(3){background-image: url(../assets/add_03.png);background-position: left .24rem center;background-size: .2rem;}
  .header dl dd:nth-child(4){background-image: url(../assets/add_04.png);background-position: left .24rem center;background-size: .22rem;}
  .header dl dd:nth-child(5){background-image: url(../assets/add_05.png);background-position: left .24rem center;background-size: .22rem;}
  .bottom-top-enter,.bottom-top-leave-active{transform: translateY(5%);opacity: 0;}
</style>