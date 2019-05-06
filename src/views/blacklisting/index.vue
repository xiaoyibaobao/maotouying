<template>
  <div :class="['blacklisting',{'empty-list':blacklisting.length==0}]">
    <div class="table-wrapper">
      <v-table-operate-head title="黑名单组名称:" v-on:cSendOperateData="getBlacklistingOperateData">
      </v-table-operate-head>
      <v-blacklisting-table :blacklisting="blacklisting" @operateDetail="doTetail" @operateEdit="doEdit" @handleDel="getBlacklisting">
      </v-blacklisting-table>
      <!-- 分页 -->
      <div class="pagination" v-if="blacklisting.length >0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Number(postData.data.pageNum)" :page-sizes="[5,10, 20, 30]" :page-size="Number(postData.data.perPage)" layout="total, sizes, prev, pager, next, jumper" :total="Number(totalItem)">
        </el-pagination>
      </div>
    </div>
    <!-- 详情 -->
    <transition name="animation-fade">
      <v-blacklisting-detail v-if="showDetailModal" :detailObj="operateDetailObj" @closeModal="closeDetailModal"></v-blacklisting-detail>
    </transition>
    <!--编辑-->
    <transition name="animation-fade">
      <div class="edit-modal modal" v-if="showEditModal">
        <!-- 新增编辑组件 -->
        <v-add-edit :type="1" @closeModal="closeEditModal" :editParms="operateEditObj" @refreshBlackList="getBlacklisting">
        </v-add-edit>
      </div>
    </transition>
  </div>
</template>
<script >
import VTableOperateHead from "@/views/blacklisting/components/table-operate-head";
import VBlacklistingTable from "./components/blacklisting-table";
// 新增和编辑公共组件
import VAddEdit from "../createBlacklist/components/add-edit";
//详情组件
import VBlacklistingDetail from "./components/blacklisting-detail";
export default {
  //组件名
  name: "BlacklistList",
  // 子组件
  components: {
    VTableOperateHead,
    VBlacklistingTable,
    VBlacklistingDetail,
    VAddEdit
  },
  data() {
    return {
      totalItem: "0",
      postData: {
        data: {
          name: "", //黑名单组名称
          perPage: "10", //每页记录数
          pageNum: "1", //页数
          pageFlag: 0 //是否需要分页：0是;1.否
        }
      },
      blacklisting: [],
      showDetailModal: false, //显示详情弹框
      showEditModal: false, //显示编辑弹框
      operateDetailObj: {}, //进入详情操作的黑名单组名称和id
      operateEditObj: {} //进入编辑操作的数据
    };
  },
  created() {
    this.getBlacklisting();
  },
  methods: {
    //获取黑名单组列表
    getBlacklisting() {
      this.axios
        .post(this.api.blacklisting, this.postData)
        .then(res => {
          let code = res.data.head.respCode;
          let data = res.data.data;
          if (code == 0) {
            /**
             * 对后台返回的时间一一处理
             * "2018-4-15 08:20:40====>"2018-4-15"
             */
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
          }
        })
        .catch(res => {
          this.$message.error("网络异常，黑名单列表数据获取失败 !");
        });
    },
    /**
     * 获取来自搜索框的信息
     * */
    getBlacklistingOperateData(searchName) {
      this.postData.data.name = searchName;
      this.getBlacklisting();
    },
    handleSizeChange(pagingSize) {
      this.postData.data.perPage = pagingSize;
      this.getBlacklisting();
    },
    handleCurrentChange(pageNum) {
      this.postData.data.pageNum = pageNum;
      this.getBlacklisting();
    },
    /**
     * 获取来自黑名单列表的信息
     * */
    doTetail(detailData) {
      this.operateDetailObj = detailData;
      this.showDetailModal = true; //显示详情弹框
    },
    /**
     * 获取来自黑名单列表的信息
     * */
    doEdit(editData) {
      this.operateEditObj = editData;
      this.showEditModal = true; //显示编辑弹框
    },
    //关闭详情弹窗
    closeDetailModal() {
      this.showDetailModal = false;
    },
    //关闭编辑弹窗
    closeEditModal() {
      this.showEditModal = false;
    }
  },
  mounted() {},
  computed: {},
  destroyed() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
.empty-list{
  padding-bottom: 82px !important;
}
.blacklisting {
  background-color: white;
  padding-bottom: 25px;
  .table-wrapper {
    .pagination {
      margin-top: 25px;
     
    }
  }
  .edit-modal {
    z-index: 2003;
  }
}
</style>
