<template>
  <div class="assistantIndustry">
    <div class="content">
      <div class="box-convent">
            <ul class="box-convent-ul">
                <li class="box-convent-ative">出生</li>
                <li>入学</li>
                <li>就业</li>
                <li>住房</li>
                <li>购车</li>
                <li>婚姻</li>
                <li>生育</li>
                <li>退休</li>
                <li>后事</li>
            </ul>
        </div>
        <img src="../../assets/mb1.png">  
        <div class="box-convent-zx">
            <ul class="box-convent-zx-ul">
                <li class="box-convent-zx-ative">咨询</li>
                <li>投诉</li>
            </ul>
        </div>
        <img src="../../assets/mb2.png">  
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Build from 'components/build.vue'
export default {
  name: "",
  props: {
    clickAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {   
    }
  },

}
</script>

<style scoped>
  .body{padding:0;min-height: auto;background: #fff;}
  .content{width: 100%;}
  .content img{
    display: block;
    width: 100%;
  }
 .box-convent {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #00b1ff;
}
 .box-convent .box-convent-ul {
    width: 100%;
    color: #FFF;
    font-size: 16px;
}
 .box-convent .box-convent-ul li {
    width: 11%;
    float: left;
    text-align: center;
}
 .box-convent-zx {
    width: 100%;
    height: 40px;
    background-color: #00b1ff;
    line-height: 40px;
    font-size: 16px;
}
 .box-convent-zx .box-convent-zx-ul {
    margin-left: 15px;
}
 .box-convent-zx .box-convent-zx-ul li {
    padding: 0 10px;
    color: #fff;
    float: left;
}
</style>