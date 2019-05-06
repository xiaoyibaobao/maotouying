<template>
  <div class="modal">
    <div class="edit-pop">
      <div class="edit-head">
        修改奖品
        <button @click="closeModal(false)" type="button" aria-label="Close" class="el-message-box__headerbtn">
          <i class="el-message-box__close el-icon-close"></i>
        </button>
      </div>
      <div class="edit-con">
        <div class="edit-item">
          <div class="item-title">奖品ID：</div>
          <div class="item-info">
            {{infoObj.typeId}}
          </div>
        </div>
        <div class="edit-item">
          <div class="item-title">奖品类型：</div>
          <div class="item-info" v-html="infoObj.type==1 ? '实物' : '码券' ">
          </div>
        </div>
        <div class="edit-item">
          <div class="item-title">
            <span>*</span>奖品名称：</div>
          <div class="item-info">
            <input autocomplete="off" v-model="infoObj.name" placeholder="请输入奖品名称" class="prize-name">
          </div>
        </div>
        <div class="edit-item">
          <div class="item-title">
            <span>*</span>单价：</div>
          <div class="item-info">
            <el-input  auto-complete="off" v-model="infoObj.price" @keyup.native="infoObj.price=infoObj.price.replace(/[^\d\.]/g,'')" ></el-input>
          </div>
        </div>
        <div class="edit-item">
          <div class="item-title">库存预警阈值：</div>
          <div class="item-info">
            <el-input  auto-complete="off" v-model="infoObj.cool" @keyup.native="infoObj.cool=infoObj.cool.replace(/[^0-9]/g,'')"></el-input>
          </div>
        </div>
        <div class="edit-item">
          <div class="item-title">奖品描述：</div>
          <div class="item-info" style="width: 300px">
            <el-input  auto-complete="off" type="textarea" v-model="infoObj.desc"></el-input>
          </div>
        </div>
        <div v-if="isSuccess==true">
          <el-alert title="修改成功" type="success">
          </el-alert>
        </div>
        <div v-if="isFalse==true">
          <el-alert title="修改失败，请检查填写是否正确" type="error">
          </el-alert>
        </div>
        <div class="edit-item">
          <el-button type="info" size="small" class="edit-btn" @click="closeModal">取消</el-button>
          <el-button type="primary" size="small" class="edit-btn" @click="setEdit">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    obj: Object
  },
  data() {
    return {
      isFalse: false,
      isSuccess: false,
      desc: "",
      prizeName: this.obj.prizeName,
      threshold: "",
      infoObj: {},
      strLength: "",
      markIndex: "",
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    closeModal(refresh) {
      this.$emit("closeEditeModal", refresh);
    },
    getInfo() {
      let data = {
        data: { typeId: this.obj.typeId }
      };
      this.axios.post(this.api.prizeDetails, data).then(res => {
        this.infoObj = res.data.data;
      });
    },
    setEdit() {
      if (this.infoObj.name == "" || this.infoObj.price == "") {
        this.isFalse = true;
        return;
      }
      let _this = this;
      let data = {
        data: {
          typeId: this.infoObj.typeId,
          prizeName: this.infoObj.name,
          prizePrice: this.infoObj.price,
          totalNum: this.infoObj.totalNum,
          threshold: this.infoObj.cool,
          desc: this.infoObj.desc
        },
        head: {
          operationType: "2"
        }
      };
      this.axios.post(this.api.setPrize, data).then(res => {
        if (res.data.head.respCode == 0) {
          this.isSuccess = true;
          setTimeout(function() {
            _this.closeModal(true);
          }, 2000);
        } else {
          this.isFalse = true;
          setTimeout(function() {
            this.isFalse = false;
          }, 2000);
        }
      });
    }
  },



  
};
</script>
<style   lang="scss" rel="stylesheet/scss">
.edit-pop {
  position: absolute;
  left: 50%;
  top: 100px;
  transform: translate(-50%, 0);
  background: #fff;
  width: 600px;
  height: 500px;
  padding: 20px;
  .edit-head {
    font-size: 16px;
    line-height: 36px;
    text-align: left;
  }
  .edit-con {
    width: 500px;
    margin-top: 10px;
    .edit-item {
      display: flex;
      font-size: 14px;
      line-height: 36px;
      margin-bottom: 10px;
      .item-title {
        order: 1;
        text-align: right;
        width: 150px;
        margin-right: 20px;
        span {
          color: red;
        }
      }
      .item-info {
        order: 2;
        text-align: right;
      }
      .edit-btn {
        display: inline-block;
        margin: 20px 0 0 100px;
      }
    }
  }
  input.prize-name {
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 14px;
    &:focus {
      border-color: #409eff;
      outline: 0;
    }
    &::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #d6e1e5;
      font-size: 14px;
    }

    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #d6e1e5;
      font-size: 14px;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #d6e1e5;
      font-size: 14px;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #d6e1e5 !important;
      font-size: 14px;
    }
  }
}
</style>
