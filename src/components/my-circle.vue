<template>
  <div class="circle">
    <canvas ref="circle" width="100" height="100"></canvas>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    progress: {
      type: [String, Number],
      default: 0
    },
    backgroundColor: {
      type: String,
      default: "#82B124"
    },
    barColor: {
      type: String,
      default: "#fff"
    },
    textStyle: {
      type: String,
      default: "25px,purple"
    },
    speed: { // 建议取值为0-3
      type: [String, Number],
      default: 1
    }
  },
  data () {
    return {

    }
  },
  mounted() {
    var datas2 = {
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
                "name": "xmzs"
            },
            {
                "name": "jb"
            },
            {
                "name": "xmjd"
            }
        ],
        "filterList": [
            {
                "dataType": "String",
                "name": "month_id",
                "operator": "EQ",
                "values": [
                    "06"
                ],
                "value": null
            },
            {
                "dataType": "String",
                "name": "date_id",
                "operator": "EQ",
                "values": [
                    "2019"
                ],
                "value": null
            }
        ],
        "orderInfoList": [
            {
                "name": "jb",
                "type": "ASC"
            }
        ]
    },
    "indCode": "st-sy-zstzxmxx-asgjzfl"
}
    axios.post('http://10.253.114.18:1080/indicator/rest/ind/execution/query',datas2)
    .then(function(res){
      console.log(res)
    })
    .catch(function (error) {
      console.log(error);
    });
    this.circleInit()
  },
  methods: {
    circleInit() {
      let _this = this
      let canvas = _this.$refs.circle,  //获取canvas元素
          context = canvas.getContext('2d'),  //获取画图环境，指明为2d
          centerX = canvas.width/2,   //Canvas中心点x轴坐标
          centerY = canvas.height/2,  //Canvas中心点y轴坐标
          rad = Math.PI*2/100, //将360度分成100份，那么每一份就是rad度
          speed = 0; //加载的快慢就靠它了 
        //绘制5像素宽的运动外圈
        function blueCircle(n){
          context.save();
          context.strokeStyle = _this.barColor; //设置描边样式
          context.lineWidth = 10; //设置线宽
          context.beginPath(); //路径开始
          context.arc(centerX, centerY, 40 , -Math.PI/2, -Math.PI/2 +n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
          context.stroke(); //绘制
          context.closePath(); //路径结束
          context.restore();
        }
        //绘制白色外圈
        function whiteCircle(){
            context.save();
            context.beginPath();
            context.lineWidth = 10; //设置线宽
            context.strokeStyle = _this.backgroundColor;
            context.arc(centerX, centerY, 40 , 0, Math.PI*2, false);
            context.stroke();
            context.closePath();
            context.restore();
        }  
        //百分比文字绘制
        function text(n){
          context.save(); //save和restore可以保证样式属性只运用于该段canvas元素

          // 设置字体
            context.font = "18px bold 黑体";
            // 设置颜色
            context.fillStyle = _this.textStyle.split(',')[1];
            // 设置水平对齐方式
            context.textAlign = "center";
            // 设置垂直对齐方式
            context.textBaseline = "middle";
            // 绘制文字（参数：要写的字，x坐标，y坐标）
            context.fillText(n.toFixed(0)+"%", centerX, centerY);
        } 
        //动画循环
        (function drawFrame(){
          let progressBar = window.requestAnimationFrame(drawFrame);
          context.clearRect(0, 0, canvas.width, canvas.height);
          whiteCircle();
          text(speed);
          blueCircle(speed);
          if (speed >= _this.progress) {
            window.cancelAnimationFrame(progressBar);  
            //alert("加载成功！");
          } else {
            speed += 0.5;
          }
        }());
    }
  }
}
</script>

<style scoped>

</style>