<template>

  <div class="tab tab1">
    <el-form :model="ruleForm" class="demo-ruleForm" :rules="rules" ref="ruleForm" label-position="top">

      <!--step1:-->
      <div class="step1">
        <!-- element表单组件 -->
        <el-form :model="step1Form" class="demo-step1Form" :rules="rules" ref="step1Form" label-position="top">
          <!-- 表单项，prop属性表示要进行表单验证，验证规则对应为rules的属性name -->
          <el-form-item label="活动名称：" prop="name">
            <el-input  auto-complete="off" v-model="step1Form.name" size="large" disabled=""></el-input>
          </el-form-item>

          <el-form-item label="活动时间：" required style="width: 750px;">

            <el-col :span="5">
              <!-- 时间选择器，表单验证时也有点坑，报错异常，建议不用element自带表单验证，自己写验证规则 -->
              <el-form-item prop="startTime">

                <el-date-picker v-model="step1Form.startTime" disabled
                                type="date"
                                placeholder="活动开始日期"
                                :picker-options="pickerOptions0">
                </el-date-picker>

              </el-form-item>
            </el-col>

            <el-col :span="1" style="text-align: center;">至</el-col>

            <el-col :span="5">
              <el-form-item prop="endTime">

                <el-date-picker disabled
                                v-model="step1Form.endTime"
                                type="date"
                                placeholder="活动结束日期"
                                :picker-options="pickerOptions1">
                </el-date-picker>
              </el-form-item>
            </el-col>

          </el-form-item>

          <!--签到方式-->
          <el-form-item label="目标用户：" required prop="createWay">
            <el-row>
              <el-col :span="19" style="width: 633px;">

                <el-radio-group v-model="step1Form.createWay" disabled="">
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
                  <el-select v-model="item.provName" placeholder="请输入省"
                             @change="provChange(index,item.provName,provData)" disabled>
                    <el-option
                      v-for="(i,index) in provData"
                      :key="i.provId"
                      :value="i.provName">
                    </el-option>
                  </el-select>
                  <!--市-->
                  <el-select v-model="item.cityName" placeholder="请输入市" disabled
                             @change="cityChange(index,item.cityName,item.cityData)">
                    <el-option
                      v-for="i in item.cityData"
                      :key="i.cityId"
                      :value="i.cityName">
                    </el-option>
                  </el-select>
                  <!--运营商-->
                  <!--<el-checkbox class="checkbox" v-model="item.userType" @change="userChange(index,item.userType)">移动用户</el-checkbox>-->
                  <el-radio-group v-model="item.userType" disabled>
                    <el-radio label="1">移动</el-radio>
                    <el-radio label="2">联通</el-radio>
                    <el-radio label="3">电信</el-radio>
                  </el-radio-group>

                </el-col>

              </el-row>

              <el-row>

              </el-row>
            </el-form-item>
          </transition>

          <!--自定义-->
          <!--<transition name="list">
            <el-form-item label="" v-show="step1Form.createWay == '2'">
              <el-upload action="http://jsonplaceholder.typicode.com/" type="drag" :multiple="true"
                         :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess"
                         :on-error="handleError">
                &lt;!&ndash;<i class="el-icon-upload"></i>&ndash;&gt;
                <el-button size="small" type="primary">点击上传</el-button>
                <div class="el-upload__tip" slot="tip">支持扩展名：.xlsx .xls .csv</div>
              </el-upload>
              <i class="">示例</i>
            </el-form-item>
          </transition>-->
          <transition name="list">
            <!--<a @click="downloadUserFile" class="down-file" v-show="step1Form.createWay == '2'">自定义用户</a>-->
            <v-export :downFileParms="downFileParms" :fileName="'自定义用户导出'" :fileType="'zip'" :type="'2'"
                      v-show="step1Form.createWay == '2'">
            </v-export>
          </transition>

        </el-form>

        <!-- 设置活动分类 -->
        <!--<el-dialog title="设置活动分类" v-model="dialogFormFenLeiVisible">
          <el-form :model="dialogFormFenLei">
            <el-form-item>
              <el-tag
                v-for="feiLei of step1Form.fenLeis"
                :closable="true"
                type="primary"
                @close="handleCloseFenLei(feiLei)"
              >
                {{ feiLei.name }}
              </el-tag>
            </el-form-item>
            <el-form-item>
              <el-input  auto-complete="off" v-model="dialogFormFenLei.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click.native="dialogFormFenLeiVisible = false">取 消</el-button>
              <el-button type="primary" @click.native="handleAdd(dialogFormFenLei.name,dialogFormFenLei,step1Form)">添加</el-button>
            </span>
        </el-dialog>-->
      </div>


      <!--step2:活动奖品列表-->
      <div class="step2">
        <vue-scrollbar classes="my-scrollbar" ref="Scrollbar" style="margin:0;">
          <div class="scroll-me">

            <!--活动奖品列表-->
            <el-card class="box-card">
              <el-table :data="retData2">
                <el-table-column property="grade" label="奖项等级" :width="110">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.grade" @change="gradeChange" disabled>
                      <el-option
                        v-for="item in activityAwardListForm.awardLevel.list"
                        :key="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column property="typeId" label="奖项ID" :width="60"></el-table-column>
                <el-table-column property="name" label="奖品名称" :width="90"></el-table-column>
                <el-table-column property="type" label="类型" :width="90"></el-table-column>
                <el-table-column property="count" label="奖品池库存" :width="70"></el-table-column>

                <el-table-column property="cityAwardList" :width="660">
                  <template slot-scope="scope">

                    <el-table :data="scope.row.cityAwardList" :fit="true">

                      <el-table-column property="cityName" label="投放地市" :width="100">
                        <template slot-scope="scope">
                          <p>{{scope.row.provName +'|'+ scope.row.cityName}}</p>
                        </template>
                      </el-table-column>
                      <el-table-column property="strTotalNum" label="投放总数量" :width="90">
                        <template slot-scope="scope">
                          <el-input  auto-complete="off" v-model="scope.row.strTotalNum" disabled></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column property="throwWay" label="投放方式" :width="100">
                        <template slot-scope="scope">
                          <el-select v-model="scope.row.throwWay" @change="gradeChange" disabled>
                            <el-option
                              v-for="item in activityAwardListForm.awardLevel.throwWay"
                              :key="item"
                              :value="item">
                            </el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column property="strIncNum" label="每阶段投放量" :width="90"></el-table-column>
                      <el-table-column property="rate" label="中奖率" :width="80">
                        <template slot-scope="scope">
                          <el-input  auto-complete="off" v-model="scope.row.rate" disabled></el-input>
                          
                        </template>
                      </el-table-column>
                      <el-table-column property="limitCount" label="中奖限制" :width="60">
                        <template slot-scope="scope">
                          <el-input  auto-complete="off" v-model="scope.row.limitCount" disabled></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column property="acceptPrizeWay" label="发放方式" :width="130">
                        <template slot-scope="scope">
                          <el-select v-model="scope.row.acceptPrizeWay" @change="gradeChange" disabled>
                            <el-option
                              v-for="item in activityAwardListForm.awardLevel.acceptPrizeWay"
                              :key="item"
                              :value="item">
                            </el-option>
                          </el-select>
                        </template>
                      </el-table-column>

                    </el-table>

                  </template>
                </el-table-column>

              </el-table>
            </el-card>

            <div class="clearfix"></div>
          </div>
        </vue-scrollbar>
      </div>


      <!--stpe3:活动规则列表-->
      <el-card class="box-card">

        <el-table :data="ruleListData" style="width: 100%">
          <el-table-column property="descs" label="规则名称" :width="200"></el-table-column>

          <el-table-column property="paraList" :width="1500">
            <template slot-scope="scope">

              <el-table :data="scope.row.paraList">

                <el-table-column property="nameDesc" label="配置项" :width="150"></el-table-column>
                <el-table-column property="paraValue" label="配置值" :width="180">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row.paraDesc.indexOf('按')<0" autocomplete="off" v-model="scope.row.paraValue" disabled></el-input>
                    <el-select v-else class="selects" v-model="scope.row.paraValue" disabled>
                      <el-option v-for="item in scope.row.ns"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column property="paraDesc" label="配置描述" :width="200">
                  <template slot-scope="scope">

                    <p v-if="scope.row.paraDesc.indexOf('按')<0" autocomplete="off" v-model="scope.row.paraDesc"
                       >{{scope.row.paraDesc}}</p>
                    <p v-else></p>
                  </template>
                </el-table-column>


              </el-table>

            </template>
          </el-table-column>

          <!--        <el-table-column property="ruleName" label="ruleName" :width="100">   </el-table-column>
                  <el-table-column property="ruleName" label="ruleName" :width="100">   </el-table-column>
                  <el-table-column property="paraList[0].nameDesc" label="配置项" :width="100"></el-table-column>
                  <el-table-column property="paraList[0].paraValue" label="配置值" :width="200">
                    <template slot-scope="scope">
                      <el-input  auto-complete="off" :placeholder="scope.row.paraList[0].paraValue"></el-input>
                      <el-select v-model="ruleListForm.paraValue.type[scope.row.paraList[0].type]" @change="proChange">
                        <el-option
                          v-for="item in ruleListForm.paraValue.type"
                          :key="item"
                          :value="item">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column property="paraList[0].paraDesc" label="配置描述" :width="100"></el-table-column>-->
        </el-table>

      </el-card>

    </el-form>
  </div>

