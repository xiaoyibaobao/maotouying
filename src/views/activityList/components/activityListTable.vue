<template>

  <div class="actListMain">

    <!--列表-->
    <div class="table-wrap">
      <el-table
      max-height="400"
        :data="retData.actList"
        border
        style="width: 100%"
        header-row-class-name="table-head">
        <el-table-column
          prop="activityId"
          label="活动ID"
          width="80"
          fixed
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="活动名称"
          width="190">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="活动开始时间"
          width="170">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="活动结束时间"
          width="170">
        </el-table-column>
        <el-table-column
          prop="actStatus"
          label="活动状态"
          width="80">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          width="220">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="mini" type="primary">详情</el-button>
            <el-button  size="mini" @click="edit(scope.row)">编辑</el-button>

            <el-button v-if="scope.row.actStatus == '未开始'" size="mini" type="danger" @click="delect(scope.row)">删除</el-button>
            <el-button v-else size="mini" type="danger" @click="delect(scope.row)" disabled>删除</el-button>

          </template>
        </el-table-column>
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
        :total="retData.totalRecord">
      </el-pagination>
    </div>

  </div>

</template>

<script>

  export default {
    name: "table2",
    props: ['retData', 'curPage'],
    methods: {
      handleClick(row){
     
        //ww
        // this.$router.push('/activity_list/detail'+'?actId=' + row.activityId);
        this.$router.push({
          name: 'ActivityDetail',
          params: {
            actId: row.activityId,
          },
        });

      },
      edit(row){

        let _this = this;
        
        /*this.$store.commit('SetActId', row.activityId);
        this.$store.commit('SetActType', '2');
        let acceptPrizeWay = _this.reChange_acceptPrizeWay(row.actStatus);
        this.$store.commit('SetActStatus', acceptPrizeWay);*/
        // this.$router.push('/create_activity'+'?type=2&actId='+ row.activityId);

        let actStatus = _this.reChange_actStatus(row.actStatus);
        this.$router.push({
          name: 'step1',
          params: {
            actId: row.activityId,
            actType: '2',
            actStatus: actStatus,
          }
        });
      },
      delect(row){
        let _this = this;
        _this.$confirm('确认删除？')
          .then(_ => {

         
            _this.$emit('delectAct', {
              activityId: row.activityId/*.slice(-5)*/
            });

          });
      },
      //分页器
      handleSizeChange(val){
       
        //回到第一页
        this.curPage2 = 1;
        this.getActList({
          pageNum: this.curPage2,
          perPage: val
        });
      },
      handleCurrentChange(val){
       
        this.curPage2 = val;
        this.getActList({
          pageNum: this.curPage2
        });
      },
      getActList(obj){
  
        this.$emit('update', obj);
      },
      setData(obj){
      
        this.curPage2 = obj.pageNum;
        // this.total = this.retData.data.perPage;

      },
      reChange_actStatus(val){
        let ret;
        switch(val){
          case '未开始':
            ret = '0'
            break;
          case '进行中':
            ret = '1';
            break;
          case '已结束':
            ret = '2';
            break;
        }
        return ret

      }
    },
    data(){
      return {
        curPage2: this.curPage,
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
        actList: {
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
        pageSize: 10,
        total: 400,
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


      }
    },
    watch: {
      curPage(val){
        this.curPage2 = val;
      }
    }

  }

</script>

<!--<style scoped>

</style>-->
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

  .pagination {
    margin: 20px 0 0 0;
    text-align: center;
  }
</style>
