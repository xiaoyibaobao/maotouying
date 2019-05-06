/**
 * Created By xuzhaohui on 2017/6/5
 * Covered By dengxiaoyi on 2018/4/14
 * 公共的工具方法
 *
 */

let utils = {

    /**
     * 保存数据在sessionStorage，以键值对存在
     * @param {String} name  键名
     * @param {String/Object/Array/...} value 键值
     *
     */
    setSessionStorage: function (name, value) {
        if (!this.isSupportStorage())
            return null;

        if (this.isObject(value))
            value = JSON.stringify(value);

        sessionStorage.setItem(name, value);
    },

    /**
     * 获取sessionStorage数据
     * @param {String} name 键名
     * @return {String/Object/...} 键值
     *
     */
    getSessionStorage: function (name) {
        if (!this.isSupportStorage())
            return null;
        let value = sessionStorage.getItem(name);
        if (this.isJSON(value)) {
            return JSON.parse(value);
        } else {
            return value;
        }
    },

    /**
     * 保存数据在localStorage，以键值对存在
     * @param {String} name  键名
     * @param {String/Object/Array/...} value 键值
     *
     */
    setLocalStorage: function (name, value) {
        if (!this.isSupportStorage())
            return null;

        if (this.isObject(value))
            value = JSON.stringify(value);

        localStorage.setItem(name, value);
    },

    /**
     * 获取当前时间
     * */
    getNowDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    },

    /**
     * 获取localStorage数据
     * @param {String} name 键名
     * @return {String/Object/...} 键值
     *
     */
    getLocalStorage: function (name) {
        if (!this.isSupportStorage())
            return null;
        let value = localStorage.getItem(name);
        if (this.isJSON(value)) {
            return JSON.parse(value);
        } else {
            return value;
        }
    },

    /**
     * 判断字符串是否为JSON
     * @param  {String}  str json字符串
     * @return {Boolean}     true/false
     */
    isJSON: function (str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * 判断是否支持sessionStorage和localStorage
     * @return {Boolean} true/false
     *
     */
    isSupportStorage: function () {
        if (window.sessionStorage && window.localStorage)
            return true;
        else
            return false;
    },

    /**
     * 判断是否为object对象，排除null
     * @param  {obj}  value 判断的对像
     * @return {Boolean} true/false
     *
     */
    isObject: function (value) {
        return (value !== null && typeof value === 'object');
    },

    /**
     * 判断是否为整数
     * @param  {Number}  int 判断的数字
     * @return {Boolean}     true/false
     */
    isInteger: function (int) {
        var n = Number(int);
        return typeof n === 'number' && n % 1 === 0
    },

    /**
     * 获取url地址参数
     * @param  {String} name 参数名
     * @return {String}      参数值
     *
     */
    getQueryString: function (name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        let context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },


    hasClass: function (ele, cls) {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },

    /**
     * 手机号码验证
     * @param  {String} phone 手机号
     * @return {Boolean}
      */
    isPhoneNo: function (phone) {
        var pattern = /^1[34578]\d{9}$/;
        return pattern.test(phone);
    },


    /**
    * 下载文件
    * @param  {String} fileName 下载后文件名
    * @param  file 文件流
    * @param {String}   type   文件类型
     */
    loadFile: function (fileName, file, type) {
        let blob = new Blob([file], {
            type: `application/${type}`
        });
        let aLink = document.createElement("a");
        let href = window.URL.createObjectURL(blob); //创建下载的链接
        let date = new Date(new Date().getTime()).Format("yyyyMMdd");//年月日
        aLink.href = href;
        aLink.download = fileName + date;//文件名+时间
        document.body.appendChild(aLink);
        aLink.click(); //点击下载
        document.body.removeChild(aLink); //下载完成移除元素
        window.URL.revokeObjectURL(blob); //释放掉blob对象
    },

  formatDate(date, rule, type){

    if(Object.prototype.toString.call(date).slice(8, -1)!="Date"){
      return ''
    }

    let year = date.getFullYear(),
      month = date.getMonth()+1,
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds(),
      ret;

    switch(rule){
      case "yy/mm/dd":
      case "y/m/d":
        ret = year+'/'+month+'/'+day;
        break;
      case 'y-m-d':
      case 'yy-mm-dd':
        let str = ' 00:00:00';
        if(type == 'endTime'){
          str = ' 23:59:59';
        }
        ret=year+'-'+month+'-'+day+str;
        break;
      default:
        ret = year+'/'+month+'/'+day;
        break;
    }

    return ret
  },

    getParam(name) {
        let regExp = new RegExp("[?&]" + name + "=([^&]*)(&?)", "i");
        let value = regExp.exec(location.hash);
        let ret;
        if (value != null) {
            ret = value[1] ? decodeURIComponent(value[1]) : '';
        }
        return ret
    },

  extend(obj1, obj2){
      let isClass = function(o){
        return Object.prototype.toString.call(o).slice(8,-1);
    };
      let result, oClass=isClass(obj2);

      if(oClass=="Object"){
        // result = {};
      }else if(oClass="Array"){
        // result = [];
      }else{
        return obj2
      }

      for(let key in obj2){
        let copy = obj2[key];
        if(isClass(copy)=="Object"){
          this.extend(obj1[key], copy);
        }else if(isClass(copy)=="Array"){
          this.extend(obj1[key], copy);
        }else{
          obj1[key] = obj2[key];
        }
      }

  },
  deepcopy(obj){

    let isClass = function(o){
      return Object.prototype.toString.call(o).slice(8,-1);
    };

    let result, oClass=isClass(obj);

    if(oClass=="Object"){
      result = {};
    }else if(oClass="Array"){
      result = [];
    }else{
      return obj
    }

    for(let key in obj){
      let copy = obj[key];
      if(isClass(copy)=="Object"){
        result[key] = this.deepcopy(copy);
      }else if(isClass(copy)=="Array"){
        result[key] = this.deepcopy(copy);
      }else{
        result[key] = obj[key];
      }
    }

      return result
  },
  //去空值项
  removeBlankItem(obj){
    let ret;
    let obj1 = this.deepcopy(obj);

    for(var i in obj1){
      if(obj1[i]!=null || (typeof obj1[i] == "string" && obj1[i].trim().length == 0)){
        delete obj1[i];
      }
    }

    return ret

  },







};
export default utils;
