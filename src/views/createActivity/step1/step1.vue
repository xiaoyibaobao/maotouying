<template>
  <div class="step1">
    <!-- element表单组件 -->
    <el-form :model="step1Form" class="demo-step1Form" :rules="rules" ref="step1Form" label-position="top">
      <!-- 表单项，prop属性表示要进行表单验证，验证规则对应为rules的属性name -->
      <el-form-item label="活动名称：">
        <!-- <el-input  auto-complete="off"  v-model="step1Form.name" size="large" clearable></el-input> -->
        <input autocomplete="off" v-model="step1Form.name" v-on:blur="handleBlur" :class="[errMessage?'error':'','activity-name']">
        <div class="el-form-item__error">{{errMessage}}</div>
      </el-form-item>

      <el-form-item label="活动时间：" required style="width: 750px;">

        <el-col :span="5">
          <!-- 时间选择器，表单验证时也有点坑，报错异常，建议不用element自带表单验证，自己写验证规则 -->
          <el-form-item prop="startTime">

            <el-date-picker v-if="actStatus == '2' || actStatus == '1'" v-model="step1Form.startTime" disabled type="date" placeholder="活动开始日期" :picker-options="pickerOptions0">
            </el-date-picker>
            <el-date-picker v-else v-model="step1Form.startTime" type="date" placeholder="活动开始日期" :picker-options="pickerOptions0">
            </el-date-picker>

          </el-form-item>
        </el-col>

        <el-col :span="1" style="text-align: center;">至</el-col>

        <el-col :span="5">
          <el-form-item prop="endTime">

            <el-date-picker v-model="step1Form.endTime" type="date" placeholder="活动结束日期" :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
        </el-col>

      </el-form-item>

      <!--签到方式-->
      <el-form-item label="目标用户：" required prop="createWay">
        <el-row>
          <el-col :span="19" style="width: 633px;">

            <el-radio-group v-if="actType == '2'" v-model="step1Form.createWay" disabled="">
              <el-radio label="1">按省市</el-radio>
              <el-radio label="2">自定义</el-radio>
            </el-radio-group>

            <el-radio-group v-else v-model="step1Form.createWay">
              <el-radio label="1">按省市</el-radio>
              <el-radio label="2">自定义</el-radio>
            </el-radio-group>

          </el-col>
        </el-row>
      </el-form-item>
      <!--选择省市-->
      <transition name="list">
        <el-form-item label="" prop="" class="setSign" v-show="step1Form.createWay == '1'">
          <el-row :gutter="20" v-for="(item,index) in step1Form.cityList">
            <el-col>
              <!--省-->
              <el-select v-model="item.provName" :disabled="item.vDisabled" placeholder="请选择省" @change="provChange(index,item.provName,item.provData)">
                <el-option v-for="(i,index) in item.provData" :key="i.provId" :value="i.provName">
                </el-option>
              </el-select>
              <!--市-->
              <el-select v-model="item.cityName" :disabled="item.vDisabled" v-show="item.provId!='0'" @change="cityChange(index,item.cityName,item.cityData)">
                <el-option v-for="is in item.cityData" :key="is.cityId" :value="is.cityName">
                </el-option>
              </el-select>
              <!--运营商-->

              <el-checkbox-group v-model="item.userType">
                <el-checkbox label="1" :disabled="item.vDisabled">移动</el-checkbox>
                <el-checkbox label="2" :disabled="true">联通</el-checkbox>
                <el-checkbox label="3" :disabled="true">电信</el-checkbox>
                <!-- <el-checkbox label="2" :disabled="item.vDisabled">联通</el-checkbox>
                <el-checkbox label="3" :disabled="item.vDisabled">电信</el-checkbox> -->

              </el-checkbox-group>
              <!--删除-->
              <el-button class="el-icon-remove" v-show="item.vShowDel" icon="delete" @click.native.prevent="delItem(index)" title="删除"></el-button>
              <!--添加-->
              <el-button class="el-icon-circle-plus" v-show="item.vShowAdd" @click.native.prevent="addItem(index,item)" title="添加"></el-button>
            </el-col>
          </el-row>
          <el-row>
          </el-row>
        </el-form-item>
      </transition>
      <transition name="list">
        <v-upload :uploadContStyle="'margin-top: 0px;'" :uploadDemoStyle="'padding-left: 0px;'" @handleFileUrl="getFileUrl" :exampleFileUrl="exampleFileUrl" v-show="step1Form.createWay == '2'"></v-upload>
      </transition>
      <!--下一步-->
      <el-form-item style="margin-top:20px;">
        <el-button type="primary" @click="submitForm('step1Form')" :disabled="actStatus==2&&new Date(this.utils.formatDate(this.step1Form.endTime, 'y-m-d', 'endTime')).getTime()<sysdate">下一步</el-button>
        <el-button v-show="vShowReset" @click="resetForm('step1Form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import addressSelect from "@/components/address/address";
