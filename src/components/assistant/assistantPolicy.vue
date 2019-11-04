<template>
  <div class="assistantIndustry body">
    <div class="content">
      <build></build>      
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
</style>