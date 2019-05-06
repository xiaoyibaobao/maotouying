<template>

  <div class="actListMain">

    <!--列表-->
    <div class="table-wrap">
      <el-table
       max-height="400"
        :data="retData2"
        border
        style="width: 100%"
        header-row-class-name="table-head">
        <el-table-column fixed property="msisdn" label="用户手机号码"></el-table-column>
        <el-table-column property="logTime" label="参与时间"></el-table-column>
        <el-table-column property="logResult" label="参与结果"></el-table-column>
      </el-table>
    </div>


    <!--分页器-->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="curPage2"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRecord">
      </el-pagination>
    </div>

  </div>

</template>

<script>

  export default {
    name: "table2",
    props:['retData','curPage', 'totalRecord'],
    methods: {
      //分页器
      handleSizeChange(val) {
        
        //回到第一页
        this.curPage2 = 1;
        this.getList({
          pageNum:this.curPage2,
          perPage:val
        });
      },
      handleCurrentChange(val) {
       
        this.curPage2 = val;
        this.getList({
          pageNum:this.curPage2
        });
      },
      getList(obj){
       
        this.$emit('update',obj);
      },
      setData(obj){
    
        this.curPage2 = obj.pageNum;
        // this.total = this.retData.data.perPage;

      },
      //后台数据解析
      change_logResult(val){
        let ret;
        switch(val){
          case '1':
            ret = '已中奖';
            break;
          case '2':
            ret = '未中奖';
            break;
        }
        return ret;
      },

    },
    data(){
      return {
        curPage2: this.curPage,
        retData2: this.retData,
        tableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }],
        avtivityListData: {
          "head": {
            "respCode": "0",
            "respDesc": "success"
          },
          "data": {
            "actList": [
              {
                "name": "下载抽奖活动",
                "activityId": "20180404",
                "actStatus": "0",
                "startTime": "2017-02-02 00:00:00",
                "endTime": "2017-03-02 00:00:00",
                "updateTime": "2017-03-02",
                "doStatus": "1"
              },
              {
                "name": "流量保鲜箱",
                "activityId": "20180404",
                "actStatus": "0",
                "startTime": "2017-02-02 00:00:00",
                "endTime": "2017-03-02 00:00:00",
                "updateTime": "2017-03-02",
                "doStatus": "1"
              }
            ]
          }
        },
        actList:{
          "totalRecord": 31,
          "actList": [
            {
              "activityId": "0000000007",
              "name": "哈哈哈",
              "startTime": "2017-02-03 12:02:00",
              "endTime": "2017-03-02 12:03:00",
              "actStatus": "2",
              "updateTime": "2018-04-20",
              "delFlag": "1"
            },
            {
              "activityId": "0000000008",
              "name": "大家来挖煤",
              "startTime": "2017-02-02 12:02:00",
              "endTime": "2017-03-02 12:03:00",
              "actStatus": "2",
              "updateTime": "2018-04-20",
              "delFlag": "1"
            }, {
              "activityId": "0000000009",
              "name": "大家来挖煤",
              "startTime": "2017-02-02 12:02:00",
              "endTime": "2017-03-02 12:03:00",
              "actStatus": "2",
              "updateTime": "2018-04-20",
              "delFlag": "1"
            }, {
              "activityId": "0000000010",
              "name": "大家来挖煤",
              "startTime": "2017-02-02 12:02:00",
              "endTime": "2017-03-02 12:03:00",
              "actStatus": "2",
              "updateTime": "2018-04-20",
              "delFlag": "1"
            }, {
              "activityId": "0000000011",
              "name": "大家来挖煤",
              "startTime": "2017-02-02 12:02:00",
              "endTime": "2017-03-02 12:03:00",
              "actStatus": "2",
              "updateTime": "2018-04-20",
              "delFlag": "1"
            }, {
              "activityId": "0000000012",
              "name": "大家来挖煤",
              "startTime": "2017-02-02 12:02:00",
              "endTime": "2017-03-02 12:03:00",
              "actStatus": "2",
              "updateTime": "2018-04-20",
              "delFlag": "1"
            }, {
              "activityId": "0000000013",
              "name": "大家来挖煤",
              "startTime": "2017-02-02 12:02:00",
              "endTime": "2017-03-02 12:03:00",
              "actStatus": "2",
              "updateTime": "2018-04-20",
              "delFlag": "1"
            }, {
              "activityId": "0000000014",
              "name": "大家来挖煤",
              "startTime": "2017-02-02 12:02:00",
              "endTime": "2017-03-02 12:03:00",
              "actStatus": "2",
              "updateTime": "2018-04-20",
              "delFlag": "1"
            }, {
              "activityId": "0000000015",
              "name": "大家来挖煤",
              "startTime": "2017-02-02 12:02:00",
              "endTime": "2017-03-02 12:03:00",
              "actStatus": "2",
              "updateTime": "2018-04-20",
              "delFlag": "1"
            }, {
              "activityId": "0000000016",
              "name": "大家来挖煤",
              "startTime": "2017-02-02 12:02:00",
              "endTime": "2017-03-02 12:03:00",
              "actStatus": "2",
              "updateTime": "2018-04-20",
              "delFlag": "1"
            }]
        },
        //分页器
        pageSizes: [10, 20, 30, 40],
        pageSize:10,
        total: 400,
      }
    },
    watch:{
      curPage(val){
        this.curPage2 = val;
      },
      retData(val){

        let _this = this;

        this.retData2 = _this.utils.deepcopy(val);

        //后台数据解析
        for(let index=0;index<val.length;index++){
          if(val[index].logResult!=null){
              this.retData2[index].logResult = this.change_logResult(val[index].logResult);
          }
        }


      }
    },
    created(){
      let _this = this;
   



    }

  }
</script>

<!--<style scoped>

</style>-->
<style lang="scss"   rel="stylesheet/scss">
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
      span.el-table__empty-text {
        padding-left: 200px;
      }
    }
    .no-blacklisting-box {
      margin-top: 85px;
      text-align: center;
    }
  }

  .pagination{
    margin:20px 0 0 0;
    text-align: center;
  }
</style>
