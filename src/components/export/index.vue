<template>
  <div class="export" :style="vStyle">

    <a v-if="type=='2'" @click="exportFile" class="down-file">自定义用户.csv</a>
    <el-button :style="btnStyle" v-else type="success" :size="btnSize" class="fl btn" @click="exportFile">导出</el-button>
  </div>
</template>
<script>
export default {
  //组件名
  name: "Export",
  props: {
    downFileParms: Object, //传给后台的参数（对象）
    dataListLength: [Number, String], //要导出的列表的长度，用于当没有数据时不导出，提示没有数据
    fileName: String, //导出后文件的命名
    fileType: {
      //后台传过来的文件类型
      type: String,
      default: "zip" //有默认值
    },
    text: String,
    type: String,
    vStyle:String,//样式
    btnSize:{
      type:String,
      default:"mini"
    },
    btnStyle:String,
  },
  data() {
    return {
      url: this.api.export, //文件导出下载的请求url
      text2: this.text,
    };
  },
  created() {},
  methods: {
    //url拼接参数
    handleUrl() {
      let paramsArray = [];
      Object.keys(this.downFileParms).forEach(key => {
        this.downFileParms[key] &&
          paramsArray.push(key + "=" + this.downFileParms[key]);
      });
      if (this.url.search(/\?/) === -1) {
        //字符串匹配
        this.url += "?" + paramsArray.join("&"); //将数组所有的元素放入字符串中，并已“&”分割
      } else {
        this.url += "&" + paramsArray.join("&");
      }
    },
    exportFile() {
      this.handleUrl();
      if (this.dataListLength == 0) {
        //无列表数据导出时记得初始化url，否则url参数会重复拼接
        this.url = this.api.export;
        return this.$alert("无导出数据1 !", "提示", {
          confirmButtonText: "确定"
        }).catch(() => {});
      }
      this.axios
        .get(this.url, { responseType: "blob" }) //axios请求的responseType为blob
        .then(res => {
          let file = res.data;
          if (file.type.indexOf("html") != -1) {
            //无列表数据导出时记得初始化url，否则url参数会重复拼接
            this.url = this.api.export;
            return this.$alert("无导出数据 !", "提示", {
              confirmButtonText: "确定"
            }).catch(() => {});
          }
          this.utils.loadFile(this.fileName, file, this.fileType);
          //下载文件成功够将url初始化
          this.url = this.api.export;
          // var reader = new window.FileReader();
          // if (reader) {
          //   reader.readAsDataURL(res.data);
          //   reader.onload = function() {
          //     //文件读取成功完成时触发
          //     window.open(reader.result);
          //   };
          // }
        })
        .catch(res => {
          this.url = this.api.export;
          this.$message.error("导出文件失败，请重试!");
        });
    }
  },
  mounted() {},
  computed: {},
  destroyed() {}
};
</script>
<style lang="scss" scoped rel="stylesheet/scss">
.export {
  .btn {
    margin-left: 8px;
    padding: 10px 15px;
  }
}

.down-file{
  margin-left: 10px;
  font-size: 14px;
  color: #409eff;
  font-weight: 900;
  text-decoration: underline;
  cursor: pointer;
}
</style>

