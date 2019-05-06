<template>
  <div class="table-detail" style="width: 100%">
    <el-table :data="tableList" max-height="400">
      <el-table-column label="奖品ID" prop="typeId" width="70"></el-table-column>
      <el-table-column label="奖品名称" prop="prizeName"></el-table-column>
      <el-table-column label="类型" prop="prizeType" width="60">
        <template slot-scope="scope">
          <span v-if="scope.row.prizeType=='1'">实物</span>
          <span v-else style="color: red">码券</span>
        </template>
      </el-table-column>
      <el-table-column label="库存/总数量">
        <template slot-scope="scope">
          <span>{{scope.row.stock}} / {{scope.row.totalNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价值(元)" prop="totalValue"></el-table-column>
      <el-table-column label="库存状态" prop="poolState" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.poolState=='1'">充足</span>
          <span v-else style="color: red">不足</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          <span>{{scope.row.lupdate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="detailItem(scope.row)">详情</el-button>
          <el-button size="mini" type="success" @click="message(scope.row)">库存管理</el-button>
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" v-if="scope.row.delFlag=='0'"  @click="deleteList(scope.row)">删除</el-button>
          <el-button size="mini" type="danger" v-else="scope.row.delFlag=='1'" disabled>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default{
    props: {
      tableList: Array
    },
    data() {
      return{

      }
    },
    created(){
       
    },
    methods:{
      /* 详情 */
      detailItem(id) {
        // 触发事件，传递数据(id)给index
        this.$emit("operateDetail",id);
      },
      message(obj) {
        this.$emit("operateMessage",obj);
      },
      edit(obj) {
        this.$emit("edit",obj);
      },
      deleteList(obj){
        this.$emit("delete",obj);
      }
    }
  }
</script>

<style lang="scss"   rel="stylesheet/scss">
  .table-detail{
    padding: 20px;
    .has-gutter{
      tr{
        background: #f2f8ff;
      }
      th{
        text-align: center;
        background: #f2f8ff;
      }
    }
    .el-table--enable-row-hover .el-table__body tr:hover>td{
      background: #f2f8ff;
    }
    .el-table__row{
      .cell{
        display: flex;
        justify-content: center;
        flex-wrap:wrap;
        button{
          order:1;
        }
      }
    }
  }
</style>
