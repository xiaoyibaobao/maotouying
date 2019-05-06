<template>
  <div class="blacklisting-detail modal">
    <div class="modal-box detail-wrapper">
      <div class="modal-header">
        <div class="modal-title">
          黑名单组详情
        </div>
        <button @click="closeModal" type="button" aria-label="Close" class="el-message-box__headerbtn">
          <i class="el-message-box__close el-icon-close"></i>
        </button>
      </div>
      <div class="modal-operate-area clearfix">
        <input autocomplete="off" :class="['fl',{'active':isFocus}]" type="text" @keyup.enter="getDetailList" placeholder="请输入查询的手机号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入查询的手机号'" v-model="msisdn" @input="autoSearch" />
        <el-button type="primary" size="mini" class="fl btn" @click="getDetailList">查询</el-button>
        <el-button type="danger" size="mini" class="fl btn" @click="addDeleteOper">增删</el-button>
        <!-- 文件导出组件 -->
        <!--downFileParms Obj 必传参数 传给后台的请求参数（对象）  -->
        <!--dataListLength Number/String 必传参数 绑定要导出的列表的长度 -->
        <!--fileName String  必传参数 下载文件后的命名名称 注：外层双引号，内层单引号-->
        <!-- fileType String  后台传过来的文件类型  可选，默认为'zip'压缩文件 注：外层双引号，内层单引号-->
        <v-export :downFileParms="downFileParms" :dataListLength="detailList.length" :fileName="'黑名单组详情导出'" :fileType="'zip'">
        </v-export>
      </div>
      <div class="table-wrap">
        <el-table :data="detailList" height="280" border style="width: 100%" header-row-class-name="table-head">
          <el-table-column fixed prop="msisdn" label="用户手机号">
          </el-table-column>
          <el-table-column prop="source" label="来源">
          </el-table-column>
          <el-table-column prop="name" label="标签">
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination" v-if="detailList.length >0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Number(detailListParms.data.pageNum)" :page-sizes="[10, 20, 30]" :page-size="Number(detailListParms.data.perPage)" layout="total, sizes, prev, pager, next, jumper" :total="Number(totalItem)">
          </el-pagination>
        </div>
      </div>

    </div>
    <transition name="animation-fade">
      <div class="addDelete modal" v-if="showAddDelete">
        <div class="modal-box add-delete-wrapper">
          <div class="modal-header">
            <div class="modal-title">
              通过导入文件增删黑名单组中的手机号码：
            </div>
            <button @click="closeAddDelete" type="button" aria-label="Close" class="el-message-box__headerbtn">
              <i class="el-message-box__close el-icon-close"></i>
            </button>
          </div>
          <div class="radio-box">
            <el-radio v-model="requestType" label="2">新增手机号码</el-radio>
            <el-radio v-model="requestType" label="3">删除手机号码</el-radio>
          </div>
          <!-- 自定义 -->
          <!-- 文件上传和下载组件 -->
          <!-- handleFileUrl 文件上传成功之后的url,用事件handleFileUrl监听，用getFileUrl方法接收-->
          <!-- exampleFileUrl 必传参数  示列文件的本地路径 -->

          <v-upload @handleFileUrl="getFileUrl" :exampleFileUrl="exampleFileUrl"></v-upload>
          <div class="btns">
            <el-button size="small" @click="closeAddDelete">取消</el-button>
            <el-button type="primary" size="small" @click="save">确定</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script >
// 文件上传和示列组件
import VUpload from "../.././../components/upload";
import VExport from "../../../components/export";

//示列本地路径
const exampleFileUrl1 = "/static/examples/black_list_template.xlsx";
const exampleFileUrl2 = "/static/examples/black_list_del_template.xlsx";

