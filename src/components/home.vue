<template>
  <div class="home body">
    <my-header :title="title"></my-header>  
    <div class="container">
      <div class="search-banner">  
        <div class="search" @click="jump_search">
          <div class="wrap">  
            <div class="input flex-bet"><input type="text" disabled><div class="history"></div></div>
          </div>
        </div>
        <div class="banner">
            <div class="swiper-container">
            <ul class="swiper-wrapper">
                <li class="swiper-slide" :style="{background: 'url('+bannerimg1+')'}"></li>    
                <li class="swiper-slide" :style="{background: 'url('+bannerimg2+')'}"></li>  
                <li class="swiper-slide" :style="{background: 'url('+bannerimg3+')'}"></li>    
                <li class="swiper-slide" :style="{background: 'url('+bannerimg4+')'}"></li>
                <li class="swiper-slide" :style="{background: 'url('+bannerimg5+')'}"></li>    
                <li class="swiper-slide" :style="{background: 'url('+bannerimg6+')'}"></li>  
            </ul>
            <div class="swiper-pagination"></div>
            </div>    
        </div>
      </div>
      <div class="category">
        <div id="list" :style="{height: heights + 'rem'}">
          <!-- <dd v-for="(item, $index) in categoryList" :key="item.key" @click="jump_assistant($index)">
            <img :src="require('../assets/list_0'+($index + 1)+'.png')" alt="">
            <p>{{item.name}}</p>
          </dd>  -->
          <SlickList :lockToContainerEdges="true" class="dl" axis="xy" lockAxis="xy" v-model="categoryList" @input="getChangeLists" :pressDelay="pressDelay" ref="dlList">
            <SlickItem class="dd" v-for="(item, index) in categoryList" :index="index" :key="index" @click="soso()">
              <img :src="require('../assets/list_0'+(item.$index + 1)+'.png')" alt="">
              <p>{{ item.name }}</p>
              <div class="click-box" :data-index="index"></div>
            </SlickItem>
          </SlickList>
          <div :class="['open', isOpen ? 'on' : '']" @click="open">更多</div>
        </div>
      </div> 
      <div class="booth" ref="booth">
        <div class="wrap"><img src="../assets/home_01.png" alt=""></div>   
      </div>
      <div class="notice">
        <div class="wrap flex-bet">
          <span>新通知</span>
          <div class="text-scroll">
            <text-scroll :textList="noticeList"></text-scroll>    
          </div>
          <div class="more" @click="jump('/library')">更多</div>    
        </div>          
      </div>  
      <div class="data-sharing">
        <div class="wrap">
          <dl>
            <dd class="flex people">
              <div class="img"><img src="../assets/git_01.gif" alt=""></div>
              <div class="data">
                <div class="top flex">
                  <div>
                    <h4>进深</h4>
                    <div class="num flex"><span>15.8</span>万人</div>
                  </div>
                  <div>
                    <h4>出深</h4>
                    <div class="num flex"><span>8.8</span>万人</div>
                  </div>
                </div>
                <div class="bottom">
                  <div class="flex-cen">
                    <h5>户籍人口数量</h5>
                    <div class="pro flex1"><div class="pro-box" style="width:50%;"></div></div>
                    <p class="flex-cen"><span>1088</span>万人</p>
                  </div>
                  <div class="flex-cen">
                    <h5>非户籍人口数量</h5>
                    <div class="pro flex1"><div class="pro-box" style="width:100%;"></div></div>
                    <p class="flex-cen"><span>88588</span>万人</p>
                  </div>
                </div>
              </div>
            </dd>
            <dd class="flex vehicle">
              <div class="img"><img src="../assets/git_02.gif" alt=""></div>
              <div class="data">
                <div class="top flex">
                  <div>
                    <h4>机动车总体保有量</h4>
                    <div class="num flex"><span>22.2</span>万辆</div>
                  </div>
                  <div>
                    <h4>交通路网里程数</h4>
                    <div class="num flex"><span>5.8</span>万km</div>
                  </div>
                </div>
                <div class="bottom">
                  <div class="flex-cen">
                    <h5>交通指数</h5>
                    <div class="pro flex1"><div class="pro-box" style="width:50%;"></div></div>
                    <p class="flex-cen"><span>3.4</span></p>
                  </div>
                </div>
              </div>
            </dd>
            <dd class="flex badge">
              <div class="img"><img src="../assets/git_03.gif" alt=""></div>
              <div class="data">
                <div class="top">
                  <div class="li flex-bet">
                    <p>应急事件</p>
                    <h4><span>247</span>件</h4>
                  </div>
                  <div class="li flex-bet">
                    <p>重大应急事件</p>
                    <h4><span>666</span>件</h4>
                  </div>
                  <div class="li flex-bet">
                    <p>交通安全事故数</p>
                    <h4><span>588</span>件</h4>
                  </div>
                </div>
                <div class="bottom">
                  <div class="sign">数据共享</div> 
                  <div class="title flex-cen">采集数据<p><span>1834,908,868</span>条</p></div> 
                  <div class="dd flex">
                    <h3>对接单位</h3>
                    <div class="ol flex-cen">
                      <h4>市级单位：</h4>
                      <p><b>75</b>/<span>188</span>家</p>
                    </div>
                    <div class="ol flex-cen">
                      <h4>区级单位：</h4>
                      <p><b>68</b>/<span>158</span>家</p>
                    </div>
                  </div>
                  <div class="dd flex">
                    <h3>用户情况</h3>
                    <div class="ol flex-cen">
                      <h4>注册用户数：</h4>
                      <p><span>7800</span>人</p>
                    </div>
                    <div class="ol flex-cen">
                      <h4>在线用户数：</h4>
                      <p><span>5000</span>人</p>
                    </div>
                    <div class="ol flex-cen">
                      <h4>离线用户数：</h4>
                      <p><span>6000</span>人</p>
                    </div>
                  </div>
                </div>
              </div>
            </dd>
          </dl>
        </div>    
      </div>    
      <div class="data-collection">
        <div class="">
          <!-- <img src="../assets/abc_02.gif" alt=""> -->
          <img src="../assets/fazhan.jpg" alt="">
        </div>    
      </div>
      <transition name="top-bottom">
        <div class="categoryList" v-show="isShowCategoryList">
          <dl class="flex">
            <dd v-for="(item, index) in categoryList" :key="index" @click="jump_assistant(index)">{{item.name}}</dd>
          </dl>
        </div>  
      </transition>  
    </div>
    <tab></tab>
    <screenshot></screenshot>
  </div>
