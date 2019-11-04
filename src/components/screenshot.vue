<template>
  <div class="screenshot">
    <transition name="right-left">   
      <div :class="['box', isTouch ? 'on' : '']" ref="box" @click="html2canvas" v-show="!isScreenShot" data-dom="box" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></div>
    </transition>  
    <div class="canvas-img" :class="[dataURL ? 'on' : '']">
    <!-- <img id="dataURL" :src="dataURL" alt="" v-show="dataURL && isCanvasImg"> -->
    <img id="dataURL" :src="dataURL" alt="" v-show="dataURL && isCanvasImg">
    <div class="canvas-box">
      <div :class="['mycanvas-box', operateCurindex == 1 ? 'on' : '']" @click="createInput">
        <canvas id="mycanvas"></canvas>
        <div class="inputs" v-show="!generateImging">
          <input v-for="(item, index) in inputs" :key="index" :style="{left: item.left, top: item.top, color: item.color}" :class="[item.isFocus ? 'on' : '']" :ref="item.dom + index" type="text" :data-dom="item.dom + index" v-model="item.value" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @input="input(index)" @focus="focus(index, $event)" @blur="blur(index)" @click.stop="inputClick">
          <div class="horn"><b></b><b :style="{left: canvasWH.w - 3 + 'px'}"></b><b :style="{top: canvasWH.h - 2 + 'px'}"></b><b :style="{left: canvasWH.w - 3 + 'px', top: canvasWH.h - 2 + 'px'}"></b></div>
        </div>
      </div>
      <div class="controls">
        <dl class="flex">
          <dd v-for="(item, index) in pens" :class="{on: pensIndex == index}" :style="{background: item, borderColor: item}" :key="`key${item}`" @click="setCtxStrokeStyle(item, index)"></dd>
          <!-- <dd class="black" @click="setCtxStrokeStyle('black', '黑色')"></dd>
          <dd class="fuchsia" @click="setCtxStrokeStyle('fuchsia', '粉色')"></dd>
          <dd class="red" @click="setCtxStrokeStyle('red', '红色')"></dd>
          <dd class="blue" @click="setCtxStrokeStyle('blue', '蓝色')"></dd> -->
        </dl>
        <div class="buttons flex-cen" @click="selectPainting">
          <div :class="['button', operateCurindex == 0 ? 'on' : '']">
            <div class="icon flex-cen"><img src="../assets/icon_19.png" alt=""></div>
            <span>画笔</span>
          </div>
          <!-- <div :class="['button', operateCurindex == 1 ? 'on' : '']" @click="inputReady" :class="[isInputReady ? 'on' : '']"> -->
          <div :class="['button', operateCurindex == 1 ? 'on' : '']" @click="inputReady">
            <div class="icon flex-cen"><img src="../assets/icon_20.png" alt=""></div>
            <span>文字</span>
          </div>
          <div :class="['button', operateCurindex == 2 ? 'on' : '']" @click="clearCanvas">
            <div class="icon flex-cen"><img src="../assets/icon_21.png" alt=""></div>
            <span>撤回</span>
          </div>
          <!-- <button @click="inputReady" :class="[isInputReady ? 'dis' : '']">文字</button>
          <button @click="clearCanvas">清除</button>
          <button @click="generateImg">确定</button> -->
        </div>
      </div>  
    </div> 
    <div class="btns flex-bet">
      <!-- <button @click="back" class="back"  v-show="dataURL">返回</button>   -->
      <img src="../assets/icon_17.png" alt=""  @click="back">
      <img src="../assets/icon_18.png" alt="" @click="generateImg" v-show="!(dataURL && isCanvasImg)">
    </div> 
    </div>
    <div class="pre"><pre ref="pre">{{preHtml}}</pre></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Indicator } from 'mint-ui'