export default {
  //组件名
  name: "BlacklistEdit",
  props: {
    detailObj: Object
  },
  // 子组件
  components: {
    VUpload,
    VExport
  },
  data() {
    return {
      msisdn: "", //查询手机号
      isFocus: false,
      detailList: [],
      totalItem: "0",
      downFileParms: {
        reqType: 4,
        // msisdn: this.msisdn,
        gid: this.detailObj.id
      }, //导出下载文件请求参数
      detailListParms: {
        head: {
          reqType: "1"
        },
        data: {
          id: this.detailObj.id,
          perPage: "10", //每页记录数
          pageNum: "1" //页数
          // pageFlag: 0 //是否需要分页：0是;1.否
        }
      },
      showAddDelete: false,
      fileUrl: "", //文件上传成功之后的路径
      requestType: "2", //请求类型:2、新增；3、删除
      exampleFileUrl: exampleFileUrl1
    };
  },
  created() {
    this.getDetailList();
  },

  methods: {
    //获取黑名单组列表
    getDetailList() {
      const pattern = /^[0-9]*$/;
      if (!pattern.test(this.msisdn)) {
        this.msisdn = "";
        return this.$message.error(
          "手机号不能包含非数字的其它字符，请重新输入 !"
        );
      } else if (this.msisdn.length > 11) {
        return this.$message.error("请输入正确的手机号 !");
      }
      this.$set(this.detailListParms.data, "msisdn", this.msisdn);
      this.axios
        .post(this.api.blacklistingDetail, this.detailListParms)
        .then(res => {
          let code = res.data.head.respCode;
          let data = res.data.data;
          let msg = res.data.head.respDesc;
          if (code == 0) {
            this.detailList = data.detailList ? data.detailList : [];
            this.totalItem = data.totalRecord; //总记录数
          } else {
            this.$message.error(msg);
          }
        })
        .catch(res => {
          this.$message.error("网络异常，获取详情列表失败 !");
        });
    },

    handleSizeChange(pagingSize) {
      this.detailListParms.data.perPage = pagingSize;
      this.getDetailList();
    },
    handleCurrentChange(pageNum) {
      this.detailListParms.data.pageNum = pageNum;
      this.getDetailList();
    },
    //关闭弹窗
    closeModal() {
      this.$emit("closeModal");
    },
    //打开增删弹窗
    addDeleteOper() {
      this.showAddDelete = true;
    },
    //关闭增删弹窗
    closeAddDelete() {
      this.showAddDelete = false;
    },
    //获取文件上传成功之后的路径
    getFileUrl(fileUrl) {
      this.fileUrl = fileUrl;
    },
    // 保存
    save() {
      let errorMsg = this.requestType == 2 ? "新增" : "删除";
      let uploadFileParms = {
        head: {
          requestType: this.requestType
        },
        data: {
          id: this.detailObj.id, //黑名单组id
          name: this.detailObj.name, //黑名单组名称
          fileUrl: this.fileUrl
        }
      };
      if (!this.fileUrl) {
        this.$message.error(`请先上传你要${errorMsg}的手机号码!`);
        return false;
      }
      this.axios
        .post(this.api.blacklistingEdit, uploadFileParms)
        .then(res => {
          let code = res.data.head.respCode;
          let msg = res.data.head.respDesc;

          if (code == 0) {
            this.$message({
              message: msg,
              type: "success"
            });
            //刷新列表
            this.getDetailList();
            //关闭弹框
            this.closeAddDelete();
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
        .catch(error => {
          this.$message.error("保存失败，请重试 !");
        });
    },
    autoSearch() {
      !this.msisdn && this.getDetailList();
    }
  },
  //watch 不要用箭头函数的写法,处用箭头函数this就不再指向Vue实例了
  //watch 不要用箭头函数的写法，处用箭头函数this就不再指向Vue实例了
  //watch 不要用箭头函数的写法，处用箭头函数this就不再指向Vue实例了
  //如果 `requestType` 发生改变，这个函数就会运行
  watch: {
    requestType: function(newType, oldType) {
      this.exampleFileUrl = newType == 3 ? exampleFileUrl2 : exampleFileUrl1;
    },
    msisdn: function() {
      this.$set(this.downFileParms, "msisdn", this.msisdn);
    }
  },

  mounted() {},
  computed: {},
  destroyed() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" rel="stylesheet/scss">
.blacklisting-detail {
  z-index: 2000;
  .detail-wrapper {
    width: 800px;
    height: 462px;

    .modal-operate-area {
      margin-top: 5px;
      padding-left: 15px;
      input {
        width: 356px;
        height: 34px;
        padding-left: 5px;
        box-sizing: border-box;
        border: solid 1px #d6e1e5;
        border-radius: 4px;
        font-size: 14px;
        &:focus {
          border: 1px solid #20a0ff;
        }
        /*placeholder字体样式 兼容处理*/
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
      .btn {
        margin-left: 8px;
        padding: 10px 15px;
      }
    }
    .table-wrap {
      padding-top: 15px;
      .table-head {
        height: 56px;
      }
      .table-head,
      th {
        background-color: #f2f8ff;
        text-align: center;
        div.cell {
          color: #6d7684;
        }
      }
      .pagination {
        margin-top: 25px;
      }
    }
  }
  .addDelete {
    z-index: 2001;
    background: rgba(0, 0, 0, 0.6);
    .add-delete-wrapper {
      width: 500px;
      height: 260px;
      .radio-box {
        margin-top: 10px;
        text-align: left;
        padding-left: 15px;
        padding-right: 15px;
        label {
          margin-right: 46px;
        }
      }
      .upload {
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
      .btns {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 20px;
        button {
          margin-right: 30px;
        }
      }
    }
  }

  // common css
  .modal-header {
    padding: 15px 15px 10px;
    .modal-title {
      font-size: 16px;
      line-height: 1;
      color: #303133;
      text-align: left;
    }
  }
}
</style>
