<template>
  <div class="water body">
    <div class="content wrap">
      <ul>
        <li class="clean-water">
          <h3>河流水质治理进展</h3>
          <div class="con">
            <div class="top flex-cen">
              <div class="flex-cen" v-if="arr_data[0].is"><span>{{numa}}</span>深圳河流总数(条)</div>
              <div class="flex-cen" v-if="arr_data[1].is"><span>{{numb1}}</span>本月监测的<br/>河流数（条）</div>
              <div class="flex-cen" v-if="arr_data[1].is"><span>{{numb2}}</span>本月水质改善<br/>河流数(条)</div>
            </div>
            <div class="bottom" v-if="arr_data[1].is">
              <!-- <span> -->
              <!-- <div class="num num1">{{numb3}}</div> -->
              <div class="ssbox"><div class="box">
                <div class="text flex-bet"><span>本月监测河流分类</span><span></span></div>
                <div class="pro flex-cen"><div style="width:32%"></div><div style="width:68%"></div></div>
                <div class="text flex-bet"><span>劣V类</span><span>V类及以上</span></div>
              </div></div>
              <div class="num num2 flex_ssaf"><p>{{numb4}}</p> <p>{{numb3}}</p></div>
            </div>  
          </div> 
        </li>
        <li class="black-water">
          <h3>黑臭水体治理进展</h3>
          <div class="con" v-if="arr_data[2].is">
            <div class="bottom flex-cen">
              <div class="box">
                <div class="text flex-bet"><span>黑臭水体{{numc}}个</span><span></span></div>
                <div class="pro flex-cen"><div class="flex-cen" style="width:92%">92%</div><div class="flex-cen" style="width:8%">8%</div></div>
                <div class="text flex-bet"><span>已治理完成{{numc1}}个</span><span>未治理完成{{numc2}}个</span></div>
              </div>
            </div>  
          </div> 
        </li>
        <li class="nine">
          <h3>九大流域</h3>
          <div class="con" v-if="arr_data[3].is">
            <dl>
              <dd v-for="(item,index) in arr" :key="index">
                <div class="t flex-bet">
                  <h5>{{item.arr[0]}}</h5>
                  <h6>{{item.top}}</h6>
                </div>
                <div class="c flex">
                  <!-- <p>V类以上/环比<br/>（条）</p>
                  <p>劣V类/环比<br/>（条）</p> -->
                  <p>黑臭水体数量<br/>（个）</p>
                  <p>不黑不臭数量<br/>（个）</p>
                  <p>轻度黑臭数量<br/>（个）</p>
                  <p>重度黑臭数量<br/>（个）</p>
                  <p>水质净化厂数量<br/>（个）</p>
                </div>
                <div class="b flex">
                  <!-- <p>1(<span>↑</span>1)</p>
                  <p>38(<span>↓</span>1)</p> -->
                  <p>{{item.arr[3]}}</p>
                  <p>{{item.arr[4]}}</p>
                  <p>{{item.arr[5]}}</p>
                  <p>{{item.arr[6]}}</p>
                  <p>{{item.arr[7]}}</p>
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
import axios from 'axios'
export default {
  name: "",
  data() {
    return {  
      numa:"", //本月监听总数量
      numb1:"", //本月监测的 重点监测河流数量
      numb2:"",//已治理完成黑臭水体条数
      numb3:"", //劣五类河流数量
      numb4:"",//五类以上河流数量
      numc:"",//黑臭水体总数量
      numc1:"",//已治理完成黑臭水体条数
      numc2:"",//未治理完成黑臭水体条数
      arr:[],
      arr_data:[
        {name:"深圳总和河流数",is:false},
        {name:"本月监测河流数、V类以上条数、劣V类条数、水质改善河流数",is:false},
        {name:"黑臭水体、已治理完成、未治理完成",is:false},
        {name:"九大流域名称及河长",is:false}
      ],
    }
  },
  mounted(){
    var that = this;
    var datas1 = {
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "zbmc"
            },
            {
                "name": "sum_dlzbz"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "zbdm",
                "operator": "EQ",
                "values": [
                    "YT03_00023001"
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
                "name": "zbmc",
                "type": "DESC"
            },
            {
                "name": "sum_dlzbz",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-zb-ybzb"
}
var datas2 = {
    "queryCodeType": "BusinessIndicator",
    "queryView": {
        "queryType": "sql",
        "queryItemList": [
            {
                "name": "timekey_month"
            },
            {
                "name": "zbmc"
            },
            {
                "name": "zbdm"
            },
            {
                "name": "max_dlzbz"
            },
            {
                "name": "huanbi_grow_max_dlzbz"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "timekey_month",
                "operator": "EQ",
                "values": [
                    "201904"
                ],
                "value": ""
            },
            {
                "dataType": "String",
                "name": "zbdm",
                "operator": "IN",
                "values": [
                    "YT03_00023002",
                    "YT03_00023010",
                    "YT03_00023008",
                    "YT01_00014001"
                ],
                "value": ""
            }
        ]
    },
    "indCode": "st-szt-ybzb"
}
var datas3 = {
    "queryCodeType": "DetailIndicator",
    "queryView": {
        "queryType": "sql",
        "pagination": {
            "pageSize": 10,
            "currentPage": 0
        },
        "queryItemList": [
            {
                "name": "dwi_ybzb_zbmc"
            },
            {
                "name": "dwi_ybzb_dlzbz"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "dwi_ybzb_timekey",
                "operator": "EQ",
                "values": [
                    "201905"
                ],
                "value": null
            },
            {
                "dataType": "String",
                "name": "dwi_ybzb_zbdm",
                "operator": "IN",
                "values": [
                    "YT01_00014009",
                    "YT01_00014001",
                    "YT01_00014002",
                    "YT01_00014010",
                    "YT01_00014011",
                    "YT01_00014012"
                ],
                "value": null
            }
        ],
        "orderInfoList": [
            {
                "name": "dwi_ybzb_zbmc",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-szt-dwi_ybzb",
    "dataFormat": "HEADTABLE"
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
                "name": "dmc_st_lyztqkhzb_hllymc"
            },
            {
                "name": "dmc_st_lysjhzxx_glhl"
            },
            {
                "name": "dmc_st_lysjhzxx_hzmc"
            },
            {
                "name": "dmc_st_lysjhzxx_hzzw"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "dmc_st_lyztqkhzb_date_id",
                "operator": "EQ",
                "values": [
                    "201905"
                ],
                "value": null
            }
        ],
        "orderInfoList": [
            {
                "name": "dmc_st_lyztqkhzb_hllymc",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-szt-dmc_st_lyztqkhzb",
    "dataFormat": "HEADTABLE"
}
var datas5 = {
    "queryCodeType": "DetailIndicator",
    "queryView": {
        "queryType": "sql",
        "pagination": {
            "pageSize": 10,
            "currentPage": 0
        },
        "queryItemList": [
            {
                "name": "dmc_st_lyztqkhzb_hllymc"
            },
            {
                "name": "dmc_st_lyztqkhzb_wlyshlsl"
            },
            {
                "name": "dmc_st_lyztqkhzb_lwlhlsl"
            },
            {
                "name": "dmc_st_lyztqkhzb_hcstsl"
            },
            {
                "name": "dmc_st_lyztqkhzb_bhbc"
            },
            {
                "name": "dmc_st_lyztqkhzb_qdsl"
            },
            {
                "name": "dmc_st_lyztqkhzb_zdsl"
            },
            {
                "name": "dmc_st_lyztqkhzb_szjhcsl"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "dmc_st_lyztqkhzb_date_id",
                "operator": "EQ",
                "values": [
                    "201905"
                ],
                "value": null
            }
        ],
        "orderInfoList": [
            {
                "name": "dmc_st_lyztqkhzb_hllymc",
                "type": "DESC"
            }
        ]
    },
    "indCode": "st-szt-dmc_st_lyztqkhzb",
    "dataFormat": "HEADTABLE"
}
  axios.get('http://10.253.100.29:8008/ioc-sz-appService/authority/modualData?modul_name=水污染治理',{})
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
  axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas1)
    .then(function(res){
       that.numa = res.data.rows[0].sum_dlzbz
    })
    .catch(function (error) {
      console.log(error);
    });

  axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas2)
    .then(function(res){
       for(let i=0; i<res.data.rows.length; i++){
         if(res.data.rows[i].zbmc=="重点监测河流数量"){
           that.numb1 = res.data.rows[i].max_dlzbz
         }
         if(res.data.rows[i].zbmc=="已治理完成黑臭水体条数"){
           that.numb2 = res.data.rows[i].max_dlzbz
         }
         if(res.data.rows[i].zbmc=="劣五类河流数量"){
           that.numb3 = res.data.rows[i].max_dlzbz
         }
         if(res.data.rows[i].zbmc=="五类以上河流数量"){
           that.numb4 = res.data.rows[i].max_dlzbz
         }
       }
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas3)
    .then(function(res){
      for(let i = 0; i<res.data.rows.length; i++){
        if(res.data.rows[i][0] == "黑臭水体总数量"){
          that.numc = res.data.rows[i][1]
          // console.log("你好")
        }
        if(res.data.rows[i][0] == "已治理完成黑臭水体条数"){
          that.numc1 = res.data.rows[i][1]
        }
        if(res.data.rows[i][0] == "未治理完成黑臭水体条数"){
          that.numc2 = res.data.rows[i][1]
        }
      }
       console.log(res)
    })
    .catch(function (error) {
      console.log(error);
    });

    function pos1(callback){
      axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas4)
      .then(function(res){
        console.log(res)
        for(let i =0; i<res.data.rows.length; i++){
          for(let j = 0; j<res.data.rows[i].length; j++){
            if(res.data.rows[i][j] == null){
              res.data.rows[i][j] = ""
            }
          }
        }
        callback(res.data.rows)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    function pos2(arr){
      axios.post('http://10.253.100.29:8008/ioc-sz-appService/appDataService/guoxin',datas5)
      .then(function(res){
        var numarr = []
        for(let i = 0; i<arr.length; i++){
          numarr.push({top:arr[i][0]+arr[i][1]+'：'+arr[i][2]+arr[i][3],arr:res.data.rows[i]})
        }
        that.arr = numarr
        console.log(numarr)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    pos1(pos2)
  },
  components: {
   
  },
}
</script>

<style scoped>
  .body{padding:0;min-height: auto;;}
  .water>.content{padding-top: .44rem;}
  .ecology h3{padding:0 0 .1rem .4rem;font-size: .3rem;color:#1b9dd2;border-bottom: .02rem solid #b5b5b5;position: relative;font-weight: bold;background: url(../../assets/icon_26.png) no-repeat left;background-size: .25rem;margin-bottom: 0.22rem;}
  .water .top>div{width:1.9rem;height:1.92rem;background: url(../../assets/ecology_08.png) no-repeat;background-size: 100%;margin:0 .19rem;font-size: .18rem;flex-direction: column;text-align: center;position: relative;color:#5388ff;font-size: .15rem;line-height: 1.4;}
  .water .top div:nth-child(1){background-image: url(../../assets/ecology_07.png);}
  .water .top div:not(:first-child)::after{content:"";display: block;width:.64rem;height: 0;border-top: 1px dotted #ddd;position: absolute;right:calc(100% - .13rem);top:50%;}
  .water .top>div span{font-size: .41rem;padding-bottom: .1rem;}
  .water .bottom{padding: .4rem 0 .5rem;color:#5388ff;}
  .ssbox{
    width: 100%;
    text-align: center
  }
  .water .bottom .box{width:5.38rem; display: inline-block;}
  /* .water .bottom .num{padding-top: 0.3rem;} */
  .water .bottom .num1{font-size:.38rem;}
  .water .bottom .num2{font-size:.38rem;}
  .water .bottom .text{padding:.1rem .16rem;}
  .water .bottom .pro{height:.16rem;border:.02rem solid #fff;margin:0 .1rem;border-radius: .05rem;background: #989EA3;}
  .water .bottom .pro>div{background: #4DACE8;height: 100%;position: relative;border-radius: .05rem;font-size: .12rem;color:#fff;}
  .water .bottom .pro>div:last-child{background: #989EA3;}
  /* .water .bottom .pro>div:first-child::after{content:"";display: block;width: 0.12rem;height:.21rem;background: url(../../assets/icon_28.png) no-repeat;background-size: 100%;position: absolute;left:calc(100% - .06rem);top:-.1rem;z-index: 10;} */
  .black-water .bottom{padding-top: 0.15rem;}
  .black-water .bottom .pro{height: 0.22rem;}
  .black-water .bottom .pro>div:last-child{background: #EAB064;}
  .black-water .bottom .pro{border:1px solid #D5D3D3;}
  .black-water .bottom .pro>div:first-child::after{content:"";display: block;background: #E1E3E4;width:.03rem;height: 0.32rem;right:-.015rem;top:-.03rem;position: absolute;z-index: 10;}
  .nine{font-size:.18rem;color:#5388ff;}
  .nine .t{height:.6rem;background: #B1D9F8;padding:0 .15rem 0 .18rem;}
  .nine .t h5{font-size: .3rem;}
  .nine .c,.nine .b{height:.65rem;align-items: center;}
  .nine .c {border-bottom:.02rem solid #B3C7D7;}
  .nine p{flex:1;text-align: center;line-height: 1.4;}
  .nine p span{font-size: .3rem;color:#E95858;padding:0 .05rem;}
  .nine dl{background: #E6EAED;}
  .flex_ssaf{
  /* 垂直两端对齐*/
  width: 5.38rem;
  margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>