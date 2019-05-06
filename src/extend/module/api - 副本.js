/**
 * Created By dengxiaoyi on 2018/4/14
 *
 * api统一处理
 *
 */
// const publicPath="/hawk";
let api={
    /* 导出下载文件 */
    export:"/downFile/down",
    /* 上传文件 */
    upload:"/uploadFile/upload",

    /* 活动管理 */
    getProv: '/act/provList',
    getCity: '/act/cityList',
    createAct: '/act/add',  //创建或修改活动
    delAct: '/act/del',  //删除活动
    getActList: '/act/queryActList',  //活动列表
    getActBaseInfo: '/act/query',  //活动基本信息
    getActTakelog: '/act/takelog',  //活动参与记录
    getActWinPrize: '/act/resultList',  //活动中奖记录
    getActAdwardList: '/act/award/list',  //1.2.1 活动奖项列表
    addActAdward: '/act/award/add',  //1.2.4 新增活动奖品
    getAdwardPool: '/pool/list',  //2.1.1 奖池列表 
    getActRuleList: '/act/rule/list',  //1.3.1 活动规则列表
    setActRule: '/act/rule/set',  //1.3.2 新增/修改活动规则

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
