<template>
  <div class="assistantIndustry">
    <div class="content">
      <div class="box-enterise-header">
            <ul class="box-enterise-ul">
                <li class="box-ative">设立</li>
                <li>经营</li>
                <li>变更</li>
                <li>注销</li>
            </ul>
        </div> 
        <img src="../../assets/qy1.png">  
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
   .box-enterise-header {
    width: 100%;
    height: 40px;
    background-color: #00b1ff;
    line-height: 40px;
}
 .box-enterise-header .box-enterise-ul {
    width: 100%;
    height: 40px;
    color: #fff;
}
 .box-enterise-header .box-enterise-ul li {
    width: 25%;
    text-align: center;
    float: left;
}
</style>