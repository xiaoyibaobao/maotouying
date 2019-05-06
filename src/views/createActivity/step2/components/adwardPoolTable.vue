<template>

  <div class="actListMain">

    <!--列表-->
    <div class="table-wrap">
      <!--奖池列表-->
      <el-row>
        <el-table :data="retData2"
                  @selection-change="selectionchange"
                  @cell-click="handleSelect"
                
        >
          <el-table-column type="selection" ></el-table-column>
          <el-table-column property="typeId" label="奖品ID" width="80"></el-table-column>
          <el-table-column property="prizeName" label="奖品名称" width="250"></el-table-column>
          <el-table-column property="prizeType" label="类型" width="80" show-tooltip-when-overflow></el-table-column>
          <el-table-column property="stock" label="库存" width="120"></el-table-column>
        </el-table>
      </el-row>
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
    props:['retData','curPage','totalRecord'],
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

      //表格操作
      selectionchange: function(val){

        let _this = this;
  

        //转换数据结构
        let makeData = function(arr){
          let ret = [];
          let obj = {
            "typeId": "",
            "activityId": '',
            "grade": "1",
            "name": "",
            "type": "1",
            "count": 5997,  //奖品池库存
            // "cityAwardList": _this.cityAwardList,
          };
          for(var i = 0; i<arr.length; i++){
            let item = _this.utils.deepcopy(obj);
            item.typeId = arr[i].typeId;
            // item.activityId = _this.actId;
            // item.grade = '一等奖';
            item.name = arr[i].prizeName;
            item.type = arr[i].prizeType;
            item.count = arr[i].stock;

            ret.push(item);
          }

          return ret
        }

        // _this.aAddItems = makeData(val);

        //还原成进来时的格式，即接口格式
        _this.aAddItems = _this.reChFormStrct_awardPool(val);
        _this.$emit('select',_this.aAddItems);

      },
      handleSelect: function(row, column, cell, event){
 
      },

      //格式转换
      change_prizeType(val){
        let ret;
        switch(val){
          case "1":
            ret = '实物';
            break;
          case "2":
            ret = '码券';
            break;
        }
        return ret
      },
      reChange_prizeType(val){
        let ret;
        switch(val){
          case "实物":
            ret = '1';
            break;
          case "码券":
            ret = '2';
            break;
        }
        return ret
      },

      arrDataChange(arr){
        let _this = this;
        let ret;

        ret = _this.utils.deepcopy(arr);

        for(let index=0;index<arr.length;index++){
          let item = arr[index];
          ret[index].prizeType = _this.change_prizeType(item.prizeType);
        }

        return ret;

      },

      chFormStrct_awardPool(arr){
        let ret = this.utils.deepcopy(arr);
        for(let index=0;index<arr.length;index++){
          let item = ret[index];
          item.prizeType = this.change_prizeType(arr[index].prizeType);
        }
        return ret
      },
      reChFormStrct_awardPool(arr){
        let ret = this.utils.deepcopy(arr);
        for(let index=0;index<arr.length;index++){
          let item = ret[index];
          item.prizeType = this.reChange_prizeType(arr[index].prizeType);
        }
        return ret
      },

    },
    data(){
      return {
        // retData:[{
        //   "typeId":"18",
        //   "totalValue":"101550.0",
        //   "prizeType":"1",
        //   "lupdate":"null",
        //   "poolState":"1",  //库存状态   1：充足  2：不足
        //   "delFlag":"0",  //删除标识（0：可删除，1：不可删除）
        //   "prizeName":"西瓜2222222",
        //   "stock":"10155",  //库存
        //   "totalNum":"10155"
        // }],
        curPage2: this.curPage,
        retData2: [],
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

        //选中项数据
        aAddItems:[],
      }
    },
    watch:{
      curPage(val){
        this.curPage2 = val;
      },
      retData(val){
        let _this = this;

        //转换成表格格式
        _this.retData2 = _this.chFormStrct_awardPool(val);
   
      },
    },
    created(){
      let _this = this;


      //formate to form struct
      _this.retData2 = _this.chFormStrct_awardPool(_this.retData);

  
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
  }
</style>
