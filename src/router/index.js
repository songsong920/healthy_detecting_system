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
  name: '登录'
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
  {
    path: '/',
    component: Layout,
    redirect: 'account',
    children: [{
      path: 'account',
      component: _import('account/index'),
      name: '个人信息',
      meta: {
        parent: true
      }
    }]
  },
// 管理员
{
  path: '/admin',
  component: Layout,
  hidden: true,
  redirect: 'admin/statistics',
  children: [
    {
      path: 'statistics',
      component: _import('patient/statistics/index'),
      name: '数据统计',
    },
    {
      path: 'abnormal',
      component: _import('patient/abnormal/index'),
      name: '异常患者',
    },
    {
      path: 'patientManager',
      component: _import('patient/index'),
      name: '患者管理',
    },
    {
      path: 'doctorManager',
      component: _import('doctor/index'),
      name: '医生管理',
    },
    {
      path: 'scheduling',
      component: _import('doctor/scheduling'),
      name: '医生排班',
    },
  ]
  },
// 医生
{
  path: '/doctor',
  component: Layout,
  hidden: true,
  children: [
    {
      path: 'patientInfo',
      component: _import('patient/patientInfo'),
      name: '患者信息',
    },
    {
      path: 'alarmInfo',
      component: _import('patient/alarm/index'),
      name: '告警信息',
    },
    {
      path: 'medicineManager',
      component: _import('medicine/index'),
      name: '药物系统',
    },
  ]
},
// 患者
{
  path: '/patient',
  component: Layout,
  hidden: true,
  children: [
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
      path: 'myDoctor',
      component: _import('doctor/myDoctor'),
      name: '医生栏目',
    },
    {
      path: 'doctorSelect',
      component: _import('doctor/doctorSelect'),
      name: '选择医生',
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

