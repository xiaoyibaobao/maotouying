<template>
  <!--<div class="manage-center">
    &lt;!&ndash; 公共头部组件 &ndash;&gt;
    <v-header />
    <div class="manage-center-content clearfix" >
      &lt;!&ndash; 左侧导航列表 &ndash;&gt;
      <v-side-bar />
      &lt;!&ndash; 右侧显示区域 &ndash;&gt;
      <div class="manage-center-right">

        <div class="right-content">
          &lt;!&ndash; 路由匹配到的组件将渲染在这里 &ndash;&gt;
          <router-view />
        </div>
      </div>
    </div>

  </div>-->

  <div class="home manage-center">

    <!-- 头部导航 -->
    <v-header v-if="!isIframeOpen" />
    <!--<div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>-->

    <main class="manage-center-content clearfix">
      <!-- 左侧导航 -->
      <div class="main-left">
        <v-side-bar v-if="!isIframeOpen" />
      </div>

      <!-- 右侧主内容区 -->
      <div class="main-right">
        <!-- <transition name="fade"> -->
          <router-view class="view"></router-view>
        <!-- </transition> -->
      </div>
    </main>

  </div>

</template>
<script>
import VHeader from "@/views/home/children/header";
import VSideBar from "@/components/sidebar";

export default {
  name: "ManageCenter",
  components: {
    VHeader,
    VSideBar
  },
  data() {
    return {
      isIframeOpen: false
    };
  },
  methods: {},
  mounted() {
    //是否在统一管理后台访问,iframe的话不展示
    // 判断当前窗体的url和父窗体的 url是不是相同
    top.location != location && this.$set(this, "isIframeOpen", true);
  },
  watch: {}
};
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
.manage-center {
  height: 100%;
}
.manage-center-content {
  position: relative;
  background: #f4f4f4;
  display: flex;
  // .manage-center-right {
  //   // margin: 0 auto 0 170px;
  //   width: 100%;
  //   .right-content {
  //     padding: 20px 20px 0px 20px;
  //     background: #f4f4f4;
  //     box-sizing: border-box;
  //   }
  // }
}
</style>
<style lang="scss" scoped rel="stylesheet/scss">
/* 主内容区 */
main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  // min-height: 800px;
  // border: solid 40px #e9ecf1;
  background-color: #fcfcfc;
}
main .main-left {
  text-align: center;
}
main .main-right {
  width: 100%;
  padding: 20px 20px 0px 20px;
  background: #f4f4f4;
  box-sizing: border-box;
}
main .el-menu {
  background-color: transparent !important;
}
/*  */
.router-link {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #475669;
  text-decoration: none;
}
.is-active .router-link {
  color: #20a0ff;
}

/* 单选框 */
.el-form-item .el-radio + .el-radio {
  margin-left: 30px !important;
}
/* 路由切换动效 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}

/* 导航栏菜单选中效果 */
.isActive {
  color: #20a0ff !important;
}
#app main .aside .is-active {
  color: #475669;
}

/* 卡片 */
.el-card {
  overflow: visible !important;
}
</style>
