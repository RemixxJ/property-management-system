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
        meta: ['?????????', '????????????']
      },
      {
        name: 'administratorHousing',
        path: '/administratorHousing',
        component: administratorHousing,
        meta: ['?????????', '????????????']
      },
      {
        name: 'administratorParking',
        path: '/administratorParking',
        component: administratorParking,
        meta: ['?????????', '????????????']
      },
      {
        name: 'administratorRepair',
        path: '/administratorRepair',
        component: administratorRepair,
        meta: ['?????????', '????????????']
      },
      {
        name: 'securityManage',
        path: '/securityManage',
        component: securityManage,
        meta: ['?????????', '????????????']
      },
      {
        name: 'repairClearHostory',
        path: '/repairClearHostory',
        component: repairClearHostory,
        meta: ['?????????', '?????????????????????']
      },
      {
        name: 'superAdministrator',
        path: '/superAdministrator',
        component: superAdministrator,
        meta: ['???????????????', '???????????????']
      },
      {
        name: 'userHouseMange',
        path: '/userHouseMange',
        component: userHouseMange,
        meta: ['??????', '????????????']
      },
      {
        name: 'userCarInfo',
        path: '/userCarInfo',
        component: userCarInfo,
        meta: ['??????', '??????????????????']
      },
      {
        name: 'userQuerestion',
        path: '/userQuerestion',
        component: userQuerestion,
        meta: ['??????', '????????????']
      },
      {
        name: 'maintenanceTodo',
        path: '/maintenanceTodo',
        component: maintenanceTodo,
        meta: ['????????????', '????????????']
      },
      {
        name: 'cleaningTodo',
        path: '/cleaningTodo',
        component: cleaningTodo,
        meta: ['????????????', '????????????']
      },
      {
        name: 'secutityTodo',
        path: '/secutityTodo',
        component: secutityTodo,
        meta: ['????????????', '????????????']
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