import html2canvas from 'html2canvas'
import { backPageTop } from 'common/js/util.js'
export default {
  name: "",
  data() {
    return {
      dataURL: '',
      isCanvasImg: false,
      isScreenShot: true,
      scrollTop: 0,
      generateImging: false,//是否在生成图片中
      pens: ["#FF0000", "#1800FF", "#00FFDE", "#FCFF00", "#000"],//画笔颜色
      pensIndex: 0,
      canvasScale: .72,//canvas缩放比例
      operateCurindex: 0,
      //拖拽相关
      inputs: [],
      minInputWidth: 0,//input输入框的初始宽度
      isInputReady: false,//是否准备好input输入文字
      preHtml: '',
      isOpenDrop: true,//是否开启拖拽
      isTouch: false,//默认为没有触摸
      itemX: 0,//触摸点与拖拽体的间距x
      itemY: 0,//触摸点与拖拽体的间距y
    }
  },
  mounted() {
    this.isScreenShot = false
    this.canvasInit()      
  },
  methods: {
    //拖拽相关
    touchstart(event) {
      let dom = this.$refs[event.targetTouches[0].target.dataset.dom][0] ? this.$refs[event.targetTouches[0].target.dataset.dom][0] : this.$refs[event.targetTouches[0].target.dataset.dom]
      if (!this.isOpenDrop) return
      let _touch
      if (event.touches[0]) {
        _touch = event.touches[0]
      } else {
        _touch = event
      }
      let { clientX, clientY } = _touch
      this.itemX = clientX - dom.offsetLeft
      this.itemY = clientY - dom.offsetTop
      this.isTouch = true
    },
    touchmove(event) {
      let dom = this.$refs[event.targetTouches[0].target.dataset.dom][0] ? this.$refs[event.targetTouches[0].target.dataset.dom][0] : this.$refs[event.targetTouches[0].target.dataset.dom]
      if (!this.isTouch) return
      let _touch
      if (event.touches[0]) {
        _touch = event.touches[0]
      } else {
        _touch = event
      }
      let { clientX, clientY } = _touch
      let [_headerH, _navH, _tabH] = [0, 0, 0]
      if (document.getElementsByClassName('header')[0]) _headerH = document.getElementsByClassName('header')[0].clientHeight
      if (document.getElementsByClassName('nav')[0]) _navH = document.getElementsByClassName('nav')[0].clientHeight
      if (document.getElementsByClassName('tab')[0]) _tabH = document.getElementsByClassName('tab')[0].clientHeight
      let [_x, _y] = [clientX - this.itemX, clientY - this.itemY]
      let [p_W, p_H] = [window.innerWidth, window.innerHeight]
      let {
        clientWidth: _moveW,
        clientHeight: _moveH,
        style: styleObject
      } = dom
      if (event.targetTouches[0].target.dataset.dom.indexOf('input') != -1) {
        p_W = window.innerWidth * this.canvasScale
        p_H = window.innerHeight * this.canvasScale
        _tabH = 0
        _headerH = 0
        _navH = 0
      } 
      if (_x > p_W - _moveW) _x = p_W - _moveW
      if (_x < 0) _x = 0
      if (_y > p_H - _moveH  - _tabH) _y = p_H - _moveH  - _tabH
      if (_y < _headerH + _navH) _y = _headerH + _navH
      styleObject.left = `${_x}px`
      styleObject.top = `${_y}px`
      styleObject.right = `auto`
      styleObject.bottom = `auto`
      event.preventDefault()
    },
    touchend() {
      this.isTouch = false
    },
    //绘制相关
    canvasInit() {
      var canvas = document.getElementById("mycanvas")
      canvas.width = window.innerWidth * this.canvasScale
      canvas.height = window.innerHeight * this.canvasScale   
      this.canvasW = canvas.width
      this.canvasH = canvas.height

    },  
    html2canvas() {
      this.isScreenShot = true  
      Indicator.open({text: '截屏中', spinnerType: 'fading-circle'}) 
      setTimeout(() => {
        Indicator.close()  
        //let _app = document.getElementById("app")  
        let _app = document.getElementsByClassName("body")[0]  
        //html2canvas(this.$refs.imageWrapper,{
        html2canvas(_app, {
          backgroundColor: "#ffffff",
          useCORS: true,
          scale: 1,
          dpi: window.devicePixelRatio
        }).then((canvas) => {
          let dataURL = canvas.toDataURL("image/png");
          this.dataURL = dataURL
          this.painting()
        })
      }, 1000) 
    },
    clearCanvas() {
      this.painting(1)
    },
    setCtxStrokeStyle(color, index) {
      this.pensIndex = index
      let canvas = document.getElementById("mycanvas")
      let ctx = canvas.getContext("2d")
      ctx.strokeStyle = color
    },
    painting(isReset){
      let canvas = document.getElementById("mycanvas")
      canvas.style.width = this.canvasW + 'px';
      canvas.style.height = this.canvasH + 'px';
      console.log("this.canvasW", this.canvasW)
      console.log("this.canvasH", this.canvasH)
      canvas.width = this.canvasW ;
      canvas.height = this.canvasH;
      let ctx = canvas.getContext("2d")
      let bgImg = new Image()
      this.inputs = []
      bgImg.src = this.dataURL
      if (isReset != 1) {
        this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      }
      ctx.rect(0, 0, window.innerWidth * this.canvasScale, window.innerWidth * this.canvasScale * bgImg.height / bgImg.width)
      ctx.fillStyle = "#ffffff"
      ctx.fill()
      console.log("scrollTop", this.scrollTop)
      bgImg.onload = () => {
        // console.log(-this.scrollTop, window.innerWidth, window.innerWidth * bgImg.height / bgImg.width)
        ctx.drawImage(bgImg, 0, -this.scrollTop * this.canvasScale, window.innerWidth * this.canvasScale, window.innerWidth * this.canvasScale * bgImg.height / bgImg.width)
        //ctx.drawImage(bgImg, 0, this.scrollTop, bgImg.width, window.innerWidth, 0, 0)
      }
      this.ctxDraw(canvas, ctx)
    },
    selectPainting() {
      this.operateCurindex = 0
    },
    ctxDraw(canvas, ctx) {
      let _this = this
      canvas.addEventListener('touchstart', function(event){//触摸点按下事件
        if (_this.operateCurindex != 0) return
        if (event.targetTouches.length == 1) {
          let touch = event.targetTouches[0]
          ctx.beginPath()
          ctx.moveTo(touch.clientX-canvas.offsetLeft,touch.clientY-canvas.offsetTop)
          canvas.addEventListener('touchmove', function (event) {//手机拖动触摸点事件
            if (_this.operateCurindex != 0) return
            let touche = event.targetTouches[0]
            ctx.lineTo(touche.clientX - canvas.offsetLeft, touche.clientY - canvas.offsetTop)
            ctx.lineWidth = 4
            ctx.strokeStyle = _this.pens[_this.pensIndex]
            ctx.stroke()
          },false)
          canvas.addEventListener('touchend',function () {//手机离开屏幕的事件
            ctx.closePath()
          }, false)
        }
      }, false)
    },
    createInput(e) {
      if (this.operateCurindex != 1) return
      //this.isInputReady = false
      this.setInput(e.offsetX, e.offsetY)
    },
    inputReady(e) {
      e.stopPropagation()
      this.operateCurindex = 1
      this.isInputReady = true
      if (this.inputs.length == 0) this.$toast('点击空白处进行文字编辑')
    },
    setInput(left, top) {
      this.inputs.push({ dom: 'input', value: '', left: left + 'px', top: top + 'px', color: this.pens[this.pensIndex], isFocus: true})
      this.$nextTick(() => {
        let _curInput = this.$refs[this.inputs[this.inputs.length - 1].dom + (this.inputs.length - 1)][0]
        _curInput.focus()
        this.minInputWidth = _curInput.clientWidth
      })
    },
    input(index) {
      let _pre = this.$refs.pre
      let _dom = this.$refs[this.inputs[index].dom + index][0]
      let finalStyle = _dom.currentStyle ? _dom.currentStyle : document.defaultView.getComputedStyle(_dom, null)
      _pre.style.fontSize = finalStyle.fontSize
      this.preHtml = this.inputs[index].value
      this.$nextTick(() => {
        let _w = _pre.clientWidth > this.minInputWidth ? _pre.clientWidth + 10 : this.minInputWidth
        _dom.style.width = _w + 'px'
      })
    },
    //input聚焦加上边框
    focus(index) {
      this.inputs[index].isFocus = true
    },
    //input失去焦点去掉边框
    blur(index) {
      backPageTop()
      if (this.inputs[index].value == '') {
        this.inputs.splice(index, 1)
      } else {
        this.inputs[index].isFocus = false
      }
    },
    inputClick(e) {
      //console.log(e)
    },
    fillText(text, x , y, fontSize, fontColor, p_l, p_t) {
      let canvas = document.getElementById("mycanvas")
      let ctx = canvas.getContext("2d")
      ctx.font = fontSize + ' Arial'
      ctx.textBaseline = "Middle"
      console.log(fontColor)
      ctx.fillStyle = fontColor
      ctx.fillText(text, x + p_l, y + parseInt(fontSize) - 1 + p_t)
    },
    generateImg(){
      Indicator.open({text: '绘制中', spinnerType: 'fading-circle'}) 
      this.generateImging = true
      for (let i = 0; i < this.inputs.length; i++) {
        let _item = this.inputs[i]
        let _dom = this.$refs[_item.dom + i][0]
        let finalStyle = _dom.currentStyle ? _dom.currentStyle : document.defaultView.getComputedStyle(_dom, null)
        this.fillText(_item.value, _dom.offsetLeft, _dom.offsetTop, finalStyle.fontSize, _item.color, parseFloat(finalStyle.padding.split(" ")[1]), (parseFloat(finalStyle.height) - parseFloat(finalStyle.fontSize)) / 2)
      }
      //return
      setTimeout(() => {  
        let canvas = document.getElementById("mycanvas");
        this.dataURL = canvas.toDataURL("image/png")
        this.isCanvasImg = true
        Indicator.close()
        this.$toast("绘制成功，长按保存到手机相册")
        this.generateImging = false
        this.inputs = []
      }, 1500)
    },
    back() {
      this.dataURL = false 
      this.isCanvasImg = false
      this.isScreenShot = false 
    }    
  },
  computed: {
    canvasWH() {
      return {w: window.innerWidth * this.canvasScale, h: window.innerHeight * this.canvasScale}
    }
  },
  watch: {
    isScreenShot(newValue) {
      if (newValue) {
        document.documentElement.style.cssText += "overflow-y: hidden;"
      } else {
        document.documentElement.style.cssText  += "overflow-y: auto;"
      }
    }
  }
}
</script>

