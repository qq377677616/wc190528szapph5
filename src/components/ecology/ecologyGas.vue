<template>
  <div class="water body">
    <div class="content wrap">
      <ul>
        <li class="government">
          <h3>空气质量年度变化趋势</h3>
          <div class="con" v-if="arr_data[0].is">
            <!-- <img src="../../assets/abc_18.png" style="width:100%;" alt=""> -->
            <v-chart :options="line" autoresize />
          </div> 
        </li>
        <li class="contaminated">
          <h3>大气污染治理历程</h3>
          <div class="con" v-if="arr_data[1].is">
            <h4>*2019年计划出租车纯电动化率100%</h4>
            <dl>
              <dd>
                <h5>机动车污染整治</h5>
                <div>
                  <p>淘汰老旧车<span>12.9万辆</span></p>
                  <p>新增新能源汽车<span>7万辆</span></p>
                  <!-- <p>公交车纯电动化率<span>100%</span></p> -->
                  <p>电动出租车纯电动化率达<span>100%</span></p>
                </div>
              </dd>
              <dd>
                <h5>挥发性有机物治理</h5>
                <div>
                  <p>重点整治VOC</p>
                  <p>企业<span>480余</span>家</p>
                  <p>完成废气治理的企业<span>0</span>家</p>
                </div>
              </dd>
              <dd>
                <h5>非道路移动机械管理台账完善</h5>
                <div>
                  <p>柴油叉车检测达标率</p>
                  <p>同比去年<b>↑</b><span>0%</span></p>
                  <p>检测非道路移动机械<span>0%</span></p>
                </div>
              </dd>
              <dd>
                <h5>工业燃烧源治理</h5>
                <div>
                  <p>淘汰、改造污染</p>
                  <p>锅炉<span>92台</span></p>
                </div>
              </dd>
              <dd>
                <h5>扬尘污染专项治理</h5>
                <div>
                  <p>搅拌扬尘污染</p>
                  <p>整治<span>0</span>家</p>
                </div>
              </dd>
              <dd>
                <h5>港口船舶污染治理</h5>
                <div>
                  <p>带岸电设施的远洋</p>
                  <p>大型深水泊位<span>25%</span></p>
                </div>
              </dd>
            </dl>
          </div> 
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import axios from 'axios'
export default {
  name: "",
  data() {
    return { 
      dataLi1:[], //机动车污染控制
      dataLi2:[],//挥发性有机物治理 
      dataLi3:[],//非道路移动机械管理台账完善 
      dataLi4:[],//扬尘污染专项治理 
      dataLi5:[],//港口船舶污染治理 
      list:[],
      arr_data:[
        {name:"pm2.5年均浓度及目标值",is:false},
        {name:"年目标、治理历程",is:false},
      ],
      line: {
        //图例
        legend: {
          data:['PM2.5平均浓度降至目标','PM2.5年平均浓度','灰霾天数','优良天数'],//这里的值要与series项数据里面的name值对应上
          align: 'left',
          y: '0'
        },
        xAxis: {//X轴配置
          type: 'category',
          data: ['2015', '2016', '2017', '2018'],
          axisLine: {
            lineStyle: {
                type: 'solid',//轴线类型
                color:'#5388ff',//轴线颜色
                width:'1'////轴线宽度
            }
          }
        },
        yAxis: [//y轴配置
            {//左侧线
              type: 'value',
              splitLine:{show: false},//去除网格线
              name: '',
              min: 0,//轴数最小值
              max: 35,//轴数最大值
              interval: 5,//轴距值
              axisLabel: {
                formatter: '{value}'
              },
              axisLine: {
                lineStyle: {
                    type: 'solid',//轴线类型
                    color:'#5388ff',//轴线颜色
                    width:'1'////轴线宽度
                }
              }
            },
            {//右侧线
              type: 'value',
              splitLine:{show: false},
              min: 0,
              max: 400,
              interval: 100,
              axisLabel: {
                formatter: '{value}'
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color:'#5388ff',
                  width:'1'
                }
              }
            }
        ], 
        //数据配置
        series: [ 
          //2020年PM2.5平均浓度降至目标
          {
              name: "PM2.5平均浓度降至目标",
              data: [],
              symbol: "none",//去掉线上的圆点 
              yAxisIndex: 0,//参考哪个Y轴
              type: 'line',
              smooth: true,//是否为光滑线
              itemStyle:{ normal:{ color:'#FFF45C'} }//线条颜色
          },
          //PM2.5年平均浓度
          {
              name: "PM2.5年平均浓度",
              data: [],
              symbol: "none", 
              yAxisIndex: 0,
              type: 'line',
              smooth: true,
              itemStyle:{ normal:{ color:'#66FE6A'} }
          },
          //优良天数
          {
              name: "优良天数",
              data: [],
              symbol: "none",
              yAxisIndex: 1,
              type: 'line',
              smooth: true,
              itemStyle:{ normal:{ color:'#FD8D70'} }
          },
          //灰霾天数
          {
              name: "灰霾天数",
              data: [],
              symbol: "none", 
              yAxisIndex: 1,
              type: 'line',
              smooth: true,
              itemStyle:{ normal:{ color:'#CF5FFF'} }
          }
        ]
      }
    }
  },
  mounted(){
    var that = this;
    var datas ={
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "timekey"
            },
            {
                "name": "sqlx"
            },
            {
                "name": "nf"
            },
            {
                "name": "zbdm"
            },
            {
                "name": "zbmc"
            },
            {
                "name": "sum_dlzbz"
            },
            {
                "name": "jldw"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "nf",
                "operator": "IN",
                "values": [
                    "2015",
                    "2016",
                    "2017",
                    "2018"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "zbdm",
                "operator": "IN",
                "values": [
                    "YT03_00001001"
                ],
                "value": ""
            }
        ],
        "orderInfoList": [
            {
                "name": "nf",
                "type": "DESC"
            },
            {
                "name": "zbdm",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-dqzt-dwi_nbzb"
}
var datas1 ={
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "timekey"
            },
            {
                "name": "sqlx"
            },
            {
                "name": "nf"
            },
            {
                "name": "zbdm"
            },
            {
                "name": "zbmc"
            },
            {
                "name": "sum_dlzbz"
            },
            {
                "name": "jldw"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "nf",
                "operator": "IN",
                "values": [
                    "2015",
                    "2016",
                    "2017",
                    "2018"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "zbdm",
                "operator": "IN",
                "values": [
                    "BT01_00006001"
                ],
                "value": ""
            }
        ],
        "orderInfoList": [
            {
                "name": "nf",
                "type": "DESC"
            },
            {
                "name": "zbdm",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-dqzt-dwi_nbzb"
}
var datas2 ={
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "timekey"
            },
            {
                "name": "sqlx"
            },
            {
                "name": "nf"
            },
            {
                "name": "zbdm"
            },
            {
                "name": "zbmc"
            },
            {
                "name": "sum_dlzbz"
            },
            {
                "name": "jldw"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "nf",
                "operator": "IN",
                "values": [
                    "2015",
                    "2016",
                    "2017",
                    "2018"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "zbdm",
                "operator": "IN",
                "values": [
                    "YT03_00004001"
                ],
                "value": ""
            }
        ],
        "orderInfoList": [
            {
                "name": "zbdm",
                "type": "DESC"
            },
            {
                "name": "nf",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-dqzt-dwi_nbzb"
}
var datas3 = {
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "timekey"
            },
            {
                "name": "sqlx"
            },
            {
                "name": "nf"
            },
            {
                "name": "zbdm"
            },
            {
                "name": "zbmc"
            },
            {
                "name": "sum_dlzbz"
            },
            {
                "name": "jldw"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "nf",
                "operator": "IN",
                "values": [
                    "2015",
                    "2016",
                    "2017",
                    "2018"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "zbdm",
                "operator": "IN",
                "values": [
                    "YT03_00002001"
                ],
                "value": ""
            }
        ],
        "orderInfoList": [
            {
                "name": "nf",
                "type": "DESC"
            },
            {
                "name": "zbdm",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-dqzt-dwi_nbzb"
}
var datas4 = {
    "queryCodeType": "DetailIndicator",
    "queryView": {
        "queryType": "sql",
        "pagination": {
            "pageSize": 10,
            "currentPage": 0
        },
        "queryItemList": [
            {
                "name": "dwi_nbzb_zbmc"
            },
            {
                "name": "dwi_nbzb_dlzbz"
            },
            {
                "name": "dwi_nbzb_sjly"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "dwi_nbzb_nf",
                "operator": "EQ",
                "values": [
                    "2018"
                ],
                "value": null
            },
            {
                "dataType": "String",
                "name": "dwi_nbzb_zbdm",
                "operator": "IN",
                "values": [
                    "YT01_00012001",
                    "YT01_00011003",
                    "YT01_00010002",
                    "YT03_00045001",
                    "YT03_00045002",
                    "YT03_00042001",
                    "YT03_00057001",
                    "YT03_00041002",
                    "YT03_00042001",
                    "YT03_00058001",
                    "YT03_00043001",
                    "YT03_00044001",
                    "YT03_00040001"
                ],
                "value": null
            }
        ],
        "orderInfoList": [
            {
                "name": "dwi_nbzb_sjly",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-dwi_nbzb",
    "dataFormat": "HEADTABLE"
}
axios.get('http://10.253.100.29:8008/ioc-sz-appService/authority/modualData?modul_name=大气改善',{})
    .then(res=>{
      if(res.data.state.code == 200){
        for(let i=0; i<res.data.result.length; i++){
          for(let j=0; j<this.arr_data.length; j++){
            if(res.data.result[i] == this.arr_data[j].name){
              this.arr_data[j].is = true
            }
          }
        }
      }
      // for(let i=0; i<)
    })
  axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas)
      .then(function(res){
        console.log(res)
        for(let i = 0; i<res.data.rows.length; i++){
          that.line.series[0].data.push(res.data.rows[i].sum_dlzbz)
        }
        //sum_dlzbz
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas1)
      .then(function(res){
        for(let i = 0; i<res.data.rows.length; i++){
          that.line.series[1].data.push(res.data.rows[i].sum_dlzbz)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas2)
      .then(function(res){
        for(let i = 0; i<res.data.rows.length; i++){
          that.line.series[2].data.push(res.data.rows[i].sum_dlzbz)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas3)
      .then(function(res){
        for(let i = 0; i<res.data.rows.length; i++){
          that.line.series[3].data.push(res.data.rows[i].sum_dlzbz)
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas4)
      .then(function(res){
        console.log(res)
        //dataLi1
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  created() {
    // setTimeout(() => {
    //   this.bar2.series[1].data = [200, 250, 50, 400, 120, 260, 360]
    // }, 2000)
  },
  components: {
   ECharts
  },
}
</script>

<style scoped>
  .body{padding:0;min-height: auto;;}
  .water>.content{padding-top: .44rem;}
  .ecology h3{padding:0 0 .1rem .4rem;font-size: .3rem;color:#1b9dd2;border-bottom: .02rem solid #b5b5b5;position: relative;font-weight: bold;background: url(../../assets/icon_26.png) no-repeat left;background-size: .25rem;margin-bottom: .6rem;}
  .government .con{margin-top: -.2rem;}
  .contaminated{color:#5388ff;margin-top:-.3rem;}
  .contaminated h4{padding-bottom: .32rem;text-align: center;}
  .contaminated dl{display: flex;flex-wrap: wrap;}
  .contaminated dl dd{width:50%;font-size: .18rem;line-height: .24rem;}
  .contaminated dl dd>div{padding-left: .92rem;background: url(../../assets/icon_29.png) no-repeat left;background-size: .68rem;box-sizing: border-box;margin-bottom: .4rem;min-height: .8rem;display: flex;flex-direction: column;justify-content: center;}
  .contaminated dl dd h5{padding-bottom: 0.2rem;font-size: .2rem;}
  .contaminated dl dd:nth-child(2)>div{background-image: url(../../assets/icon_30.png);background-size: .7rem;}
  .contaminated dl dd:nth-child(3)>div{background-image: url(../../assets/icon_31.png);background-size: .73rem;}
  .contaminated dl dd:nth-child(4)>div{background-image: url(../../assets/icon_32.png);background-size: .6rem;}
  .contaminated dl dd:nth-child(5)>div{background-image: url(../../assets/icon_33.png);background-size: .71rem;}
  .contaminated dl dd:nth-child(6)>div{background-image: url(../../assets/icon_34.png);background-size: .76rem;}
  .contaminated dl dd span,.contaminated dl dd b{color:#FF0000;}
  .contaminated dl dd b{font-size: .3rem;}
  .contaminated h5{font-size: .2rem;}
  /* .government{margin-bottom: 0.5rem;} */
  .echarts{width:100%;height:5.5rem;}
</style>