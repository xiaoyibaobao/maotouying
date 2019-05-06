<template>
  <div class="main">

    <!--一级页面：列表页-->
    <div class="activity-list" v-show="show.activityList">
      <Search @update="ajaxGetActList" />
      <activityListTable :retData="retData" :curPage="+postdata_getActList.data.pageNum" @update="ajaxGetActList" @delectAct="ajaxDelectAct" />
    </div>

    <!--二级页面：详情页-->
    <div class="activity-detail" v-show="show.activityDetail">
      <el-button @click="back">返回</el-button>
      <transition name="fade">
        <router-view class="view"></router-view>
      </transition>
    </div>

  </div>

</template>

<script>
import activityListTable from "./components/activityListTable";
import Search from "./components/search";

export default {
  name: "ActivityList",
  components: {
    activityListTable,
    Search
  },
  data() {
    return {
      show: {
        activityList: true,
        activityDetail: false
      },
      postdata_getActList: {
        head: {},
        data: {
          name: "",
          activityId: "",
          // actStatus:'',
          /*startTime:'2017-02-03 12:02:00',
            endTime:'2017-03-02 12:03:00',*/
          // startTime:'2017/2/3',
          // endTime:'2017/3/2',
          perPage: "10",
          pageNum: "1"
        }
      },
      retData: {},
      postdata_delAct: {
        head: {},
        data: {
          activityId: ""
        }
      }
    };
  },
  created() {
    this.ajaxGetActList();
  },

  methods: {
    //ajax
    ajaxGetActList(obj) {
      let _this = this;

      if (obj != null) {
        for (var i in obj) {
          this.postdata_getActList.data[i] = obj[i];
        }
      }

      if (!this.mydata.bUseMoniData) {
        this.axios
          .post(this.api.getActList, this.postdata_getActList)
          .then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == "0") {
              //后台数据解析
              for (let index = 0; index < data.actList.length; index++) {
                let item = data.actList[index];
                item.actStatus = _this.change_actStatus(item.actStatus);
                /**
                 *20180529更新时间到年月日，去除小时分钟秒
                 *@lqh
                 */
                if(item.updateTime){
                  item.updateTime= new Date(item.updateTime).Format("yyyy-MM-dd")
                }
              }

              this.retData = data;
            }
          })
          .catch(res => {
            this.$message.error("网络异常，ajaxGetActList !");
          });
      } else {
        let res = this.mydata.actList_nonParam;

        let code = res.head.respCode;
        let data = res.data;
        if (code == "0") {
          //后台数据解析
          for (let index = 0; index < data.actList.length; index++) {
            let item = data.actList[index];
            item.actStatus = _this.change_actStatus(item.actStatus);
          }

          this.retData = data;
        }
      }
    },
    ajaxDelectAct(obj) {
      if (obj != null) {
        for (var i in obj) {
          this.postdata_delAct.data[i] = obj[i];
        }
      }

      let _this = this;

      if (!this.mydata.bUseMoniData) {
        this.axios
          .post(this.api.delAct, this.postdata_delAct)
          .then(res => {
            let code = res.data.head.respCode;
            let data = res.data.data;
            if (code == "0") {
              //

              _this.ajaxGetActList({});
            }
          })
          .catch(res => {
            _this.$message.error("网络异常，ajaxGetActList !");
          });
      } else {
        var res = this.mydata.delectAct;

        let code = res.head.respCode;
        let data = res.data;
        if (code == "0") {
          //
        }
      }
    },

    //返回列表页
    back() {
      this.$router.push({
        name: "ActivityList"
      });
      this.show.activityDetail = false;
      this.show.activityList = true;
    },

    //解析
    change_actStatus(val) {
      let ret;
      switch (val) {
        case "0":
          ret = "未开始";
          break;
        case "1":
          ret = "进行中";
          break;
        case "2":
          ret = "已结束";
          break;
      }
      return ret;
    }
  },
  computed: {},
  destroyed() {},
  watch: {
    $route: function(to, from) {
      if (/activity_list\/detail/i.test(to.path)) {
        this.show.activityList = false;
        this.show.activityDetail = true;
      } else {
        this.show.activityList = true;
        this.show.activityDetail = false;
      }
    }
  },
  beforeMount() {
    if (/activity_list\/detail/i.test(this.$route.path)) {
      this.show.activityList = false;
      this.show.activityDetail = true;
    } else {
      this.show.activityList = true;
      this.show.activityDetail = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
.main {
  background-color: #fff;
  padding: 50px 10px;
  text-align: left;
}
</style>