<style scoped> 
  /* .screenshot{position: fixed;width: 100%;height: 100%;left:0;top:0;z-index: 10000;} */
  .screenshot{position: relative;z-index: 10000;touch-action:none;}
  .box{width: 1.2rem;height: 1.2rem;border-radius: 50%;background: url(../assets/icon_10.png) no-repeat center;background-size: cover;position: fixed;right:.2rem;bottom:1.3rem;z-index: 10000;animation: breathing-lamp 1s infinite alternate;}
  .box:not(.on){transition: all .5s;}
  .box.on{z-index: 99999;}
  .right-left-enter,.right-left-leave-active{transform: translateX(2rem);opacity: 0;}
  #dataURL,.canvas-box{position: absolute;width: 100%;height: 100%;left:0;top:0;}
  #dataURL{z-index: 9999;}
  .canvas-box{z-index: 100;background: #272626;}
  /* .canvas-box .inputs{position: absolute;left:0;top:0;width: 100%;height: 100%;z-index: 50;} */
  .canvas-box .inputs{position: absolute;left:14%;top:1.1rem;}
  .canvas-box .inputs input{position: absolute;left:50%;top:50%;z-index: 100;width: 1.35rem;padding:0 .05rem;height:.5rem;/*line-height: .5rem;*/font-size: .3rem;color:red;background: none;cursor: move;}
  .canvas-box .inputs input.on{border:1px solid red;}
  .canvas-img.on{left:0;background: #272626;}
  .controls{position: absolute;width: 100%;left:0;bottom:0;padding-bottom: .2rem;z-index: 100;display: flex;flex-direction: column;align-items: center;}
  .canvas-box dd{width: .26rem;height:.26rem;border-radius: 50%;margin:0 .23rem;border:.03rem solid black;}
  .canvas-box dd.on{border-color: #fff !important;}
  .canvas-box dd.black{background: black;}
  .canvas-box dd.fuchsia{background: fuchsia;}
  .canvas-box dd.red{background: #FF0000;}
  .canvas-box dd.blue{background: blue;border:.03rem solid #1800FF;}
  .canvas-box button,.canvas-img .back{width:1.6rem;height:.8rem;border-radius: .8rem;background: #89B1D2;color:#fff;font-size: .26rem;margin:0 .05rem;}
  .canvas-box button.dis{background: #ccc;}
  .canvas-img{position: fixed;width: 100%;height: 100%;left:0;top:0;left:100%;transition: all .7s;}
  .canvas-img .back{position: absolute;right:.1rem;top:.1rem;z-index: 10000;}
  .pre{position: fixed;left:100%;top:0;z-index: -1;opacity: 0;}
  #aaa{width: 100%;height: 100%;}
  .btns{position: absolute;width: 100%;left:0;top:0;z-index: 10000;}
  .btns img{width:.48rem;padding:.26rem;}
  .buttons .icon{height:.56rem;}
  .buttons img{width:.4rem;}
  .buttons .button{margin:0 .6rem;padding-top: .4rem;}
  .buttons span{font-size: .24rem;color:#787878;}
  .buttons .button.on span{color:#fff;}
  .mycanvas-box{width:72%;margin:1.1rem auto 0;background: #096397;border:.03rem solid #D9E2E7;min-height:5rem;}
  .mycanvas-box b{display: block;width:.17rem;height:.17rem;background: url(../assets/icon_22.png);position: absolute;left:-.12rem;top:-.06rem;background-size: 100%;}
  .mycanvas-box b:nth-child(2){background-image: url(../assets/icon_23.png);}
  .mycanvas-box b:nth-child(3){background-image: url(../assets/icon_24.png);}
  .mycanvas-box b:nth-child(4){background-image: url(../assets/icon_25.png);}
  /* .mycanvas-box.on{position: relative;} */
  @keyframes breathing-lamp{
    from{box-shadow: 0 0 2px 0 #13b6fe;}
    to{box-shadow: 0 0 10px 0 #13b6fe;}  
  }
</style>