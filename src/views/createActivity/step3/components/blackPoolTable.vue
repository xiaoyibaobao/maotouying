<template>

  <div class="actListMain">

    <!--列表-->
    <div class="table-wrap">
      <!--奖池列表-->
      <el-row>
        <el-table :data="retData2" 
         @selection-change="selectionchange" 
         @cell-click="handleSelect" ref="table" 
         row-key="id">
          <el-table-column type="selection" :reserve-selection="true"></el-table-column>
          <el-table-column property="id" label="黑名单ID" width="80"></el-table-column>
          <el-table-column property="name" label="黑名单名称" width="320"></el-table-column>
          <el-table-column property="createDate" label="更新时间" width="130" show-tooltip-when-overflow></el-table-column>
        </el-table>
      </el-row>
    </div>

    <!--分页器-->
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage2" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
      </el-pagination>
    </div>
  </div>

</template>

<script>
export default {
  name: "table2",
  props: ["retData", "curPage", "totalRecord", "aAddItemsStr"],
   data() {
    return {
      curPage2: this.curPage,
      retData2: [],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      avtivityListData: {
        head: {
          respCode: "0",
          respDesc: "success"
        },
        data: {
          actList: [
            {
              name: "下载抽奖活动",
              activityId: "20180404",
              actStatus: "0",
              startTime: "2017-02-02 00:00:00",
              endTime: "2017-03-02 00:00:00",
              updateTime: "2017-03-02",
              doStatus: "1"
            },
            {
              name: "流量保鲜箱",
              activityId: "20180404",
              actStatus: "0",
              startTime: "2017-02-02 00:00:00",
              endTime: "2017-03-02 00:00:00",
              updateTime: "2017-03-02",
              doStatus: "1"
            }
          ]
        }
      },
      actList: {
        totalRecord: 31,
        actList: [
          {
            activityId: "0000000007",
            name: "哈哈哈",
            startTime: "2017-02-03 12:02:00",
            endTime: "2017-03-02 12:03:00",
            actStatus: "2",
            updateTime: "2018-04-20",
            delFlag: "1"
          },
          {
            activityId: "0000000008",
            name: "大家来挖煤",
            startTime: "2017-02-02 12:02:00",
            endTime: "2017-03-02 12:03:00",
            actStatus: "2",
            updateTime: "2018-04-20",
            delFlag: "1"
          },
          {
            activityId: "0000000009",
            name: "大家来挖煤",
            startTime: "2017-02-02 12:02:00",
            endTime: "2017-03-02 12:03:00",
            actStatus: "2",
            updateTime: "2018-04-20",
            delFlag: "1"
          },
          {
            activityId: "0000000010",
            name: "大家来挖煤",
            startTime: "2017-02-02 12:02:00",
            endTime: "2017-03-02 12:03:00",
            actStatus: "2",
            updateTime: "2018-04-20",
            delFlag: "1"
          },
          {
            activityId: "0000000011",
            name: "大家来挖煤",
            startTime: "2017-02-02 12:02:00",
            endTime: "2017-03-02 12:03:00",
            actStatus: "2",
            updateTime: "2018-04-20",
            delFlag: "1"
          },
          {
            activityId: "0000000012",
            name: "大家来挖煤",
            startTime: "2017-02-02 12:02:00",
            endTime: "2017-03-02 12:03:00",
            actStatus: "2",
            updateTime: "2018-04-20",
            delFlag: "1"
          },
          {
            activityId: "0000000013",
            name: "大家来挖煤",
            startTime: "2017-02-02 12:02:00",
            endTime: "2017-03-02 12:03:00",
            actStatus: "2",
            updateTime: "2018-04-20",
            delFlag: "1"
          },
          {
            activityId: "0000000014",
            name: "大家来挖煤",
            startTime: "2017-02-02 12:02:00",
            endTime: "2017-03-02 12:03:00",
            actStatus: "2",
            updateTime: "2018-04-20",
            delFlag: "1"
          },
          {
            activityId: "0000000015",
            name: "大家来挖煤",
            startTime: "2017-02-02 12:02:00",
            endTime: "2017-03-02 12:03:00",
            actStatus: "2",
            updateTime: "2018-04-20",
            delFlag: "1"
          },
          {
            activityId: "0000000016",
            name: "大家来挖煤",
            startTime: "2017-02-02 12:02:00",
            endTime: "2017-03-02 12:03:00",
            actStatus: "2",
            updateTime: "2018-04-20",
            delFlag: "1"
          }
        ]
      },
      //分页器
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      total: 400,

      //选中项数据
      aAddItems: [],
      
    };
  },
  methods: {
    //分页器
    handleSizeChange(val) {
      //回到第一页
      this.curPage2 = 1;
      this.getList({
        pageNum: this.curPage2
        // perPage:val
      });
    },
    handleCurrentChange(val) {
      this.curPage2 = val;
      this.getList({
        pageNum: this.curPage2
      });
    },
    getList(obj) {
      this.$emit("update", obj);
    },
    setData(obj) {
      this.curPage2 = obj.pageNum;
      // this.total = this.retData.data.perPage;
    },
    //表格操作
    selectionchange: function(val) {
      let _this = this;
      let obj = {};
      let newArr = val.reduce((item, next) => {
        obj[next.id] ? "" : (obj[next.id] = true && item.push(next));
        return item;
      }, []); //去重
      _this.$emit("select", newArr);
    },
    handleSelect: function(row, column, cell, event) {},
    //格式转换
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
    arrDataChange(arr) {
      let _this = this;
      let ret;

      ret = _this.utils.deepcopy(arr);

      for (let index = 0; index < arr.length; index++) {
        let item = arr[index];
        ret[index].prizeType = _this.change_prizeType(item.prizeType);
      }

      return ret;
    },
    chFormStrct_awardPool(arr) {
      let ret = this.utils.deepcopy(arr);
      for (let index = 0; index < arr.length; index++) {
        let item = ret[index];
        item.prizeType = this.change_prizeType(arr[index].prizeType);
      }
      return ret;
    },
    reChFormStrct_awardPool(arr) {
      let ret = this.utils.deepcopy(arr);
      for (let index = 0; index < arr.length; index++) {
        let item = ret[index];
        item.prizeType = this.reChange_prizeType(arr[index].prizeType);
      }
      return ret;
    },
    checked() {
     
        let tempArr = this.aAddItemsStr.split(",");//将字符串分割成数组
        let selectArr = this.retData2.filter(val => {//刷选出包含指定字符串的列表项
          return tempArr.includes(String(val.id));
        });
        selectArr.forEach(row => {
          /*toggleRowSelection默认选中项，需指定row-key，和 :reserve-selection="true" */
          this.$refs.table.toggleRowSelection(row);
          
        });
    }
  },
 
  watch: {
    curPage(val) {
      this.curPage2 = val;
    },
    retData(val) {
      let _this = this;
      _this.retData2 = _this.retData;
      _this.checked();
    },
    aAddItemsStr(val) {
      let _this = this;
    }
  },
  created() {
   
    let _this = this;
    _this.retData2 = _this.retData;
  },
  
};
</script>
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

.pagination {
  margin: 20px 0 0 0;
  text-align: center;
}
</style>