</template>

<script>
  import VueScrollbar from 'vue2-scrollbar';
  import VExport from "@/components/export";

  export default {
    name: "tab1",
    components: {
      VueScrollbar,
      VExport
    },
    data: function () {
      return {
        actId: '',
        ruleForm: {},
        rules: {},
        stockOptions: [],
        value: "",
        //step1:活动信息
        step1Form: {
          activityId: '',
          name: '',
          startTime: '',
          endTime: '',
          createWay: '1',
          cityList: [
            {
              provId: "",
              cityId: "",
              userType: "1",
              provName: '',
              cityName: '',
              vShowDel: false,
              vShowAdd: true,
              cityData: []
            }
          ]
        },
        postdata_getActBaseInfo: {
          head: {},
          data: {
            activityId: ''
          }
        },
        provData: [],

        //step2:活动奖品列表
        activityAwardListForm: {
          awardLevel: {
            model: '',
            list: ['一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '安慰奖']
          },
          input: {
            model: ''
          }
        },
        activityAwardListData: {
          "head": {
            "respCode": "0",
            "respDesc": "success"
          },
          "data": {
            "awardList": [
              {
                "typeId": "2",
                "grade": "4",
                "name": "智能电饭煲",
                "type": "1",
                "count": 990,
                "cityAwardList": [
                  {
                    "provName": "四川",
                    "cityName": "成都市",
                    "provId": "26",
                    "cityId": "383",
                    "throwWay": 1,
                    "strTotalNum": "2000.00000",
                    "strCurNum": "1000.00000",
                    "strIncNum": "300.00000",
                    "strFreeNum": "1000.00000",
                    "strAwardNum": "0.00000",
                    "strDrawNum": "0.00000",
                    "rate": "0.4",
                    "limitCount": "1",
                    "acceptPrizeWay": 1
                  },
                  {
                    "provName": "四川",
                    "cityName": "德阳市",
                    "provId": "26",
                    "cityId": "384",
                    "throwWay": 1,
                    "strTotalNum": "1500.00000",
                    "strCurNum": "1000.00000",
                    "strIncNum": "500.00000",
                    "strFreeNum": "1000.00000",
                    "strAwardNum": "0.00000",
                    "strDrawNum": "0.00000",
                    "rate": "0.2",
                    "limitCount": "1",
                    "acceptPrizeWay": 1
                  },
                  {
                    "provName": "四川",
                    "cityName": "广汉市",
                    "provId": "26",
                    "cityId": "385",
                    "throwWay": 1,
                    "strTotalNum": "1500.00000",
                    "strCurNum": "500.00000",
                    "strIncNum": "20.00000",
                    "strFreeNum": "500.00000",
                    "strAwardNum": "0.00000",
                    "strDrawNum": "0.00000",
                    "rate": "0.1",
                    "limitCount": "1",
                    "acceptPrizeWay": 1
                  }
                ],
              }
            ]
          }
        },
        postdata_getActAdwardList: {
          head: {},
          data: {
            activityId: ''/*'0000000007'*/
          }
        },
        retData: [
          /*{
            "typeId": "1",
            "grade": "1",
            "name": "魅族耳机4",
            "type": "1",
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
              {
                "provName": "广东",
                "cityName": "佛山市",
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
              }
            ],
            "count": 5997
          },
          {
            "typeId": "2",
            "grade": "1",
            "name": "魅族耳机4",
            "type": "1",
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
              {
                "provName": "广东",
                "cityName": "佛山市",
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
              }

            ],
            "count": -1297
          }*/
        ],
        retData2: [],

        //step3
        postdata_getActRuleList: {
          head: {},
          data: {
            activityId: '2016090104',
          }
        },

        //自定义下载
        postdata_getUserFile: {
          // reqType: 1,
          // activityId: '',
          // msisdn: '',
          // startTime: '',
          // endTime: '',
          // gameCode: '',
          // status: '',
          // typeId: '',
          // gid: '',
          // awardOprType: '',
          // actName: '',
          // codeStatus: ''
        },
        downFileParms: {
          reqType: '3',
          activityId: this.actId,
          // msisdn: '',
          // startTime: '',
          // endTime: '',
          // typeId: '',
        },

        //规则列表
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
        ruleListForm: {
          awardLevel: {
            model: '',
            list: ['一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '安慰奖']
          },
          input: {
            model: ''
          },
          paraValue: {
            model: '',
            type: [
              '次/每天',
              '次/每周',
              '次/每月',
              '次/活动期间'
            ]
          }
        },
        //活动基本信息
        activityBaseInfo: {
          "head": {
            "respCode": "0",
            "respDesc": "success"
          },
          "data": {
            "name": "幸运大转盘抽奖活动",
            "activityId": "20180416",
            "startTime": "2017-02-02 00:00:00",
            "endTime": "2017-03-02 00:00:00",
            "cityList": [
              {
                "provId": "11",
                "cityId": "0",
                "userType": true
              },
              {
                "provId": "12",
                "cityId": "1",
                "userType": false
              }
            ]
          }
        },

        //文件下载
        userFile: '',
        userFileUrl: '',

      }
    },
    methods: {
      //ajax
      ajaxGetActBaseInfo(obj) {

        let _this = this;

        if (obj != null) {
          for (var i in obj) {
            this.postdata_getActBaseInfo.data[i] = obj[i];
          }
        }

        if (!this.mydata.bUseMoniData) {
          this.axios.post(this.api.getActBaseInfo, this.postdata_getActBaseInfo).then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == "0") {
              // this.utils.extend(this.step1Form, data);
              Object.assign(_this.step1Form, data);
       

              //自定义下载
              if (_this.step1Form.createWay == '2') {
                _this.ajaxGetUserFile({
                  reqType: 3,
                  activityId: _this.actId,
                  // msisdn: '',
                  // startTime: '',
                  // endTime: '',
                  // gameCode: '',
                  // status: '',
                  // typeId: '',
                  // gid: '',
                  // awardOprType: '',
                  // actName: '',
                  // codeStatus: ''
                });
              }

            }
          })
            .catch(res => {
              this.$message.error("网络异常，ajaxGetActBaseInfo !");
          
            });
        }
        else {
          let res = this.mydata.actBaseInfo_0000000007;
          let code = res.head.respCode;
          let data = res.data;
          if (code == "0") {
            // this.utils.extend(this.step1Form, data);
            Object.assign(_this.step1Form, data);
         
          }
        }

      },
      ajaxGetUserFile(obj) {

        let _this = this;

        if (obj != null) {
          for (var i in obj) {
            this.postdata_getUserFile[i] = obj[i];
          }
        }

        let sUrl = _this.urlAddParam(_this.api.export, this.postdata_getUserFile);

        if (!this.mydata.bUseMoniData) {
          this.axios.get(sUrl, this.postdata_getUserFile).then(res => {
           

            _this.userFile = res.data;

        
          })
            .catch(res => {
              this.$message.error("下载失败");
            });
        }
        else {

          setTimeout(function () {
         

            _this.userFile = res.data;

        
          }, 500)

        }

      },
      downloadUserFile() {
      
        this.utils.loadFile('用户自定义', this.userFile, 'zip');
      },
      ajaxGetActAdwardList(obj) {
        let _this = this;

        if (obj != null) {
          for (var i in obj) {
            this.postdata_getActAdwardList.data[i] = obj[i];
          }
        }

        if (!this.mydata.bUseMoniData) {
          this.axios.post(this.api.getActAdwardList, this.postdata_getActAdwardList).then(res => {
         

            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == 0) {
              _this.retData = data.awardList;
              _this.retData2 = _this.chFormStrct_actAward(_this.retData);
            }
          })
            .catch(res => {
              this.$message.error("网络异常，ajaxGetActAdwardList !");
            });

        }
        else {
          let res = this.mydata.actAdwardList;
          let code = res.head.respCode;
          let data = res.data;
          if (code == 0) {
            _this.retData = data.awardList;
            _this.retData2 = _this.chFormStrct_actAward(_this.retData);
          }
        }

      },
      ajaxGetActRuleList(obj) {
        let _this = this;



        if (obj != null) {
          for (var i in obj) {
            this.postdata_getActRuleList.data[i] = obj[i];
          }
        }

        if (!this.mydata.bUseMoniData) {
          this.axios.post(this.api.getActRuleList, this.postdata_getActRuleList).then(res => {
      

            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == 0) {
              _this.ruleListData = data.ruleList;
              for (let i = 0; i < _this.ruleListData.length; i++) {
         
                for (let k = 0; k < _this.ruleListData[i].paraList.length; k++) {
                  let str = _this.ruleListData[i].paraList[k].paraDesc;
                  if (/[0-9]/.test(str) && /按/.test(str)) {
                    let ars = str.replace(/\s/g, "").split(/[0-9]/).slice(1);
                    var sss = [];
                    ars.map(function (item, index) {
                      sss.push({"label": item, "value": (index + 1)+''})
                    });
                    _this.$set(_this.ruleListData[i].paraList[k], "ns", sss)
                  }
                }
              }
         
            }


          })
            .catch(res => {
              this.$message.error("网络异常，ajaxGetActAdwardList !");
            });

        }
        else {

          setTimeout(function(){
            let res = _this.mydata.getActRuleList_created;
            let code = res.head.respCode;
            let data = res.data;
            if (code == 0) {
              _this.ruleListData = data.ruleList;
              for (let i = 0; i < _this.ruleListData.length; i++) {
          
                for (let k = 0; k < _this.ruleListData[i].paraList.length; k++) {
                  let str = _this.ruleListData[i].paraList[k].paraDesc;
                  if (/[0-9]/.test(str) && /按/.test(str)) {
                    let ars = str.replace(/\s/g, "").split(/[0-9]/).slice(1);
                    var sss = [];
                    ars.map(function (item, index) {
                      sss.push({"label": item, "value": (index + 1)+''})
                    });
                    _this.$set(_this.ruleListData[i].paraList[k], "ns", sss)
                  }
                }
              }
       
            }
          },500);


        }

      },

      //数据解析
      //step1
      //数据解析
      change_grade(val) {

        let ret;

        switch (val) {
          case "1":
            ret = '一等奖';
            break;
          case "2":
            ret = '二等奖';
            break;
          case "3":
            ret = '三等奖';
            break;
          case "4":
            ret = '四等奖';
            break;
          case "5":
            ret = '五等奖';
            break;
          default:
            ret = '安慰奖';
            break;
        }
        return ret
      },
      change_type(val) {
        let ret;
        switch (val) {
          case "1":
            ret = '实物';
            break;
          case "2":
            ret = '码券';
        }
        return ret
      },
      change_throwWay(val) {
        let ret;
        switch (val) {
          case 1:
            ret = '按小时';
            break;
          case 2:
            ret = '全量';
            break;
          case 3:
            ret = '按天';
            break;
        }
        return ret

      },
      change_acceptPrizeWay(val) {
        let ret;
        switch (val) {
          case 1:
            ret = '系统下发';
            break;
          case 2:
            ret = '用户领取';
            break;
        }
        return ret
      },
      //step2
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
            item2.acceptPrizeWay = _this.change_acceptPrizeWay(item2.acceptPrizeWay);
          }
        }

        return ret
      },


      //url加oParams
      urlAddParam(url, oParam) {

        let index = 0,
          str = '&';

        for (var key in oParam) {

          if (index != 0) {
            str = '&'
          }
          else {
            str = '?'
          }
          url += str + key + '=' + oParam[key];
          index++;
        }
        return url

      },

      //为了复用而已
      pickerOptions0() {
      },
      pickerOptions1() {
      },
      gradeChange() {
      }

    },
    created() {

      let _this = this;

      let params = _this.$route.params;
      _this.actId = params.actId;
      _this.downFileParms.activityId = _this.actId;

      if (_this.actId != null) {
        //step1
        this.ajaxGetActBaseInfo({
          activityId: _this.actId
        });

        //step2
        this.ajaxGetActAdwardList({
          activityId: _this.actId, /*'2016090104'*/
        });


        //step3
        this.ajaxGetActRuleList({
          activityId: _this.actId, /*'2016090104'*/
        });
      } else {

      }


    }
  }
