<template>
  <div class="step2">
    <!--一级页面-->
    <div>
      <!--增加奖品-->
      <el-button type="primary" size="large" @click="popAddDialog" class="add-btn">增加</el-button>
      <!--表-->
      <vue-scrollbar classes="my-scrollbar" ref="Scrollbar" style="margin:0;">
        <div class="scroll-me ">
          <!--活动奖品列表-->
          <div class="table-wrap">
            <el-table :data="retData2">
              <el-table-column fixed property="grade" label="奖项等级" :width="110">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.grade" @change="gradeChange">
                    <el-option v-for="item in activityAwardListForm.awardLevel.list" :key="item" :value="item">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column property="typeId" label="奖项ID" :width="60"></el-table-column>
              <el-table-column property="name" label="奖品名称" :width="80"></el-table-column>
              <el-table-column property="type" label="类型" :width="80"></el-table-column>
              <el-table-column property="count" label="奖品池库存" :width="70"></el-table-column>

              <el-table-column property="cityAwardList" :width="670">
                <template slot-scope="scope">
                  <el-table :data="scope.row.cityAwardList">
                    <el-table-column property="cityName" label="投放地市" :width="100" v-if="createWay=='1'">
                      <template slot-scope="scope1">
                        <p>{{scope1.row.provName +'|'+ scope1.row.cityName}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column  property="strTotalNum" label="投放总数量" :width="100">
                      <template slot-scope="scope1">
                        <el-input auto-complete="off"  v-model="scope1.row.strTotalNum"  @keyup.native="scope1.row.strTotalNum=scope1.row.strTotalNum.replace(/\D/g,'')"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column property="throwWay" label="投放方式" :width="100">
                      <template slot-scope="scope1">
                        <el-select v-model="scope1.row.throwWay" @change="gradeChange">
                          <el-option v-for="item in activityAwardListForm.awardLevel.throwWay" :key="item" :value="item">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column property="strIncNum" label="每阶段投放量" :width="60"></el-table-column>
                    <el-table-column property="rate" label="中奖率" :width="80">
                      <template slot-scope="scope1">
                        <el-input auto-complete="off" v-model="scope1.row.rate"  ></el-input>

                      </template>
                    </el-table-column>
                    <el-table-column property="limitCount" label="中奖限制" :width="80">
                      <template slot-scope="scope1">
                        <el-input auto-complete="off" v-model="scope1.row.limitCount"  @keyup.native="scope1.row.limitCount=scope1.row.limitCount.replace(/\D/g,'')"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column property="acceptPrizeWay" label="发放方式" :width="130">
                      <template slot-scope="scope1">
                        <el-select v-model="scope1.row.acceptPrizeWay" @change="gradeChange">
                          <el-option v-for="item in activityAwardListForm.awardLevel.acceptPrizeWay" :key="item" :value="item">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="72">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="delect(scope.$index, scope.row)" :disabled="actStatus=='1'||actStatus=='2'">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="clearfix"></div>
        </div>
      </vue-scrollbar>
      <!--上/下一步-->
      <div class="but-group">
        <el-button @click.native.prevent="handlePreStep">上一步</el-button>
        <el-button type="primary" @click="submitForm('step2Form')">下一步</el-button>
      </div>
    </div>
    <!--二级页面：弹窗-->
    <el-dialog title="增加奖品" :visible.sync="dialogVisible">
      <!--搜索-->
      <AdwardPoolSearch :actId="actId" @update="ajaxGetAdwardPool" />
      <!--列表-->
      <AdwardPoolTable :retData="adwardPoolData" :curPage="+postdata_getAdwardPool.data.pageNum" :totalRecord="adwardPoolTotalCount" @update="ajaxGetAdwardPool" @select="actAdwardAddItem" />
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="handleAdd()">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import VueScrollbar from "vue2-scrollbar";
import AdwardPoolSearch from "./components/adwardPoolSearch";
import AdwardPoolTable from "./components/adwardPoolTable";
export default {
  name: "allActive",
  data: function() {
    var validateStrTotalNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      //param
      actId: "", //活动id
      actType: "1", //1.新建；2.编辑
      actStatus: "", //0.未开始；1.进行中；2.已结束
      createWay: "1", //1.按省市；2.自定义

      totalActiveNum: 3,
      totalSignUp: 204,
      auditNum: 15,
      activeNum: 0,
      currentType: "全部",
      selectItems: [],
      types: ["全部", "测试活动", "免费活动", "收费活动"],
      tableData: [
        {
          awardLevel: "一等奖",
          awardId: 5210,
          awardName: "美的电饭锅",
          awardType: "实物", //实物
          priceStock: 5000,
          putCity: ["广东|韶关", "湖南|长沙"],
          putCount: 1000,
          putType: "全量",
          putPerCount: 0,
          awardRate: 10,
          awardLimit: 1,
          grantType: "系统发放"
        },
        {
          awardLevel: "二等奖",
          awardId: 5212,
          awardName: "美的电饭锅2",
          awardType: "实物", //实物
          priceStock: 5000,
          putCity: ["广东|全省", "湖南|长沙"],
          putCount: 1000,
          putType: "全量",
          putPerCount: 0,
          awardRate: 10,
          awardLimit: 1,
          grantType: "系统发放"
        },
        {
          awardLevel: "三等奖",
          awardId: 5213,
          awardName: "美的电饭锅3",
          awardType: "实物", //实物
          priceStock: 5000,
          putCity: ["广东|全省", "湖南|长沙"],
          putCount: 1000,
          putType: "全量",
          putPerCount: 0,
          awardRate: 10,
          awardLimit: 1,
          grantType: "系统发放"
        },
        {
          awardLevel: "四等奖",
          awardId: 5214,
          awardName: "美的电饭锅4",
          awardType: "实物", //实物
          priceStock: 5000,
          putCity: ["广东|全省", "湖南|长沙"],
          putCount: 1000,
          putType: "全量",
          putPerCount: 0,
          awardRate: 10,
          awardLimit: 1,
          grantType: "系统发放"
        }
      ],

      coutrys: ["广东|韶关", "广东|狮山"],
      //dialog
      dialogVisible: false,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      activityAwardListData: {
        head: {
          respCode: "0",
          respDesc: "success"
        },
        data: {
          awardList: [
            {
              typeId: "2",
              grade: "4",
              name: "智能电饭煲",
              type: "1",
              count: 990,
              cityAwardList: [
                {
                  provName: "四川",
                  cityName: "成都市",
                  provId: "26",
                  cityId: "383",
                  throwWay: 1,
                  strTotalNum: "2000.00000",
                  strCurNum: "1000.00000",
                  strIncNum: "300.00000",
                  strFreeNum: "1000.00000",
                  strAwardNum: "0.00000",
                  strDrawNum: "0.00000",
                  rate: "0.4",
                  limitCount: "1",
                  acceptPrizeWay: 1
                },
                {
                  provName: "四川",
                  cityName: "德阳市",
                  provId: "26",
                  cityId: "384",
                  throwWay: 1,
                  strTotalNum: "1500.00000",
                  strCurNum: "1000.00000",
                  strIncNum: "500.00000",
                  strFreeNum: "1000.00000",
                  strAwardNum: "0.00000",
                  strDrawNum: "0.00000",
                  rate: "0.2",
                  limitCount: "1",
                  acceptPrizeWay: 1
                },
                {
                  provName: "四川",
                  cityName: "广汉市",
                  provId: "26",
                  cityId: "385",
                  throwWay: 1,
                  strTotalNum: "1500.00000",
                  strCurNum: "500.00000",
                  strIncNum: "20.00000",
                  strFreeNum: "500.00000",
                  strAwardNum: "0.00000",
                  strDrawNum: "0.00000",
                  rate: "0.1",
                  limitCount: "1",
                  acceptPrizeWay: 1
                }
              ]
            }
          ]
        }
      },
      activityAwardListForm: {
        awardLevel: {
          model: "",
          list: ["一等奖", "二等奖", "三等奖", "四等奖", "五等奖", "安慰奖"],
          throwWay: ["按小时", "全量", "按天"],
          acceptPrizeWay: ["系统下发", "用户领取"]
        },
        input: {
          model: ""
        }
      },

      //ajax
      postdata_getActAdwardList: {
        head: {},
        data: {
          activityId: "" /*'0000000007'*/
        }
      },
      postdata_addActAdward: {
        head: {},
        data: {
          awardList: [
            /*{
                typeId:'',  //奖项ID
                activityId:'2016090104',  //活动ID
                grade:'2',  //一等奖
                name:'魅族耳机5',
                type:'1',
                cityAwardList:[
                  {
                    provName:'广东省',
                    cityName:'广州市',
                    provId:'11',
                    cityId:'60',
                    throwWay:3,  //按天
                    strTotalNum:'500',
                    rate:'0.5',
                    limitCount:'1',
                    acceptPrizeWay:1  //系统下发
                  }
                ]
              }*/
          ]
        }
      },
      postdata_delActAdward: {
        head: {},
        data: {
          activityId: "",
          typeId: ""
        }
      },
      retData: [],
      retData2: [],
      postdata_getAdwardPool: {
        head: {
          reqType: 1
        },
        data: {
          activityId: "",
          name: "",
          // type:'',
          // poolState:'',
          //  perpage:"10",
          pageNum: "1"
        }
      },
      adwardPoolData: [
        /*{
            "prizeId": "2016090104",
            "prizeName": "小米耳机",
            "prizeType": "1",
            "totalValue": "70000",
            "stock": "6000",
            "num": "7000",
            "preizeState": "1",
            "lupdate": "2016-07-30"
          },
          {
            "prizeId": "2016080602",
            "prizeName": "游戏道具码",
            "prizeType": "1",
            "totalValue": "2200",
            "stock": "200",
            "num": "2200",
            "preizeState": "3",
            "lupdate": "2016-03-30"
          }*/
      ],
      aAddItems: [],

      //省市信息
      //上页传来的格式
      aPlaceInfo: [
        {
          provId: "11",
          cityId: "541",
          provName: "广东",
          cityName: "中山市"
        },
        {
          provId: "2",
          cityId: "0",
          provName: "上海",
          cityName: ""
        }
      ],
      //本页需要的格式
      cityAwardList: [
        {
          provName: "广东",
          cityName: "广州市",
          provId: "11",
          cityId: "60",
          throwWay: 2,
          strTotalNum: "500.00000",
          strCurNum: "0.00000",
          strIncNum: "23.81000",
          strFreeNum: "500.00000",
          strAwardNum: "0.00000",
          strDrawNum: "0.00000",
          rate: "0.5",
          limitCount: "1",
          acceptPrizeWay: 1
        }
      ],

      //奖品池
      adwardPoolTotalCount: 0,

      //
      vShow_cityName: true
    };
  },

  components: {
    VueScrollbar,
    AdwardPoolSearch,
    AdwardPoolTable
  },

  computed: mapState([
    "aActPlace", //上一页传过来的省市信息
    "actIdx", //活动ID
    "actTypex" //活动行为类型
  ]),

  methods: {
    //ajax
    ajaxGetActAdwardList(obj) {
      let _this = this;

      if (obj != null) {
        for (var i in obj) {
          this.postdata_getActAdwardList.data[i] = obj[i];
        }
      }

      if (!this.mydata.bUseMoniData) {
        this.axios
          .post(this.api.getActAdwardList, this.postdata_getActAdwardList)
          .then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == 0) {
              _this.retData = data.awardList;
              if (_this.createWay != "2") {
                if (
                  _this.retData.length > 0 &&
                  _this.retData[0] != null &&
                  _this.retData[0].cityAwardList != null &&
                  _this.retData[0].cityAwardList.length > 0
                ) {
                  let aApiPlaceInfo = _this.retData[0].cityAwardList;
                  let aNewPlaceInfo = [];
                  let aNewPlaceInfo2 = [];
                  for (let index = 0; index < _this.aActPlace.length; index++) {
                    let item = _this.aActPlace[index];
                    //接口里是否也存在该省市
                    let bExit = false;
                    for (let j = 0; j < aApiPlaceInfo.length; j++) {
                      let apiItem = aApiPlaceInfo[j];
                      if (
                        apiItem.provId == item.provId &&
                        apiItem.cityId == item.cityId
                      ) {
                        bExit = true;
                      }
                    }
                    //如果不存在，那就作为新项
                    if (!bExit) {
                      aNewPlaceInfo.push(item);
                    }
                  }
                  //是否有新项，有就把新项加入到retData里
                  if (aNewPlaceInfo.length > 0) {
                    //转换成接口格式
                    aNewPlaceInfo2 = _this.chApiStrct_city(aNewPlaceInfo);

                    for (let k = 0; k < _this.retData.length; k++) {
                      let item = _this.retData[k];
                      item.cityAwardList = item.cityAwardList.concat(
                        aNewPlaceInfo2
                      );
                    }
                  }
                }
              }
              _this.retData2 = _this.chFormStrct_actAward(_this.retData);
            }
          })
          .catch(res => {
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });
      } else {
        setTimeout(function() {
          let res = _this.mydata.actAdwardList;
          let code = res.head.respCode;
          let data = res.data;
          if (code == 0) {
            _this.retData = data.awardList;
            if (
              _this.retData.length > 0 &&
              _this.retData[0] != null &&
              _this.retData[0].cityAwardList != null &&
              _this.retData[0].cityAwardList.length > 0
            ) {
              let aApiPlaceInfo = _this.retData[0].cityAwardList;
              let aNewPlaceInfo = [];
              let aNewPlaceInfo2 = [];
              for (let index = 0; index < _this.aActPlace.length; index++) {
                let item = _this.aActPlace[index];
                //接口里是否也存在该省市
                let bExit = false;
                for (let j = 0; j < aApiPlaceInfo.length; j++) {
                  let apiItem = aApiPlaceInfo[j];
                  if (
                    apiItem.provId == item.provId &&
                    apiItem.cityId == item.cityId
                  ) {
                    bExit = true;
                  }
                }
                //如果不存在，那就作为新项
                if (!bExit) {
                  aNewPlaceInfo.push(item);
                }
              }
              //是否有新项，有就把新项加入到retData里
              if (aNewPlaceInfo.length > 0) {
                //转换成接口格式
                aNewPlaceInfo2 = _this.chApiStrct_city(aNewPlaceInfo);

                for (let k = 0; k < _this.retData.length; k++) {
                  let item = _this.retData[k];
                  item.cityAwardList = item.cityAwardList.concat(
                    aNewPlaceInfo2
                  );
                }
              }
            }
            _this.retData2 = _this.chFormStrct_actAward(_this.retData);
          }
        }, 500);
      }
    },
    ajaxAddActAdward(obj) {
      let flag = true;
      let _this = this;

      if (obj != null) {
        for (var i in obj) {
          this.postdata_addActAdward.data[i] = obj[i];
        }
      }

      if (this.postdata_addActAdward.data.awardList.length == 0) {
        this.$message.error("请添加奖品!");
        return 0;
      } else {
        this.postdata_addActAdward.data.awardList.map(item => {
          item.cityAwardList.map(val => {
            if (!val.strTotalNum) {
              this.$message.error("请输入投放总数量!");
                flag=false;
            } else if (!val.rate) {
              this.$message.error("请输入中奖率!");
                flag=false;
            } else if (!val.limitCount) {
              this.$message.error("请输入中奖限制!");
               flag=false;
            }
          });
        });
      }
      if(!flag){
        return;
      }
      if (!this.mydata.bUseMoniData) {
        this.axios
          .post(this.api.addActAdward, this.postdata_addActAdward)
          .then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == 0) {
              //下一步
              _this.$router.push({
                name: "step3",
                params: {
                  actId: _this.actId,
                  actType: _this.actType,
                  actStatus: _this.actStatus,
                  createWay: _this.createWay
                }
              });
            } else if (code == -99) {
              let msg = res.data.head.respDesc;
              /*if(~(res.data.head.respDesc.indexOf('分配数量'))){
                this.$message.error('投放总数量不能大于库存');
              }
              else{
                this.$message.error(msg);
              }*/
              this.$message.error(msg);
            }
          })
          .catch(res => {
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });
      } else {
        let res = this.mydata.addActAdward;
        let code = res.head.respCode;
        let data = res.data;
        if (code == 0) {
          //下一步
          _this.$router.push({
            name: "step3",
            params: {
              actId: _this.actId,
              actType: _this.actType,
              actStatus: _this.actStatus,
              createWay: _this.createWay
            }
          });
        } else if (code == -99) {
          let msg = res.data.head.respDesc;
          /*if(~(res.data.head.respDesc.indexOf('分配数量'))){
              this.$message.error('投放总数量不能大于库存');
            }
            else{
              this.$message.error(msg);
            }*/
          this.$message.error(msg);
        }
      }
    },
    ajaxDelActAdward(obj, index) {
      let _this = this;

      if (obj != null) {
        for (var i in obj) {
          this.postdata_delActAdward.data[i] = obj[i];
        }
      }

      if (!this.mydata.bUseMoniData) {
        this.axios
          .post(this.api.delActAdward, this.postdata_delActAdward)
          .then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == "0" || code == "-3") {
              //删除表格数据中的那项
              _this.retData2.splice(index, 1);
            }
          })
          .catch(res => {
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });
      } else {
        let res = this.mydata.delActAdward;
        let code = res.head.respCode;
        let data = res.data;
        if (code == "0" || code == "-3") {
          //删除表格数据中的那项
          _this.retData2.splice(index, 1);
        }
      }
    },
    ajaxGetAdwardPool(obj) {
      let _this = this;

      if (obj != null) {
        for (var i in obj) {
          this.postdata_getAdwardPool.data[i] = obj[i];
        }
      }

      if (!this.mydata.bUseMoniData) {
        this.axios
          .post(this.api.getAdwardPool, this.postdata_getAdwardPool)
          .then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == 0) {
              _this.adwardPoolData = data.prizeList;
              _this.adwardPoolTotalCount = data.totalRecord;
            }
          })
          .catch(res => {
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });
      } else {
        setTimeout(function() {
          let res = _this.mydata.adwardPool;
          let code = res.head.respCode;
          let data = res.data;
          if (code == 0) {
            _this.adwardPoolData = data.prizeList;
            _this.adwardPoolTotalCount = data.totalRecord;
          }
        }, 500);
      }
    },

    //数据转换
    makeStruc_setActAdward(originData) {
      let _this = this;

      //保护originData，不操作originData，因为高级obj传进来的是引用
      let copyData = this.utils.deepcopy(originData);

      let ret = copyData.map(function(val) {
        let cityAwardList = val.cityAwardList.map(function(val) {
          let item = {
            provName: val.provName,
            cityName: val.cityName,
            provId: val.provId,
            cityId: val.cityId,
            throwWay: _this.reChange_throwWay(val.throwWay),
            strTotalNum: val.strTotalNum + "",
            // strIncNum: val.strIncNum+'',
            rate: val.rate,
            limitCount: val.limitCount,
            acceptPrizeWay: _this.reChange_acceptPrizeWay(val.acceptPrizeWay)
          };
          return item;
        });

        let item = {
          typeId: val.typeId,
          activityId: val.activityId,
          grade: _this.reChange_grade(val.grade),
          name: val.name,
          type: _this.reChange_type(val.type),
          cityAwardList: cityAwardList
        };

        return item;
      });

      return ret;
    },

    //表单事件
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    gradeChange() {},
    delect(index, row) {
      let _this = this;
      let _obj = {
        activityId: _this.actId,
        typeId: _this.retData2[index].typeId
      };
      _this
        .$confirm("确认删除？")
        .then(_ => {
          // _this.ajaxDelActAdward({
          //   activityId: _this.actId,
          //   typeId: _this.retData2[index].typeId
          // },index);
          _this.ajaxDelActAdward(_obj, index);
        })
        .catch(() => {});
    },

    tableSelect(a, b) {},
    //选择增加奖品
    actAdwardAddItem(addItems) {
      let _this = this;
      //插入数据，变成该页表格需要的接口格式
      let makeData = function(arr) {
        let ret = [];
        let obj = {
          typeId: "1", //奖项ID
          grade: "1",
          name: "",
          type: "1", //奖品的类别，1、实物奖，2、码券
          count: 5997, //奖品池库存
          cityAwardList: _this.cityAwardList
        };
        for (var i = 0; i < arr.length; i++) {
          let item = _this.utils.deepcopy(obj);
          item.typeId = arr[i].typeId;
          item.name = arr[i].prizeName;
          item.type = arr[i].prizeType;
          item.count = arr[i].stock;
          ret.push(item);
        }
        return ret;
      };
      _this.aAddItems = makeData(addItems);
    },
    handleAdd(a, b, c, d) {
      let _this = this;
      //先把aAddItems接口格式转换成表格格式，才能加到retData2里
      _this.aAddItems = _this.chFormStrct_actAward(_this.aAddItems);
      _this.retData2 = _this.retData2.concat(_this.aAddItems);
      //关闭弹窗
      _this.dialogVisible = false;
    },

    //上一步
    handlePreStep() {
      let _this = this;
      _this.$router.push({
        name: "step1",
        params: {
          actId: _this.actId,
          actType: "2",
          actStatus: _this.actStatus,
          createWay: _this.createWay
        }
      });
    },
    //下一步（提交表格）
    submitForm(formName) {
      let _this = this;

      //表格格式
      /*let retData0 = [
          {
            "typeId": "1",
            "grade": "一等奖",
            "name": "魅族耳机4",
            "type": "实物",
            "cityAwardList": [
              {
                "provName": "广东",
                "cityName": "广州市",
                "provId": "11",
                "cityId": "60",
                "throwWay": 3,
                "strTotalNum": "500.00000",
                "strCurNum": "0.00000",
                "strIncNum": "23.81000",
                "strFreeNum": "500.00000",
                "strAwardNum": "0.00000",
                "strDrawNum": "0.00000",
                "rate": "0.5",
                "limitCount": "1",
                "acceptPrizeWay": 1
              },
            ],
            "count": 5997
          },
        ];*/
      //所需格式:
      /*let postdata_addActAdward = {
          head: {},
          data: {
            awardList: [
              {
                typeId: '18',  //奖项ID
                activityId: '0000000016',  //'2016090104',  //活动ID
                grade: '2',  //一等奖
                name: '西瓜2222222',
                type: '1',
                cityAwardList: [
                  {
                    provName: '广东省',
                    cityName: '广州市',
                    provId: '11',
                    cityId: '60',
                    throwWay: 3,  //按天
                    strTotalNum: '0',
                    rate: '0.5',
                    limitCount: '1',
                    acceptPrizeWay: 1  //系统下发
                  },
                  {
                    provName: '上海',
                    cityName: '',
                    provId: '2',
                    cityId: '0',
                    throwWay: 3,  //按天
                    strTotalNum: '0',
                    rate: '0.5',
                    limitCount: '1',
                    acceptPrizeWay: 1  //系统下发
                  }
                ]
              }
            ]
          }
        };*/

      //ww
      //1.把实义化转成数字化
      let retData0 = _this.reChFormStrct_actAward(_this.retData2);
      //2.转成接口所需格式
      let data1 = _this.chApiStrct_addActAward(retData0);
      //3.ajax
      _this.ajaxAddActAdward({
        awardList: data1
      });
    },

    //弹出增加奖品弹框
    popAddDialog() {
      this.ajaxGetAdwardPool({
        activityId: this.actId
      });
      //显示弹框
      this.dialogVisible = true;
    },

    //数据解析
    change_grade(val) {
      let ret;

      switch (val) {
        case "1":
          ret = "一等奖";
          break;
        case "2":
          ret = "二等奖";
          break;
        case "3":
          ret = "三等奖";
          break;
        case "4":
          ret = "四等奖";
          break;
        case "5":
          ret = "五等奖";
          break;
        default:
          ret = "安慰奖";
          break;
      }
      return ret;
    },
    reChange_grade(val) {
      let ret;

      switch (val) {
        case "一等奖":
          ret = "1";
          break;
        case "二等奖":
          ret = "2";
          break;
        case "三等奖":
          ret = "3";
          break;
        case "四等奖":
          ret = "4";
          break;
        case "五等奖":
          ret = "5";
          break;
        default:
          ret = "6";
          break;
      }
      return ret;
    },
    change_type(val) {
      let ret;
      switch (val) {
        case "1":
          ret = "实物";
          break;
        case "2":
          ret = "码券";
      }
      return ret;
    },
    reChange_type(val) {
      let ret;
      switch (val) {
        case "实物":
          ret = "1";
          break;
        case "码券":
          ret = "2";
          break;
      }
      return ret;
    },
    change_throwWay(val) {
      let ret;
      switch (val) {
        case 1:
          ret = "按小时";
          break;
        case 2:
          ret = "全量";
          break;
        case 3:
          ret = "按天";
          break;
      }
      return ret;
    },
    reChange_throwWay(val) {
      let ret;
      switch (val) {
        case "按小时":
          ret = 1;
          break;
        case "全量":
          ret = 2;
          break;
        case "按天":
          ret = 3;
          break;
      }
      return ret;
    },
    change_acceptPrizeWay(val) {
      let ret;
      switch (val) {
        case 1:
          ret = "系统下发";
          break;
        case 2:
          ret = "用户领取";
          break;
      }
      return ret;
    },
    reChange_acceptPrizeWay(val) {
      let ret;
      switch (val) {
        case "系统下发":
          ret = 1;
          break;
        case "用户领取":
          ret = 2;
          break;
      }
      return ret;
    },

    arrDataChange(arr) {
      let _this = this;

      for (let index = 0; index < arr.length; index++) {
        let item = arr[index];
        if (item.grade != null) {
          item.grade = _this.change_grade(item.grade);
        }
        if (item.type != null) {
          item.type = _this.change_type(item.type);
        }

        for (let j = 0; j < arr[index].cityAwardList.length; j++) {
          let item2 = arr[index].cityAwardList[j];
          item2.throwWay = _this.change_throwWay(item2.throwWay);
          item2.strTotalNum = +item2.strTotalNum;
          item2.strIncNum = +item2.strIncNum;
          item2.acceptPrizeWay = _this.change_acceptPrizeWay(
            item2.acceptPrizeWay
          );
        }
      }
    },

    change_prizeType(val) {
      let ret;

      switch (val) {
        case "1":
          ret = "实物";
          break;
        case "2":
          ret = "码券";
          break;
      }
      return ret;
    },
    reChange_prizeType(val) {
      let ret;

      switch (val) {
        case "实物":
          ret = "1";
          break;
        case "码券":
          ret = "2";
          break;
      }
      return ret;
    },
    arrDataChange1(arr) {
      let _this = this;
      let ret;

      ret = _this.utils.deepcopy(arr);

      for (let index = 0; index < arr.length; index++) {
        let item = arr[index];
        ret[index].prizeType = _this.change_prizeType(item.prizeType);
        ret[index].grade = _this.change_grade(item.grade);
      }

      return ret;
    },
    arrDataReChange1(arr) {
      let _this = this;
      let ret;

      ret = _this.utils.deepcopy(arr);

      for (let index = 0; index < arr.length; index++) {
        let item = arr[index];
        ret[index].type = _this.reChange_prizeType(item.type);
      }

      return ret;
    },

    //转接口格式
    chApiStrct_city(arr) {
      let aRet = [];

      for (var i = 0; i < arr.length; i++) {
        let item = {
          provName: arr[i].provName,
          cityName: arr[i].cityName,
          provId: arr[i].provId,
          cityId: arr[i].cityId,
          throwWay: 2,
          strTotalNum: "0",
          strCurNum: "0",
          strIncNum: "23.81",
          strFreeNum: "500",
          strAwardNum: "0",
          strDrawNum: "0",
          rate: "0.5",
          limitCount: "1",
          acceptPrizeWay: 1
        };

        aRet.push(item);
      }

      return aRet;
    },
    chFormStrct_actAward(arr) {
      let _this = this;
      let ret = this.utils.deepcopy(arr);

      for (let index = 0; index < ret.length; index++) {
        let item = ret[index];
        item.grade = _this.change_grade(item.grade);
        item.type = _this.change_type(item.type);

        for (let j = 0; j < item.cityAwardList.length; j++) {
          let item2 = item.cityAwardList[j];
          item2.throwWay = _this.change_throwWay(item2.throwWay);
          item2.strTotalNum = +item2.strTotalNum;
          item2.strIncNum = +item2.strIncNum;
          item2.acceptPrizeWay = _this.change_acceptPrizeWay(
            item2.acceptPrizeWay
          );
        }
      }

      return ret;
    },
    reChFormStrct_actAward(arr) {
      let _this = this;
      let ret = this.utils.deepcopy(arr);

      for (let index = 0; index < ret.length; index++) {
        let item = ret[index];
        item.grade = _this.reChange_grade(item.grade);
        item.type = _this.reChange_type(item.type);

        for (let j = 0; j < item.cityAwardList.length; j++) {
          let item2 = item.cityAwardList[j];
          item2.throwWay = _this.reChange_throwWay(item2.throwWay);
          item2.strTotalNum = item2.strTotalNum + "";
          item2.strIncNum = item2.strIncNum + "";
          item2.acceptPrizeWay = _this.reChange_acceptPrizeWay(
            item2.acceptPrizeWay
          );
        }
      }

      return ret;
    },
    chApiStrct_addActAward(arr) {
      let _this = this;
      let ret = _this.utils.deepcopy(arr);

      for (let index = 0; index < ret.length; index++) {
        let item = ret[index];
        item["activityId"] = _this.actId;
        delete item.count;
        for (let j = 0; j < item.cityAwardList.length; j++) {
          let item2 = item.cityAwardList[j];
          delete item2.strAwardNum;
          delete item2.strCurNum;
          delete item2.strDrawNum;
          delete item2.strFreeNum;
          delete item2.strIncNum;
        }
      }

      return ret;
    }
  },

  created() {
    let _this = this;

    //当前为第几页
    _this.$store.commit("SETSTEP", 2);

    //get param: actId,actType,actStatus,createWay
    let params = _this.$route.params;

    for (let key in params) {
      if (key != null) {
        _this[key] = params[key];
      }
    }

    /*---根据param展示页面元素*/
    //省市or自定义
    if (_this.createWay == "2") {
      _this.vShow_cityName = false;
    }
    //新建or编辑=2
    if (
      _this.actId != null &&
      _this.actId.trim() != "" &&
      _this.actType == "2"
    ) {
      _this.ajaxGetActAdwardList({
        activityId: _this.actId /*'2016090104'*/
      });
    }

    //从vuex获取活动省市数据
    if (_this.createWay == "2") {
      _this.aPlaceInfo = [
        {
          provName: "",
          provId: "0",
          cityName: "",
          cityId: "0"
        }
      ];
    } else {
      _this.aPlaceInfo = _this.aActPlace;
    }

    //省市变成接口格式
    _this.cityAwardList = _this.chApiStrct_city(_this.aPlaceInfo);
  },

  watch: {
    $route: function(to, from) {}
  }
};
</script>

