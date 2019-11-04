<template>
  <div class="ecologyPopulation">
    <div class="content wrap">
      <ul>
        <li class="clean-water">
          <h3>水更清</h3>
          <dl class="box">
            <dd class="rivers">
              <h4>河流水质</h4>
              <div class="con flex-cen">
                <div class="flex-cen" v-if="arr_data[0].is"><span>{{YT03_00023001}}</span>深圳河流总数(条)</div>
                <div class="flex-cen" v-if="arr_data[1].is"><span>{{YT03_00023008}}</span>劣V类(条)</div>
              </div>
            </dd>
            <dd class="smelly">
              <h4>黑臭水体</h4>
              <div class="con flex-bet">
                <div class="left" v-if="arr_data[2].is"><span>{{BT01_00011001}}</span>黑臭水体（个）</div>
                <div class="right">
                  <p v-if="arr_data[3].is">目前已完成治理黑臭水体<span>{{YT01_00014001}}</span>个</p>
                  <p v-if="arr_data[4].is">劣V类<span>{{YT01_00014003}}</span>条</p>
                </div>
              </div>
              <div class="bottom flex-cen"  v-if="arr_data[5].is">
                <div class="num num1">{{YT01_00014004}}</div>
                <div class="box">
                  <div class="text flex-bet"><span>轻度黑臭</span><span>重度黑臭</span></div>
                  <div class="pro flex-cen"><div style="width:3%"></div><div style="width:97%"></div></div>
                </div>
                <div class="num num2">{{YT03_00023009}}</div>
              </div>
            </dd>
            <dd class="water">
              <h4>水污染治理</h4>
              <div class="con flex-bet">
                <div class="left" v-if="arr_data[7].is">
                  <div class="one flex">
                    <h5>项目总投资</h5>
                    <p><span>{{numss}}</span>万元</p>
                  </div>
                  <div class="two flex">
                    <h5>项目总数</h5>
                    <p><span>{{sum_xmgs}}</span>个</p>
                  </div>
                </div>
                <div class="percentage" v-if="arr_data[8].is">
                  <div class="p-box">
                    <my-circle :progress="progress" backgroundColor="#358FDC" barColor="#EBCA5A" textStyle="20px,#b6b0b0"></my-circle>
                    <h6>完成投资率</h6>
                  </div>
                  <div class="p-text">
                    <p>已完成投资额</p>
                    <h5>300亿元</h5>
                  </div>
                </div>
              </div>
            </dd>
          </dl>
        </li>
        <li class="blue-sky">
          <h3>天更蓝</h3>
          <dl class="box" v-if="arr_data[9].is">
            <dd class="excellent">
              <h4>空气优良情况</h4>
              <div class="con">
                <v-chart :options="gauge" autoresize />
                <div class="texts">
                  <p>优良以上空气质量达标率(98%达标)</p>
                </div>
              </div>
            </dd>
            <dd class="pm" v-if="arr_data[10].is">
              <h4>PM2.5平均速度</h4>
              <div class="con flex-cen">
                <!--PM2.5平均速度-->
                <div v-for="item in dwi_nbzb">
                  <div class="top"><span>{{item.sum_dlzbz}}</span>微克/立方米</div>
                  <P>{{item.nf}}年pm2.5{{item.zbmc}}</P>
                </div>
                <!-- <div>
                  <div class="top"><span>25</span>微克/立方米</div>
                  <P>2019年目标pm2.5年平均浓度</P>
                </div> -->
              </div>
            </dd>
          </dl>
        </li>  
        <li class="environment">
          <h3>环境更优美</h3>
          <dl class="box">
            <dd class="solid">
              <h4>固体废物</h4>
              <div class="con flex-cen">
                <div v-if="arr_data[11].is">
                  <h5>生活垃圾处理量</h5>
                  <div class="top">
                    <img src="../../assets/ecology_05.png" alt="">
                    <div class="flex-bet"><span>0</span><span>100</span></div>
                  </div>
                  <p>无害化处理量<span>{{wuhai1}}</span>吨</p>
                </div>
                <div v-if="arr_data[12].is">
                  <h5>危险废物处理量</h5>
                  <div class="top">
                    <img src="../../assets/ecology_05.png" alt="">
                    <div class="flex-bet"><span>0</span><span>100</span></div>
                  </div>
                  <p>无害化处理量<span>{{wuhai2}}</span>吨</p>
                </div>
                <div v-if="arr_data[13].is">
                  <h5>医疗废物处理量</h5>
                  <div class="top">
                    <img src="../../assets/ecology_05.png" alt="">
                    <div class="flex-bet"><span>0</span><span>100</span></div>
                  </div>
                  <p>无害化处理量<span>{{wuhai3}}</span>吨</p>
                </div>
              </div>
            </dd>
            <dd class="sound">
              <h4>声环境</h4>
              <div class="con">
                <div v-if="arr_data[14].is">
                  <h5>环境区域噪声等声级平均值</h5>
                  <div class="echart">
                    <v-chart :options="bar" autoresize />
                  </div>
                </div>
                <div v-if="arr_data[16].is">
                  <h5>功能区域噪声l类区昼夜间达标率</h5>
                  <div class="echart">
                    <v-chart :options="bar2" autoresize />
                  </div>
                </div>
              </div>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs'
