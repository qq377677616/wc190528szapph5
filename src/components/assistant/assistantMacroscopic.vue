<template>
  <div class="assistantMacroscopic body">
    <div class="wi">
      <img src="../../assets/hong1.png">
    </div>
    <div class="wi">
      <img src="../../assets/hong2.png">
    </div>
    <div class="box-text">
      <ul class="box-text—ul">
        <li class="box-text-ul-list">粤港澳大湾区</li>
        <li>全国亿万级城市</li>
      </ul>
    </div>
    <div class="wi ssss">
      <img src="../../assets/hong3.png">
    </div>
    <div class="wi">
      <img src="../../assets/hong4.png">
    </div>
    <div class="wi">
      <img src="../../assets/hong5.png">
    </div>
    <div class="wi">
      <img src="../../assets/hong6.png">
    </div>
    <div class="wi">
      <img src="../../assets/hong7.png">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs'
import Empty from 'components/empty.vue'
import ECharts from 'vue-echarts'
// import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import { MessageBox, Indicator } from 'mint-ui'
export default {
  name: "",
  props: {
    clickAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {   
      isConfigure: false,
      macroscopic: [
        {
          name: '地区生产总值',
          isSelect: true,
          isShowBtn: false,
          category: [{ title: '各区生产总值对比', isSelect:true }, { title: '三产占比', isSelect:true }, { title: '发展趋势', isSelect:true }]
        },
        {
          name: '规上工业',
          isSelect: true,
          isShowBtn: false,
          category: [{ title: '各区生产总值对比', isSelect:true }, { title: '各区增加值', isSelect:true }, { title: '发展趋势', isSelect:true }]
        },
        {
          name: '财政收入',
          isSelect: true,
          isShowBtn: false,
          category: [{ title: '一般公共预算收入', isSelect:true }, { title: '一般公共预算支出', isSelect:true }, { title: '税收总额', isSelect:true }, { title: '固定资产投资', isSelect:true }]
        },
        {
          name: '社消零',
          isSelect: true,
          isShowBtn: false,
          category: [{ title: '各区零售总额对比', isSelect:true }, { title: '发展趋势', isSelect:true }]
        },
        {
          name: '对外贸易',
          isSelect: true,
          isShowBtn: false,
          category: [{ title: '发展趋势', isSelect:true }]
        }
      ],
      options,
      initOptions: {
        renderer: options.renderer || 'canvas'
      },
      pie: {
        title: {
          text: '饼图程序调用高亮示例',
          x: 'center'
        }, 
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['第一产业\n增加值', '第二产业\n增加值', '第三产业\n增加值']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['30%', '45%'],
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '第一产业\n增加值\n58万(绝对值)', itemStyle: { color: '#2EC7C9' } },
              { value: 310, name: '第二产业\n增加值\n58万(绝对值)', itemStyle: { color: '#B6A2DE' } },
              { value: 234, name: '第三产业\n增加值\n58万(绝对值)', itemStyle: { color: '#5AB1EF' } }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      // bar: {
      //   legend: {
      //     data:['销量'],
      //     align: 'left',
      //   },
      //   tooltip: {},
      //   dataset: {
      //     // Provide data.
      //     source: [
      //       ['Product', '1'],
      //       ['2014', 50],
      //       ['2015', 40],
      //       ['2016', 80],
      //       ['2017', 70],
      //       ['2018', 55]
      //     ]
      //   },
      //   xAxis: { type: 'category' },
      //   yAxis: {},
      //   series: [{ name: '销量', type: 'bar', barWidth: 10,itemStyle:{ normal:{ color:'#66CDAA'} } }]
      // }
      bar: {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
          data:['时区生产总值','增幅'],
          align: 'left',
          y: '65px'
        },
        xAxis: [
            {
              type: 'category',
              data: ['2014年','2015年','2016年','2017年','2018年'],
              axisPointer: {
                type: 'shadow'
              }
            }
        ],
        yAxis: [
            {
              type: 'value',
              name: '',
              min: 0,
              max: 150,
              interval: 50,
              axisLabel: {
                formatter: '{value}'
              },
              axisLine: {
                lineStyle: {
                    type: 'solid',
                    color:'#66CDAA',
                    width:'1'
                }
              }
            },
            {
              type: 'value',
              name: '',
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: '{value}'
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color:'#D3B36D',
                  width:'1'
                }
              }
            }
        ],
        series: [
            {
              name:'时区生产总值',
              type:'bar',
              barWidth: 10,
              itemStyle:{ normal:{ color:'#66CDAA'} },
              data:[30, 40, 80, 100, 20]
            },
            {
              name:'增幅',
              type:'line',
              yAxisIndex: 1,
              itemStyle:{ normal:{ color:'#D3B36D'} },
              data:[20, 6, 12, 14, 10]
            }
        ]
      }  
    }
  },
  methods: {
    configureSwitch() {
      this.isConfigure = !this.isConfigure
    },
    selectItem(index) {
      this.macroscopic[index].isSelect = !this.macroscopic[index].isSelect
      this.allSelect(index)
    },
    selectItems(index, indexs) {
      this.macroscopic[index].category[indexs].isSelect = !this.macroscopic[index].category[indexs].isSelect
      this.isAllSelect(index)
    },
    allSelect(index) {
      this.macroscopic[index].category.forEach(item => {
        item.isSelect = this.macroscopic[index].isSelect
      })
    },
    isAllSelect(index) {
      this.macroscopic[index].isSelect = this.macroscopic[index].category.some(item => { return item.isSelect})
    },
    swipeleft(index) {
      if (this.macroscopic[index].isShowBtn) return
      console.log(index)
      this.macroscopic[index].isShowBtn = true
    },
    swiperight(index) {
      if (!this.macroscopic[index].isShowBtn) return
      console.log(index)
      this.macroscopic[index].isShowBtn = false
    },
    deletaItem(index) {
      MessageBox({
        title: '取消关注',
        message: '取消关注后可以点击右上角“+”进行设置关注指标，是否取消关注该指标？',
        showCancelButton: true
      }).then(res => {
        if (res == 'confirm') {
          Indicator.open({text: '取消中', spinnerType: 'fading-circle'})
          setTimeout(() => {
            Indicator.close()
            this.$toast('取消关注成功')
            this.macroscopic[index].isSelect = false
            this.macroscopic[index].isShowBtn = false
            this.allSelect(index)
          }, 600)
        }
      })
    }
  },
  computed:{
    isEmpty() {
      return this.macroscopic.every(item => { return !item.isSelect })
    }
  },
  watch: {
    clickAdd(newValue) {
      this.isConfigure = newValue
    }
  },
  components: { 
    Empty: Empty,
    Vchart: ECharts     
  }
}
</script>

