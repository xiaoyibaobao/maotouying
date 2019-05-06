<template>
  <div class="prize-list">
    <prize-search-criteria @searchFn="searchFn"></prize-search-criteria>
    <prize-table @operateDetail="doTetail" @operateMessage="doMessage" @edit="doEdit" :tableList="tableList" @delete="deleteList"></prize-table>
    <el-pagination :page-sizes="[10, 20, 30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord" @current-change="pagination" @size-change="page">
    </el-pagination>
    <!--详情-->
    <transition name="animation-fade">
      <prize-detail :obj="obj" v-if="showDetailModal" @closeModal="closeDetailModal"></prize-detail>
    </transition>
    <!--库存管理-->
    <transition name="animation-fade">
      <stock-detail :obj="messageobj" v-if="messageModal" @closeModal="closeMessageModal"></stock-detail>
    </transition>
    <!--编辑-->
    <transition name="animation-fade">
      <stock-edit :obj="editobj" v-if="editModal" @closeEditeModal="closeEditeModal"></stock-edit>
    </transition>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script >
import PrizeSearchCriteria from "@/views/prizeList/components/prize-search-criteria";
import PrizeTable from "@/views/prizeList/components/prize-table";
import PrizeDetail from "@/views/prizeList/components/pop";
import StockDetail from "@/views/prizeList/components/stock";
import StockEdit from "@/views/prizeList/components/edit";
export default {
  name: "PrizeList",
  components: {
    PrizeSearchCriteria,
    PrizeTable,
    PrizeDetail,
    StockDetail,
    StockEdit
  },
  data() {
    return {
      tableList: [
        /*{
                  "typeId":"23"
              }*/
      ],
      showDetailModal: false,
      editModal: false,
      messageModal: false,
      postData: {
        head: {
          reqType: 2
        },
        data: {
          //                  perPage:'10',
          //                  pageNum:"1"
        }
      },
      totalRecord: 1,
      typeId: "",
      messageobj: "",
      editobj: "",
      isopen: false,
      dialogVisible: false,
      obj: {}
    };
  },
  created() {
    //初始查询列表
    this.getList();
  },

  methods: {
    doTetail(obj) {
      this.showDetailModal = true;
      this.typeId = obj.typeId;
      this.obj = obj;
    },
    doMessage(obj) {
      this.messageModal = true;
      this.messageobj = obj;
    },
    doEdit(obj) {
      this.editModal = true;
      this.editobj = obj;
    },
    closeDetailModal() {
      this.showDetailModal = false;
    },
    closeMessageModal(refresh) {
      this.messageModal = false;
      if (refresh) {
        this.getList();
      }
    },
    closeEditeModal(refresh) {
      this.editModal = false;
      if (refresh) {
        this.getList();
      }
    },
    deleteList(obj) {
      this.$confirm("确认删除？").then(_ => {
        let data = {
          data: {
            prizeId: obj.typeId
          }
        };
        this.axios.post(this.api.prizeDel, data).then(res => {
          if (res.data.head.respCode == 0) {
            this.open("成功");
          } else {
            this.open("失败");
          }
        });
      });
    },
    open(txt) {
      let _this = this;
      this.$alert("删除" + txt, "通知", {
        confirmButtonText: "确定",
        callback: action => {
          if (txt == "成功") {
            setTimeout(function() {
              _this.getList();
            }, 500);
          }
        }
      });
    },
    getList() {
      //              return
      this.axios.post(this.api.prizeList, this.postData).then(res => {
        if (res.data.head.respCode == 0) {
          this.tableList = [];
          this.tableList = res.data.data.prizeList.map(item => {
            for (var keys in item) {
              if (item[keys] == "null") {
                item[keys] = " ";
              }
            }
            return item;
          });
          /**
           *20180529更新时间到年月日，去除小时分钟秒
           *@lqh
           */

          this.tableList = this.tableList.map(val => {
            val.lupdate = !val.lupdate
              ? ""
              : new Date(val.lupdate).Format("yyyy-MM-dd");
            return val;
          });
          this.totalRecord = res.data.data.totalRecord;
        }
      });
    },
    searchFn(val) {
      if (val.name != "" && val.name != "undefined") {
        this.postData.data.name = val.name;
      } else {
        delete this.postData.data.name;
      }
      if (val.poolState != "0" && val.poolState != "undefined") {
        this.postData.data.poolState = val.poolState;
      } else {
        delete this.postData.data.poolState;
      }
      if (val.type != "0" && val.type != undefined) {
        this.postData.data.type = val.type;
      } else {
        delete this.postData.data.type;
      }
      this.getList();
    },
    pagination(pageNum) {
      this.postData.data.pageNum = pageNum.toString();
      this.getList();
    },
    page(pageSize) {
      this.postData.data.perPage = pageSize.toString();
      this.getList();
    },
    paginations() {}
  },
  computed: {},
  destroyed() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
.prize-list {
  background: #fff;
  padding-bottom: 50px;
}
.modal {
  z-index: 9;
}
</style>