</template>

<script type="text/ecmascript-6">
import Swiper from 'swiper'
import Sortable from 'sortablejs'
import MyHeader from 'components/header.vue'
import Tab from 'components/tab.vue'
import Screenshot from 'components/screenshot.vue'
import TextScroll from 'base/text-scroll/text-scroll.vue'
import { SlickList, SlickItem } from 'vue-slicksort'
import { getGuoxin } from 'api/request.js'

export default {
  name: "",
  data() {
    return {
      title: '服务管理数字助手',//页面标题深圳市政府管理服务指挥中心   
      bannerimg1: require('../assets/banner_01.png'),
      bannerimg2: require('../assets/banner_02.png'),
      bannerimg3: require('../assets/banner_03.png'),
      bannerimg4: require('../assets/banner_04.png'),
      bannerimg5: require('../assets/banner_05.png'),
      bannerimg6: require('../assets/banner_06.png'),
      reRender: true,
      pressDelay: 500,
      categoryList: [
        { name:'经济发展', $index: 0},   
        { name:'公共安全', $index: 1},   
        { name:'交通运行', $index: 2},   
        { name:'政务服务', $index: 3},   
        { name:'生态环境', $index: 4},   
        { name:'民生服务', $index: 5},   
        { name:'城市治理', $index: 6},   
        { name:'应急指挥', $index: 7}  
      ],
      noticeList: [
        {title: "第一届高等教育研讨会在深大召开了会议"},  
        {title: "第二届高等教育研讨会在深大召开了会议"},  
        {title: "第三届高等教育研讨会在深大召开了会议"},  
        {title: "第四届高等教育研讨会在深大召开了会议"},  
        {title: "第五届高等教育研讨会在深大召开了会议"}  
      ],
      isShowCategoryList: false,
      curScrollTop: 0,
      offsetTop_booth: 0,
      isOpen: false,
      heights: 1.78
    }
  },
  created() {
    this.setLocalStorage()   

    // getGuoxin().then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // }) 
  },
  components: {
    MyHeader: MyHeader,  
    Tab: Tab,
    TextScroll: TextScroll,
    Screenshot: Screenshot,
    SlickItem,
    SlickList         
  },
  destroyed() {},
  mounted() {
    console.log("sss")
    let _this = this
    
    getGuoxin('authority/goLogin',{}).then(res => {
       if(res.state.code == 500){
          this.$toast(res.state.message)
          this.$router.push({path:'/login'});
        }else if(res.state.code == 200){
          console.log(res)
          localStorage.setItem('roleId',res.roleId);
        }
    }).catch(err => {
      this.$toast("请求失败")
        console.log(err)
    }) 
    this.offsetTop_booth = this.$refs.booth.offsetTop
    console.log("断电1")
    window.addEventListener('scroll', res => {
      this.curScrollTop =  document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      if (this.curScrollTop > this.offsetTop_booth) {
        this.isShowCategoryList = true
      } else {
        this.isShowCategoryList = false
      }
    })
    let _dds = document.querySelectorAll(".category .dd")
    for (let i = 0; i < _dds.length; i++) {
      _dds[i].addEventListener("click", function(e){
        console.log("sss")
        _this.jump_assistant(e.target.dataset.index)
      })
    }
    this.swiperInit()
  },
  watch:{
    items:function(){
      console.log(this.categoryList.map(item => categoryList.key))
    }
  },
  methods: {
    soso(){
      console.log("ssss")
    },
    setLocalStorage() {
      if (localStorage.getItem("newArr")) {
        this.categoryList = JSON.parse(localStorage.getItem("newArr"))
      }
    },
    getChangeLists (newArr) {
      console.log("拖拽完成的最新数据：", newArr)
      localStorage.setItem("newArr", JSON.stringify(newArr))
    },
    //8个icon跳转页面
    jump_assistant(index) {
      console.log("测试")
      console.log(index)
      if (this.categoryList[index].$index == 0) {
        this.$router.replace('/assistant') 
      }else if(this.categoryList[index].$index == 3){
        this.$router.replace('/security')    
      } else if (this.categoryList[index].$index == 4) {
        this.$router.replace('/ecology') 
      } else {
        this.$router.replace({ name: "security", params: { title: this.categoryList[index].name } })
      }
    },
    jump_search() {
      this.$router.replace('/search')    
    }, 
    jump(path) {
      this.$router.replace(path)
    }, 
    swiperInit() {
      var swiper = new Swiper('.swiper-container', {
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
      });    
    },
    btnUp(index){
        var item = this.items[index];
        this.items.splice(index,1);
        this.items.unshift(item);
    },
    open() {
      // let _dl = this.$refs.dlList
      // console.log(_dl.offsetHeight)
      // _dl.style.height = _dl.offsetHeight * 2
      // console.log(_dl)
      //this.heights = 2 * this.heights
      let _line = Math.ceil(this.categoryList.length / 4)
      if (this.isOpen) {
        this.heights = this.heights / _line
      } else {
        this.heights = _line * this.heights
      }
      this.isOpen = !this.isOpen
    }   
  }
}
</script>

