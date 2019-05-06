<template>
  <el-form :inline="true" :model="searchForm" :rules="searchRules" class="demo-form-inline">

    <el-form-item label="活动名称：" :span="20">
      <el-input  auto-complete="off" v-model="searchForm.name" placeholder="输入活动名称"></el-input>
    </el-form-item>

    <el-form-item label="活动ID：" prop="id" :span="20">
      <el-input  auto-complete="off" v-model="searchForm.id" placeholder="输入活动ID"></el-input>
    </el-form-item>

    <el-form-item label="活动状态" :span="20">
      <el-select v-model="searchForm.status" placeholder="全部">
        <el-option label="全部" value=""></el-option>
        <el-option label="未开始" value="0"></el-option>
        <el-option label="进行中" value="1"></el-option>
        <el-option label="已结束" value="2"></el-option>
      </el-select>
    </el-form-item>

    <br>

    <el-form-item label="活动开始时间">
      <el-col :span="20">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="输入活动开始时间" v-model="searchForm.startTime" :picker-options="pickerOptions0" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="活动结束时间">
      <el-col :span="20">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="输入活动结束时间" v-model="searchForm.endTime" :picker-options="pickerOptions1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  export default {
    data(){
      return {
        searchForm: {
          name: '',
          startTime: '',
          endTime: '',
          id: '',
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

        //time
        //日期
        pickerOptions0: {
          disabledDate: (time) => {
            /*if (this.step1Form.endTime != "") {
              return time.getTime() > Date.now() || time.getTime() > this.step1Form.endTime;
            } else {
              return time.getTime() > Date.now();
            }*/
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() < this.searchForm.startTime/* || time.getTime() > Date.now()*/;
          }
        },
      }
    },
    methods: {
      onSubmit(){
   
        this.getActList();
      },
      getActList(){
      
        this.$emit('update',{
          name:this.searchForm.name,
          activityId:this.searchForm.id,
          actStatus:this.searchForm.status,
          startTime:this.utils.formatDate(this.searchForm.startTime, 'y/m/d'),
          endTime:this.utils.formatDate(this.searchForm.endTime, 'y/m/d')&&this.utils.formatDate(this.searchForm.endTime, 'y/m/d')+" 23:59:59",
          pageNum:'1',
        });
      },

    }
  }
</script>
