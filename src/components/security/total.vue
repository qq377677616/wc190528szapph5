<template>
  <div class="assistantIndustry">
    <div class="content">
      <img src="../../assets/zong1.png">   
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
  components: {
    Build: Build      
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
</style>