<template>
  <div class="create-prize">
    <div class="prize-info">
      <div class="item-info">
        <div class="item-title">
          <span>*</span>奖品类型：
        </div>
        <div class="item-inp">
          <template>
            <el-radio v-model="radio" label="1">实物</el-radio>
            <el-radio v-model="radio" label="2">码劵</el-radio>
          </template>
        </div>
      </div>
      <div v-if="radio==1" class="material">
        <div class="item-info">
          <div class="item-title">
            <span>*</span>奖品名称：
          </div>
          <div class="item-inp">
            <input autocomplete="off" class="prize-name" placeholder="请输入奖品名称" v-model="saveParamsName">
          </div>
        </div>
        <div class="item-info">
          <div class="item-title">
            <span>*</span>单价：
          </div>
          <div class="item-inp">
            <el-input  auto-complete="off" @keyup.native="saveParams.price=saveParams.price.replace(/[^\d\.]/g,'')" v-model="saveParams.price"></el-input>&nbsp;元
          </div>
        </div>
        <div class="item-info">
          <div class="item-title">
            <span>*</span>总数量：
          </div>
          <div class="item-inp">
            <el-input  auto-complete="off" @keyup.native="saveParams.quantity=saveParams.quantity.replace(/[^0-9]/g,'')" v-model="saveParams.quantity"></el-input>
          </div>
        </div>
        <div class="item-info">
          <div class="item-title">
            库存预警阈值：
          </div>
          <div class="item-inp">
            <el-input  auto-complete="off" @keyup.native="saveParams.early=saveParams.early.replace(/[^0-9]/g,'')" v-model="saveParams.early"></el-input>
          </div>
        </div>
        <div class="item-info">
          <div class="item-title">
            奖品描述：
          </div>
          <div class="item-inp">
            <el-input  auto-complete="off" type="textarea" v-model="saveParams.describe"></el-input>
          </div>
        </div>
      </div>
      <div class="code" v-if="radio==2">
        <div class="item-info">
          <div class="item-title">
            <span>*</span>奖品名称：
          </div>
          <div class="item-inp">
            <input autocomplete="off" class="prize-name" placeholder="请输入奖品名称" v-model="saveCodeParamsNmae">
          </div>
        </div>
        <div class="item-info">
          <div class="item-title">
            <span>*</span>单价：
          </div>
          <div class="item-inp">
            <el-input  auto-complete="off" @keyup.native="saveCodeParams.price=saveCodeParams.price.replace(/[^\d\.]/g,'')" v-model="saveCodeParams.price"></el-input>&nbsp;元
          </div>
        </div>
        <div class="item-info" style="margin-bottom:10px;">
          <div class="item-title" >
            <span>*</span>码劵文件：
          </div>
          <div class="item-inp" style="position: relative;left: -15px">
            <!-- 自定义 -->
            <!-- 文件上传和下载组件 -->
            <!-- handleFileUrl 文件上传成功之后的url,用事件handleFileUrl监听，用getFileUrl方法接收-->
            <!-- exampleFileUrl 必传参数  示列文件的本地路径 -->

            <v-upload :uploadContStyle="'margin-top: 0px;'" @handleFileUrl="getFileUrl" :exampleFileUrl="exampleFileUrl"></v-upload>
          </div>
        </div>
        <div class="item-info">
          <div class="item-title">
            库存预警阈值：
          </div>
          <div class="item-inp">
            <el-input  auto-complete="off" @keyup.native="saveCodeParams.early=saveCodeParams.early.replace(/[^0-9]/g,'')" v-model="saveCodeParams.early"></el-input>
          </div>
        </div>
        <div class="item-info">
          <div class="item-title">
            奖品描述：
          </div>
          <div class="item-inp">
            <el-input  auto-complete="off" type="textarea" v-model="saveCodeParams.describe"></el-input>
          </div>
        </div>
      </div>
      <div v-if="isFalse==true" style="margin-bottom: 10px;margin-left: 170px;width: 300px">
        <template>
          <el-alert title="不支持该格式文件,请重新上传！" type="error">
          </el-alert>
        </template>
      </div>
      <div class="item-info">
        <el-button type="info" size="small" @click="off" style="margin-left: 100px">取消</el-button>
        <el-button type="primary" size="small" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script >
//  import VUpload from "../.././../components/upload";
import VUpload from "../../components/upload";
import VExport from "../../components/export";

//示列本地路径
const exampleFileUrl1 = "/static/examples/educe_code_template.xlsx";

