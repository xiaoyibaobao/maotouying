<template>
  <div class="allActive">
    <!--一级页面-->
    <div class="step3main">
      <div class="table-wrap">
        <el-card class="box-card">
          <el-table :data="ruleListData" style="width: 100%">
            <el-table-column property="descs" label="规则名称" :width="200"> </el-table-column>
            <el-table-column property="paraList" :width="1500">
              <template slot-scope="scope">
                <el-table :data="scope.row.paraList">
                  <el-table-column property="nameDesc" label="配置项" :width="150"></el-table-column>
                  <el-table-column property="paraValue" label="配置值" :width="150">
                    <template slot-scope="scope">
                      <el-input v-if="scope.row.paraDesc.indexOf('按')<0" autocomplete="off" v-model="scope.row.paraValue"></el-input>
                      <el-select v-else class="selects" v-model="scope.row.paraValue">
                        <el-option v-for="item in scope.row.ns" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                      <el-button v-show="isShow_selectBtn(scope.row.nameDesc, scope.$index)" @click="select">选择</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column property="paraDesc" label="配置描述" :width="200">
                    <template slot-scope="scope">

                      <p v-if="scope.row.paraDesc.indexOf('按')<0" autocomplete="off" v-model="scope.row.paraDesc">{{scope.row.paraDesc}}</p>
                      <p v-else></p>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
          </el-table>

        </el-card>

      </div>
      <!--上/下一步-->
      <div class="but-group">
        <el-button @click.native.prevent="handlePreStep">上一步</el-button>
        <el-button type="primary" @click="submitForm('step3Form')">保存</el-button>
      </div>
    </div>
    <!--二级页面：弹窗-->
    <!-- 每次弹窗的时候重新渲染组件，所以外层要再加一个v-if -->
    <div v-if="dialogVisible">
    <el-dialog title="选择黑名单" :visible.sync="dialogVisible">
      <!--新建-->

      <!--搜索-->
      <div class="search-box">
        <BlackPoolSearch :actId="actId" @update="ajaxGetBlackPool" />
        <el-button style="margin-bottom:22px;" type="primary" @click="gotoBlacklist">新建黑名单组</el-button>
      </div>
      <!--列表-->
      <BlackPoolTable :retData="blackPoolData" :aAddItemsStr="aAddItemsStr" :curPage="+postdata_getBlackPool.data.pageNum" :totalRecord="blackPoolTotalCount" @update="ajaxGetBlackPool" @select="blackAddItem" />
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="handleAdd()">添加</el-button>
      </span>
    </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import BlackPoolSearch from "./components/blackPoolSearch";
