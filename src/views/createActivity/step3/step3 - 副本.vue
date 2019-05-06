<template>

  <div class="allActive">

    <!--一级页面-->
    <div class="step3main">

      <div class="table-wrap">

        <el-card class="box-card">

          <el-table :data="ruleListData" style="width: 100%">
            <!--<el-table-column property="ruleId" label="ruleId" :width="100">   </el-table-column>-->
            <!--<el-table-column property="ruleName" label="ruleName" :width="100">   </el-table-column>-->
            <el-table-column property="descs" label="规则名称" :width="200">   </el-table-column>
            <!--<el-table-column property="msgType" label="msgType" :width="100">   </el-table-column>-->

            <el-table-column property="paraList" :width="1500">
              <template slot-scope="scope">

                <el-table :data="scope.row.paraList">

                  <!--<el-table-column property="name" label="name" :width="100"></el-table-column>-->
                  <el-table-column property="nameDesc"  label="配置项" :width="150"></el-table-column>
                  <el-table-column property="paraValue" label="配置值" :width="100">
                    <template slot-scope="scope">
                      <el-input  auto-complete="off" v-model="scope.row.paraValue" clearable></el-input>
                      <el-button v-show="isShow_selectBtn(scope.row.nameDesc, scope.$index)" @click="select">选择</el-button>
                    </template>
                  </el-table-column>
                  <!--<el-table-column property="cType" label="cType" :width="100"></el-table-column>-->
                  <el-table-column property="paraDesc" label="配置描述" :width="200"></el-table-column>
                  <!--<el-table-column property="type" label="typke"></el-table-column>-->


                  <!-- <el-table-column property="taskParaId" label="taskParaId"></el-table-column>
                   <el-table-column property="taskRuleId" label="taskRuleId"></el-table-column>
                   <el-table-column property="taskId" label="taskId"></el-table-column>-->

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

      </div>


      <!--上/下一步-->
      <div class="but-group">
        <el-button @click.native.prevent="handlePreStep">上一步</el-button>
        <el-button type="primary" @click="submitForm('step3Form')">保存</el-button>
      </div>

    </div>

    <!--二级页面：弹窗-->
    <el-dialog title="选择黑名单" :visible.sync="dialogVisible">
      <!--搜索-->
      <el-row :gutter="20" align="middle" type="flex" justify="end" style="margin-bottom: 20px;">
        <el-button type="primary" @click="gotoBlacklist">新建黑名单组</el-button>
        <el-col :span="15" :offset="3">
          <el-input  auto-complete="off" placeholder="输入奖品名称" size="large"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button size="large" icon="search">搜索</el-button>
        </el-col>
      </el-row>

      <!--奖池列表-->
      <el-row>
        <el-table :data="aBlackListData"
                  @selection-change="selectionchange_blackList"
                  @cell-click="handleSelect_blackList"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column property="id" label="黑名单ID" width="80"></el-table-column>
          <el-table-column property="name" label="黑名单名称" width="130"></el-table-column>
          <el-table-column property="createDate" label="更新时间" width="200" show-tooltip-when-overflow></el-table-column>
        </el-table>
      </el-row>

      <span slot="footer" class="dialog-footer">
                        <el-button @click.native="dialogVisible = false">取 消</el-button>
                        <el-button type="primary"
                                   @click.native="handleAdd()">添加</el-button>
                    </span>

    </el-dialog>

  </div>