export default {
  name: "CreatePrize",
  components: {
    VUpload,
    VExport
  },
  data() {
    return {
      radio: "1",
      isFalse: false,
      fileAction: this.api.prizeUpload,
      saveParams: {
        //                name:"",
        price: "",
        quantity: "",
        early: "",
        describe: ""
      },
      saveParamsName: "",
      saveCodeParamsNmae: "",
      saveCodeParams: {
        url: "",
        //                name:"",
        price: "",
        early: "",
        describe: ""
      },
      fileParams: {},
      exampleFileUrl: exampleFileUrl1,
      fileUrl: "",
      strLength: "",
      markIndex1: "",
      markIndex2: "",
      isMark1:true,
      isMark2:true,
    };
  },
  created() {},
  watch: {
    saveCodeParamsNmae: function(newName, oldName) {
      this.strLength = this.saveCodeParamsNmae.replace(
        /[\u0391-\uFFE5]/g,
        "aa"
      ).length; ////先把中文替换成两个字节的英文，在计算长度
      
      if (this.strLength >= 50) {
         if(this.isMark2&&this.strLength ==50){
            this.markIndex2 = this.saveCodeParamsNmae.length;
        }else if(this.isMark2&&this.strLength >50){
             this.markIndex2 = this.saveCodeParamsNmae.length-1;
        }
        this.isMark2=false;
        this.saveCodeParamsNmae = this.saveCodeParamsNmae.substring(
          0,
          this.markIndex2
        );
        this.strLength >50&&this.$message({
          message: "输入字符不能超过50",
          type: "warning",
          duration: 2000
        });
      }
    },
    saveParamsName: function(newName, oldName) {
      this.strLength = this.saveParamsName.replace(
        /[\u0391-\uFFE5]/g,
        "aa"
      ).length; ////先把中文替换成两个字节的英文，在计算长度
   
      if (this.strLength >= 50) {
         if(this.isMark1&&this.strLength==50){
            this.markIndex1 = this.saveParamsName.length;
        }else if(this.isMark1&&this.strLength>50){
            this.markIndex1 = this.saveParamsName.length-1;
        }
        this.isMark1=false;
        this.saveParamsName = this.saveParamsName.substring(0, this.markIndex1);
        this.strLength>50&&this.$message({
          message: "输入字符不能超过50",
          type: "warning",
          duration: 2000
        });
      }
    }
  },

  methods: {
    //获取文件上传成功之后的路径
    getFileUrl(fileUrl) {
      this.fileUrl = fileUrl;
    },
    handleChange(file) {
      var suffix = file.name.substring(
        file.name.indexOf(".") + 1,
        file.name.length
      );
      var fileName = file.name.substring(0, file.name.indexOf("."));
      if (suffix != "xlsx" && suffix != "xls" && suffix != "csv") {
        return false;
      } else {
        this.fileParams.fileName = file.name;
      }
    },
    handleSuccess(response, file, fileList) {
      this.saveParams.url = fileList[0].url;
    },
    off() {
      if (this.radio == "1") {
        this.saveParamsName = "";
        for (var keys in this.saveParams) {
          this.saveParams[keys] = "";
        }
      } else if (this.radio == "2") {
        this.saveCodeParamsNmae = "";
        this.radio = "1";
        for (var keys in this.saveCodeParams) {
          this.saveCodeParams[keys] = "";
        }
      }
    },
    save() {
      let data;
      if (this.radio == "1") {
        data = this.setParams("1");
      } else {
        data = this.setParams("2");
      }
      if (typeof data != "object") {
        this.open(data);
        return;
      }
      if (this.strLength < 50 || this.strLength == 50) {
        this.axios.post(this.api.setPrize, data).then(res => {
          if (res.data.head.respCode == 0) {
            this.radio == "1";
            this.open("保存成功", true);
            //                this.empty()
            //                location.reload();
          } else {
            this.open("保存失败");
          }
        });
      } else {
        this.open("输入字符不能超过50");
      }
    },
    open(txt, isf) {
      this.$alert(txt, "通知", {
        confirmButtonText: "确定",
        callback: action => {
          if (isf) {
            location.reload();
          }
        }
      });
    },
    setParams(typeId) {
      let data;
      if (typeId == "1") {
        data = {
          data: {
            prizeType: this.radio,
            prizeName: this.saveParamsName,
            prizePrice: this.saveParams.price,
            threshold: this.saveParams.early,
            desc: this.saveParams.describe
          },
          head: {
            operationType: "1"
          }
        };
        data.data.totalNum = this.saveParams.quantity;
        if (
          this.saveParamsName == "" ||
          this.saveParams.price == "" ||
          this.saveParams.quantity == ""
        ) {
          //                  this.open("请填写完整数据再保存！")
          return "请填写完整数据再保存！";
        } else {
          return data;
        }
      } else {
        data = {
          data: {
            prizeType: this.radio,
            prizeName: this.saveCodeParamsNmae,
            prizePrice: this.saveCodeParams.price,
            threshold: this.saveCodeParams.early,
            desc: this.saveCodeParams.describe
          },
          head: {
            operationType: "1"
          }
        };
        data.data.fileUrl = this.fileUrl;

        if (
          this.saveCodeParamsNmae == "" ||
          this.saveCodeParams.price == "" ||
          data.data.fileUrl == ""
        ) {
          return "请填写完整数据再保存！";
        } else {
          return data;
        }
      }
    }
    //保存成功，页面复位，清除数据
    /*empty(){
              for(var keys in this.saveParams){
                this.saveParams[keys]=""
              }
              for(var keys in this.saveCodeParams){
                this.saveCodeParams[keys]=""
              }
          }*/
  },
  computed: {},
  destroyed() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
.create-prize {
  padding: 20px;
  background: #fff;
  .item-info {
    display: flex;
    font-size: 16px;
    line-height: 36px;
    margin-bottom: 20px;
    .item-title {
      width: 150px;
      text-align: right;
      margin-right: 20px;
      font-size: 14px;
      span {
        color: red;
      }
    }
    .item-inp {
      /*width: 300px;*/
      text-align: left;
      .el-input {
        width: auto;
      }
      input {
        display: inline-block;
      }
    }
  }
  input.prize-name {
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 14px;
    &:focus {
      border-color: #409eff;
      outline: 0;
    }
    &::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #d6e1e5;
      font-size: 14px;
     
    }

    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #d6e1e5;
      font-size: 14px;
     
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #d6e1e5;
      font-size: 14px;
     
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #d6e1e5 !important;
      font-size: 14px;
     
    }
  }
}
</style>
