<template>
  <div id="app">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view/>
    <!-- loading -->
    <v-loading v-if="$root.isLoaging"></v-loading>
  </div>
</template>

<script>
// 导入自定义loading组件
import VLoading from "@/components/loading";

export default {
  name: "App",
  components: {
    VLoading
   
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#app {
  font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-color: #f4f4f4;
  text-align: center;
  color: #333;
  margin: 0 auto;
  box-sizing: border-box;

}
</style>