<style scoped>
.step2 .but-group,
.step2 .add-btn {
  margin: 20px 0;
}
.step {
  margin-bottom: 30px;
}

.step1 .demo-ruleForm .el-form-item {
  margin-bottom: 25px;
  margin-right: 50px;
}

.step1 .el-form-item.is-required .el-form-item__label:after {
  content: "*";
  color: #ff4949;
  margin-right: 4px;
}

.step1 .el-form-item.is-required .el-form-item__label:before {
  display: none;
}

/* 标签 */
.step1 .el-tag {
  padding: 10px 15px;
  margin: 10px;
  vertical-align: middle;
  height: auto;
}

.step1 .el-tag:first-child {
  margin-left: 0;
}

/* 对话框 */
.step1 .el-dialog--small {
  width: 564px;
}

.step1 .el-dialog__body {
  padding-bottom: 0;
}

.step1 .el-dialog__body .el-form-item {
  margin-bottom: 10px;
}

.step1 .el-dialog__wrapper .el-button {
  margin-left: 15px;
}

/* 时间选择器 */
.step1 .el-date-editor {
  width: 150px;
}

.step1 .el-form-item .router-link {
  color: #fff;
}

.el-form-item__error {
  white-space: nowrap;
}
</style>

<style scoped>
p {
  margin-top: 0;
}

