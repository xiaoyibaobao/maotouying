<template>
  <div class="blacklisting-table">
    <div :class="['table-wrap',{'table-border':blacklisting.length>0}]">
      <el-table :data="blacklisting" height="410" border style="width: 100%" header-row-class-name="table-head">
        <el-table-column fixed prop="id" label="黑名单组ID">
        </el-table-column>
        <el-table-column prop="name" label="黑名单组名称">
        </el-table-column>
        <el-table-column prop="createDate" label="更新时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="" @click="detailItem(scope.row)">详情</el-button>
            <el-button type="default" size="mini" :disabled=scope.row.isOperating @click="editItem(scope.row)">编辑</el-button>
            <!-- 20180525优化黑名单正在被黑名单使用不可删除 -->
            <el-button type="danger" size="mini" :disabled="scope.row.delFlag==1?true:false" @click="deleteItem(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>
<script>
export default {
  name: "BlacklistingTable",
  props: {
    blacklisting: Array
  },
  data() {
    return {};
  },
  methods: {
    /* 删除黑名单组 */
    deleteItem(id) {
      this.$confirm("你确定要删除这个黑名单组吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post(this.api.blacklistingDelete, { data: { id: id } })
            .then(res => {
              let code = res.data.head.respCode;
              let message=res.data.head.respDesc;
              if (code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                //删除成功后调用父组件的请求列表函数，刷新列表
                this.$emit("handleDel");
              }else if(code==-9992){
                   this.$message({
                  type: "error",
                  message: message
                });
              }
            })
            .catch(res => {
              this.$message.error("网络异常，删除失败，请重试!");
            });
        })
        .catch(() => {});
    },
    /* 编辑 */
    editItem(editObj) {
      // 触发事件，传递数据给index
      this.$emit("operateEdit", editObj);
    },
    /* 详情 */
    detailItem(detailObj) {
      // 触发事件，传递数据给index
      this.$emit("operateDetail", detailObj);
    }
  },
  components: {}
};
</script>

<style lang="scss"   rel="stylesheet/scss">
/* 修改el-table，去掉scoped,外层加div，防止全局样式污染 */
.blacklisting-table {
  .table-border {
    border-bottom: 1px solid #ebeef5;
  }
  .table-wrap {
    .el-table::before {
      height: 0;
    }
    .el-table__fixed-right::before,
    .el-table__fixed::before {
      height: 0;
    }
    .table-head {
      height: 56px;
    }
    .table-head,
    th {
      background-color: #f2f8ff;
      text-align: center;
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
}
</style>


