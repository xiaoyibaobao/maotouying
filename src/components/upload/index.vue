<template>
  <div class="upload-box">
    <!-- 基于element upload再次封装成本项目上传文件、示列组件 -->
    <div class="upload-cont" :style="uploadContStyle">
      <!--action  string 上传的地址  默认值为this.api.-->
      <!--data  Object 上传时传给后台的参数  -->
      <!-- on-success  文件上传成功时的钩子 本项目用于保存上传url  点击保存时发送给后台-->
      <!-- on-error 文件上传失败的钩子 用于提示用户文件上传文件失败 -->
      <!-- before-upload 上传文件之前的钩子 本项目用于限制用户上传的文件格式和设置fileName-->
      <!-- before-remove 删除文件之前的钩子  本项目用于复位url的值(每次删除清空url的值)-->
      <!-- limit 最大允许上传个数 -->

      <el-upload class="upload-demo clearfix" :style="uploadDemoStyle" :action="this.api.upload" :data="uploadParms" :on-success="handleFileSuccess" :on-error="handleFileError" :before-upload="(file)=>beforeFileUpload(file)" :before-remove="beforeRemove" :limit="1">
        <el-button size="small" type="primary">上传文件</el-button>
        <div slot="tip" class="el-upload__tip">支持扩展名：
          <span>.xlsx</span>
          <span>.xls</span>
          <span>.csv</span>
          <a :href="publicPath+exampleFileUrl" class="down-file">示例</a>
        </div>
      </el-upload>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Upload",
    props: {
      exampleFileUrl: String,
      uploadContStyle:{
        type:String,
        default:"margin-top: 30px;"
      },
     uploadDemoStyle:{
        type:String,
        default:"padding-left: 15px;"
      }
    },
    components: {},
    data() {
      return {
        uploadParms: {}, //传给后台的参数
        publicPath: ""
      };
    },
    created() {
      const url = window.location.pathname;
      this.publicPath = url.substring(0, url.lastIndexOf("/"));
    },
    methods: {
      /**
       * 上传文件
       */
      //使用 before-upload 限制用户上传的文件格式。
      beforeFileUpload(file) {
        //设fileName参数
        this.$set(this.uploadParms, "fileName", file.name);
        let type = file.name.split(".");
        const isCorrectFile =
          type[1] === "xlsx" || type[1] === "xls" || type[1] === "csv";
        !isCorrectFile &&
        this.$message.error("请上传后缀名为'.xlsx'、'.xls'或'.csv'的文件 !");
        return isCorrectFile;
      },
      //文件上传成功时的钩子
      handleFileSuccess(res, file) {
        //将自定义黑名单的文件url传递给父组件
        this.$emit("handleFileUrl", res.data.fileUrl);
        this.$message({
          type: "success",
          duration: 1000,
          message: "文件上传成功"
        });
      },
      //文件上传失败时的钩子，上传失败时，文件会自动删除
      handleFileError() {
        this.$message.error("文件上传失败，请重试 !");
      },
      //删除文件之前的钩子，条件要为上传成功之后再删除才会触发，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      beforeRemove(file) {
        //删除之前将之前的路径删除
        this.$emit("handleFileUrl", "");
      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" rel="stylesheet/scss">
  .upload-box {
    text-align: left;
    .upload-cont {
      display: inline-block;
    
      .upload-demo {
       
        padding-right: 15px;
        .el-upload--text {
          margin-right: 10px;
        }
        .el-upload--text,
        .el-upload__tip {
          float: left;
        }
        .el-upload__tip {
          span {
            margin-right: 10px;
          }
          .down-file {
            margin-left: 10px;
            font-size: 14px;
            color: #409eff;
            font-weight: 900;
            text-decoration: underline;
          }
        }
        .el-upload-list {
          margin-top: 50px;
          li {
            text-align: left;
          }
        }
      }
    }
  }
</style>
