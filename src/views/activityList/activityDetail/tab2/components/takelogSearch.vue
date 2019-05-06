<template>

  <div class="search">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">

      <el-form-item label="手机号码：" :span="20">
        <el-input  auto-complete="off" v-model="searchForm.msisdn" placeholder="输入手机号码" clearable></el-input>
      </el-form-item>

      <el-form-item label="参与时间：">
        <el-date-picker type="date" placeholder="输入活动开始时间" v-model="searchForm.startTime" :picker-options="pickerOptions0"
                        style="width: 47%;"></el-date-picker>
        至
        <el-date-picker type="date" placeholder="输入活动结束时间" v-model="searchForm.endTime" :picker-options="pickerOptions1"
                        style="width: 47%;"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <!--<el-button type="primary" @click="onExport">导出</el-button>-->
        <!-- 文件导出组件 -->
        <v-export :btnStyle="'padding:12px 18px;'" :btnSize="'medium'" :vStyle="'display:inline-block;vertical-align: middle;'" :downFileParms="downFileParms" :fileName="'参与记录导出'" :fileType="'zip'">
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
          startTime: '',
          endTime: '',
        },
        //ajax
        postdata:{
          name:'',
          activityId:'',
          actStatus:'',
          startTime:'',
          endTime:'',
        },
        downFileParms:{
          reqType: '1',
          activityId: this.actId,
          // msisdn: '',
          // startTime: '',
          // endTime: '',
          // typeId: '',
        },

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

       
        this.$emit('update',{
          msisdn: _this.searchForm.msisdn,
          startTime: _this.utils.formatDate(_this.searchForm.startTime,'y-m-d'),
          endTime: _this.utils.formatDate(_this.searchForm.endTime,'y-m-d','endTime'),
          pageNum:'1',  //从第一页开始
        });
      },


    }

  }
</script>
