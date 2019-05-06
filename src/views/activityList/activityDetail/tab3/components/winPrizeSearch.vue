<template>
  <div class="search">
    <el-form :inline="true" :model="searchForm" :rules="searchRules" class="demo-form-inline">

      <el-form-item label="手机号码：" :span="20">
        <el-input  auto-complete="off" v-model="searchForm.msisdn" placeholder="输入手机号码"></el-input>
      </el-form-item>

      <el-form-item label="中奖时间：">
        <el-date-picker type="date" placeholder="输入活动开始时间" v-model="searchForm.startTime" :picker-options="pickerOptions0"
                        style="width: 47%;"></el-date-picker>
        至
        <el-date-picker type="date" placeholder="输入活动结束时间" v-model="searchForm.endTime" :picker-options="pickerOptions1"
                        style="width: 47%;"></el-date-picker>
      </el-form-item>

      <el-form-item label="奖品码：" :span="20">
        <el-input  auto-complete="off" v-model="searchForm.gameCode" placeholder="输入奖品码"></el-input>
      </el-form-item>

      <el-form-item label="领取状态" :span="20">
        <el-select v-model="searchForm.status" placeholder="输入领取状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="已领取" value="1"></el-option>
          <el-option label="已中奖未领取" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <!--<el-button type="primary" @click="onExport">导出</el-button>-->
        <!-- 文件导出组件 -->
        <v-export :btnStyle="'padding:12px 18px;'" :btnSize="'medium'" :vStyle="'display:inline-block;vertical-align: middle;'" :downFileParms="downFileParms" :dataListLength="searchForm.length" :fileName="'中奖记录导出'" :fileType="'zip'">
        </v-export>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

  import VExport from "@/components/export";

  export default {
    props:['actId'],
    components: {
      VExport
    },
    data(){
      return {
        searchForm: {
          msisdn: '',
          name: '',
          startTime: '',
          endTime: '',
          gameCode:'',
          status: '',
        },
        searchRules: {},
        //ajax
        postdata:{
          name:'',
          activityId:'',
          actStatus:'',
          startTime:'',
          endTime:'',
        },
        downFileParms:{
          reqType: '2',
          activityId: this.actId,
          // msisdn: '',
          // startTime: '',
          // endTime: '',
          // typeId: '',
        },

        //time
        //日期
        pickerOptions0: {
          disabledDate: (time) =>{
            /*if (this.step1Form.endTime != "") {
              return time.getTime() > Date.now() || time.getTime() > this.step1Form.endTime;
            } else {
              return time.getTime() > Date.now();
            }*/
          }
        },
        pickerOptions1: {
          disabledDate: (time) =>{
              return time.getTime()<this.searchForm.startTime/* || time.getTime() > Date.now()*/;
          }
        },


      }
    },
    methods: {
      onExport(){},
      onSubmit(){
     
        this.getActList();
      },
      getActList(){

        let _this = this;
       
        _this.$emit('update',{
          msisdn: _this.searchForm.msisdn,
          startTime: _this.utils.formatDate(_this.searchForm.startTime,'y-m-d'),
          endTime: _this.utils.formatDate(_this.searchForm.endTime,'y-m-d','endTime'),
          gameCode: _this.searchForm.gameCode,
          status: _this.searchForm.status,
          pageNum:'1',  //别忘了这步
        });
      }
    },
    created(){

      let _this = this;
      // _this.downFileParms.actId = _this.actId;

    },
  }
</script>
