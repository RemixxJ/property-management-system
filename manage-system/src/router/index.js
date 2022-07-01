import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = (r) => require.ensure([], () => r(require('@/page/login/login')), 'login')
const home = (r) => require.ensure([], () => r(require('@/page/Home/home.vue')), 'home')
// const manage = r => require.ensure([], () => r(require('@/router/manage')), 'manage');
const superAdministrator = (r) =>
  require.ensure([], () => r(require('@/page/super-administrator/index')), 'superAdministrator')
const administratorUser = (r) =>
  require.ensure([], () => r(require('@/page/administrator/user/index')), 'administratorUser')
const administratorHousing = (r) =>
  require.ensure([], () => r(require('@/page/administrator/housing/index')), 'administratorHousing')
const administratorParking = (r) =>
  require.ensure(
    [],
    () => r(require('@/page/administrator/parking-information/index')),
    'administratorParking'
  )
const administratorRepair = (r) =>
  require.ensure(
    [],
    () => r(require('@/page/administrator/repair-information/index')),
    'administratorRepair'
  )
const repairClearHostory = (r) =>
  require.ensure(
    [],
    () => r(require('@/page/administrator/repair-clear-hostory/index')),
    'repairClearHostory'
  )
const securityManage = (r) =>
  require.ensure(
    [],
    () => r(require('@/page/administrator/security-manage/index')),
    'securityManage'
  )
const userHouseMange = (r) =>
  require.ensure([], () => r(require('@/page/user/house-mange/index')), 'userHouseMange')
const userCarInfo = (r) =>
  require.ensure([], () => r(require('@/page/user/car-info/index')), 'userCarInfo')
const userQuerestion = (r) =>
  require.ensure([], () => r(require('@/page/user/querestion/index')), 'userQuerestion')

const maintenanceTodo = (r) =>
  require.ensure([], () => r(require('@/page/maintenance-personnel/index')), 'maintenanceTodo')
const cleaningTodo = (r) =>
  require.ensure([], () => r(require('@/page/cleaning-staff/index')), 'cleaningTodo')
const secutityTodo = (r) =>
  require.ensure([], () => r(require('@/page/security-guards/index')), 'secutityTodo')

const routes = [
  {
    path: '/',
    redirect: { name: 'administratorUser' },
    component: home,
    children: [
      {
        name: 'administratorUser',
        path: '/administratorUser',
        component: administratorUser,
        meta: ['管理员', '用户管理']
      },
      {
        name: 'administratorHousing',
        path: '/administratorHousing',
        component: administratorHousing,
        meta: ['管理员', '房屋管理']
      },
      {
        name: 'administratorParking',
        path: '/administratorParking',
        component: administratorParking,
        meta: ['管理员', '车位管理']
      },
      {
        name: 'administratorRepair',
        path: '/administratorRepair',
        component: administratorRepair,
        meta: ['管理员', '维修管理']
      },
      {
        name: 'securityManage',
        path: '/securityManage',
        component: securityManage,
        meta: ['管理员', '安保管理']
      },
      {
        name: 'repairClearHostory',
        path: '/repairClearHostory',
        component: repairClearHostory,
        meta: ['管理员', '维修与清洁历史']
      },
      {
        name: 'superAdministrator',
        path: '/superAdministrator',
        component: superAdministrator,
        meta: ['超级管理员', '超级管理员']
      },
      {
        name: 'userHouseMange',
        path: '/userHouseMange',
        component: userHouseMange,
        meta: ['用户', '房屋管理']
      },
      {
        name: 'userCarInfo',
        path: '/userCarInfo',
        component: userCarInfo,
        meta: ['用户', '车辆信息录入']
      },
      {
        name: 'userQuerestion',
        path: '/userQuerestion',
        component: userQuerestion,
        meta: ['用户', '问题反馈']
      },
      {
        name: 'maintenanceTodo',
        path: '/maintenanceTodo',
        component: maintenanceTodo,
        meta: ['维修人员', '维修待办']
      },
      {
        name: 'cleaningTodo',
        path: '/cleaningTodo',
        component: cleaningTodo,
        meta: ['清洁人员', '清洁待办']
      },
      {
        name: 'secutityTodo',
        path: '/secutityTodo',
        component: secutityTodo,
        meta: ['安保人员', '车辆录入']
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]
export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
