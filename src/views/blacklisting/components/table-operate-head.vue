<template>
  <div>
    <div class="l-content-head">
      <div class="l-title">
        {{title}}
      </div>
      <div class="input-wrapper input-wrapper1 ">
        <!-- oninput 事件在用户输入时触发 -->
        <input autocomplete="off" :class="{'active':isActive}" type="text" placeholder="输入黑名单组名称" onfocus="this.placeholder=''" onblur="this.placeholder='输入黑名单组名称'" v-model="name" @keyup.enter="cSendOperateData" @input="autoSearch" />
       
         <el-button  style="margin-left:20px;padding:9px 20px;" type="primary" @click="cSendOperateData">查询</el-button>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: "TableHead",
  props: {
    title: String //指定类型
  },
  components: {},
  data() {
    return {
      name: "", //黑名单组名称
      isActive: false
    };
  },
  methods: {
    /**
     * 触发事件，将封装的数据传给index
     * 该组件内可以调用该方法传数据
     * */
    cSendOperateData(e) {
      if (e && e.target) {
        e.target.blur();
      }
      this.$emit("cSendOperateData", this.name);
    },
    autoSearch() {
      //  if(!this.name){
      //     this.$emit("cSendOperateData", this.name);
      //  }
      !this.name && this.$emit("cSendOperateData", this.name);
    }
  },
  mounted() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
.l-title {
  float: left;
  font-size: 14px;
  color: #292c31;
  line-height: 34px;
}

.l-content-head {
  clear: both;
  display: block;
  padding: 13px 20px;
}

.l-content-head:after {
  content: "";
  display: block;
  clear: both;
}

.l-content-head:after {
  content: "";
  display: block;
  clear: both;
}

.input-wrapper {
  float: left;
}

.input-wrapper input {
  width: 456px;
  height: 34px;
  padding-left: 5px;
  margin-left: 10px;
  box-sizing: border-box;
  border: solid 1px #d6e1e5;
  &:focus {
    border: 1px solid #20a0ff;
  }
}

.input-wrapper {
  /*placeholder字体样式 兼容处理*/
  input {
    &::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #d6e1e5;
      font-size: 14px;
      font-family: "Microsoft YaHei";
    }

    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #d6e1e5;
      font-size: 14px;
      font-family: "Microsoft YaHei";
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #d6e1e5;
      font-size: 14px;
      font-family: "Microsoft YaHei";
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #d6e1e5 !important;
      font-size: 14px;
      font-family: "Microsoft YaHei";
    }
  }
}

.input-wrapper1 {
  overflow: hidden;
  input {
    float: left;
    padding-right: 30px;
    font-size: 14px;
  }
  // .search-icon {
  //   background: url("../../../assets/search.png") no-repeat 95% 50%;
  //   float: left;
  //   width: 15px;
  //   height: 15px;
  //   margin-left: -25px;
  //   margin-top: 10px;
  //   cursor: pointer;
  // }
}

input {
  border-radius: 4px;
  &:focus {
    box-shadow: 0 0 3px 2px #eefaff;
  }
}
</style>
