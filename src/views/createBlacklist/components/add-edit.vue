<template>
  <div :class="['blacklist-update',{'blacklist-edit':type==1},{'blacklist-add':type==0&&way==1}]">
    <!-- type 0 新增 1编辑 -->
    <!-- 新增和编辑页面 -->
    <div class="title">
      <h3>{{type==1?"编辑黑名单组":"新增黑名单组"}}</h3>
      <button v-if="type==1" @click="closeModal" type="button" aria-label="Close" class="el-message-box__headerbtn edit-close-modal-btn">
        <i class="el-message-box__close el-icon-close"></i>
      </button>
    </div>
    <div class="group-id" v-if="type==1">
      <span>黑名单组ID：{{editParms.id}}</span>
    </div>
    <div class="group-name">
      <span>黑名单组名称：</span>
      <input autocomplete="off" type="text" v-model="name">

    </div>
    <div class="label">
      <span class="label-title">创建方式：</span>
      <el-radio v-model="way" label="0">从已有黑名单组中选择</el-radio>
      <el-radio v-model="way" label="1">自定义</el-radio>
    </div>
    <!-- 黑名单选择 -->
    <div class="selected-box clearfix" v-if="way==0">
      <!-- 黑名单组选择 -->
      <div class="select-group fl">
        <h3>选择黑名单组</h3>
        <div class="select-list">
          <el-checkbox v-if="historyBlackList.length!=0" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedBlackList" @change="handleCheckedBlackListChange">
            <el-checkbox v-for="blackList in historyBlackList" :label="blackList.id" :key="blackList.id">{{blackList.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <!-- 标签选择 -->
      <div class="select-tag fl">
        <h3>选择标签</h3>
        <div class="select-list">
          <el-checkbox-group v-model="checkedLabelList">
            <el-checkbox-button round :label="labelItem.id" v-for="(labelItem,index) in labelList" :key="labelItem.id">{{labelItem.name}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <!-- 自定义 -->
    <!-- 文件上传和下载组件 -->
    <!-- handleFileUrl 文件上传成功之后的url,用事件handleFileUrl监听，用getFileUrl方法接收-->
    <!-- exampleFileUrl 必传参数  示列文件的本地路径 -->
    <v-upload  v-if="way!=0" :uploadDemoStyle="'padding-left: 0px;'" @handleFileUrl="getFileUrl" :exampleFileUrl="exampleFileUrl"></v-upload>
    <!-- 取消、保存 -->
    <div class="btns">
      <el-button v-if="type==1" @click="closeModal">取消</el-button>
      <el-button v-if="type==0" @click="resetData">取消</el-button>
      <el-button v-if="(type==0&&way==0)||(type==1&&way==0)" type="primary" @click="save">保存</el-button>
      <el-button v-else type="primary" @click="update">保存</el-button>
    </div>
  </div>

</template>
<script >
// 文件上传和示列组件
import VUpload from "../.././../components/upload";
const errMsg1 = "黑名单组名称不能为空，请输入！";
const errMsg2 = "请先上传文件 ！";
const errMsg3 = "请选择黑名单组 ！";
const errMsg4 = "请选择标签 ！";
const errMsg5 = "请输入长度少于50个字符的名称 ！";
export default {
  name: "UpdateBlacklist",
  props: {
    type: [String, Number],
    editParms: Object //从列表传递过来的参数
  },
  components: {
    VUpload
  },
  data() {
    return {
      checkedLabelList: [],
      name: "", //黑名单名称
      way: "0", //0,从已有黑名单组中选择 1,自定义
      checkAll: false, //默认不全选
      checkedBlackList: [],
      isIndeterminate: true, //indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果
      fileUrl: "", //文件路径
      labelList: [], //所有的黑名单标签列表
      historyBlackList: [], //已有黑名单组
      exampleFileUrl: "/static/examples/black_list_template.xlsx", //示列文件本地路径
      strLength: 0, //字符长度
      markIndex: "",
      isMark:true
    };
  },
  created() {
    if (this.type == 1) {
      this.name = this.editParms.name;
      //请求私有标签
      this.getSelfLabel();
    }
    //请求所有的黑名单标签列表
    this.getLabelList();
    //请求已有黑名单组
    this.getHistoryBlackList();
  },

  methods: {
    handleCheckAllChange(val) {
      if (val) {
        //假如全选
        this.historyBlackList.map(item => {
          this.checkedBlackList.push(item.id);
        });
      } else {
        //不全选
        this.checkedBlackList = [];
      }
      this.isIndeterminate = false;
    },
    handleCheckedBlackListChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.historyBlackList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.historyBlackList.length;
    },

    //请求所有的黑名单标签列表
    getLabelList() {
      this.axios
        .post(this.api.blacklistingLabelList, {})
        .then(res => {
          let code = res.data.head.respCode;
          let data = res.data.data;
          if (code == 0) {
            this.labelList = data.labelList ? data.labelList : [];
          }
        })
        .catch(res => {
          this.$message.error("网络异常，请刷新页面后重试 ！");
        });
    },
    //请求私有标签
    getSelfLabel() {
      let postData = {
        head: {
          reqType: "2"
        },
        data: {
          id: this.editParms.id,
          perPage: "", //无意义的请求参数
          pageNum: "" //无意义的请求参数
        }
      };
      this.axios.post(this.api.blacklistingDetail, postData).then(res => {
        let code = res.data.head.respCode;
        let data = res.data.data;
        if (code == 0) {
          if (data.labelList && data.labelList.length > 0) {
            this.checkedLabelList = data.labelList.map(item => item.id);
          }
          /**
           * 20180525编辑页面时勾选已经选择的黑名单组
           */
          if (data.gIds) {
        
          
           
            data.gIds.split("|").map((item,i)=>{
              
              this.checkedBlackList.push(Number(item));
            })
          }
        }
      });
    },
    //请求已存在的历史黑名单组名称
    //to do 后续看是否要做成下拉分页显示模式
    getHistoryBlackList() {
      let postParms = {
        data: {
          name: "", //黑名单组名称
          pageFlag: 1, //是否需要分页：0是;1.否
          perPage: "10", //每页记录数，默认为10条
          pageNum: "1" //页数，默认为1
        }
      };
      this.axios
        .post(this.api.blacklisting, postParms)
        .then(res => {
          let code = res.data.head.respCode;
          let data = res.data.data;
          if (code == 0) {
            if (data.groupList) this.historyBlackList = data.groupList;
          }
        })
        .catch(res => {
          this.$message.error("网络异常，获取黑名单组失败 !");
        });
    },
    validate() {
      let flag = true;
      if (!this.name) {
        return this.openMessage(flag, errMsg1);
      } else if (this.strLength > 50) {
        return this.openMessage(flag, errMsg5);
      }
      if (this.way == 1) {
        if (!this.fileUrl) {
          //自定义时要验证fileUrl是否存在
          return this.openMessage(flag, errMsg2);
        }
      } else {
        if (this.checkedBlackList.length == 0) {
          return this.openMessage(flag, errMsg3);
        } else if (this.checkedLabelList.length == 0) {
          return this.openMessage(flag, errMsg4);
        }
      }
      return flag;
    },
    save() {
      let postParms = {
        head: {
          requestType: this.type
        },
        data: {
          name: this.name,
          ids: this.checkedBlackList,
          labelIds: this.checkedLabelList
        }
      };
      this.type == 1 && this.$set(postParms.data, "id", this.editParms.id);
      //调用验证黑名单名称函数,验证通过则发请求，否则则不发
      this.validate() && this.postData(postParms);
    },
    resetData() {
      // 输入框、黑名单组、文件上传成功的url、标签选择复位
      this.name = this.fileUrl = "";
      this.checkAll = false;
      this.checkedBlackList = this.checkedLabelList = [];
      this.way = "0";
    },
    //post封装
    postData(postParms) {
      this.axios
        .post(this.api.blacklistingEdit, postParms)
        .then(res => {
          let code = res.data.head.respCode;
          let msg = res.data.head.respDesc;
          if (code == 0) {
            this.$message({
              message: msg,
              type: "success"
            });
            //保存成功后，如果是编辑页面则关闭弹窗
            //保存成功后，恢复到新增页面刚进来的状态
            if (this.type == 1) {
              this.closeModal();
              this.$emit("refreshBlackList");
            } else {
              this.resetData();
              this.getHistoryBlackList();
            }
          } else if (code == "-9993") {
            this.$message({
              message: `${msg}，请修改文件后重新上传 !`,
              duration: 4000,
              type: "error"
            });
          } else {
            this.$message({
              message: msg,
              duration: 3000,
              type: "error"
            });
          }
        })
        .catch(res => {
          this.$message.error("保存失败，请重试 !");
        });
    },
    //派发关闭编辑弹框事件
    closeModal() {
      this.$emit("closeModal");
    },
    // 保存
    update() {
      let postParms = {
        head: {
          requestType: this.type
        },
        data: {
          name: this.name,
          fileUrl: this.fileUrl
        }
      };
      //发请求
      this.validate() && this.postData(postParms);
    },
    //获取文件上传成功后的文件路径
    getFileUrl(fileUrl) {
      this.fileUrl = fileUrl;
    },
    //错误提示
    openMessage(flag, msg) {
      flag = false;
      this.$message({
        message: msg,
        type: "warning"
      });
      return flag;
    }
  },
  watch: {
    name: function(newName, oldName) {
      this.strLength = this.name.replace(/[\u0391-\uFFE5]/g, "aa").length; ////先把中文替换成两个字节的英文，在计算长度
      if (this.strLength >= 50) {
        if(this.isMark&&this.strLength == 50){
           this.markIndex = this.name.length;
        }else if(this.isMark&&this.strLength >50){
          this.markIndex = this.name.length-1;
        }
        this.isMark=false;
        this.name = this.name.substring(0, this.markIndex);
        this.strLength >50&&this.$message({
          message: errMsg5,
          type: "warning",
          duration: 2000
        });
      }
    }
  },
  computed: {},
  destroyed() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" rel="stylesheet/scss">
.blacklist-edit {
  width: 931px;
  height: 550px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
}
.blacklist-add {
  padding: 13px 20px 301px !important;
}
.blacklist-update {
  background-color: #fff;
  padding: 13px 20px 63px;
  text-align: left;
  font-size: 14px;
  .title {
    position: relative;
    h3 {
      color: #292c31;
      font-size: 16px;
    }
    button.edit-close-modal-btn {
      right: 0;
      top: 0;
    }
  }
  .group-id {
    margin-top: 20px;
    font-size: 14px;
  }
  .group-name {
    margin-top: 20px;
    font-size: 14px;

    input {
      padding-right: 30px;
      width: 336px;
      height: 34px;
      padding-left: 8px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border: solid 1px #d6e1e5;
      border-radius: 4px;
      &:focus {
        border: 1px solid #20a0ff;
      }
    }
  }
  .label {
    margin-top: 20px;
    .label-title {
    }
  }
  .selected-box {
    margin: 20px auto 0;
    border-radius: 4px;
    .select-group,
    .select-tag {
      width: 440px;
      height: 300px;
      border: 1px solid #ebeef5;
      .select-list {
        width: 400px;
        margin: 8px auto 0;
        padding: 12px;
        box-sizing: border-box;

        height: 220px;
        overflow-y: auto;
        /* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸 */
        &::-webkit-scrollbar-thumb {
          background-color: #3ba0ff;
          border-radius: 2px;
        }
        &::-webkit-scrollbar {
          width: 4px;
        }
      }

      h3 {
        text-align: center;
        font-size: 18px;
        height: 56px;
        line-height: 56px;
        background-color: #f2f8ff;
        border-bottom: 1px solid #ebeef5;
        color: #6d7684;
      }
    }
    .select-group {
      margin-right: 10px;
      label {
        display: block;
        margin-left: 0;
        margin-bottom: 6px;
      }
      .el-checkbox {
        display: flex;
      }
      .el-checkbox,
      .el-checkbox__input {
        white-space: normal;
        word-break: break-all;
      }
    }
    .select-tag {
      .select-list {
        padding-left: 34px;
        .el-checkbox-group {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: flex-start;
          label {
            margin-right: 20px;
            margin-bottom: 16px;
            span {
              border-radius: 20px;
              border: 1px solid transparent;
            }
            &.el-checkbox-button:not(.is-checked) {
              span {
                border: 1px solid #dcdfe6;
              }
              span:hover {
                border-color: #c6e2ff;
                background-color: #ecf5ff;
              }
            }
            &.is-checked {
              border: 0;
            }
          }
        }
      }
    }
  }
  .btns {
    width: 890px;
    text-align: center;
    margin-top: 20px;
    box-sizing: border-box;
    height: 30px;
  }
}
</style>