import { mapState } from "vuex";
import VUpload from "../../../components/upload";
import VExport from "../../../components/export";
//示列本地路径
const exampleFileUrl1 = "/static/examples/target_user_defined_template.xlsx";
export default {
  name: "step1",
  components: {
    "address-select": addressSelect,
    VUpload,
    VExport
  },
  data: function() {
    return {
      sysdate: "", //服务器的返回时间
      errMessage: "", //活动名称错误信息提示
      strLength: "",
      markIndex: "",
      isMark: true,
      actId: "",
      actType: "1",
      actStatus: "",
      createWay: "",
      fileUrl: "", //上传地址
      test: "",
      tagsValid: false,
      tagsError: "请设置标签",
      isAddressTrue: false,
      dialogFormVisible: false,
      dialogFormFenLeiVisible: false,
      dialogForm: { name: "" },
      dialogFormFenLei: { name: "" },
      ruleFormChange: false,
      ruleFormValid: false,
      exampleFileUrl: exampleFileUrl1,
      rules: {
        // name: [
        //   {required: true, message: '请输入活动名称', trigger: 'blur'},
        //   {min: 1, max: 50, message: '活动名称长度为1-50字符！', trigger: 'change'}
        // ],
        startTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],

        signType: [
          { required: true, message: "请选择目标用户", trigger: "change" }
        ]
      },
      //接口返回的数据格式
      step1ApiData: {
        activityId: "",
        name: "",
        startTime: "",
        endTime: "",
        createWay: "1",
        cityList: [
          {
            provId: "0",
            cityId: "",
            userType: ["1"],
            provName: "",
            cityName: "",
            vShowDel: false,
            vShowAdd: true,
            vDisabled: false,
            cityData: [],
            provData: []
          }
        ]
      },
      //表格格式
      step1Form: {},
      //省市的新增项(接口格式)
      cityListItem: {
        provId: "",
        cityId: "0",
        userType: ["1"],
        provName: "",
        cityName: "",
        vShowDel: false,
        vShowAdd: true,
        cityData: []
      },
      imgUrl: "",
      //ajax
      postdata_createAct: {
        head: {},
        data: {
          type: "1", //必须。1：新增， 2：修改
          name: "", //必须。
          startTime: "", //必须。
          endTime: "", //必须。
          activityId: "",
          createWay: "1", //必须。1：按省市， 2：自定义
          cityList: [
            {
              provId: "0",
              cityId: "0",
              userType: ["1"]
            }
          ],
          fileUrl: ""
        }
      },
      postdata_getProv: {
        head: {},
        data: {}
      },
      postdata_getCity: {
        head: {},
        data: {
          provId: "1"
        }
      },
      postdata_getActBaseInfo: {
        head: {},
        data: {
          activityId: "0000000016"
        }
      },
      provData: [],
      // provDataSingle: [],
      cityData: [],
      cityDataSingle: [],
      //日期
      pickerOptions0: {
        disabledDate: time => {}
      },
      pickerOptions1: {
        disabledDate: time => {
          if (this.actStatus == "2") {
            return time.getTime() < this.endTime;
          } else {
            return (
              time.getTime() <
              this.step1Form.startTime /* || time.getTime() > Date.now()*/
            );
          }
        }
      },
      startTime: "",
      endTime: "",
      vShowReset: true
    };
  },
  watch: {
    cityList: {
      handler: function(val, oldVal) {},
      deep: true
    },
    step1Form: {
      handler: function(val, oldVal) {
        this.createWay = val.createWay;
        this.strLength = this.step1Form.name.replace(
          /[\u0391-\uFFE5]/g,
          "aa"
        ).length; ////先把中文替换成两个字节的英文，在计算长度
        if (this.strLength >= 50) {
          if (this.isMark && this.strLength == 50) {
            this.markIndex = this.step1Form.name.length;
          } else if (this.isMark && this.strLength > 50) {
            this.markIndex = this.step1Form.name.length - 1;
          }
          this.isMark = false;
          this.step1Form.name = this.step1Form.name.substring(
            0,
            this.markIndex
          );
          if (this.strLength > 50) {
            this.errMessage = "活动名称长度为1-50字符！";
          }
        } else {
          this.errMessage = "";
        }

        // this.selectProvChange();
      },
      deep: true
    }
  },
  methods: {
    //活动名称输入框失去焦点时
    handleBlur() {
      if (this.step1Form.name.trim().length == 0) {
        this.errMessage = "请输入活动名称";
      } else if (this.step1Form.name.trim().length != 0) {
        this.errMessage = "";
      }
    },
    //获取文件上传成功之后的路径
    getFileUrl(fileUrl) {
      this.fileUrl = fileUrl;
    },
    handleReset: function() {
      this.$refs.step1Form.resetFields();
    },
    handleSubmit: function(ev) {},
    handleRemove: function(file, fileList) {},
    handlePreview: function(file) {},
    handleSuccess: function() {},
    handleError: function() {},
    showDialog: function() {
      if (this.step1Form.tags.length >= 5) {
        this.$message({
          message: "最多设置5个标签",
          type: "warning"
        });
      } else {
        this.dialogFormVisible = true;
        this.dialogForm = {};
      }
    },
    handleClose: function(tag) {
      var index = this.step1Form.tags.indexOf(tag);
      this.step1Form.tags.splice(index, 1);
    },
    handleCloseFenLei: function(fenLei) {
      var index = this.step1Form.fenLeis.indexOf(fenLei);
      this.step1Form.fenLeis.splice(index, 1);
    },
    handleAdd: function(tag, form, tags) {
      if (tag && tag.trim().length !== 0) {
        var isExist = false;
        tag = tag.trim();
        for (var i = 0; i < tags.length; i++) {
          if (tags[i].name == tag) {
            isExist = true;
            break;
          }
        }
        if (isExist) {
          this.$message({
            message: "该标签已存在",
            type: "warning"
          });
        } else {
          this.dialogFormVisible = false;
          this.dialogFormFenLeiVisible = false;
          tags.push({
            name: tag
          });
        }
      } else {
        this.$message({
          message: "标签不能为空",
          type: "warning"
        });
      }
    },
    openAd: function() {
      this.$message("该功能正在完善");
    },
    //下一步
    submitForm(formName) {
      let newData = [];
      let _this = this;
      let startTime = _this.step1Form.startTime;
      let endTime = _this.step1Form.endTime;
      let cityList1 = _this.step1Form.cityList;
      this.$refs[formName].validate(valid => {
        if (this.step1Form.name.trim().length == 0) {
          this.errMessage = "请输入活动名称";
          this.$message.error("请输入活动名称"); //错误提示
          return 0;
        } else if (valid) {
          this.selectProvChange();

          for (let i = 0; i < cityList1.length; i++) {
            let flag = true;
            for (let j = 0; j < newData.length; j++) {
              if (
                cityList1[i].provName == newData[j].provName &&
                cityList1[i].cityName == newData[j].cityName
              ) {
                flag = false;
              }
            }
            if (flag) {
              newData.push(cityList1[i]);
            }
          }
          _this.step1Form.cityList = newData;
          //校验
          let selectFlag = _this.step1Form.cityList.find(item => {
            return item.provName == "";
          });

          if (startTime == "Invalid Date") {
            this.$message.error("请输入开始时间");
            return 0;
          }
          if (endTime == "Invalid Date") {
            this.$message.error("请输入结束时间");
            return 0;
          }

          if (_this.actType == "1" && selectFlag) {
            this.$message.error("请输入省份");
            return 0;
          }

          //是否自定义
          let createWay = _this.step1Form.createWay;
          //创建/修改活动
          //把表格里的数据转换成接口所需的格式
          _this.step1ApiData = this.formatBack_actBaseInfoData(_this.step1Form);
          let cityList = [
            {
              provId: "0",
              cityId: "",
              userType: ["1"]
            }
          ];
          if (_this.step1ApiData.cityList != null) {
            cityList = _this.step1ApiData.cityList.map(function(val) {
              let ret = {
                provId: val.provId,
                cityId: val.cityId,
                userType: val.userType
                // userType: "1"
              };
              return ret;
            });
          }
          _this.ajaxCreateAct({
            type: _this.actType, //必须。1：新增， 2：修改
            name: _this.step1ApiData.name, //必须。
            startTime: _this.step1ApiData.startTime, //'2018/4/10',//  //必须。
            endTime: _this.step1ApiData.endTime, //'2018/4/15',  //  //必须。
            activityId: _this.actId,
            createWay: _this.step1ApiData.createWay, //必须。1：按省市， 2：自定义
            cityList: cityList,
            fileUrl: _this.fileUrl
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();

      this.step1Form.name = "";
      this.step1Form.startTime = "";
      this.step1Form.endtTime = "";
      this.step1Form.cityList.splice(1, -1);
    },
    //ajax
    ajaxCreateAct(obj) {
      var _this = this;
      if (obj != null) {
        for (var i in obj) {
          this.postdata_createAct.data[i] = obj[i];
        }
      }
      if (!this.mydata.bUseMoniData) {
        this.axios
          .post(this.api.createAct, this.postdata_createAct)
          .then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == "0") {
              //vuex省市数据
              if (_this.step1Form.cityList != null) {
                let aActPlace = _this.step1Form.cityList.map(function(
                  val,
                  index
                ) {
                  let obj = {
                    provName: val.provName,
                    provId: val.provId,
                    cityName: val.cityName,
                    cityId: val.cityId
                  };

                  return obj;
                });

                _this.$store.commit("SetPlaceInfo", aActPlace);
              }
              //获取活动ID
              if (data.activityId != null) {
                _this.actId = data.activityId;
                _this.$store.commit("SetActId", _this.actId);
              }
              //下一步
              _this.$router.push({
                name: "step2",
                params: {
                  actId: _this.actId,
                  actType: _this.actType,
                  actStatus: _this.actStatus,
                  createWay: _this.createWay
                }
              });
            }
          })
          .catch(res => {
            this.$message.error("网络异常，ajaxCreateAct !");
          });
      } else {
        let res = this.mydata.creatAct;
        let code = res.head.respCode;
        let data = res.data;
        if (code == "0") {
          //vuex省市数据
          let aActPlace = _this.step1Form.cityList.map(function(val, index) {
            let obj = {
              provName: val.provName,
              provId: val.provId,
              cityName: val.cityName,
              cityId: val.cityId
            };
            return obj;
          });
          _this.$store.commit("SetPlaceInfo", aActPlace);
          //获取活动ID
          if (data.activityId != null) {
            _this.actId = data.activityId;
            _this.$store.commit("SetActId", _this.actId);
          }
          //下一步
          _this.$router.push({
            name: "step2",
            params: {
              actId: _this.actId,
              actType: _this.actType,
              actStatus: _this.actStatus,
              createWay: _this.createWay
            }
          });
        }
      }
    },
    ajaxGetProv(index) {
      let _this = this;

      if (!this.mydata.bUseMoniData) {
        this.axios
          .post(this.api.getProv, this.postdata_getProv)
          .then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == "0") {
              _this.provData = data.provList;
              _this.$set(
                _this.step1Form.cityList[0],
                "provData",
                data.provList
              );

              if (
                _this.actType == "2" &&
                _this.actId != null &&
                _this.actId.trim() != ""
              ) {
                _this.ajaxGetActBaseInfo({
                  activityId: _this.actId
                });
                _this.vShowReset = false;
              }
              // _this.provDataSingle = _this.provData.map(function(value, index, array){
              //   return value.provName;
              // })
            }
          })
          .catch(res => {
            this.$message.error("网络异常，省份数据获取失败 !");
          });
      } else {
        let res = this.mydata.prov;
        let code = res.head.respCode;
        let data = res.data;
        if (code == "0") {
          _this.provData = data.provList;
          // _this.provDataSingle = _this.provData.map(function(value, index, array){
          //   return value.provName;
          // })
        }
      }
    },
    ajaxGetCity(obj, index) {
      let _this = this;

      if (obj != null) {
        for (var i in obj) {
          _this.postdata_getCity.data[i] = obj[i];
        }
      }
      if (!_this.mydata.bUseMoniData) {
        _this.axios
          .post(_this.api.getCity, _this.postdata_getCity)
          .then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == "0") {
              if (_this.postdata_getCity.data.provId) {
                let provinceId = res.data.data.cityList[0].provinceId;
                data.cityList.unshift({
                  cityId: "0",
                  cityName: "全省",
                  provinceId: provinceId
                });
              }
              data.cityList = data.cityList.reduce((item, next) => {
                obj[next.cityId]
                  ? ""
                  : (obj[next.cityId] = true && item.push(next));
                return item;
              }, []); //去重
              console.log(_this.step1Form.cityList);
              _this.$set(
                _this.step1Form.cityList[index],
                "cityData",
                data.cityList
              );
            }
          })
          .catch(res => {
            _this.$message.error("网络异常，城市数据获取失败 !");
          });
      } else {
        let res = _this.mydata.city_gd;
        let code = res.head.respCode;
        let data = res.data;
        if (code == "0") {
          _this.step1Form.cityList[index].cityData = data.cityList;
        }
      }
    },
    ajaxGetActBaseInfo(obj) {
      let _this = this;
      if (obj != null) {
        for (var i in obj) {
          this.postdata_getActBaseInfo.data[i] = obj[i];
        }
      }
      if (!this.mydata.bUseMoniData) {
        this.axios
          .post(_this.api.getActBaseInfo, _this.postdata_getActBaseInfo)
          .then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == "0") {
              _this.step1ApiData = data;
              if (_this.step1ApiData.cityList != null) {
                let len = _this.step1ApiData.cityList.length;
                if (len == 0) {
                  _this.step1ApiData.cityList.push(_this.cityListItem);
                }
                for (let i = 0; i < len; i++) {
                  _this.step1ApiData.cityList[i].vDisabled = true;
                  if (i == 0) {
                    if (_this.step1ApiData.cityList[i].provName == "全国") {
                      _this.step1ApiData.cityList[i].vShowAdd = false;
                      _this.step1ApiData.cityList[i].vShowDel = false;
                    } else {
                      _this.step1ApiData.cityList[i].vShowAdd = true;
                      _this.step1ApiData.cityList[i].vShowDel = false;
                    }
                  } else if (i == 5) {
                    _this.step1ApiData.cityList[i].vShowAdd = false;
                    if (_this.actType == 2) {
                      _this.step1ApiData.cityList[i].vShowDel = false;
                    } else {
                      _this.step1ApiData.cityList[i].vShowDel = true;
                    }
                  } else {
                    _this.step1ApiData.cityList[i].vShowAdd = true;
                    if (_this.actType == 2) {
                      _this.step1ApiData.cityList[i].vShowDel = false;
                    } else {
                      _this.step1ApiData.cityList[i].vShowDel = true;
                    }
                  }
                }
              }
              _this.step1Form = _this.format_actBaseInfoData(
                _this.step1ApiData
              );
              _this.startTime = _this.step1Form.startTime;
              _this.endTime = _this.step1Form.endTime;
              _this.sysdate = _this.step1ApiData.sysdate;
              /**
               *2018-06-04
               */
              if (data.cityList.length > 0) {
                let temp = [];
                //删除全国
                let index= this.provData.findIndex((val,i)=>{
                  return val.provName=="全国";
                });
                this.provData.splice(index,1);
                data.cityList.map(item => {
                  if (item.cityName == "全省") {
                    temp.push(item.provName);
                  }

                  item.provData = [];
                });




                data.cityList.map((val, i) => {
                  if (temp.includes(val.provName) && val.cityName == "全省") {
                    let newTemp = temp.filter(_item => {
                      return _item != val.provName;
                    });
                    this.$set(
                      this.step1Form.cityList[i],
                      "provData",
                      this.provData.filter(item => {
                        return !newTemp.includes(item.provName);
                      })
                    );
                  } else if (
                    temp.includes(val.provName) &&
                    val.cityName != "全省"
                  ) {
                    this.$set(this.step1Form.cityList[i], "cityData", []);
                    this.$set(
                      this.step1Form.cityList[i],
                      "provData",
                      this.provData.filter(item => {
                        return !temp.includes(item.provName);
                      })
                    );
                  } else {
                    this.$set(
                      this.step1Form.cityList[i],
                      "provData",
                      this.provData.filter(item => {
                        return !temp.includes(item.provName);
                      })
                    );
                  }
                });
              }
            }
          })
          .catch(res => {
            this.$message.error("网络异常，ajaxGetActBaseInfo !");
          });
      } else {
        let res = this.mydata.actBaseInfo_0000000007;
        let code = res.head.respCode;
        let data = res.data;
        if (code == "0") {
          _this.step1ApiData = data;
          let len = _this.step1ApiData.cityList.length;
          if (len == 0) {
            _this.step1ApiData.cityList.push(_this.cityListItem);
          }
          for (let i = 0; i < len; i++) {
            _this.step1ApiData.cityList[i].vShowAdd = true;
            _this.step1ApiData.cityList[i].vShowDel = true;
          }
          _this.step1Form = _this.format_actBaseInfoData(_this.step1ApiData);
        }
      }
    },
    //选择省市
    provChange(index, val, provData) {
      let len = this.step1Form.cityList.length;
      let _this = this;
      if (val == "全国") {
        this.$set(this.step1Form.cityList[index], "vShowAdd", false);
        this.$set(this.step1Form.cityList[index], "vShowDel", false);
      } else if (len < 5) {
        this.$set(this.step1Form.cityList[index], "vShowAdd", true);
      }

      let getIndex = function() {
        // index = _this.provDataSingle.indexOf(val);
        let index = provData.findIndex(item => {
          return item.provName == val;
        });
        return index;
      };
      let i = getIndex();
      let id = provData[i].provinceId;

      this.step1Form.cityList[index]["provId"] = id + "";
      
      this.step1Form.cityList[index]["cityName"] = "全省";
      this.step1Form.cityList[index]["cityId"] = "0";
      if (val == "全国") {
        let temp = this.step1Form.cityList.find(item => {
          if (item.cityId == 0 && item.provId == 0 && item.provName == "全国") {
            return item;
          }
        });
        this.step1Form.cityList = [temp];
        this.$set(this.step1Form.cityList[0], "provData", this.provData);
        index = 0;
      }
      this.ajaxGetCity(
        {
          provId: id
        },
        index
      );

      //  this.selectProvChange();
    },
    cityChange(index, val, cityData) {
      let _this = this;
      let cityDataSingle = cityData.map(function(val) {
        return val.cityName;
      });
      let getIndex = function(val) {
        let index;
        index = cityDataSingle.indexOf(val);
        return index;
      };
      let i = getIndex(val);
      let id = this.step1Form.cityList[index].cityData[i].cityId;
      this.step1Form.cityList[index]["cityId"] = id + "";
      this.selectProvChange();
    },
    userChange(index, val) {
      this.step1Form.cityList[index]["userType"] = val;
    },
    addItem(index, item) {
      this.step1Form.cityList.map(function(x) {
        x.vShowAdd = false;
      });
      let len = this.step1Form.cityList.length;
      if (len < 5) {
        let vShowAdd = true;
        if (len == 4) {
          vShowAdd = false;
        }
        // this.provData.map((item,i)=>{
        //    this.step1Form.cityList.map((_item,_i)=>{
        //      if(item.provName==_item.provName){
        //        this.provData.splice(i, 1);//删除索引为i的元素
        //      }
        //    })
        // })
        // this.provData.filter(item => { return !b.includes(item.id); });
        //添加省市列表的一项数据(表格格式)
        this.step1Form.cityList.push({
          provId: "",
          cityId: "0",
          userType: ["1"],
          provName: "",
          cityName: "",
          vShowDel: true,
          vShowAdd: vShowAdd,
          cityData: [],
          provData: this.getSelectProv(index, item)
        });
      }
    },
    delItem(index) {
      this.step1Form.cityList.splice(index, 1);

      let length = this.step1Form.cityList.length;
      if (length < 5) {
        this.step1Form.cityList[length - 1].vShowAdd = true;
      }

      this.selectProvChange();
    },

    //格式化数据: 把接口数据转换成表格显示所需的格式
    format_actBaseInfoData(originData) {
      let ret;
      //如果传进来的originData的类型是高级obj，是会改变原来的obj的，所以需要deepcopy
      ret = this.utils.deepcopy(originData);

      //规则项：
      //1.userType:字符串转成数组
      /*if(ret.cityList!=null){
          ret.cityList.map(function(val, index){

            // val.userType = +val.userType;
            // val[vShowDel] = false,
            // val[vShowAdd]=true,
            // val[cityData]=[]

            return val;
          });
        }*/

      //2.时间字符串'y-m-d h:m:s'转化成Date类型
      let formatTimeString = function(str) {
        str.replace(/-/g, "/"); //不用转成/这种格式也行
        return new Date(str);
      };
      ret.startTime = formatTimeString(ret.startTime);
      ret.endTime = formatTimeString(ret.endTime);

      return ret;
    },
    //逆格式化：把表格数据转换成接口所需的格式
    formatBack_actBaseInfoData(originData) {
      let ret;
      //如果传进来的originData的类型是高级obj，是会改变原来的obj的，所以需要deepcopy
      ret = this.utils.deepcopy(originData);

      //规则项：
      //1.userType:数字转成字符串
      // if(ret.cityList!=null){
      //   ret.cityList.map(function(val){
      //     val.userType = val.userType+'';
      //     return val
      //   });

      // }

      //2.时间Date类型转成字符串
      ret.startTime = this.utils.formatDate(ret.startTime, "y-m-d");
      ret.endTime = this.utils.formatDate(ret.endTime, "y-m-d", "endTime");

      return ret;
    },
    getSelectProv(index, item) {
      let tempArray = [];
      tempArray.push(item.provName);
      if (item.cityName == "全省") {
        return item.provData.filter(_item => {
          return !tempArray.includes(_item.provName);
        });
      } else {
        return item.provData;
      }
    },

    selectProvChange() {
      let _this = this;
      let temp = [];
      this.step1Form.cityList.map(item => {
        if (item.cityName == "全省") {
          temp.push(item.provName);
        }
      });

      this.step1Form.cityList.map((val, i) => {
        if (temp.includes(val.provName) && val.cityName == "全省") {
          let newTemp = temp.filter(_item => {
            return _item != val.provName;
          });

          this.$set(
            this.step1Form.cityList[i],
            "provData",
            this.provData.filter(item => {
              return !newTemp.includes(item.provName);
            })
          );
        } else if (temp.includes(val.provName) && val.cityName != "全省") {
          this.$set(this.step1Form.cityList[i], "provName", "");
          this.$set(this.step1Form.cityList[i], "cityName", "");
          this.$set(this.step1Form.cityList[i], "cityData", []);
          this.$set(
            this.step1Form.cityList[i],
            "provData",
            this.provData.filter(item => {
              return !temp.includes(item.provName);
            })
          );
        } else {
          this.$set(
            this.step1Form.cityList[i],
            "provData",
            this.provData.filter(item => {
              return !temp.includes(item.provName);
            })
          );
        }

        //  if(temp.includes(val.provName,1)&&val.cityName!="全省"){
        //        console.log(2121212121)
        //       this.$set( this.step1Form.cityList[i],"provName","");
        //       this.$set( this.step1Form.cityList[i],"cityName","");
        //   }
      });
    }
  },
  created: function() {
    let _this = this;
    //进来就把当前页vuex
    _this.$store.commit("SETSTEP", 1);
    //把接口的数据step1Form0转换成表格里面所需要的格式
    _this.step1Form = _this.format_actBaseInfoData(_this.step1ApiData);
    //判断url参数
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

    //获取省份
    _this.ajaxGetProv(0);

    //其他
    setTimeout(function() {
      _this.ruleFormChange = false;
    });
  },
  beforeRouteLeave: function(to, from, next) {
    if (to.path == "/activePublic/step2") {
      var _this = this;
      this.isAddressTrue = true;
      this.tagsValid = this.step1Form.tags.length ? false : true;
      this.$refs.step1Form.validate(function(valid) {
        !_this.tagsValid && valid ? next() : next(false);
      });
    } else {
      next();
    }
  },
  computed: mapState([
    "actIdx", //活动ID
    "actTypex", //活动行为类型
    "actStatusx"
  ])
};
</script>

<style scoped>
.step1 .demo-step1Form .el-checkbox-group {
  display: inline-block;
  margin-left: 6px;
}
.step {
  margin-bottom: 30px;
}

.step1 .demo-step1Form .el-form-item {
  margin-bottom: 20px;
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

.upload-cont {
  margin-top: 0 !important;
}

.upload-cont .upload-demo {
  padding-left: 0 !important;
}
input.activity-name {
  width: 100%;
  height: 40px;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  line-height: 40px;
  font-size: 14px;
  padding: 0 15px;
}
input.activity-name:focus {
  border-color: #409eff;
  outline: 0;
}
input.error {
  border-color: #f56c6c;
  outline: 0;
}
</style>
