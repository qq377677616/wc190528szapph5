<template>
  <div class="login" ref="imageWrapper">
    <div class="box">
      <div class="logo">
        <img src="../assets/logo_01.png" alt="">
        <h3>深圳市政府服务管理<br/>数字助手</h3>
      </div>
      <div class="login-box">
        <transition :name="curTransition">
          <div class="login-number" v-show="isLoing">
            <ul>
              <li>
                <h4>账号/手机号码</h4>
                <input type="text" v-model="userName" autocomplete="off" @blur="blur">
              </li>
              <li class="password">
                <h4>密码</h4>
                <input type="password" v-model="userPassword" autocomplete="off" @blur="blur">
              </li>
              <button class="submit" @click="login">登录</button>
              <button :class="['reset', (userName == '' && userPassword == '' ) ? 'dis' : '']" @click="resets">重置</button>
            </ul>
          </div>
        </transition>
        <transition :name="curTransition">
          <div class="login-gesture" v-show="!isLoing">
            <div class="gesture">
              <h5 ref="gestureTitle" class="gestureTitle" style="position: absolute;right: 5px;top: 5px;color:#fff;font-size: 13px;display:block;">请绘制您的图形密码</h5>
              <a ref="updatePassword" style="position: absolute;left: 5px;top: 5px;color:#fff;font-size: 13px;display:block;" @click="updatePassword()">重置密码</a>
              <!-- <a ref="updatePassword" style="position: absolute;right: 5px;top: 5px;color:#fff;font-size: 13px;display:block;" @click="closePwd()">关闭</a> -->
              <canvas id="canvas" ref="canvas"></canvas>
            </div>
          </div>
        </transition>  
      </div>
      <div class="switch">
        <span @click="switchs(true)">账号登录</span>
        <span @click="switchs(false)">手势登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { backPageTop } from 'common/js/util.js'
