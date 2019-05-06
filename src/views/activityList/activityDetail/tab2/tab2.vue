<template>
  <div class="main">


    <TakelogSearch
      @update="ajaxGetActTakelog"
      :actId="actId"
    />

    <!--总参与人数-->
    <div class="totalUser" style="padding:20px 0;font-size:14px;">
      总参与人数：<span>{{takelogData.allnop}}</span>
    </div>

    <!--列表-->
    <TakelogTable
      :retData="aTakelogData"
      :totalRecord = "takelogData.totalRecord"
      :curPage="+postdata_getActTakelog.data.pageNum"
      @update="ajaxGetActTakelog"
    />

  </div>
</template>

<script>

  import TakelogSearch from "./components/takelogSearch";
  import TakelogTable from "./components/takelogTable";

  export default {
    name: "tab2",
    components: {
      TakelogSearch,
      TakelogTable,
    },
    data(){
      return {
        searchForm: {
          name: '',
          startTime: '',
          endTime: ''
        },
        searchRules: {},
        //用户参与表
        takelogData: {},
        aTakelogData:[],
        //ajax
        postdata_getActTakelog: {
          head: {},
          data: {
            activityId: '',  //必须
            // msisdn:'18476633666',
            // startTime:'2018/4/18',
            // endTime:'2018/4/18',
            // perPage: '',
            pageNum: '1'  //  不能删掉，组件用到
          }
        },
      }
    },
    methods: {
      onSubmit: function(){
      },
      onExport: function(){
      },
      ajaxGetActTakelog(obj){

        let _this = this;

        if(obj!=null){
          for(var i in obj){
            _this.postdata_getActTakelog.data[i] = obj[i];
          }
        }

  

        if(!_this.mydata.bUseMoniData){
          _this.axios.post(_this.api.getActTakelog, _this.postdata_getActTakelog).then(res =>{
     
            let code = res.data.head.respCode;
            let data = res.data.data;
            if(code==0){
              _this.takelogData = data;
              if(data.logList!=null){
                _this.aTakelogData = data.logList;
              }else{
                _this.aTakelogData = [];
              }
            }

          })
            .catch(res =>{
              this.$message.error("网络异常，ajaxGetActBaseInfo !");
            });
        }
        else{

          setTimeout(function(){
         
            let res = _this.mydata.actTakelog;
            let code = res.head.respCode;
            let data = res.data;

            if(code==0){
              _this.takelogData = data;
              _this.aTakelogData = data.logList;
            }
          },500);



        }


      },
    },
    created(){

      let _this = this;

      let params = _this.$route.params;
      _this.actId = params.actId;

  

      if(_this.actId!=null){
        this.ajaxGetActTakelog({
          activityId: _this.actId
        });
      }
    }

  }
</script>

<style scoped>

</style>
