<template>

  <div class="detail">
    <div class="line"></div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-tabs @tab-click="routerTo" class="tab" v-model="tabValue">
          <el-tab-pane label="活动信息" name="1"></el-tab-pane>
          <el-tab-pane label="用户参与活动记录" name="2"></el-tab-pane>
          <el-tab-pane label="中奖结果记录" name="3"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>

  export default {
    name: 'index',
    data: function(){
      return {
        //id
        actId: '',

        activeTitle: '活动主题',
        hostPerson: '发起人姓名',
        hostTime: '2016年9月14日',
        readNum: '1999',
        tabValue: "1",

      }
    },
    methods: {

      routerTo: function(tab, event){

        let _this = this;

       
        // this.$router.push('/activity_list/detail/tab'+(+tab.index+1)+'?actId='+this.actId);

        let name;
        switch(+tab.index){
          case 0:
            name = 'tab1';
            break;
          case 1:
            name = 'tab2';
            break;
          case 2:
            name = 'tab3';
            break;
        }

        this.$router.push({
          name: name,
          params: {
            actId: _this.actId,
          }
        })

      },

    },

    watch: {
      '$route': function(to, from){
       

      }
    },
    beforeMount(){
  
      let quickExpr = /^(\/activity_list\/detail)(?:\/tab([0-9]+))[^0-9]*$/;
      let val = quickExpr.exec(this.$route.path);
      if(val!=null && [1, 2, 3].indexOf(val[2])){
        this.tabValue = val[2];
      }
    },
    created(){

      let _this = this;

      let params = _this.$route.params;
      _this.actId = params.actId;

      _this.$router.push({
        name:'tab1',
        params:{
          actId: _this.actId,
        }
      })

    }

  }

</script>

<style scoped>
.line{
  width: 100%;
  height: 2px;
  margin-top: 6px;
  background-color: #e4e7ed;
}
  .detail .el-tabs__item {
    padding: 0 40px;
  }
</style>
