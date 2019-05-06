<template>
  <div class="blacklist-upload">
    <div class="upload">
      <el-upload class="upload-demo clearfix" 
      :action="this.api.blacklistingUpload" 
      :data="uploadParms" 
      :on-success="handleFileSuccess" 
      :on-error="handleFileError"
       :before-upload="(file)=>beforeFileUpload(file)" 
       :on-change="fileChange" 
       :auto-upload="true" 
       :before-remove="beforeRemove"
        :limit="1"
        >
        <el-button size="small" type="primary">上传文件</el-button>
        <div slot="tip" class="el-upload__tip">支持扩展名：
          <span>.xlsx</span>
          <span>.xls</span>
          <span>.csv</span>
          <a :href="requestType==0?'../../../../static/examples/black/black_list_template.xlsx':'../../../../static/examples/black/删除黑名单组示列.xlsx'" class="down-file">示例</a>
        </div>
      </el-upload>
    </div>
  </div>
</template>
<script>
export default {
  name: "Upload",
  props: {
    requestType:[String,Number]
  },
  components: {},
  data() {
    return {
      fileUrl: "", //上传文件后的路径
      uploadParms:{
      }
    };
  },
  created() {},
  methods: {
    /**
     * 上传文件
     */
    //使用 before-upload 限制用户上传的文件格式。
    beforeFileUpload(file) {
      this.$set(this.uploadParms,"fileName",file.name);
      let type = file.name.split(".");
      const isCorrectFile =
        type[1] === "xlsx" || type[1] === "xls" || type[1] === "csv";
      if (!isCorrectFile) {
        this.$message.error("请上传后缀名为'.xlsx'、'.xls'或'.csv'的文件 !");
      }
      return isCorrectFile;
    },
    //文件上传成功时的钩子
    handleFileSuccess(res, file) {
      this.fileUrl = res.data.fileUrl;
      //将自定义黑名单的文件url传递给父组件
      this.$emit("handleFileUrl", this.fileUrl);
       this.$message({
          type: 'success',
          duration: 1000,
          message: '上传成功'
        });
    },
    //文件上传失败时的钩子
    handleFileError() {
      this.$message.error("上传失败，请重试 !");
    },
    //删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeRemove(file) {
      //删除之前将之前的路径删除
      this.fileUrl = "";
      this.$emit("handleFileUrl", this.fileUrl);
    },
    //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    fileChange(file) {
     
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" rel="stylesheet/scss">
.blacklist-upload {
  text-align: left;
  .upload {
    display: inline-block;
    margin-top: 30px;
    .upload-demo {
      padding-left: 15px;
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
