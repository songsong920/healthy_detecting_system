import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
Vue.use(Router);
/* layout */
import Layout from '../views/layout/Layout';
export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true,
  name:'登录'
},
  {
    path: '/register',
    component: _import('login/register'),
    hidden: true,
    name: '注册'
  },
{
  path: '/404',
  component: _import('error/404'),
  hidden: true
},
{
  path: '*',
  redirect: '/404'
  },
// 个人信息
// 系统首页
{
  path: '/',
  component: Layout,
  redirect: 'home',
  children: [{
    path: 'home',
    component: _import('homepage/index'),
    name: '系统首页',
    meta: {
      parent: true
    }
  }]
},
// 个人信息
{
  path: '/account',
  component: Layout,
  redirect:'account',
  children: [{
    path: 'account',
    component: _import('account/index'),
    name: '个人信息',
    meta: {
      parent: true
    }
  }]
},
// 医生管理
{
  path: '/doctor',
  component: Layout,
  hidden: true,
  children: [
    {
      path: 'doctorManager',
      component: _import('doctor/index'),
      name: '医生管理',
    },
    {
      path: 'myDoctor',
      component: _import('doctor/myDoctor'),
      name: '医生栏目',
    },
    
    {
      path: 'scheduling',
      component: _import('doctor/scheduling'),
      name: '医生排班',
    },
  ]
  },
// 患者管理
{
  path: '/patient',
  component: Layout,
  hidden: true,
  children: [
    {
      path: 'patientManager',
      component: _import('patient/index'),
      name: '患者管理',
    },
    {
      path: 'patientInfo',
      component: _import('patient/patientInfo'),
      name: '患者信息',
    },
    {
      path: 'personalInfo',
      component: _import('patient/personal/index'),
      name: '个人详情',
    },
    {
      path: 'alarmInfo',
      component: _import('patient/alarm/index'),
      name: '告警信息',
    },
    {
      path: 'prescription',
      component: _import('patient/prescription/index'),
      name: '处方管理',
    },
    {
      path: 'dailyReport',
      component: _import('patient/dailyReport/index'),
      name: '每日上报',
    },
    {
      path: 'statistics',
      component: _import('patient/statistics/index'),
      name: '患者统计',
    },
    {
      path: 'abnormal',
      component: _import('patient/abnormal/index'),
      name: '异常患者',
    }
  ]
  },
  // 药物系统
  {
    path: '/medicine',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'medicineManager',
        component: _import('medicine/index'),
        name: '药物系统',
      },
    ]
  },
]
export default new Router({
  mode: 'history', 
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap,

});

export const asyncRouterMap = [

]

