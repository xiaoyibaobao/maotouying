<template>
  <div class="detail-pop modal">
    <div class="pop-box">
      <div class="pop-title">
        详情
        <button @click="closeModal" type="button" aria-label="Close" class="el-message-box__headerbtn">
          <i class="el-message-box__close el-icon-close"></i>
        </button>
      </div>
      <div>
        <el-tabs v-model="activeName" @tab-click="secondTabClick">
          <el-tab-pane label="奖品明细" name="first">
            <div class="pop-head">
              <div class="head-item">
                <div class="item-d item-title">时间</div>
                <div class="item-d">
                  <div class="block">
                    <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                  </div>
                </div>
              </div>
              <div class="head-item">
                <div class="item-d item-title">活动名称</div>
                <div class="item-d">
                  <el-input  auto-complete="off" v-model="actName" placeholder="请输入活动名称"></el-input>
                </div>
              </div>
              <div class="head-item">
                <div class="item-d item-title">操作类型</div>
                <div class="item-d">
                  <el-cascader expand-trigger="hover" :options="typeOptions" v-model="type">
                  </el-cascader>
                </div>
              </div>

            </div>
            <div class="head-item br-item">
              <el-button size="mini" @click="getDetails">查询</el-button>
              <!--<el-button type="primary" size="mini">导出</el-button>-->
              <!-- 文件导出组件 -->
              <!--downFileParms Obj 必传参数 传给后台的请求参数（对象）  -->
              <!--dataListLength Number/String 必传参数 绑定要导出的列表的长度 -->
              <!--fileName String  必传参数 下载文件后的命名名称 注：外层双引号，内层单引号-->
              <!-- fileType String  后台传过来的文件类型  可选，默认为'zip'压缩文件 注：外层双引号，内层单引号-->
              <v-export :downFileParms="downFileParms" :dataListLength="detailList.length" :fileName="'奖品明细导出'" :fileType="'zip'">
              </v-export>
            </div>
            <el-table :data="detailList" max-height="250">
              <el-table-column label="时间" prop="">
                <template slot-scope="scope">
                  <span>{{scope.row.oprTime}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.type=='1'">创建</span>
                  <span v-else-if="scope.row.type=='2'">出库</span>
                  <span v-else-if="scope.row.type=='3'">回库</span>
                  <span v-else-if="scope.row.type=='4'">减库存</span>
                  <span v-else-if="scope.row.type=='5'">增库存</span>
                </template>
              </el-table-column>
              <el-table-column label="数量" prop="num"></el-table-column>
              <el-table-column label="单价(元)" prop="price">
              </el-table-column>
              <el-table-column label="价值(元)" prop="totalPrice"></el-table-column>
              <el-table-column label="奖品池库存" prop="stock">
              </el-table-column>
              <el-table-column label="关联活动" prop="actName"></el-table-column>
            </el-table>
            <el-pagination :page-sizes="[10, 20, 30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="detailTotalRecord" @current-change="paginations" @size-change="page">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane v-if="obj.prizeType=='2'" label="码劵信息" name="second">
            <div class="pop-head">
              <div class="head-item">
                <div class="item-d item-title">码劵</div>
                <div class="item-d">
                  <el-input  auto-complete="off" placeholder="输入码劵序列号" v-model="code"></el-input>
                </div>
              </div>
              <div class="head-item">
                <div class="item-d item-title">状态</div>
                <div class="item-d">
                  <el-cascader expand-trigger="hover" :options="typeOptions2" v-model="codeStatus">
                  </el-cascader>
                </div>
              </div>
              <div class="head-item">
                <el-button size="mini" @click="getCode">查询</el-button>
                <!--<el-button type="primary" size="mini">导出</el-button>-->
                <!-- 文件导出组件 -->
                <!--downFileParms Obj 必传参数 传给后台的请求参数（对象）  -->
                <!--dataListLength Number/String 必传参数 绑定要导出的列表的长度 -->
                <!--fileName String  必传参数 下载文件后的命名名称 注：外层双引号，内层单引号-->
                <!-- fileType String  后台传过来的文件类型  可选，默认为'zip'压缩文件 注：外层双引号，内层单引号-->
                <v-export :downFileParms="downCodeFileParms" :dataListLength="codeList.length" :fileName="'码券信息导出'" :fileType="'zip'">
                </v-export>
              </div>
            </div>
            <el-table :data="codeList" max-height="250">
              <el-table-column label="码劵序列号" prop="code"></el-table-column>
              <el-table-column label="创建时间">
                <template slot-scope="scope">
                  <span>{{scope.row.createTime}}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.state=='1'">已中出</span>
                  <span v-else="scope.row.state=='0'">未中出</span>
                </template>
              </el-table-column>
              <el-table-column label="中奖时间" prop="winTime"></el-table-column>
              <el-table-column label="中奖手机号" prop="msisdn"></el-table-column>
              <el-table-column label="关联活动" prop="actName">
              </el-table-column>
            </el-table>
            <el-pagination :page-sizes="[10, 20, 30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" @current-change="pagination2" @size-change="page2" :total="codeTotalRecord">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import VExport from "../../../components/export";
export default {
  props: {
    obj: Object
  },
  components: {
    VExport
  },
  data() {
    return {
      id: this.obj.typeId,
      codeList: [],
      codeTotalRecord: 1,
      codePageNum: "10",
      codePerPage: "1",
      detailList: [],
      detailTotalRecord: 1,
      detailPageNum: "1",
      detailPerPage: "10",
      time: "",
      actName: "",
      type: [],
      code: "",
      codeStatus: [],
      typeOptions: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "创建"
        },
        {
          value: "2",
          label: "出库"
        },
        {
          value: "3",
          label: "回库"
        },
        {
          value: "4",
          label: "减库存"
        },
        {
          value: "5",
          label: "增库存"
        }
      ],
      typeOptions2: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "已中出"
        },
        {
          value: "2",
          label: "未中出"
        }
      ],
      activeName: "first",
      downFileParms: {
        reqType: "5",
        typeId: this.obj.typeId
      },
      downCodeFileParms: {
        reqType: "6",
        typeId: this.obj.typeId
      }
    };
  },
  created() {
    this.getDetails();
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    getDetails() {
      this.setObject(1);
      let data = {
        data: {
          typeId: this.id,
          startTime: this.time && this.time[0],
          endTime: this.time && this.time[1].substring(0, 10) + " 23:59:59",
          perPage: this.detailPerPage,
          pageNum: this.detailPageNum
        }
      };
      this.actName
        ? (data.data.actName = this.actName)
        : delete data.data.actName;
      this.type.length
        ? (data.data.type = this.type.join(""))
        : delete data.data.type;
      this.axios.post(this.api.prizeDetail, data).then(res => {
        if (res.data.head.respCode == 0) {
          this.detailList = res.data.data.logList;
          /**
           *20180529更新时间到年月日，去除小时分钟秒
           *@lqh
           */
          this.detailList = this.detailList.map(val => {
            val.oprTime = !val.oprTime
              ? ""
              : new Date(val.oprTime).Format("yyyy-MM-dd");
            return val;
          });
          this.detailTotalRecord = res.data.data.totalRecord;
        }
      });
    },
    secondTabClick(tab, event) {
      if (tab.$el.id == "pane-second") {
        this.getCode();
      }
    },
    //获取码卷信息
    getCode() {
      this.setObject(2);
      let data = {
        data: {
          typeId: this.id,
          //            state:"0",
          perPage: this.codePageNum,
          pageNum: this.codePerPage
        }
      };
      if (this.code) data.data.code = this.code;
      if (this.codeStatus.length) data.data.state = this.codeStatus.join("");
      this.axios.post(this.api.codeList, data).then(res => {
        if (res.data.head.respCode == 0) {
          this.codeList = res.data.data.codeList;
          this.codeTotalRecord = res.data.data.totalRecord;
        }
      });
    },
    paginations(pageNum) {
      this.detailPageNum = pageNum.toString();
      this.getDetails();
    },
    page(pageSize) {
      this.detailPerPage = pageSize.toString();
      this.getDetails();
    },
    pagination2(pageNum) {
      this.codePerPage = pageNum.toString();
      this.getCode();
    },
    page2(pageSize) {
      this.codePageNum = pageSize.toString();
      this.getCode();
    },
    setObject(type) {
      if (type == 1) {
        this.$set(this.downFileParms, "startTime", this.time && this.time[0]);
        this.$set(
          this.downFileParms,
          "endTime",
          this.time && this.time[1].substring(0, 10) + " 23:59:59"
        );
        this.$set(this.downFileParms, "awardOprType", this.type);
        this.$set(this.downFileParms, "actName", this.actName);
      } else {
        this.$set(this.downFileParms, "gameCode", this.code);
        this.$set(this.downFileParms, "codeStatus", this.codeStatus[0]);
      }
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.pop-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1050px;
  padding: 20px;
  background: #fff;
  .pop-title {
    text-align: left;
    font-size: 16px;
    line-height: 36px;
  }
  .el-table {
    margin-top: 20px;
    margin-bottom: 20px;
    .el-table__header-wrapper {
      .has-gutter tr {
        th {
          text-align: center;
          background: #f2f8ff;
        }
      }
    }
  }
  .pop-head {
    display: flex;
    .head-item {
      order: 1;
      display: flex;
      margin-right: 20px;
      .export {
        .btn {
          padding: 13px 15px !important;
        }
      }
      .head-d {
        order: 1;
      }
      .item-title {
        font-size: 14px;
        line-height: 36px;
        margin-right: 10px;
      }
    }
  }
  .br-item {
    text-align: left;
    margin-top: 20px;
    .el-button--mini {
      padding: 10px 15px !important;
      display: inline-block;
    }
    .export {
      display: inline-block;
      .btn {
        padding: 10px 15px !important;
        &.fl {
          float: none;
        }
      }
    }
  }
}
</style>