<style scoped>
  .assistantMacroscopic{padding: .46rem 0 0;background: #fff;}
  .content img{display: block;margin:5% auto;}
  .content h3{font-size: .3rem;padding:0 0 .2rem .2rem;border-bottom:.01rem solid #ddd;position: relative;font-weight: bold;}
  .content h3::after{content:"";display: block;width:.03rem;background: #0000FF;position: absolute;left:0;top:0;height:.3rem;}
  .content h3 span{font-size: .24rem;}
  .content h3 b{display: block;width:.4rem;height: .4rem;line-height: 0.36rem;text-align: center;border-radius: 50%;background: #1DB9FE;font-size: .3rem;color:#fff;position: absolute;right:0;top:calc(50% - .3rem);transition: all .5s;}
  .right-left-enter,.right-left-leave-to{transform: translateX(100%);opacity: 0;}
  .content h4{position: relative;padding: 2% 0 2% .2rem;font-weight: bold;}
  .content h4::after{content:"";display: block;width: .12rem;height:.12rem;border-radius:50%;background: #75B3F0;position: absolute;left:0;top:calc(50% - .06rem);}
  .configure{font-size:.26rem;transition: all .5s;}
  .configure li{margin-bottom: 10%;}
  .configure dl{padding-left: 2rem;border-left: .04rem solid #0099FF;position: relative;}
  .configure .one dl{border-left:none;}
  .configure h5,.configure dd{width:2rem;height: .5rem;line-height: .5rem;border-radius: .1rem;border:1px solid #222;text-align: center;white-space: nowrap;position: relative;color:#222;}
  .configure li.on h5,.configure  dd.on{border-color: #FF9900;color:#FF9900;}
  .configure h5{margin-right: .4rem;z-index: 10;}
  .configure dd{width:2.2rem;}
  .configure dd:not(:last-child){margin-bottom: 20%;}
  .configure dd::after,.configure h5::after{content:"";display: block;width:2rem;height:2px;position: absolute;top:calc(50% - 1px);right:calc(100% + 1px);background: #0099FF;}
  .configure h5::after{width:.4rem;right:auto;left:calc(100% + 1px);}
  .configure dd:first-child::before,.configure dd:last-child::before{content: "";display: block;background: #fff;width:1rem;height: 15px;position: absolute;right:calc(100% + 2rem);top:calc(50% - 16px);}
   .configure dl::after{left:-.3rem;top:-5px;}
  .configure dd:last-child::before{right:calc(100% + 2rem);left:auto;top:calc(50% + 1px);}
  .bottom-top-enter,.bottom-top-leave-to{transform: translateY(50%);opacity: 0;}
  .echarts { width: 100%;height: 6rem; }
  .wi{width: 100%;}
  .wi img{ display: block; width: 100%;}
  .box-text{    width: 100%;
    height: 40px;
    background-color: #00b1ff;
    line-height: 40px;
    font-size: 16px;
  }
  .box-text—ul{
    margin-left: 15px;
  }
  .box-text .box-text—ul li {
    padding: 0 10px;
    color: #fff;
    float: left;
}
.ssss{
  margin: 0.15rem 2.5%;
}
</style>