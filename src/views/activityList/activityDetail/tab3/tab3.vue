<template>
  <div class="main">

    <WinPrizeSearch
      @update="ajaxGetActWinPrize"
      :actId="actId"
    />

    <!--总参与人数-->
    <div class="totalUser" style="padding:20px 0;font-size:14px;">
      总中奖人数：<span>{{winPrizeData.resultNum}}</span>
      总领奖人数：<span>{{winPrizeData.drawNum}}</span>
    </div>

    <!--列表-->
    <WinPrizeTable
      :retData="aWinPrizeData"
      :totalRecord="winPrizeData.totalRecord"
      :curPage="+postdata_getActWinPrize.data.pageNum"
      @update="ajaxGetActWinPrize"
      @clickDetail="clickDetail"
    />


    <!--二级页面：弹窗-->
    <el-dialog title="邮寄信息"  class="post-info" :visible.sync="dialogVisible">
      <p><span>收件人姓名：</span><span>{{postUserName}}</span></p>
      <p><span>收件人电话：</span><span>{{postUserId}}</span></p>
      <p><span>收件人地址：</span><span>{{postAddress}}</span></p>
    </el-dialog>

  </div>


</template>

<script>

  import WinPrizeSearch from "./components/winPrizeSearch";
  import WinPrizeTable from "./components/winPrizeTable";

  export default {
    name: "tab3",
    components: {
      WinPrizeSearch,
      WinPrizeTable,
    },
    data(){
      return {
        searchForm: {
          name: '',
          startTime: '',
          endTime: '',
          status: ''
        },
        searchRules: {},

        //中奖结果列表
        priceListData: {
          "head": {
            "respCode": "0",
            "respDesc": "success"
          },
          "data": {
            "totalRecord": "1000",
            "resultNum": "100",  //中奖人数
            "drawNum": "80",  //领奖人数
            "resultList": [{
              "msisdn": "12312312",
              "awardTime": "2017-02-02 00:00:00",
              "name": "小米电源",
              "descs": "XDDJ34343DFDS",
              "status": "1",
              "drawTime": "2017-02-02 00:00:00"
            }, {
              "msisdn": "12312312",
              "awardTime": "2017-02-02 00:00:00",
              "name": "小米电源",
              "descs": "XDDJ34343DFDS",
              "status": "1",
              "drawTime": "2017-02-02 00:00:00"
            }]
          }
        },

        winPrizeData: {
          /*"totalRecord": "",
          "resultNum": "",  //中奖人数
          "drawNum": "",  //领奖人数
          "resultList": [{
            "msisdn": "12312312",
            "awardTime": "2017-02-02 00:00:00",
            "name": "小米电源",
            "descs": "XDDJ34343DFDS",
            "status": "1",
            "drawTime": "2017-02-02 00:00:00"
          }, {
            "msisdn": "12312312",
            "awardTime": "2017-02-02 00:00:00",
            "name": "小米电源",
            "descs": "XDDJ34343DFDS",
            "status": "1",
            "drawTime": "2017-02-02 00:00:00"
          }]*/
        },
        aWinPrizeData: [],

        //ajax
        postdata_getActWinPrize: {
          head: {},
          data: {
            // activityId:'2016090104',  //必须
            // msisdn:'18476666666',
            // startTime:'',
            // endTime:'',
            // gameCode:'',
            // awardId:'',
            // status:'',
            // perPage:'',
            pageNum: '1'
          }
        },

        //弹窗
        dialogVisible: false,

        index:0,

        //收件人
        postUserName:'',
        postUserId:'',
        postAddress:'',

      }
    },
    methods: {
      handleClick: function(e){
      },
      onSubmit: function(e){
      },
      onExport: function(){
      },
      ajaxGetActWinPrize(obj){

        let _this = this;

        if(obj!=null){
          for(var i in obj){
            _this.postdata_getActWinPrize.data[i] = obj[i];
          }
        }

     

        if(!_this.mydata.bUseMoniData){

          this.axios.post(_this.api.getActWinPrize, _this.postdata_getActWinPrize).then(res =>{
     
            let code = res.data.head.respCode;
            let data = res.data.data;
            if(code==0){
              _this.winPrizeData = data;
              if(data.resultList!=null){
                _this.aWinPrizeData = data.resultList;

              }
              else{
                _this.aWinPrizeData = [];
              }
            }


          })
            .catch(res =>{
              this.$message.error("网络异常，ajaxGetActWinPrize !");
            });

        }
        else{

          setTimeout(function(){
            let res = _this.mydata.actWinPrize;
            let code = res.head.respCode;
            let data = res.data;
            if(code==0){
              _this.winPrizeData = data;
              _this.aWinPrizeData = data.resultList;
            }
          },500)



        }


      },
      clickDetail(index){

        this.index = index;
        this.postUserName = this.aWinPrizeData[index].postUserName;
        this.postUserId = this.aWinPrizeData[index].postUserId;
        this.postAddress = this.aWinPrizeData[index].postAddress;

        this.dialogVisible = true;
      },
    },
    created(){

      let _this = this;

      let params = _this.$route.params;
      _this.actId = params.actId;

   

      if(_this.actId!=null){
        this.ajaxGetActWinPrize({
          activityId: _this.actId
        });
      }
    }
  }
</script>

<style  lang="scss" rel="stylesheet/scss">
  .post-info{
    .el-dialog__header{
      padding-top:30px;
    }
    .el-dialog__body{
      padding:0 20px 20px;
    }
    p{
      line-height:40px;
      span{
        font-size:16px;
      }
    }
  }
</style>