<style scoped>
  @import '~common/css/swiper.min.css';
  .banner li{height:3rem;background-size: cover !important;background-position: center top !important;}
  .category{padding:.3rem 0 .1rem;font-size: 0;text-align: center;}
  .category .dl{text-align: left;}
  .category dd,.category .dd{position: relative;text-align: left;}
  .category dd,.category .dd{width:17%;padding-bottom: .24rem;;border-radius: 50%;display: inline-block;margin:.1rem 3.5%;text-align: center;}
  .category dd img,.category .dd img{width:1rem;}
  .category dd p,.category .dd p{font-size: .22rem;color:#787878;padding-top: .12rem;}
  .category .dd .click-box{width:100%;height:100%;position: absolute;left:0;top:0;}
  .search-banner{position: relative;box-shadow: 0px 6px 9px 0px rgba(33, 82, 119, 0.53);}
  .search-banner .search{width:100%;padding-top: .08rem;position: absolute;left:0;top:0;z-index: 100;}
  .search input{height: .6rem;width:6.3rem;border-radius: .6rem;background: rgba(255,255,255,.5) url(../assets/icon_07.png) no-repeat .2rem center;background-size: .26rem;padding-left: 0.66rem;box-sizing: border-box;}
  .input .history{width: 0.4rem;height: 0.6rem;background: url(../assets/icon_08.png) no-repeat  center;background-size: 100%;}
  .notice{height:.42rem;line-height: .42rem;margin:.13rem 0;background: #eee;font-size: .24rem;color:#a7a2a2;}
  .notice span{color:#f60000;padding:0 .48rem 0 .34rem;}
  .notice .more{padding:0 .42rem;border-left: 1px solid #a7a2a2;}
  .notice .text-scroll{flex:1;}
  .data-collection{padding-bottom: .3rem;}
  .categoryList{position: fixed;width: 100%;left:0;top:.92rem;z-index: 99;overflow-x: auto;overflow-y: hidden;background: #54489A;font-size: .2rem;color:#fff;font-weight: bold;text-align: center;box-shadow: 0px 6px 9px 0px rgba(33, 82, 119, 0.53);transition: all .5s;-webkit-overflow-scrolling: touch;}
  .categoryList::-webkit-scrollbar{display: none;}
  .categoryList dd{width:1.85rem;height: .7rem;line-height: .7rem;flex-shrink: 0;font-size: .3rem;}
  .top-bottom-enter,.top-bottom-leave-to{transform: translateY(-100%);opacity: 0;}
  .data-sharing dd{padding:.4rem .12rem .33rem;border:.02rem solid #ccc;margin-bottom: 0.12rem;}
  .data-sharing .img{font-size: 0;}
  .data-sharing .img img{width: 2rem;}
  .data-sharing .data{padding-left:.2rem;flex:1;}
  .data-sharing .top>div:first-child{margin-right: 0.42rem;}
  .data-sharing .top h4{font-size: .2rem;color:#6cbffa;padding-bottom: .12rem;}
  .data-sharing .top .num{font-size: .17rem;color:#b2b2b2;align-items: flex-end;}
  .data-sharing .people .top .num {padding-left: 0.55rem;background: url(../assets/icon_11.png) no-repeat left;background-size: .4rem;}
  .data-sharing .top .num span{font-size: .5rem;color:#6cbffa;display: block;width: 1rem;}
  .data-sharing .bottom{padding-top: 0.46rem;}
  .data-sharing .bottom>div:first-child{margin-bottom: 0.32rem;}
  .data-sharing .bottom h5{font-size: .17rem;color:#666;width:1.2rem;}
  .data-sharing .bottom p{font-size: .2rem;color:#b2b2b2;}
  .data-sharing flex:not(.badge) .bottom p span{color:#808080;font-family: Arial;display: block;width: 0.6rem;}
  .data-sharing .bottom .pro{height:.12rem;margin:0 .1rem;}
  .data-sharing .bottom .pro-box{width:50%;height: 100%;background: #E492FC;border-radius: .12rem;}
  .data-sharing .vehicle .pro{height:.05rem;padding:.05rem .07rem;background: #EAEAEC;}
  .data-sharing .vehicle .pro-box{background-image: linear-gradient(to right, #4FF8EA, #55FF83, #FFDA28);}
  .data-sharing .vehicle .bottom{padding-top: .64rem;}
  .badge .top{padding-bottom: 0.16em;background: url(../assets/line_01.png) no-repeat center bottom;background-size: 4.74rem;}
  .badge .top .li{margin:0 0 .18rem 0 !important;padding:0 10%;height: 0.24rem;}
  .badge .top .li p{font-size: .17rem;color:#666;padding-left: .38rem;background:url(../assets/icon_12.png) no-repeat left;background-size: .21rem;}
  .badge .top .li:nth-child(2) p{background-image: url(../assets/icon_13.png);}
  .badge .top .li:nth-child(3) p{background-image: url(../assets/icon_14.png);}
  .badge .top .li h4{font-size: .14rem;color:#ccc;}
  .badge .top .li h4 span{font-size: .28rem;color:#6cbffa;padding-right: 0.12rem;}
  .badge .bottom{position: relative;padding-top: 0.2rem;margin-top: 0.2rem;}
  .badge .bottom .sign{font-size: .16rem;position: absolute;left:0;top:0;}
  .badge .bottom .title{font-size: .17rem;color:#4c4c4c;text-align: center;margin-bottom: .14rem;}
  .badge .bottom .title p{color:#cccccc;}
  .badge .bottom .title span{font-size: .27rem;color:#6cbffa;padding:0 .14rem 0 .21rem;}
  .badge .bottom .dd{height:.48rem;background: #EAEAEC url(../assets/icon_15.png) no-repeat  .1rem center;margin-bottom: 0.08rem;background-size: .2rem;padding-left: 0.4rem;align-items: center;}
  .badge .bottom .dd h3{width:.42rem;font-size: .16rem;color:#322f44;margin-right: 0.13rem;}
  .badge .bottom .ol:not(:last-child){margin-right: 0.26rem;}
  .badge .bottom .ol p{font-size: .14rem;}
  .badge .bottom .dd:nth-last-child(2) .ol p span{padding-right: .05rem;}
  .badge .bottom .ol h4{font-size: .14rem;color:#666;}
  .badge .bottom .ol b{font-size:.2rem;color:#01FF84;}
  .badge .bottom .ol span{font-size:.16rem;color:#44E4FA;}
  .badge .bottom .dd:last-child .ol:not(:last-child){margin-right: 0.24rem;}
  .badge .bottom .dd:last-child .ol h4{width:.5rem;}
  .badge .bottom .dd:last-child{background-image: url(../assets/icon_16.png);}
  .badge .bottom .dd:last-child .ol span{padding:0 .03rem;}
  #list{position: relative;overflow: hidden;transition: all .6s;padding-right: 0.8rem;}
  #list .open{font-size: .28rem;width:.85rem;text-align: left;position: absolute;right:.2rem;top:.64rem;color:#666;}
  #list .open::after{content:"";display: block;width:.24rem;height: 100%;background: url(../assets/icon_09.png) no-repeat right center;background-size: .24rem;position: absolute;right:0;top:0;transition: all .5s;}
  #list .open.on::after{transform: rotate(180deg)}
</style>