import { getGuoxin } from 'api/request.js'
export default {
  name: 'login',
  data() {
    return {
      ctxStrokeStyle: 'pink',
      curTransition: 'left-right',
      userName: '',//用户名
      userPassword: '',//用户密码
      isLoing: true,//当前登录方式
      currentValue: false,
      ctx:'',
      width:0,
      height:0,
      devicePixelRatio:0,
      chooseType : '',
      r :'',// 公式计算
      lastPoint: [],
      arr : [],
      restPoint :[],
      pswObj:{step:2},
      canvas:''
    }
  },
  watch: {
    value: {
      handler: function (val) {
        this.currentValue = val
      },
      immediate: true
    },
    currentValue (val) {
      this.$emit(val ? 'on-show' : 'on-hide')
      this.$emit('input', val)
    }
  },
  created () {
    if (typeof this.value !== 'undefined') {
      this.currentValue = this.value
    }
  },
  mounted() {
    this.setChooseType(3);

    // this.$nextTick(() => {
    //   this.painting()
    // })
  },
  methods: {
    //登录
    login() {
      if (!this.userName) {
        this.$toast("账号/手机号不能为空")
        return
      } 
      if (!this.userPassword) {
        this.$toast("密码不能为空")
        return
      }
      console.log(this.username,this.userPassword)
      getGuoxin('authority/roleData',{username:this.userName,password:this.userPassword}).then(res => {
        console.log(res)
        if(res.state.code == 200){
          this.loginOk("账号登录成功")
        }else{
          this.$toast(res.state.message)
        }
      }).catch(err => {
        this.$toast("请求失败")
        console.log(err)
      }) 
      // if (this.userName == '123' && this.userPassword == '123') {
      //   this.loginOk("账号登录成功")
      // } else {
      //   this.$toast("账号和密码不匹配")
      // }
    },
    //重置
    resets() {
      if (this.userName != '' || this.userPassword != '') {
        this.userName = ''  
        this.userPassword = ''  
      }
    },
    //失去焦点
    blur() {
      backPageTop()
    },
    //登录成功后处理
    loginOk(message) {
      Indicator.open({text: '登录中', spinnerType: 'fading-circle'})
      setTimeout(() => {
        let _toast = this.$toast(message)
        Indicator.close()
        setTimeout(() => {
          _toast.close()
          localStorage.setItem('isLogin', true)
          this.$router.replace('/')
        }, 800)
      }, 1000)
    },
    switchs(e){
      this.isLoing = e
      console.log(e)
    },
    generateImg(){
      var canvas = document.getElementById("mycanvas");
      this.dataURL = canvas.toDataURL("image/png")
      this.isCanvasImg = true
    },
    /******************************手势密码******************************/
    closePwd () {
      this.loginOk("手势登录成功")
      this.currentValue = false;
    },
    H5lock (obj){
      this.height = obj.height;
      this.width = obj.width;
      this.chooseType = Number(window.localStorage.getItem('chooseType')) || obj.chooseType;
      this.devicePixelRatio = window.devicePixelRatio || 1;
    },
    drawCle (x, y) { // 初始化解锁密码面板 小圆圈
      this.ctx.strokeStyle = '#87888a';//密码的点点默认的颜色
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.stroke();
    },
    drawPoint (style) { // 初始化圆心
      for (var i = 0 ; i < this.lastPoint.length ; i++) {
        this.ctx.fillStyle = style;
        this.ctx.beginPath();
        this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2.5, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
      }
    },
    drawStatusPoint (type) { // 初始化状态线条
      for (var i = 0 ; i < this.lastPoint.length ; i++) {
        this.ctx.strokeStyle = type;
        this.ctx.beginPath();
        this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    },
    drawLine (style, po, lastPoint) {//style:颜色 解锁轨迹
      this.ctx.beginPath();
      this.ctx.strokeStyle = style;
      this.ctx.lineWidth = 3;
      this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
      for (var i = 1 ; i < this.lastPoint.length ; i++) {
        this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
      }
      this.ctx.lineTo(po.x, po.y);
      this.ctx.stroke();
      this.ctx.closePath();
    },
    createCircle () {// 创建解锁点的坐标，根据canvas的大小来平均分配半径
      var n = this.chooseType;
      var count = 0;
      this.r = this.ctx.canvas.width / (2 + 4 * n);// 公式计算
      this.lastPoint = [];
      this.arr = [];
      this.restPoint = [];
      var r = this.r;
      for (var i = 0 ; i < n ; i++) {
        for (var j = 0 ; j < n ; j++) {
          count++;
          var obj = {
            x: j * 4 * r + 3 * r,
            y: i * 4 * r + 3 * r,
            index: count
          };
          this.arr.push(obj);
          this.restPoint.push(obj);
        }
      }
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      for (var i = 0 ; i < this.arr.length ; i++) {
        this.drawCle(this.arr[i].x, this.arr[i].y); 
      }
    },
    getPosition (e) {// 获取touch点相对于canvas的坐标
      var rect = e.currentTarget.getBoundingClientRect();
      var po = {
        x: (e.touches[0].clientX - rect.left)*this.devicePixelRatio,
        y: (e.touches[0].clientY - rect.top)*this.devicePixelRatio
      };
      return po;
    },
    update(po) {// 核心变换方法在touchmove时候调用
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      for (var i = 0 ; i < this.arr.length ; i++) { // 每帧先把面板画出来
        this.drawCle(this.arr[i].x, this.arr[i].y);
      }
      this.drawPoint('#27AED5');// 每帧花轨迹
      this.drawStatusPoint('#27AED5');// 每帧花轨迹
      this.drawLine('#27AED5',po , this.lastPoint);// 每帧画圆心
      for (var i = 0 ; i < this.restPoint.length ; i++) {
        if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {
          this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
          this.lastPoint.push(this.restPoint[i]);
          this.restPoint.splice(i, 1);
          break;
        }
      }
    },
    checkPass (psw1, psw2) {// 检测密码
      var p1 = '',
      p2 = '';
      for (var i = 0 ; i < psw1.length ; i++) {
        p1 += psw1[i].index + psw1[i].index;
      }
      for (var i = 0 ; i < psw2.length ; i++) {
        p2 += psw2[i].index + psw2[i].index;
      }
      return p1 === p2;
    },
    storePass (psw) {// touchend结束之后对密码和状态的处理
      if (this.pswObj.step == 1) {
        if (this.checkPass(this.pswObj.fpassword, psw)) {
          this.pswObj.step = 2;
          this.pswObj.spassword = psw;
          this.$refs.gestureTitle.innerHTML = '密码保存成功';
          this.drawStatusPoint('#2CFF26');
          this.drawPoint('#2CFF26');
          //将手势密码存储到本地
          window.localStorage.setItem('passwordxx', JSON.stringify(this.pswObj.spassword));
          window.localStorage.setItem('chooseType', this.chooseType);
          console.log('passwordxx', JSON.stringify(this.pswObj.spassword))
          console.log('chooseType', this.chooseType)
        } else {
          this.$refs.gestureTitle.innerHTML = '两次不一致，重新输入';
          this.drawStatusPoint('red');
            this.drawPoint('red');
          delete this.pswObj.step;
        }
      } else if (this.pswObj.step == 2) {
        if (this.checkPass(this.pswObj.spassword, psw)) {
          var gestureTitle = this.$refs.gestureTitle;
          gestureTitle.style.color = "#2CFF26";
          gestureTitle.innerHTML = '解锁成功';
          this.drawStatusPoint('#2CFF26');//小点点外圈高亮
          this.drawPoint('#2CFF26');
          this.drawLine('#2CFF26',this.lastPoint[this.lastPoint.length-1] , this.lastPoint);// 每帧画圆心
          this.closePwd();
        } else if (psw.length < 4) {
          this.drawStatusPoint('red');
          this.drawPoint('red');
          this.drawLine('red',this.lastPoint[this.lastPoint.length-1] , this.lastPoint);// 每帧画圆心
          var gestureTitle = this.$refs.gestureTitle;
          gestureTitle.style.color = "red";
          gestureTitle.innerHTML = '请连接4个点';
        } else {
          this.drawStatusPoint('red');
          this.drawPoint('red');
          this.drawLine('red',this.lastPoint[this.lastPoint.length-1] , this.lastPoint);// 每帧画圆心
          var gestureTitle = this.$refs.gestureTitle;
          gestureTitle.style.color = "red";
          gestureTitle.innerHTML = '密码错误，请重新输入';
          // gestureTitle.innerHTML = '密码错误，您还可以输入N次';
        }
      } else {
        this.pswObj.step = 1;
        this.pswObj.fpassword = psw;
        this.$refs.gestureTitle.innerHTML = '再次输入';
      }
    },
    makeState () {
      if (this.pswObj.step == 2) {
        this.$refs.updatePassword.style.display = 'block';
        var gestureTitle = this.$refs.gestureTitle;
        gestureTitle.style.color = "#87888a";
        gestureTitle.innerHTML = '请解锁';
      } else if (this.pswObj.step == 1) {
        this.$refs.updatePassword.style.display = 'none';
      } else {
        this.$refs.updatePassword.style.display =  'block';
      }
    },
    setChooseType (type){
      this.chooseType = type;
      this.init();
    },
    updatePassword (){
      window.localStorage.removeItem('passwordxx');
      window.localStorage.removeItem('chooseType');
      this.pswObj = {};
      this.$refs.gestureTitle.innerHTML = '绘制解锁图案';
      this.reset();
    },
    initDom (){
      this.chooseType = Number(window.localStorage.getItem('chooseType')) || 3;
      this.devicePixelRatio = window.devicePixelRatio || 1;
      var canvas = this.$refs.canvas;
      var width = this.width || 280;
      var height = this.height || 280;
      // 高清屏锁放
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.height = height * this.devicePixelRatio;
      canvas.width = width * this.devicePixelRatio;
    },
    init () {
      this.initDom();
      this.pswObj = window.localStorage.getItem('passwordxx') ? {
        step: 2,
        spassword: JSON.parse(window.localStorage.getItem('passwordxx'))
      } : {};
      this.lastPoint = [];
      this.makeState();
      this.touchFlag = false;
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.createCircle();
      this.bindEvent();
    },
    reset () {
      this.makeState();
      this.createCircle();
    },
    bindEvent () {
      var self = this;
      this.canvas = this.$refs.canvas;
      this.canvas.addEventListener("touchstart", function (e) {
        e.preventDefault();// 某些android 的 touchmove不宜触发 所以增加此行代码
          var po = self.getPosition(e);
          for (var i = 0 ; i < self.arr.length ; i++) {
            if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {
              self.touchFlag = true;
              self.drawPoint(self.arr[i].x,self.arr[i].y);
              self.lastPoint.push(self.arr[i]);
              self.restPoint.splice(i,1);
              break;
            }
          }
        }, false);
        this.canvas.addEventListener("touchmove", function (e) {
          if (self.touchFlag) {
            self.update(self.getPosition(e));
          }
        }, false);
        this.canvas.addEventListener("touchend", function (e) {
          if (self.touchFlag) {
            self.touchFlag = false;
            self.storePass(self.lastPoint);
            setTimeout(function(){
              self.reset();
            }, 1000);
          }
        }, false);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login{width:100vw;height:100vh;background: url(../assets/bg_01.png) no-repeat top center;background-size: cover;display: flex;flex-direction:column;justify-content: center;z-index: 10000;}
  .login .logo{text-align: center;position: relative;}
  .login .logo img{width:2.78rem;}
  .login .logo h3{font-size: .4rem;color:#fff;line-height: .46rem;padding-top: 0.1rem;font-family: '黑体';position: relative;z-index: 5;}
  .login .logo::after{content:"";display: block;width:100%;height: 4.28rem;background: url(../assets/icon_03.png) no-repeat center;background-size:cover;position: absolute;left: 0;top:0;z-index: 1;animation: luminescence 2s infinite alternate;}
  .login-box{height:3.87rem;margin: 1.28rem auto 0;position: relative;z-index: 10;display: flex;}
  .login-number,.login-gesture{width:100%;position: absolute;left:0;top:0;}
  .login-number ul{width:3.96rem;margin:0 auto;}
  .login-box h4{font-size: .3rem;color:#fff;padding:.03rem 0 0 .4rem;background: url(../assets/icon_01.png) no-repeat left top;background-size: auto .33rem;}
  .login-box li.password{margin: .84rem 0 .25rem;}
  .login-box input{width:100%;border-bottom: 1px solid #89B1D2;background: none;font-size: .3rem;color:#fff;margin-top: .15rem;}
  .login-box button{width: 100%;height:.5rem;line-height: .5rem;border-radius: .5rem;background-image: linear-gradient( 90deg, rgb(47,144,242) 0%, rgb(140,195,251) 99%);color:#fff;}
  .login-box button.dis{background-image: linear-gradient( 90deg, rgb(124,142,177) 0%, rgb(194,200,211) 100%);}
  .login-box button.reset{margin-top: 0.1rem;}
  .login .switch{padding-top: 2rem;text-align: center;font-size: .28rem;color:#fff;color:#fff;}
  .login .switch span{padding:0 .21rem;}
  .login .switch span:last-child{border-left: .03rem solid #fff;}
  #canvas{background-color:rgba(28,53,162,.8);width: 280px; height: 280px;border-radius: .1rem;}
  .login-gesture .gesture{position: relative;width:280px;margin:0 auto;}
  .left-right-enter-active,.left-right-leave-active,.right-left-enter-active,.right-left-leave-active{transition: all .5s linear;}
  .left-right-enter,.left-right-leave-to{transform: rotateY(180deg);opacity: 0;}
  @media screen and (max-width: 340px) {
    .login .switch{padding-top: 3rem;}
  }
  @keyframes luminescence {
    from {transform: scale(.7);}
    to {transform: scale(1);}
  }
</style>
