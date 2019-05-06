<template>
  <div class="modal">
    <div class="stock-pop">
      <div class="stock-head">
        库存管理
        <button @click="closeModal" type="button" aria-label="Close" class="el-message-box__headerbtn">
          <i class="el-message-box__close el-icon-close"></i>
        </button>
      </div>
      <div class="stock-con">
        <div class="stock-item">
          <div class="item-title">类型：</div>
          <div class="item-info">
            <template>
              <el-radio v-model="radio" label="1" @change="getRadio">增库存</el-radio>
              <el-radio v-if="obj.prizeType==1" v-model="radio" label="2" @change="getRadio">减库存</el-radio>
            </template>
          </div>
        </div>
        <div v-if="radio=='2'" class="stock-item">
          <div class="item-title">最大可减库存数：</div>
          <div class="item-info">
            {{obj.stock}}
          </div>
        </div>
        <div class="stock-item" v-if="obj.prizeType==1">
          <div class="item-title">数量：</div>
          <div class="item-info">
            <el-input  auto-complete="off"  :placeholder="radio == '1' ? '请输入增库存的数量' : '请输入减库存的数量'" v-model="num" v-bind:class="{'error':status }" @keyup.native="num=num.replace(/[^0-9]/g,'')" @input="comNum"></el-input>
          </div>
        </div>
        <div class="stock-item" v-if="obj.prizeType==2">
          <div class="item-title">码券文件:</div>
          <div class="item-info">
            <!-- 自定义 -->
            <!-- 文件上传和下载组件 -->
            <!-- handleFileUrl 文件上传成功之后的url,用事件handleFileUrl监听，用getFileUrl方法接收-->
            <!-- exampleFileUrl 必传参数  示列文件的本地路径 -->

            <v-upload @handleFileUrl="getFileUrl" :exampleFileUrl="exampleFileUrl"></v-upload>
          </div>
        </div>
        <div class="tips" v-if="status==true">
          <template>
            <el-alert
              title="填写数值不能超过最大值或小于0"
              type="error">
            </el-alert>
          </template>
        </div>
        <div class="tips" v-if="successStatus==true">
          <template>
            <el-alert
              title="保存成功"
              type="success">
            </el-alert>
          </template>
        </div>
        <div class="tips" v-if="errorStatus==true">
          <template>
            <el-alert
              title="保存失败"
              type="error">
            </el-alert>
          </template>
        </div>
        <div class="stock-item">
          <el-button type="primary" size="small" class="stock-btn" @click="flag && save()">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VUpload from "../../../components/upload";
  import VExport from "../../../components/export";
  //示列本地路径
  const exampleFileUrl1 = "/static/examples/educe_code_template.xlsx";
  export default {
    props: {
      obj:Object,
    },
    components: {
      VUpload,
      VExport
    },
    data () {
      return {
        radio: '1',
        num:"",
        status:false,
        successStatus:false,
        inpplaceholder:"",
        errorStatus:false,
        isone:true,
        fileUrl:"",
        exampleFileUrl: exampleFileUrl1,
        flag:true,//防止保存后继续操作
      };
    },
    created(){
       
    },
    methods:{
      //获取文件上传成功之后的路径
      getFileUrl(fileUrl) {
        this.fileUrl = fileUrl;
      },
      closeModal(){
          this.$emit("closeModal",true)
      },
      getRadio(){
//          this.radio=id;
        if(this.radio==2){
            this.comNum()
        }
      },
      getMax(){
        this.axios.post(this.api.prizeDetail,data).then(res => {
          if(res.data.head.respCode==0){
           
          }

        })
      },
      comNum(){
          if(this.radio==2){
         
            if(parseInt(this.num)>parseInt(this.obj.stock)){
              this.status=true
            }else if(parseInt(this.num)<0){
              this.status=true
            }else{
              this.status=false
            }
          }
      },
      save(){

          if(!this.isone){
            this.isone=false
              return
          }
          let _this = this;
          let data={};
          if(this.obj.prizeType==1){
            data={
              data:{
                type:this.radio,
                num:this.num,
                prizeId:this.obj.typeId,
                aType:"1"
              }
            }
          }else{
            data={
              data:{
                type:this.radio,
                fileUrl:this.fileUrl,
                prizeId:this.obj.typeId,
                aType:"2"
              }
            }
          }

          if(!this.status){
            this.axios.post(this.api.stockMessage,data).then(res => {
              if(res.data.head.respCode==0){
                this.flag=false;
                this.successStatus=true;
                setTimeout(function(){
                  _this.closeModal()
                },2000)
              }else{
                this.errorStatus=true;
                setTimeout(function(){
                  _this.errorStatus=false;
                },2000)
              }

            })
          }
      }
    },
  }
</script>
<style   lang="scss" rel="stylesheet/scss">
  .stock-pop{
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translate(-50%,0);
    background: #fff;
    width: 600px;
    height: 300px;
    padding: 20px;
    .stock-head{
      font-size: 16px;
      line-height: 36px;
      text-align: left;
    }
    .error{
      input{
        border:1px red solid;
      }
    }
    .tips{
      margin: 15px 0 0;
    }
    .stock-con{
      /*width: 400px;*/
      margin-top:10px;
      .stock-item{
        display: flex;
        font-size: 14px;
        line-height:36px;
        .item-title{
          order: 1;
          text-align: right;
          width: 150px;
          margin-right: 20px;
        }
        .item-info{
          order: 2;
          text-align: right;
          .upload-box{
            .upload-cont{
              margin-top: 0 !important;
              .upload-demo{
                padding: 0 !important;
              }
            }
          }
        }
        .stock-btn{
          display: block;
          margin: 20px auto;
        }
      }

    }
  }
</style>