</template>
<script>
  import { mapState } from 'vuex'


  function formatData(data){
    var result = [];
    for(var key in data){
      result.push({
        value: key
      })
    }
    return result
  }

  export default {
    name: 'allActive',
    data: function(){
      return {
        //route.param
        actId: '',
        actType: '1',
        actStatus:'',
        createWay:'1',

        //ajax
        postdata_getActRuleList: {
          head: {},
          data: {
            activityId: '2016090104',
          }
        },
        postdata_setActRule: {
          head: {
            reqType: '1'  //1：新增， 2：修改
          },
          data: {
            activityId: '',  //'2016090104'
            ruleList: [
              /*{
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
              {
                ruleId: 3,
                msgType: 'award',  //任务消息名称
                paraList: [
                  {
                    name: 'controlRange',  //规则参数名称
                    paraValue: '2',  //
                  },
                  {
                    name: 'count',  //规则参数名称
                    paraValue: '10',  //
                  },
                ]
              },
              {
                ruleId: 2,
                msgType: 'award',  //任务消息名称
                paraList: [
                  {
                    name: 'winAwardCount',  //规则参数名称
                    paraValue: '6',  //
                  },
                  {
                    name: 'winAwardType',  //规则参数名称
                    paraValue: '4',  //
                  },
                ]
              },*/
            ]

          }
        },

        postdata_getBlackList: {
          head: {},
          data: {
            name: '',
            pageFlag: 1,  //是否需要分页：0是;1.否
            perPage:'',
            pageNum:''
          }
        },



        //表格数据
        ruleListData:[
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
        blackListData:{},
        aBlackListData:[],


        //弹窗
        dialogVisible:false,

        totalActiveNum: 3,
        totalSignUp: 204,
        auditNum: 15,
        activeNum: 0,
        currentType: '全部',
        selectItems: [],
        types: ['全部', '测试活动', '免费活动', '收费活动'],
        tableData: [
          {
            name: '用户资格校验规则',
            item: '用户黑名单ID',
            value: '01,02',
            a: 1,  //  txt
            desc: '黑名单上的用户不能参加活动',
          },
          {
            "name": "transactionType",  //配置项
            "nameDesc": "事务类型",  //规则名称
            "paraDesc": "",  //配置描述
            "type": "1",
            "cType": "3",  //  3：下拉框
            "paraValue": "2",  //配置值
            "id": "508",
            "trid": "10",
            "taskId": "12",
            "msgType": "award"
          },

        ],
        coutrys: ["广东|韶关", "广东|狮山"],
        //规则列表
        /*ruleListData: {
          "head": {
            "respCode": "0",
            "respDesc": "success"
          },
          "data": [
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
            }
          ]
        },*/

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


        //黑名单选择的值
        selectVal:[],
        index:0,  //黑名单选项




      }

    },
    computed: mapState([
      'aActPlace', //第几步
      'actIdx', //活动ID
      'actTypex',  //活动行为类型
    ]),
    methods: {

      //结构转换
      makeStruc_setActRule(originData){

        //保护originData，不操作originData，因为高级obj传进来的是引用
        let copyData = this.utils.deepcopy(originData);

        let ret = originData.map(function(val){

          let paraList = val.paraList.map(function(val){
            let item = {
              name: val.name,
              paraValue: val.paraValue
            };
            return item
          });

          let item = {
            ruleId: val.ruleId,
            msgType: val.msgType,
            paraList: paraList
          };

          return item

        });

        return ret

      },


      //规则表格操作
      handleSelect: function(row, column, cell, event){
        if(column.label=='操作'){
          this.$router.push('/activeManage/detail/page1');
        }else if(column.type=='selection'){
          row.$info = !row.$selected;
        }else{
          row.$selected = !row.$selected;
          row.$info = row.$selected;
        }
      },
      selectionchange: function(val){
        var arr = [];
        val.forEach(function(item){
          arr.push(item.id);
        });
        this.selectItems = arr;
        this.activeNum = this.selectItems.length;
      },
      handleRemove: function(){
        var tableData = this.tableData;
        this.selectItems.forEach(function(id){
          tableData.forEach(function(data){
            if(id==data.id){
              tableData.splice(tableData.indexOf(data), 1)
            }
          })
        });
        this.selectItems = [];
      },

      //黑名单表格操作
      selectionchange_blackList(val){
        console.log('ww');
        console.log('ww');
        console.log(val);
        this.selectVal = val;

      },
      handleSelect_blackList(row, column, cell, event){

      },

      //上/下一步
      handlePreStep(){
        let _this = this;
        // this.$router.push('/create_activity/step1');
        // _this.$router.go(-1);
        _this.$router.push({
          name:'step2',
          params:{
            actId: _this.actId,
            actType: "2",
            actStatus: _this.actStatus,
            createWay: _this.createWay,

          }
        })
      },

      proChange(){},

      //ajax
      ajaxGetActRuleList(obj){

        console.log(this);
        console.log('ajaxGetActAdwardList');

        if(obj!=null){
          for(var i in obj){
            this.postdata_getActRuleList.data[i] = obj[i];
          }
        }

        if(!this.mydata.bUseMoniData){
          this.axios.post(this.api.getActRuleList, this.postdata_getActRuleList).then(res =>{
            console.log('ajaxGetActAdwardList');
            console.log(res);

            let code = res.data.head.respCode;
            let data = res.data.data;
            if(code==0){

              this.ruleListData = data.ruleList;

            }


          })
            .catch(res =>{
              this.$message.error("网络异常，ajaxGetActAdwardList !");
            });

        }
        else{

          let res = this.mydata.getActRuleList_created;
          let code = res.head.respCode;
          let data = res.data;
          if(code==0){

            this.ruleListData = data.ruleList;

          }

        }

      },
      ajaxSetActRule(obj){

        let _this = this;

        console.log(this);
        console.log('ajaxGetActAdwardList');

        if(obj!=null){
          for(var i in obj){
            this.postdata_setActRule.data[i] = obj[i];
          }
        }

        if(!this.mydata.bUseMoniData){
          this.axios.post(this.api.setActRule, this.postdata_setActRule).then(res =>{
            console.log('ww');
            console.log('ww');
            console.log(res);

            let code = res.data.head.respCode;
            let data = res.data.data;
            if(code==0){

              // this.ruleListData = data.ruleList;
              console.log('ww');
              console.log('ww');
              console.log(data);

              _this.$router.push('/activity_list');

            }


          })
            .catch(res =>{
              this.$message.error("网络异常，ajaxGetActAdwardList !");
            });

        }
        else{

          let res = this.mydata.actAdwardList;
          let code = res.head.respCode;
          let data = res.data;
          if(code==0){

            // this.ruleListData = data.ruleList;
            console.log('ww');
            console.log('ww');
            console.log(data);

            _this.$router.push('/activity_list');

          }

        }

      },
      ajaxGetBlackList(obj){

        let _this = this;

        console.log(this);
        console.log('ajaxGetActAdwardList');

        if(obj!=null){
          for(var i in obj){
            this.postdata_getBlackList.data[i] = obj[i];
          }
        }

        if(!this.mydata.bUseMoniData){
          this.axios.post(this.api.getBlackList, this.postdata_getBlackList).then(res =>{
            console.log('ww');
            console.log('ww');
            console.log(res);

            let code = res.data.head.respCode;
            let data = res.data.data;
            if(code==0){

              // this.ruleListData = data.ruleList;
              console.log('ww');
              console.log('ww');
              console.log(data);

              _this.blackListData = data;
              _this.aBlackListData = data.groupList;

            }


          })
            .catch(res =>{
              this.$message.error("网络异常，ajaxGetActAdwardList !");
            });

        }
        else{

          let res = this.mydata.getBlackList;
          let code = res.head.respCode;
          let data = res.data;
          if(code==0){

            // this.ruleListData = data.ruleList;
            console.log('ww');
            console.log('ww');
            console.log(data);

            _this.blackListData = data;
            _this.aBlackListData = data.groupList;

          }

        }

      },

      //提交表单
      submitForm(formName){

        console.log('ww');
        console.log('ww');
        console.log('ww');


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
          ruleList: ruleList,
        };

        //ajax
         this.ajaxSetActRule(obj);

      },

      //显示
      isShow_selectBtn(val,index){
        console.log('ww')
        console.log('ww')
        console.log(val);

        if(~(val.indexOf('黑名单'))){
          return true;
        }
        else{
          return false;
        }

        // return val == 'userCheckRule' ? true:false;
      },

      //选择黑名单
      select(){
        this.ajaxGetBlackList();
        this.dialogVisible = true;

      },

      //确认添加黑名单
      handleAdd(){

        console.log('ww');
        console.log('ww');
        let arr = this.selectVal.map(function(val, index){
          return val.id
        });

        //ww
        this.ruleListData[0].paraList[0].paraValue = arr.join(',');

        this.dialogVisible = false;



      },

      //
      gotoBlacklist(){

        this.$router.push({
          name: 'CreateBlacklist'
        });


      },

      //根据字符含义选择样式
      makeSure(str){
        let arr=[], type='1';
        str = '1 按天  2按周 3按月  4按活动期间';

        //select样式
        if(/[0-9]/.test(str) && /按/.test(str)){
          arr = str.replace(/\s/g,"").split(/[0-9]/).slice(1);
          type = '1';
        }
        //input样式
        else{
          type = '2'
        }

        return {
          type: type,
          arr: arr
        }

      }

    },
    created(){

      console.log('created');
      let _this = this;

      //进来就把当前页vuex
      _this.$store.commit('SETSTEP',3);

      //从vuex获取活动省市数据
      console.log(_this.aActPlace);
      _this.aPlaceInfo = _this.aActPlace;

      //初始化省市信息
      let changeStruc = function(arr){
        let aRet = [];

        for(var i=0;i<arr.length;i++){
          let item = {
            "provName": arr[i].provName,
            "cityName":arr[i].cityName,
            "provId": arr[i].provId,
            "cityId": arr[i].cityId,
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
          };

          aRet.push(item);
        }

        return aRet
      };
      _this.cityAwardList = changeStruc(_this.aPlaceInfo);

      //判断url参数
      //ww:test
      /*_this.actId = _this.actIdx;
      _this.actType = _this.actTypex;*/
      //get param
      let params = _this.$route.params;
      if(params.actId!=null){
        _this.actId = params.actId;
      }
      if(params.actType!=null){
        _this.actType = params.actType;
      }
      if(params.actStatus!=null){
        _this.actStatus = params.actStatus;
      }
      if(params.createWay!=null){
        _this.createWay = params.createWay;
      }

      //是否存在活动ID
      if(_this.actId!=null && _this.actId.trim()!=''){

        _this.ajaxGetActRuleList({
            activityId: _this.actId,
          });

      }
      //没有活动ID的就跳到新创建第一步
      else{
        //ww
        /*let sUrl = '/create_activity';
        _this.$router.push(sUrl);*/
      }

      //type
      if(_this.actType == '2'){
        _this.postdata_setActRule.head.reqType = '2';
      }

    }
  }

</script>

<style scoped>
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
      background: url("../../../assets/no-data.png")no-repeat center center;
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