.my-scrollbar {
  width: 100%;
  min-width: 100px;
  max-height: 800px;
  margin: 0;
}

.scroll-me {
  background: #eee;
  min-width: 100px;
}

.kolom {
  background: #2196f3;
  width: 150px;
  height: 150px;
  float: left;
  display: inline-block;
  margin: 15px;
}

.clearfix {
  clear: both;
}

.vue-scrollbar-transition,
.vue-scrollbar__scrollbar-vertical,
.vue-scrollbar__scrollbar-horizontal {
  transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
}

.vue-scrollbar-transition--scrollbar {
  transition: opacity 0.5s linear;
  -moz-transition: opacity 0.5s linear;
  -webkit-transition: opacity 0.5s linear;
  -o-transition: opacity 0.5s linear;
}

.vue-scrollbar__wrapper {
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  background: white;
}

.vue-scrollbar__wrapper:hover .vue-scrollbar__scrollbar-vertical,
.vue-scrollbar__wrapper:hover .vue-scrollbar__scrollbar-horizontal {
  opacity: 1;
}

.vue-scrollbar__scrollbar-vertical,
.vue-scrollbar__scrollbar-horizontal {
  opacity: 0.5;
  position: absolute;
  background: transparent;
}

.vue-scrollbar__scrollbar-vertical:hover,
.vue-scrollbar__scrollbar-horizontal:hover {
  background: rgba(0, 0, 0, 0.3);
}

.vue-scrollbar__scrollbar-vertical .scrollbar,
.vue-scrollbar__scrollbar-horizontal .scrollbar {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  cursor: default;
}

.vue-scrollbar__scrollbar-vertical {
  width: 10px;
  height: 100%;
  top: 0;
  right: 0;
}

.vue-scrollbar__scrollbar-vertical .scrollbar {
  width: 10px;
}

.vue-scrollbar__scrollbar-horizontal {
  height: 10px;
  width: 100%;
  bottom: 0;
  right: 0;
}

.vue-scrollbar__scrollbar-horizontal .scrollbar {
  height: 10px;
}
</style>

<!--表格-->
<style scoped lang="scss" rel="stylesheet/scss">
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
</style>