import ECharts from 'vue-echarts'
import CircleProgress  from 'vue-circleprogressbar'
import MyCircle from 'components/my-circle.vue'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/component/legend'
import axios from 'axios'
import { getGuoxin } from 'api/request.js'
export default {
  name: "",
  data() {
    let options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {
      arr_data:[
        {name:"深圳河流总数",is:false},
        {name:"劣五类河流数量",is:false},
        {name:"黑臭水体治理目标值",is:false},
        {name:"已完成治理黑臭水体数量",is:false},
        {name:"黑臭水体劣五类河流数量",is:false},
        {name:"未治理完成轻度黑臭水体数量",is:false},
        {name:"未治理完成重度黑臭水体数量",is:false},
        {name:"计划总投资、项目总数",is:false},
        {name:"投资完成率、项目分类",is:false},
        {name:"空气优良情况",is:false},
        {name:"PM2.5平均速度",is:false},
        {name:"生活垃圾无害化处理率",is:false},
        {name:"工业危险废物处理率",is:false},
        {name:"医疗废物处理率",is:false},
        {name:"区域环境噪声",is:false},
        {name:"区域环境噪声同比",is:false},
        {name:"功能区噪声昼夜间达标率",is:false},
        {name:"功能区噪声昼夜间达标率同比",is:false}
      ],
      isCircleProgress: true,  
      progress: 28,//已完成投资额-完成抽奖率的环形图表值
      options,
      initOptions: {
        renderer: options.renderer || 'canvas'
      },
      YT03_00023001:"11", //深圳河流总数
      YT03_00023008:"", //劣五类河流数量
      BT01_00011001:"", //黑臭水体治理目标值
      YT01_00014001:"", //已完成治理黑臭水体数量
      YT01_00014003:"", //未治理完成轻度黑臭水体数量
      YT01_00014004:"", //未治理完成重度黑臭水体数量
      YT03_00023009:"", //黑臭水体劣五类河流数量
      numss:"", //项目总投资
      sum_xmgs:"",//项目总数
      dwi_nbzb:[], //PM2.5平均速度
      wuhai1:"",
      wuhai2:"",
      wuhai3:"",
      //声环境-环境区域噪声等声级平均值-柱折图数据
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
          data:['区域环境噪声', '区域环境噪声同比'],
          align: 'left',
          y: '20px'
        },
        xAxis: [
            {
              type: 'category',
              data: [],
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
              max: 100,
              interval: 50,
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
            },
            {
              type: 'value',
              name: '',
              min: 0,
              max: 1,
              interval: 5,
              axisLabel: {
                formatter: '{value}'
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color:'#FC7A24',
                  width:'1'
                }
              }
            }
        ],
        series: [
            {
              name:'区域环境噪声',
              type:'bar',
              barWidth: 10,
              itemStyle:{ normal:{ color:'#50D7FD'} },
              data:[]
            },
            {
              name:'区域环境噪声同比',
              type:'line',
              yAxisIndex: 1,
              itemStyle:{ normal:{ color:'#FC7A24'} },
              data:[]
            }
        ]
      },
      //声环境-功能区域噪声l类区昼夜间达标率-柱折图数据
      bar2: {
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
          data:['功能区噪声昼夜间达标率', '功能区噪声昼夜间达标率同比'],
          align: 'left',
          y: '10px'
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
              max: 100,
              interval: 50,
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
            },
            {
              type: 'value',
              name: '',
              min: 0,
              max: 1,
              interval: 5,
              axisLabel: {
                formatter: '{value}'
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color:'#FC7A24',
                  width:'1'
                }
              }
            }
        ],
        series: [
            {
              name:'功能区噪声昼夜间达标率',
              type:'bar',
              barWidth: 10,
              itemStyle:{ normal:{ color:'#50D7FD'} },
              data:[8, 6, 4, 6, 8]
            },
            {
              name:'功能区噪声昼夜间达标率同比',
              type:'line',
              yAxisIndex: 1,
              itemStyle:{ normal:{ color:'#FC7A24'} },
              data:[0.8, 0.6, 0.4, 0.6, 0.8]
            }
        ]
      },
      //天更蓝，空气优良情况-仪表盘图表数据
      gauge: {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
          data:['功能区噪声昼夜间达标率', '功能区噪声昼夜间达标率同比'],
          align: 'left',
          y: '10px'
        },
        series: [
            {
                name: '业务指标',   //gauge
                type: 'gauge',
                radius: '80%',//仪表盘半径
                detail: {formatter:'{value}%'},
                data: [{value: 100, name: ''}],
                axisLine: {            // 坐标轴线  
                  lineStyle: {       // 属性lineStyle控制线条样式  
                    width: 20,
                    //color: [[1, '#c23531']]
                    color: [[1, '#4CA7FC']]
                  }  
                },
                axisLabel: {            // 刻度标签。
                    show: true,             // 是否显示标签,默认 true。
                    distance: -5,            // 标签与刻度线的距离,默认 5。
                    color: "#4CA7FC",          // 文字的颜色,默认 #fff。
                    fontSize: 12,           // 文字的字体大小,默认 5。
                    formatter: "{value}",   // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。 示例:// 使用字符串模板，模板变量为刻度默认标签 {value},如:formatter: '{value} kg'; // 使用函数模板，函数参数分别为刻度数值,如formatter: function (value) {return value + 'km/h';}
                },
                detail: {               // 仪表盘详情，用于显示数据。
                    show: true,             // 是否显示详情,默认 true。
                    offsetCenter: [0,"70%"],// 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                    color: "auto",          // 文字的颜色,默认 auto。
                    fontSize: 30,           // 文字的字体大小,默认 15。
                    formatter: "{value}%",  // 格式化函数或者字符串
                }
            }
        ]
      }  
    }
  },
  mounted(){
    var datas = {
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
                "name": "jd"
            },
            {
                "name": "zbztfl"
            },
            {
                "name": "dqdm"
            },
            {
                "name": "dqmc"
            },
            {
                "name": "zbmc"
            },
            {
                "name": "zbdm"
            },
            {
                "name": "sum_dlzbz"
            },
            {
                "name": "dxzbz"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "zbdm",
                "operator": "IN",
                "values": [
                    "YT03_00023008",
                    "YT03_00023001",
                    "BT01_00011001",
                    "YT01_00014001",
                    "YT03_00023009",
                    "YT01_00014004",
                    "YT01_00014003"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "timekey",
                "operator": "EQ",
                "values": [
                    "201904"
                ],
                "value": ""
            }
        ],
        "orderInfoList": [
            {
                "name": "nf",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-zb-ybzb"
}
var datas1 = {
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "date_id"
            },
            {
                "name": "sum_xmgs"
            },
            {
                "name": "ndtzjh"
            },
            {
                "name": "ndywctz"
            },
            {
                "name": "tzwcl"
            },
            {
                "name": "month_id"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "date_id",
                "operator": "EQ",
                "values": [
                    "2019"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "month_id",
                "operator": "EQ",
                "values": [
                    "05"
                ],
                "value": ""
            }
        ],
        "orderInfoList": [
            {
                "name": "date_id",
                "type": "ASC"
            },
            {
                "name": "month_id",
                "type": "ASC"
            }
        ]
    },
    "indCode": "st-szt-dmc-zstzxmxxb"
}
var datas3 = {
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "date_id"
            },
            {
                "name": "pm25njnd"
            },
            {
                "name": "kqzlyltsbl"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "date_id",
                "operator": "EQ",
                "values": [
                    "201904"
                ],
                "value": ""
            }
        ]
    },
    "indCode": "st-kq-sjkqzlxxydhzb"
}
var datas4 = {
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "timekey"
            },
            {
                "name": "nf"
            },
            {
                "name": "sqlx"
            },
            {
                "name": "zbmc"
            },
            {
                "name": "zbdm"
            },
            {
                "name": "sum_dlzbz"
            },
            {
                "name": "zbztfl"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "zbdm",
                "operator": "IN",
                "values": [
                    "BT01_00006001",
                    "BT01_00008001"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "nf",
                "operator": "EQ",
                "values": [
                    "2020"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "zbztfl",
                "operator": "EQ",
                "values": [
                    "STHJ"
                ],
                "value": ""
            }
        ],
        "orderInfoList": [
            {
                "name": "nf",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-dqzt-dwi_nbzb"
}

var datas5 = {
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "sum_dlzbz"
            },
            {
                "name": "nf"
            },
            {
                "name": "timekey"
            },
            {
                "name": "zbmc"
            },
            {
                "name": "zbdm"
            },
            {
                "name": "dqmc"
            },
            {
                "name": "zbztfl"
            },
            {
                "name": "sqlx"
            },
            {
                "name": "dqdm"
            },
            {
                "name": "dxzbz"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "zbdm",
                "operator": "IN",
                "values": [
                    "YT03_00053003",
                    "YT03_00052003",
                    "YT03_00053001",
                    "YT03_00053002",
                    "YT03_00052002",
                    "YT03_00052001"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "dqmc",
                "operator": "EQ",
                "values": [
                    "深圳市"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "nf",
                "operator": "EQ",
                "values": [
                    "2019"
                ],
                "value": ""
            }
        ],
        "orderInfoList": [
            {
                "name": "nf",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-dqzt-dwi_nbzb"
}
var datas6 = {
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "sum_dlzbz"
            },
            {
                "name": "nf"
            },
            {
                "name": "timekey"
            },
            {
                "name": "zbmc"
            },
            {
                "name": "zbdm"
            },
            {
                "name": "dqmc"
            },
            {
                "name": "zbztfl"
            },
            {
                "name": "sqlx"
            },
            {
                "name": "dqdm"
            },
            {
                "name": "dxzbz"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "zbdm",
                "operator": "IN",
                "values": [
                    "YT03_00047001"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "dqmc",
                "operator": "EQ",
                "values": [
                    "深圳市"
                ],
                "value": ""
            }
        ],
        "orderInfoList": [
            {
                "name": "nf",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-dqzt-dwi_nbzb"
}

var datas7 = {
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "timekey_year"
            },
            {
                "name": "zbdm"
            },
            {
                "name": "zbmc"
            },
            {
                "name": "tongbi_sum_dlzbz"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "zbdm",
                "operator": "EQ",
                "values": [
                    "YT03_00047001"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "timekey_year",
                "operator": "EQ",
                "values": [
                    "2018"
                ],
                "value": ""
            }
        ],
        "orderInfoList": [
            {
                "name": "timekey_year",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-zb-nbzb-tb"
}

var datas8 = {
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "nf"
            },
            {
                "name": "timekey"
            },
            {
                "name": "zbmc"
            },
            {
                "name": "zbdm"
            },
            {
                "name": "dqmc"
            },
            {
                "name": "zbztfl"
            },
            {
                "name": "sqlx"
            },
            {
                "name": "dqdm"
            },
            {
                "name": "sum_dlzbz"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "zbdm",
                "operator": "IN",
                "values": [
                    "YT03_00055001"
                ],
                "value": ""
            }
        ],
        "orderInfoList": [
            {
                "name": "nf",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-dqzt-dwi_nbzb"
}

var datas9 = {
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "timekey_year"
            },
            {
                "name": "zbdm"
            },
            {
                "name": "zbmc"
            },
            {
                "name": "tongbi_sum_dlzbz"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "zbdm",
                "operator": "EQ",
                "values": [
                    "YT03_00055001"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "timekey_year",
                "operator": "EQ",
                "values": [
                    "2018"
                ],
                "value": ""
            }
        ],
        "orderInfoList": [
            {
                "name": "timekey_year",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-zb-nbzb-tb"
}

    var that = this
    // getGuoxin('http://10.253.114.14:8008/ioc-sz-appService/authority/modualData?modul_name=总体态势',{})
    // .then(res=>{
    //   console.log(res)
    // })
    axios.get('http://10.253.100.29:8008/ioc-sz-appService/authority/modualData?modul_name=总体态势',{})
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
    axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin', datas)
    .then(function (response) {
      for(let i=0; i<response.data.rows.length; i++){
        if(response.data.rows[i].zbdm == "YT03_00023001"){
          that.YT03_00023001 = response.data.rows[i].sum_dlzbz
        }
        if(response.data.rows[i].zbdm == "YT03_00023008"){
          that.YT03_00023008 = response.data.rows[i].sum_dlzbz
        }
        if(response.data.rows[i].zbdm == "BT01_00011001"){
          that.BT01_00011001 = response.data.rows[i].sum_dlzbz
        }
        if(response.data.rows[i].zbdm == "YT01_00014001"){
          that.YT01_00014001 = response.data.rows[i].sum_dlzbz
        }
        if(response.data.rows[i].zbdm == "YT01_00014003"){
          that.YT01_00014003 = response.data.rows[i].sum_dlzbz
        }
        if(response.data.rows[i].zbdm == "YT01_00014004"){
          that.YT01_00014004 = response.data.rows[i].sum_dlzbz
        }
        if(response.data.rows[i].zbdm == "YT03_00023009"){
          that.YT03_00023009 = response.data.rows[i].sum_dlzbz
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas1)
    .then(function(res){
      that.numss = res.data.rows[0].ndtzjh
      that.sum_xmgs = res.data.rows[0].sum_xmgs
      // console.log(res)
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas3)
    .then(function(res){
      
      that.gauge.series[0].data[0].value = res.data.rows[0].kqzlyltsbl
      if(res.data.rows[0].kqzlyltsbl > 96){
        that.gauge.series[0].axisLine
.lineStyle.color[0][1] = "#c23531"
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas4)
    .then(function(res){
      // console.log(res.data.rows)
      that.dwi_nbzb = res.data.rows
      // that.gauge.series[0].data[0].value = res.data.rows[0].kqzlyltsbl
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas5)
    .then(function(res){
      for(let i = 0; i<res.data.rows.length; i++){
        if(res.data.rows[i].zbmc == "生活垃圾处理量"){
          that.wuhai1 = res.data.rows[i].sum_dlzbz
        }
        if(res.data.rows[i].zbmc == "工业危险废物处理量"){
          that.wuhai2 = res.data.rows[i].sum_dlzbz
        }
        if(res.data.rows[i].zbmc == "医疗废物处理量"){
          that.wuhai3 = res.data.rows[i].sum_dlzbz
        }
      }
      // that.gauge.series[0].data[0].value = res.data.rows[0].kqzlyltsbl
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas6)
    .then(function(res){
      console.log(res)
      var dates = [];
      var zhib = [];
      for(let i=0; i<res.data.rows.length; i++){
        dates.push(res.data.rows[i].nf+"年")
        zhib.push(res.data.rows[i].sum_dlzbz)
      }
      that.bar.xAxis[0].data = dates
      that.bar.series[0].data = zhib
      // console.log(dates)
      //that.bar.xAxis.data sum_dlzbz
      // that.gauge.series[0].data[0].value = res.data.rows[0].kqzlyltsbl
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas7)
    .then(function(res){
      console.log(res)
      var zhib = [];
      for(let i=0; i<res.data.rows.length; i++){
        zhib.push(res.data.rows[i].tongbi_sum_dlzbz)
      }
      that.bar.series[1].data = zhib
      // console.log(dates)
      //that.bar.xAxis.data sum_dlzbz
      // that.gauge.series[0].data[0].value = res.data.rows[0].kqzlyltsbl
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas8)
    .then(function(res){
      console.log(res)
      var dates = [];
      var zhib = [];
      for(let i=0; i<res.data.rows.length; i++){
        dates.push(res.data.rows[i].nf+"年")
        zhib.push(res.data.rows[i].sum_dlzbz)
      }
      that.bar2.xAxis[0].data = dates
      that.bar2.series[0].data = zhib
      // console.log(dates)
      //that.bar.xAxis.data sum_dlzbz
      // that.gauge.series[0].data[0].value = res.data.rows[0].kqzlyltsbl
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas9)
    .then(function(res){
      console.log(res)
      var zhib = [];
      for(let i=0; i<res.data.rows.length; i++){
        zhib.push(res.data.rows[i].tongbi_sum_dlzbz)
      }
      that.bar2.series[1].data = zhib
      // console.log(dates)
      //that.bar.xAxis.data sum_dlzbz
      // that.gauge.series[0].data[0].value = res.data.rows[0].kqzlyltsbl
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  created() {
    window.addEventListener('onmessageWS', this.wsFunc)
  },
  beforeDestroy() {
    window.removeEventListener('onmessageWS', this.wsFunc)
  },
  methods: {
    wsFunc(e) {
     console.log(1111)
    }
  },
  components: {
    CircleProgress: CircleProgress,
    Vchart: ECharts,
    MyCircle: MyCircle     
  },
}
</script>

<style scoped>
  .body{padding:0;min-height: auto;;}
  .ecologyPopulation>.content{padding-top: .44rem;}
  .ecology h3{padding:0 0 .1rem .4rem;font-size: .3rem;color:#1b9dd2;border-bottom: .02rem solid #b5b5b5;position: relative;font-weight: bold;background: url(../../assets/icon_26.png) no-repeat left;background-size: .25rem;margin-bottom: 0.22rem;}
  .ecology h4{font-size: .24rem;color:#5388ff;margin-left: 0.27rem;padding-left: .2rem;background: url(../../assets/icon_27.png) no-repeat left;background-size: .11rem;}
  .ecologyPopulation dd{color:#5388ff;}
  .rivers .con{margin: .6rem 0 .5rem;}
  .rivers .con>div{width:1.61rem;height:1.86rem;background: url(../../assets/ecology_01.png) no-repeat;background-size: 100%;margin:0 .52rem;font-size: .18rem;flex-direction: column;text-align: center;}
  .rivers .con div:nth-child(2){background-image: url(../../assets/ecology_02.png);position: relative;}
  .rivers .con div:nth-child(2)::after{content:"";display: block;width:1.04rem;height: 0;border-top: 1px dotted #ddd;position: absolute;right:100%;top:50%;}
  .rivers .con>div span{font-size: .28rem;padding-bottom: .36rem;}
  .smelly .con{margin-top: 0.4rem;}
  .smelly .con .left{width: 2.45rem;height:1.52rem;background: url(../../assets/ecology_03.png) no-repeat;background-size: 100%;font-size: .2rem;text-align: center;display: flex;flex-direction: column;justify-content: center;margin-left: .34rem;}
  .smelly .con span{font-size: .36rem;padding-bottom: 0.22rem;}
  .smelly .con .right{text-align: right;font-size: .2rem;}
  .smelly .con .right span{width:.6rem;text-align: center;display: inline-block;background-image:-webkit-linear-gradient(top,#55FBFF,#46A6FF); -webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight: bold;}
  .smelly .bottom{padding: .5rem 0;}
  .smelly .bottom .box{width:4.24rem;}
  .smelly .bottom .num{padding-top: 0.3rem;}
  .smelly .bottom .num1{font-size:.38rem;color:#cce459;}
  .smelly .bottom .num2{font-size:.38rem;color:#eb4d4d;}
  .smelly .bottom .text{padding:0 .16rem .1rem .16rem;}
  .smelly .bottom .pro{height:.14rem;border-top:1px solid #B5B5B5;margin:0 .1rem;}
  .smelly .bottom .pro>div{background: #cce459;height: 100%;position: relative;}
  .smelly .bottom .pro>div:last-child{background: #eb4d4d;}
  .smelly .bottom .pro>div:first-child::after{content:"";display: block;width: 0.12rem;height:.21rem;background: url(../../assets/icon_28.png) no-repeat;background-size: 100%;position: absolute;left:calc(100% - .06rem);top:-.1rem;z-index: 10;}
  .ecology .water .con{padding-top: 0.4rem;font-size: .2rem;}
  .water .left h5{width:1.34rem;height:.26rem;line-height: .26rem;background: #E2EEF3;border:1px solid #88DAF9;border-radius: .1rem;text-align: center;}
  .water .left .one h5{box-shadow:0 0 .1rem 0 #114281;}
  .water .left .one{margin-bottom: 0.4rem;}
  .water .left p{padding-left: 0.17rem;}
  .water .left p span{font-size: .3rem;color:#4b79e0;padding-right: .05rem;}
  .water .left .two p span{font-size: .3rem;background-image:-webkit-linear-gradient(top,#55FBFF,#46A6FF); -webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .percentage{padding-right: 1rem;position: relative;}
  .percentage .p-text{position: absolute;right:0;top:0;text-align: center;font-size: .21rem;color:#b6b0b0;}
  .percentage .p-text h5, .percentage h6{padding-top: 0.1rem;font-size: .18rem;color:#18d672;}
  .percentage>>>.center_text{margin-top: -.1rem;}
  /* .percentage h6{text-align: center;position: absolute;left:0;top:1.05rem;width: 100%;} */
  .percentage h6{padding-top: 0;text-align: center;}
  .percentage .p-box{height:1.88rem;position: relative;}
  .percentage>>>.p-box p.title{font-size: .52rem;color:#b6b0b0;}
  .blue-sky{padding-top: 0.64rem;}
  .excellent img{width:3.15rem;margin:.18rem auto .42rem;display: block;}
  .pm .con{margin:.4rem 0 .52rem;align-items: flex-start;}
  .pm .con>div{margin:0 .47rem;text-align: center;}
  .pm .con>div .top{width: 2.54rem;height:1.54rem;background: url(../../assets/ecology_04.png) no-repeat;background-size: 100%;display: flex;flex-direction: column;justify-content: center;}
  .pm .con>div .top span{font-size: .41rem;padding-bottom: .22rem;}
  .pm .con>div p{padding-top: 0.15rem;}
  .solid{margin-bottom: 0.5rem;}
  .solid .con{text-align: center;padding-top: 0.36rem;}
  .solid .con>div{margin:0 .14rem;}
  .solid .con h5{font-size: .16rem;padding-bottom: 0.28rem;}
  .solid .con img{width:1.6rem;}
  .solid .con .top span{font-size: .12rem;color:#8aa3b0;margin:0 .15rem;}
  .solid .con p{font-size: .18rem;}
  .solid .con p span{padding:0 .05rem;}
  .echarts{ width: 100%;height: 5rem; }
  .sound .con{padding-top: 0.34rem;}
  .sound h5{font-size: .22rem;text-align: center;}
  .excellent{margin-bottom: .5rem;}
  /* .excellent .texts{margin-top: -0.1rem;text-align: center;padding-bottom: .07rem;background: url(../../assets/icon_35.png) no-repeat center bottom;background-size: 1.33rem;} */
  .excellent .texts{margin-top: -0.1rem;text-align: center;padding-bottom: .07rem;}
</style>