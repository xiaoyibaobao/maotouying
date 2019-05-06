// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* 引入vue */
import Vue from 'vue';

/*引入ElementUI*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/**
 * 页面唯一入口
 * */
import App from './App';

/**
 * 路由配置
 * */
import router from './router';
/* 状态管理 */
import store from './store/store';

/**
 * axios请求
 * */
import axios from 'axios';

/**
 * 接口地址统一管理文件
 */
import Api from '@/extend/module/api.js';

/**
 * 全局公用方法
 */
import Utils from '@/extend/module/utils.js';

/**
 * 模拟数据
 */
import MyData from '@/extend/module/data.js';


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2017-10-22 15:16:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2017-10-22 15:16:41.566
Date.prototype.Format = function (fmt) { //author: Eric.wu
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};


/**
 * css 初始化
 */
import '../static/css/reset.css';

import './scss/index.scss';
import { toUnix } from 'upath';
/**
 * 注册全局插件
 * ElementUI，router，
 * */
Vue.use(ElementUI);
Vue.use(router);

/**
 * 挂载全局参数
 *
 * */
Vue.prototype.api = Api;
Vue.prototype.utils = Utils;
Vue.prototype.mydata = MyData;
/**
 * axios
 * axios不支持vue.use()方式声明使用,在main.js申明Vue.prototype.axios=axios;那么在其他组件就可以this.axios调用使用
  */
Vue.prototype.axios = axios;

/* 阻止在启动时生成生产提示 */
Vue.config.productionTip = false;

/**
 * num
 * 记录请求次数
 */
let num = 0;
//添加请求拦截器
axios.interceptors.request.use(config => {
  num++;
  if (num > 0) {
    //开始loading
    vm.isLoaging = true;
  }
  return config;
},
  error => {

  });

// 添加响应拦截器
axios.interceptors.response.use(response => {
  //对响应数据做些事
  num--;
  if (num <= 0) {
    setTimeout(() => {
      vm.isLoaging = false;
    }, 200);
  }
  return response;
}, error => {
  //响应错误时做些事
  vm.isLoaging = false;
  return Promise.reject(error);
});

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,//挂载store在vm实列上
  components: { App },
  template: '<App/>',
  data() {
    return {
      isLoaging: false
    }
  },
  created() {
  }
});



