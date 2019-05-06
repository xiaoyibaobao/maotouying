<template>
  <div>
    <div class="prize-search-criteria">
      <div class="search-item">
        <div class="s-title">奖品名称:</div>
        <div class="input-wrapper">
          <input autocomplete="off" type="text" placeholder="输入奖品名称" v-model="prizeNames" @change="getParams(1,prizeNames)"/>
        </div>
      </div>
      <div class="search-item">
        <div class="s-title">奖品类型:</div>
        <div class="input-wrapper">
          <el-cascader
            expand-trigger="hover"
            :options="typeOptions" v-model="prizeType" @change="getParams(2,prizeType)">
          </el-cascader>
        </div>
      </div>
      <div class="search-item">
        <div class="s-title">库存状态:</div>
        <div class="input-wrapper">
          <el-cascader
            expand-trigger="hover"
            :options="stockOptions" v-model="stockStatus" @change="getParams(3,stockStatus)">
          </el-cascader>
        </div>
      </div>
      <div class="search-item">
         <el-button type="primary" @click="btnClick">查询</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
      data(){
          return {
            typeOptions: [{
              value: '0',
              label: '全部',
            },
              {
                value: '1',
                label: '实物',
              },
              {
                value: '2',
                label: '码劵',
              }
            ],
            stockOptions: [{
              value: '0',
              label: '全部',
            },
              {
                value: '1',
                label: '充足',
              },
              {
                value: '2',
                label: '不足',
              }
            ],
            prizeNames:'',
            prizeType:[],
            stockStatus:[],
            paramsData:{

            }
          }
      },
    methods:{
          //拼接搜索条件
      getParams(num,val){
          switch (num){
            case 1:
                  this.paramsData.name=val;
                break;
            case 2:
                  this.paramsData.type=val.join("");
              break;
            case 3:
                this.paramsData.poolState=val.join("");
              break;
          }
      },
      btnClick(){
        this.$emit("searchFn",this.paramsData);
      }
    }
  }
</script>


<style scoped lang="scss" rel="stylesheet/scss">
  .prize-search-criteria{
    padding: 13px 20px;
    display: flex;
    .search-item{
      display: flex;
      flex-grow:1;
      .s-title{
        flex-grow:1;
        font-size: 14px;
        color: #292c31;
        line-height: 34px;
      }
      .input-wrapper{
        flex-grow:2;
        input{
          width: 100%;
          height: 34px;
          border:solid 1px #d6e1e5;
          border-radius: 4px;
          text-indent: 5px;
          &:focus{
            border:1px solid #20a0ff
          }
        }
      }
    }
  }
</style>