</script>

<style scoped>
  p {
    margin-top: 0;
  }

  .my-scrollbar {
    width: 100%;
    min-width: 300px;
    max-height: 800px;
    margin: 0;
  }

  .scroll-me {
    background: #EEE;
    min-width: 2000px;
  }

  .kolom {
    background: #2196F3;
    width: 150px;
    height: 150px;
    float: left;
    display: inline-block;
    margin: 15px;
  }

  .clearfix {
    clear: both;
  }

  .vue-scrollbar-transition, .vue-scrollbar__scrollbar-vertical, .vue-scrollbar__scrollbar-horizontal {
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

  .vue-scrollbar__wrapper:hover .vue-scrollbar__scrollbar-vertical, .vue-scrollbar__wrapper:hover .vue-scrollbar__scrollbar-horizontal {
    opacity: 1;
  }

  .vue-scrollbar__scrollbar-vertical, .vue-scrollbar__scrollbar-horizontal {
    opacity: 0.5;
    position: absolute;
    background: transparent;
  }

  .vue-scrollbar__scrollbar-vertical:hover, .vue-scrollbar__scrollbar-horizontal:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  .vue-scrollbar__scrollbar-vertical .scrollbar, .vue-scrollbar__scrollbar-horizontal .scrollbar {
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

  .step1 {
    margin: 20px 0;
  }

  .step2 {
    margin: 20px 0;
  }

  .down-file {
    margin-left: 10px;
    font-size: 14px;
    color: #409eff;
    font-weight: 900;
    text-decoration: underline;
  }

  .selects {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
  }

  .selects option {
    display: block;
    height: 40px;
    line-height: 40px;
    padding: 5px;
  }
</style>
