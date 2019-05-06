/**
 * Created By dengxiaoyi on 2018/4/14
 *
 * api统一处理
 *
 */
const publicPath="/hawk";
let api={
  /* 导出下载文件 */
  export:"/downFile/down",
  /* 上传文件 */
  upload:"/uploadFile/upload",

  /* 活动管理 */
  getActList: '/act/queryActList',  //1.1.1 活动列表
  createAct: '/act/add',  //1.1.2 创建或修改活动
  getActBaseInfo: '/act/query',  //1.1.3 活动基本信息
  delAct: '/act/del',  //1.1.4 删除活动
  getActTakelog: '/act/takelog',  //1.1.5 活动参与记录
  getActWinPrize: '/act/resultList',  //1.1.6 活动中奖记录
  getProv: '/act/provList',  //1.1.7
  getCity: '/act/cityList',  //1.1.8

  getActAdwardList: '/act/award/list',  //1.2.1 活动奖项列表
  delActAdward: '/act/award/del',  //1.2.2 删除活动奖项
  addActAdward: '/act/award/add',  //1.2.4 新增活动奖品
  getActRuleList: '/act/rule/list',  //1.3.1 活动规则列表
  setActRule: '/act/rule/set',  //1.3.2 新增/修改活动规则
  getAdwardPool: '/pool/list',  //1.4.1 奖池列表
  getBlackList: '/black/list',  //1.5.1 黑名单


  /* 黑名单管理 */
  blacklisting:"/black/list",//黑名单列表查询
  blacklistingDelete:"/black/del",//黑名单删除
  blacklistingEdit:"/black/edit",//黑名单新增/编辑
  blacklistingDetail:"/black/groupDetail",//黑名单详细
  blacklistingLabelList:"/black/labelList",//黑名单标签列表查询

  prizeList:"/pool/list",//奖品列表查询
  prizeDetail:"/pool/detail",//奖品详情查询
  codeList:"/pool/codeList",//码卷详情查询
  stockMessage:"/pool/setStock",//库存管理
  setPrize:"/pool/set",//新增/修改奖品
  prizeDetails:"/pool/details",//编辑查询接口
  prizeDel:"/pool/del",//奖品删除

};
// for (let key in api) {
// 	api[key] = publicPath + api[key];
// }
export default api;
