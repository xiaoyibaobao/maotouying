<template>

  <div class="search" >
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">

      <el-form-item label="黑名单组：" :span="20">
        <el-input  auto-complete="off" v-model="searchForm.name" placeholder="输入黑名单组名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>

    </el-form>
  </div>

</template>

<script>
  export default {
    props:['actId'],
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
      }
    },
    methods: {
      onSubmit(){
  
        this.getActList();
      },
      getActList(){

        this.$emit('update',{
          name:this.searchForm.name,
        });
      }
    }
  }
</script>
