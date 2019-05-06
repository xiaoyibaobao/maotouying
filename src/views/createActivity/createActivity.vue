<template>
  <div class="activePublic ">
    <el-steps :space="200" :active="step" class="step"  process-status="wait">
      <el-step title="设置基本信息" description=""></el-step>
      <el-step title="设置活动奖项" description=""></el-step>
      <el-step title="设置活动规则" description=""></el-step>
    </el-steps>

    <transition name="fade">
      <router-view class="view"></router-view>
    </transition>

    <!--<div class="but-group">
      <el-button @click.native.prevent="handlePreStep" v-show="preStep">上一步</el-button>
      &lt;!&ndash;<el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary">下一步</el-button>&ndash;&gt;
      <el-button @click.native.prevent="handlePublish" v-show="publish" type="primary">发布活动</el-button>
    </div>-->
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'ActivityManage',
    components: {},
    data(){
      return {
        isRouter: true,
        // step: 1,
        // preStep: false,
        // nextStep: true,
        // publish: false,

        postdata_getProv: {
          head: {},
          data: {}
        },
        postdata_getCity: {
          head: {},
          data: {
            provId: '1',
          }
        },

        //创建或修改活动
        postdata_createAct: {
          head: {},
          data: {
            type: '2',  //必须。1：新增， 2：修改
            name: 'ww16_活动有效期修改1',  //必须。
            startTime: '2018/1/1 00:00:00',  //必须。
            endTime: '2018/5/1 00:00:00',  //必须。
            activityId: '2016090104',
            createWay: '1', //必须。1：按省市， 2：自定义
            cityList: [
              {
                provId: '11',
                cityId:'60',
                userType: '1'
              },
              {
                provId: '2',
                cityId:'0',
                userType: '1'
              },
            ],
            fileUrl: ''
          }
        },
        postdata_getActList: {
          head: {},
          data: {
            name: '',
            activityId: '',
            actStatus: '',
            /*startTime:'2017-02-03 12:02:00',
            endTime:'2017-03-02 12:03:00',*/
            // startTime:'2017/2/3',
            // endTime:'2017/3/2',
            perPage: '',
            pageNum: '',
          }
        },
        postdata_getActBaseInfo: {
          head: {},
          data: {
            activityId: '2016090104',  //'0000000016'
          }
        },
        postdata_getActTakelog: {
          head: {},
          data: {
            activityId: '2016090104',  //必须
            // msisdn:'18476633666',
            // startTime:'2018/4/18',
            // endTime:'2018/4/18',
            perPage: '',
            pageNum: ''
          }
        },
        postdata_getActWinPrize: {
          head: {},
          data: {
            activityId: '2016090104',  //必须
            msisdn: '18476666666',
            startTime: '',
            endTime: '',
            gameCode: '',
            // awardId:'',
            status: '',
            perPage: '',
            pageNum: ''
          }
        },

        postdata_getActAdwardList: {
          head: {},
          data: {
            activityId: '0000000016',  /*'2016090104'*/
          }
        },
        postdata_addActAdward: {
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
                    strTotalNum: '500',
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
                    strTotalNum: '500',
                    rate: '0.5',
                    limitCount: '1',
                    acceptPrizeWay: 1  //系统下发
                  }
                ]
              }
            ]
          }
        },
        postdata_delActAdward: {
          head: {},
          data: {
            activityId: '',
            typeId: '',
          }
        },

        let: {
          "typeId": "18",
          "totalValue": "101550.0",
          "prizeType": "1",
          "lupdate": "null",
          "poolState": "1",
          "delFlag": "0",
          "prizeName": "西瓜2222222",
          "stock": "10155",
          "totalNum": "10155"
        },

        postdata_getAdwardPool: {
          head: {
            reqType: 2
          },
          data: {
            name:'1',
            // type:'',
            // poolState:'',
            // perpage:'5',  //有这个参数就失败
            pageNum:'1'
          }
        },

        postdata_getActRuleList: {
          head: {},
          data: {
            activityId: '2016090104',
          }
        },

        postdata_setActRule: {
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
              },
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



        //新增还是修改
        formType: '1',  //1:新增，2：修改
      }
    },
    created(){
      // this.ajaxCreateAct();
      // this.ajaxGetActBaseInfo();

      // this.ajaxGetProv();
      //this.ajaxGetCity();
      // this.ajaxCreateActivity();
      // this.ajaxGetActList();
      // this.ajaxGetActTakelog();
      // this.ajaxGetActWinPrize();
      // this.ajaxGetActAdwardList();
      // this.ajaxAddActAdward();
      // this.ajaxDelActAdward();
      // this.ajaxgetAdwardPool();
      // this.ajaxGetActRuleList();
      // this.ajaxSetActRule();
      // this.ajaxGetBlackList();



      if(this.utils.getParam('type')=='2'){
        this.formType = '2'
      }
    },

    methods: {
      handlePreStep: function(){
        this.$router.go(-1);
        this.$store.commit('SETSTEP', '-');
        //this.goStep(this.step);
      },
      handleNextStep: function(){
      
        this.$router.push('/create_activity/step'+(this.step+1));
        this.$store.commit('SETSTEP', '+');
        /*var _this = this;
        setTimeout(function(){
          if(_this.isRouter){
            _this.$store.commit('SETSTEP', '+');
            // _this.goStep(_this.step);
          }
        })*/

      },
      handlePublish: function(){
      
        this.$router.push('/activity_list');
      },
      // goStep: function(n){
     
      //   let preStep, nextStep, publish;
      //   switch(n){
      //     case 1 :
      //       preStep = false;
      //       nextStep = true;
      //       publish = false;
      //       break;
      //     case 2 :
      //       preStep = true;
      //       nextStep = true;
      //       publish = false;
      //       break;
      //     case 3 :
      //       preStep = true;
      //       nextStep = false;
      //       publish = true;
      //       break;
      //       this.$store.commit("SETSTEPSTATUS",{
      //         preStep: preStep,
      //         nextStep: nextStep,
      //         publish: publish
      //       })
      //   }
      // }
      ajaxCreateAct(){

        this.axios.post(this.api.createAct, this.postdata_createAct).then(res =>{
        
        })
          .catch(res =>{
            this.$message.error("网络异常，ajaxCreateAct !");
          });

      },
      ajaxGetProv(){

        this.axios.post(this.api.getProv, this.postdata_getProv).then(res =>{
     
          /*let code = res.data.head.respCode;
          let data = res.data.data;
          if (code == 0) {
            if (data.groupList) {
              this.blacklisting = data.groupList.map(item => {
                item.createDate = !item.createDate
                  ? ""
                  : new Date(item.createDate).Format("yyyy-MM-dd");
                return item;
              });
            } else {
              this.blacklisting = [];
            }
            this.totalItem = data.totalRecord; //总记录数
          }*/
        })
          .catch(res =>{
            this.$message.error("网络异常，省份数据获取失败 !");
          });

      },
      ajaxGetCity(){

        this.axios.post(this.api.getCity, this.postdata_getCity).then(res =>{
   
        })
          .catch(res =>{
            this.$message.error("网络异常，城市数据获取失败 !");
          });

      },
      ajaxGetActList(){

        this.axios.post(this.api.getActList, this.postdata_getActList).then(res =>{
      
        })
          .catch(res =>{
            this.$message.error("网络异常，ajaxGetActList !");
          });

      },
      ajaxGetActBaseInfo(){
        this.axios.post(this.api.getActBaseInfo, this.postdata_getActBaseInfo).then(res =>{
     
        })
          .catch(res =>{
            this.$message.error("网络异常，ajaxGetActBaseInfo !");
          });
      },
      ajaxGetActTakelog(){

        this.axios.post(this.api.getActTakelog, this.postdata_getActTakelog).then(res =>{
       
        })
          .catch(res =>{
            this.$message.error("网络异常，ajaxGetActBaseInfo !");
          });

      },
      ajaxGetActWinPrize(){

        this.axios.post(this.api.getActWinPrize, this.postdata_getActWinPrize).then(res =>{
       
        })
          .catch(res =>{
            this.$message.error("网络异常，ajaxGetActWinPrize !");
          });

      },
      ajaxGetActAdwardList(){

        this.axios.post(this.api.getActAdwardList, this.postdata_getActAdwardList).then(res =>{
         
        })
          .catch(res =>{
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });

      },
      ajaxAddActAdward(){

        this.axios.post(this.api.addActAdward, this.postdata_addActAdward).then(res =>{
         
        })
          .catch(res =>{
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });

      },
      ajaxDelActAdward(){

        this.axios.post(this.api.delActAdward, this.postdata_delActAdward).then(res =>{
    
        })
          .catch(res =>{
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });

      },
      ajaxgetAdwardPool(){

        this.axios.post(this.api.getAdwardPool, this.postdata_getAdwardPool).then(res =>{
         
        })
          .catch(res =>{
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });

      },
      ajaxGetActRuleList(){

        this.axios.post(this.api.getActRuleList, this.postdata_getActRuleList).then(res =>{
          
        })
          .catch(res =>{
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });

      },
      ajaxSetActRule(){

        this.axios.post(this.api.setActRule, this.postdata_setActRule).then(res =>{
         
        })
          .catch(res =>{
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });

      },
      ajaxGetBlackList(){

        this.axios.post(this.api.getBlackList, this.postdata_getBlackList).then(res =>{
         
        })
          .catch(res =>{
            this.$message.error("网络异常，ajaxGetActAdwardList !");
          });

      }




    },
    computed: mapState([
      'step', //第几步
      'preStep',
      'nextStep',
      'publish',  //发布
    ]),
    destroyed(){

    },
    watch: {
      '$route': function(to, from){
      

        this.isRouter = true;
      }
    }
  }

</script>

<style scoped>
.step{
  margin-bottom: 20px;
 
}
  .activePublic {
    background-color: #fff;
    padding: 50px 10px 50px 20px;
    text-align: left;
  }

  .activePublic .router-link {
    color: #fff;
  }

  .activePublic .but-group .el-button {
    margin-right: 20px;
  }
</style>