import BlackPoolTable from "./components/blackPoolTable";
function formatData(data) {
  var result = [];
  for (var key in data) {
    result.push({
      value: key
    });
  }
  return result;
}
export default {
  name: "allActive",
  data: function() {
    return {
      aAddItemsStr: "",
      //route.param
      actId: "",
      actType: "1",
      actStatus: "",
      createWay: "1",
      //ajax
      postdata_getActRuleList: {
        head: {},
        data: {
          activityId: "2016090104"
        }
      },
      postdata_setActRule: {
        head: {
          reqType: "1" //1：新增， 2：修改
        },
        data: {
          activityId: "", //'2016090104'
          ruleList: []
        }
      },

      postdata_getBlackList: {
        head: {},
        data: {
          name: "",
          pageFlag: 1, //是否需要分页：0是;1.否
          perPage: "",
          pageNum: ""
        }
      },
      //表格数据
      ruleListData: [
        /*{
            "taskCount": "058364",
            "ruleId": "1",
            "ruleName": "aaa",
            "descs": "1",
            "paraList":
              [
                {
                  "name": "transactionType",
                  "nameDesc": "事务类型",
                  "paraDesc": "配置描述",
                  "type": "1",
                  "cType": "3",
                  "paraValue": "2",
                  "id": "508",
                  "trid": "10",
                  "taskId": "12",
                  "msgType": "award"
                },
                {
                  "name": "transactionType",
                  "nameDesc": "事务类型",
                  "paraDesc": "配置描述",
                  "type": "1",
                  "cType": "3",
                  "paraValue": "2",
                  "id": "508",
                  "trid": "10",
                  "taskId": "12",
                  "msgType": "award"
                }
              ]
          },
          {
            "taskCount": "058364",
            "ruleId": "1",
            "ruleName": "aaa",
            "descs": "1",
            "paraList":
              [{
                "name": "transactionType",
                "nameDesc": "事务类型",
                "paraDesc": "配置描述",
                "type": "1",
                "cType": "3",
                "paraValue": "2",
                "id": "508",
                "trid": "10",
                "taskId": "12",
                "msgType": "award"
              },
                {
                  "name": "transactionType",
                  "nameDesc": "事务类型",
                  "paraDesc": "",
                  "type": "1",
                  "cType": "3",
                  "paraValue": "2",
                  "id": "508",
                  "trid": "10",
                  "taskId": "12",
                  "msgType": "award"
                }]
          }*/
      ],
      blackListData: {},
      aBlackListData: [],
      //弹窗
      dialogVisible: false,
      totalActiveNum: 3,
      totalSignUp: 204,
      auditNum: 15,
      activeNum: 0,
      currentType: "全部",
      selectItems: [],
      types: ["全部", "测试活动", "免费活动", "收费活动"],
      tableData: [
        {
          name: "用户资格校验规则",
          item: "用户黑名单ID",
          value: "01,02",
          a: 1, //  txt
          desc: "黑名单上的用户不能参加活动"
        },
        {
          name: "transactionType", //配置项
          nameDesc: "事务类型", //规则名称
          paraDesc: "", //配置描述
          type: "1",
          cType: "3", //  3：下拉框
          paraValue: "2", //配置值
          id: "508",
          trid: "10",
          taskId: "12",
          msgType: "award"
        }
      ],
      coutrys: ["广东|韶关", "广东|狮山"],
      //规则列表

      ruleListForm: {
        awardLevel: {
          model: "",
          list: ["一等奖", "二等奖", "三等奖", "四等奖", "五等奖", "安慰奖"]
        },
        input: {
          model: ""
        },
        paraValue: {
          model: "",
          type: ["次/每天", "次/每周", "次/每月", "次/活动期间"]
        }
      },

      //黑名单选择的值
      selectVal: [],
      index: 0, //黑名单选项

      //黑名单表单
      blackPoolData: [],
      postdata_getBlackPool: {
        head: {},
        data: {
          name: "",
          // type:'',
          // poolState:'',
          // perpage:'10',
          pageNum: "1"
        }
      },
      blackPoolTotalCount: 0,
      aAddItems: []
    };
  },
  components: {
    BlackPoolSearch,
    BlackPoolTable
  },
  computed: mapState([
    "aActPlace", //第几步
    "actIdx", //活动ID
    "actTypex" //活动行为类型
  ]),
  methods: {
    //结构转换
    makeStruc_setActRule(originData) {
      //保护originData，不操作originData，因为高级obj传进来的是引用
      let copyData = this.utils.deepcopy(originData);

      let ret = originData.map(function(val) {
        let paraList = val.paraList.map(function(val) {
          let item = {
            name: val.name,
            paraValue: val.paraValue
          };
          return item;
        });

        let item = {
          ruleId: val.ruleId,
          msgType: val.msgType,
          paraList: paraList
        };

        return item;
      });

      return ret;
    },

    //规则表格操作
    handleSelect: function(row, column, cell, event) {
      if (column.label == "操作") {
        this.$router.push("/activeManage/detail/page1");
      } else if (column.type == "selection") {
        row.$info = !row.$selected;
      } else {
        row.$selected = !row.$selected;
        row.$info = row.$selected;
      }
    },
    selectionchange: function(val) {
      var arr = [];
      val.forEach(function(item) {
        arr.push(item.id);
      });
      this.selectItems = arr;
      this.activeNum = this.selectItems.length;
    },
    handleRemove: function() {
      var tableData = this.tableData;
      this.selectItems.forEach(function(id) {
        tableData.forEach(function(data) {
          if (id == data.id) {
            tableData.splice(tableData.indexOf(data), 1);
          }
        });
      });
      this.selectItems = [];
    },

    //黑名单表格操作
    selectionchange_blackList(val) {
      this.selectVal = val;
    },
    handleSelect_blackList(row, column, cell, event) {},

    //上/下一步
    handlePreStep() {
      let _this = this;
      // this.$router.push('/create_activity/step1');
      // _this.$router.go(-1);
      _this.$router.push({
        name: "step2",
        params: {
          actId: _this.actId,
          actType: "2",
          actStatus: _this.actStatus,
          createWay: _this.createWay
        }
      });
    },

    proChange() {},

    //ajax
    ajaxGetActRuleList(obj) {
      let _this = this;

      if (obj != null) {
        for (var i in obj) {
          this.postdata_getActRuleList.data[i] = obj[i];
        }
      }

      if (!this.mydata.bUseMoniData) {
        this.axios
          .post(this.api.getActRuleList, this.postdata_getActRuleList)
          .then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            let index1;
            let index2;
            if (code == 0) {
              /*20180525优化 将限制周期和限制次数文字显示排序 */
              let reverseArray = data.ruleList.find(item => {
                return item.ruleName == "awardCountRule";
              }).paraList;
              reverseArray.map((_item, index) => {
                if (_item.nameDesc == "抽奖次数") {
                  index1 = index;
                } else if (_item.nameDesc == "限制周期") {
                  index2 = index;
                }
              });
              /* 假如抽奖次数在前，限制周期在后，则颠倒其元素的顺序 */
              if (index1 < index2) {
                reverseArray.reverse();
              }
              _this.ruleListData = data.ruleList;
              for (let i = 0; i < _this.ruleListData.length; i++) {
                for (
                  let k = 0;
                  k < _this.ruleListData[i].paraList.length;
                  k++
                ) {
                  let str = _this.ruleListData[i].paraList[k].paraDesc;
                  if (/[0-9]/.test(str) && /按/.test(str)) {
                    let ars = str
                      .replace(/\s/g, "")
                      .split(/[0-9]/)
                      .slice(1);
                    var sss = [];
                    ars.map(function(item, index) {
                      sss.push({ label: item, value: index + 1 + "" });
                    });
                    _this.$set(_this.ruleListData[i].paraList[k], "ns", sss);
                  }
                }
              }
            }
          })
          .catch(res => {
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });
      } else {
        setTimeout(function() {
          let res = _this.mydata.getActRuleList_created;
          let code = res.head.respCode;
          let data = res.data;
          if (code == 0) {
            _this.ruleListData = data.ruleList;
            for (let i = 0; i < _this.ruleListData.length; i++) {
              for (let k = 0; k < _this.ruleListData[i].paraList.length; k++) {
                let str = _this.ruleListData[i].paraList[k].paraDesc;
                if (/[0-9]/.test(str) && /按/.test(str)) {
                  let ars = str
                    .replace(/\s/g, "")
                    .split(/[0-9]/)
                    .slice(1);
                  var sss = [];
                  ars.map(function(item, index) {
                    sss.push({ label: item, value: index + 1 + "" });
                  });
                  _this.$set(_this.ruleListData[i].paraList[k], "ns", sss);
                }
              }
            }
          }
        }, 500);
      }
    },
    ajaxSetActRule(obj) {
      let _this = this;

      if (obj != null) {
        for (var i in obj) {
          this.postdata_setActRule.data[i] = obj[i];
        }
      }

      if (!this.mydata.bUseMoniData) {
        this.axios
          .post(this.api.setActRule, this.postdata_setActRule)
          .then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == 0) {
              // this.ruleListData = data.ruleList;

              _this.$router.push("/activity_list");
            }
          })
          .catch(res => {
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });
      } else {
        let res = this.mydata.actAdwardList;
        let code = res.head.respCode;
        let data = res.data;
        if (code == 0) {
          // this.ruleListData = data.ruleList;

          _this.$router.push("/activity_list");
        }
      }
    },
    //黑名单
    ajaxGetBlackPool(obj) {
      let _this = this;

      if (obj != null) {
        for (var i in obj) {
          this.postdata_getBlackPool.data[i] = obj[i];
        }
      }

      if (!this.mydata.bUseMoniData) {
        this.axios
          .post(this.api.blacklisting, this.postdata_getBlackPool)
          .then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == 0) {
              _this.blackPoolData = data.groupList;
              /**
               * 将id转换为字符串
               * 20180530
               */
              _this.blackPoolData = _this.blackPoolData.map(item => {
                item.createDate = !item.createDate
                  ? ""
                  : new Date(item.createDate).Format("yyyy-MM-dd");
                  item.id=String(item.id);
                return item;
              });
              _this.blackPoolTotalCount = data.totalRecord;
            }
          })
          .catch(res => {
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });
      } else {
        setTimeout(function() {
          let res = _this.mydata.getBlackList;
          let code = res.head.respCode;
          let data = res.data;
          if (code == 0) {
            _this.blackPoolData = data.groupList;
            _this.blackPoolTotalCount = data.totalRecord;
          }
        }, 500);
      }
    },
    blackAddItem(addItems) {
      let _this = this;
      _this.aAddItems = addItems;
    },
    handleAdd(a, b, c, d) {
      let _this = this;

      let arr = _this.aAddItems.map(function(val, index) {
        return val.id;
      });
      // _this.ruleListData[0].paraList[0].paraValue = arr.join(',');
      // _this.step1Form.cityList[index].cityData = data.cityList;
      _this.$set(_this.ruleListData[0].paraList[0], "paraValue", arr.join(","));
      this.dialogVisible = false;
    },

    //提交表单
    submitForm(formName) {
      //从表格数据里提取数据，凭凑成接口数据结构
      //表格数据
      /*let ruleListData=[
          {
            "taskCount": "058364",
            "ruleId": "1",
            "ruleName": "aaa",
            "descs": "1",
            "paraList":
              [
                {
                  "name": "transactionType",
                  "nameDesc": "事务类型",
                  "paraDesc": "配置描述",
                  "type": "1",
                  "cType": "3",
                  "paraValue": "2",
                  "id": "508",
                  "trid": "10",
                  "taskId": "12",
                  "msgType": "award"
                },
                {
                  "name": "transactionType",
                  "nameDesc": "事务类型",
                  "paraDesc": "配置描述",
                  "type": "1",
                  "cType": "3",
                  "paraValue": "2",
                  "id": "508",
                  "trid": "10",
                  "taskId": "12",
                  "msgType": "award"
                }
              ]
          },
          {
            "taskCount": "058364",
            "ruleId": "1",
            "ruleName": "aaa",
            "descs": "1",
            "paraList":
              [{
                "name": "transactionType",
                "nameDesc": "事务类型",
                "paraDesc": "配置描述",
                "type": "1",
                "cType": "3",
                "paraValue": "2",
                "id": "508",
                "trid": "10",
                "taskId": "12",
                "msgType": "award"
              },
                {
                  "name": "transactionType",
                  "nameDesc": "事务类型",
                  "paraDesc": "",
                  "type": "1",
                  "cType": "3",
                  "paraValue": "2",
                  "id": "508",
                  "trid": "10",
                  "taskId": "12",
                  "msgType": "award"
                }]
          },
        ];*/

      //接口数据
      /*let postdata_setActRule = {
          head: {
            reqType: '2'  //1：新增， 2：修改
          },
          data: {
            activityId: '2016090104',
              ruleList: [
              {
                ruleId: 1,
                msgType: 'award',  //任务消息名称
                paraList: [
                  {
                    name: 'groupId',  //规则参数名称
                    paraValue: '1,2,3',  //
                  }
                ]
              },
              {
                ruleId: 4,
                msgType: 'order',  //任务消息名称
                paraList: [
                  {
                    name: 'acceiveType',  //规则参数名称
                    paraValue: '1',  //
                  },
                  {
                    name:'getSeeds',
                    paraValue:'10'
                  },
                  {
                    name:'giftSeeds',
                    paraValue:'50'
                  },
                  {
                    name:'giftType',
                    paraValue:'2'
                  },
                ]
              },
            ]

          }
        };*/

      let ruleList = this.makeStruc_setActRule(this.ruleListData);
      let obj = {
        activityId: this.actId,
        ruleList: ruleList
      };

      //ajax
      this.ajaxSetActRule(obj);
    },

    //显示
    isShow_selectBtn(val, index) {
      if (~val.indexOf("黑名单")) {
        return true;
      } else {
        return false;
      }

      // return val == 'userCheckRule' ? true:false;
    },

    //选择黑名单
    select() {
      this.ajaxGetBlackPool({
        pageFlag: 0
      });
      this.dialogVisible = true;
      /**
       *20180527优化已经选择的黑名单，再次弹出选择界面时，勾选出已经选择的黑名单ID
       */
      this.aAddItemsStr = this.ruleListData[0].paraList[0].paraValue;
    },

    //
    gotoBlacklist() {
      this.$router.push({
        name: "CreateBlacklist"
      });
    },

    //根据字符含义选择样式
    makeSure(str) {
      let arr = [],
        type = "1";
      str = "1 按天  2按周 3按月  4按活动期间";

      //select样式
      if (/[0-9]/.test(str) && /按/.test(str)) {
        arr = str
          .replace(/\s/g, "")
          .split(/[0-9]/)
          .slice(1);
        type = "1";
      } else {
        //input样式
        type = "2";
      }

      return {
        type: type,
        arr: arr
      };
    }
  },
  created() {
    let _this = this;

    //进来就把当前页vuex
    _this.$store.commit("SETSTEP", 3);

    //从vuex获取活动省市数据

    _this.aPlaceInfo = _this.aActPlace;

    //初始化省市信息
    let changeStruc = function(arr) {
      let aRet = [];

      for (var i = 0; i < arr.length; i++) {
        let item = {
          provName: arr[i].provName,
          cityName: arr[i].cityName,
          provId: arr[i].provId,
          cityId: arr[i].cityId,
          throwWay: 3,
          strTotalNum: "500.00000",
          strCurNum: "0.00000",
          strIncNum: "23.81000",
          strFreeNum: "500.00000",
          strAwardNum: "0.00000",
          strDrawNum: "0.00000",
          rate: "0.5",
          limitCount: "1",
          acceptPrizeWay: 1
        };

        aRet.push(item);
      }

      return aRet;
    };
    _this.cityAwardList = changeStruc(_this.aPlaceInfo);

    //判断url参数
    //ww:test
    /*_this.actId = _this.actIdx;
      _this.actType = _this.actTypex;*/
    //get param
    let params = _this.$route.params;
    if (params.actId != null) {
      _this.actId = params.actId;
    }
    if (params.actType != null) {
      _this.actType = params.actType;
    }
    if (params.actStatus != null) {
      _this.actStatus = params.actStatus;
    }
    if (params.createWay != null) {
      _this.createWay = params.createWay;
    }

    //是否存在活动ID
    if (_this.actId != null && _this.actId.trim() != "") {
      _this.ajaxGetActRuleList({
        activityId: _this.actId
      });
    } else {
      //没有活动ID的就跳到新创建第一步
      //ww
      /*let sUrl = '/create_activity';
        _this.$router.push(sUrl);*/
    }

    //type
    if (_this.actType == "2") {
      _this.postdata_setActRule.head.reqType = "2";
    }
  }
};
</script>

<style scoped>
.allActive .but-group {
  margin: 20px 0;
}
.allActive > .head > .el-col > .el-col {
  padding: 20px 0;
  border-right: solid 1px #fff;
}

.allActive .head {
  text-align: center;
  color: #fff;
  font-size: 30px;
  margin-bottom: 50px;
}

.allActive .head span {
  font-size: 16px;
}
</style>
<!--表格-->
<style scoped lang="scss"   rel="stylesheet/scss">
/* 修改el-table，去掉scoped,外层加div，防止全局样式污染 */
.table-wrap {
  .table-head {
    height: 56px;
  }
  .table-head,
  th {
    background-color: #f2f8ff;
    /*text-align: center;*/
    div.cell {
      color: #6d7684;
    }
  }
  .el-table__empty-block {
    background: url("../../../assets/no-data.png") no-repeat center center;
    span.el-table__empty-text {
      padding-left: 200px;
    }
  }
  .no-blacklisting-box {
    margin-top: 85px;
    text-align: center;
  }
}
.search-box{
  display: flex;
}
</style>
