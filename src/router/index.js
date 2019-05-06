import Vue from 'vue';
import Router from 'vue-router';
/*----异步加载对应的页面组件----*/

//404
const NotFound = resolve => require(['@/views/404'], resolve);

//首页
const Home = resolve => require(['@/views/home'], resolve);
//活动管理

//创建活动页面
const CreateActivity = resolve => require(['@/views/createActivity/createActivity'], resolve);
const Step1 = resolve => require(['@/views/createActivity/step1/step1'], resolve);
const Step2 = resolve => require(['@/views/createActivity/step2/step2'], resolve);
const Step3 = resolve => require(['@/views/createActivity/step3/step3'], resolve);



//活动列表页面
const ActivityList = resolve => require(['@/views/activityList/activityList'], resolve);
const ActivityDetail = resolve => require(['@/views/activityList/activityDetail/activityDetail'], resolve);
const Tab1 = resolve => require(['@/views/activityList/activityDetail/tab1/tab1'], resolve);
const Tab2 = resolve => require(['@/views/activityList/activityDetail/tab2/tab2'], resolve);
const Tab3 = resolve => require(['@/views/activityList/activityDetail/tab3/tab3'], resolve);

//奖品管理
//创建奖品页面
const CreatePrize = resolve => require(['@/views/createPrize'], resolve);
//奖品列表页面
const PrizeList = resolve => require(['@/views/prizeList'], resolve);

//黑名单管理
//创建黑名单页面
const CreateBlacklist = resolve => require(['@/views/createBlacklist'], resolve);
//黑名单列表页面
const Blacklisting = resolve => require(['@/views/blacklisting'], resolve);

//注入路由
Vue.use(Router);
export default new Router({
  // mode: 'history',
  routes: [
    // 404页面前端处理
    {
      path: '*',//匹配所有路径
      component: NotFound
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/activity_list',
      children: [
        // 创建活动
        {
          path: 'create_activity',
          name: 'CreateActivity',
          components: {
            default: CreateActivity
          },
          children: [
            { path: '', component: Step1 },
            { path: 'step1', name:'step1', component: Step1 },
            { path: 'step2', name:'step2',component: Step2 },
            { path: 'step3', name:'step3',component: Step3 },
          ]
        },
        // 活动列表
        {
          path: 'activity_list',
          name: 'ActivityList',
          components: {
            default: ActivityList
          },
          //格式正确
          children: [
            {
              path: 'detail',
              name: 'ActivityDetail',
              component: ActivityDetail,
              children: [
                { path: '', component: Tab1 },
                { path: 'tab1', name:'tab1', component: Tab1 },
                { path: 'tab2', name:'tab2', component: Tab2 },
                { path: 'tab3', name:'tab3', component: Tab3 },
              ]
            }
          ]
        },

        // 创建奖品
        {
          path: 'create_prize',
          name: 'CreatePrize',
          components: {
            default: CreatePrize
          }
        },
        // 奖品列表
        {
          path: 'prize_list',
          name: 'PrizeList',
          components: {
            default: PrizeList
          }
        },
        // 创建黑名单
        {
          path: 'create_blacklist',
          name: 'CreateBlacklist',
          components: {
            default: CreateBlacklist
          }
        },
        // 黑名单列表
        {
          path: 'blacklisting',
          name: 'Blacklisting',
          components: {
            default: Blacklisting
          }
        },

      ]

    }
  ]
})
