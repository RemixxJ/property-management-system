//侧边栏导航数据
export default [{
        text: '超级管理员',
        name: 'superadministrator',
        path: '/superAdministrator'
    },
    {
        text: '管理员',
        name: 'administrator',
        children: [{
                text: '用户管理',
                name: 'administratorUser',
                path: '/administratorUser'
            },
            {
                text: '房屋管理',
                name: 'administratorHousing',
                path: '/administratorHousing'
            },
            {
                text: '车位管理',
                name: 'administratorParking',
                path: '/administratorParking'
            },
            {
                text: '维修管理',
                name: 'administratorRepair',
                path: '/administratorRepair'
            },
            {
                text: '安保管理',
                name: 'securityManage',
                path: '/securityManage'
            },

            {
                text: '维修与清洁历史',
                name: 'repairClearHostory',
                path: '/repairClearHostory'
            }
        ]
    },
    {
        text: '用户',
        name: 'user',
        children: [{
                text: '房屋管理',
                name: 'userHouseMange',
                path: '/userHouseMange'
            },
            {
                text: '车辆信息录入',
                name: 'userCarInfo',
                path: '/userCarInfo'
            },
            {
                text: '问题反馈',
                name: 'userQuerestion',
                path: '/userQuerestion'
            }
        ]
    },
    {
        text: '维修人员',
        name: 'maintenancePersonnel',
        children: [{
            text: '维修待办',
            name: 'maintenanceTodo',
            path: '/maintenanceTodo'
        }]
    },
    {
        text: '清洁人员',
        name: 'cleaningStaff',
        children: [{
            text: '清洁待办',
            name: 'cleaningTodo',
            path: '/cleaningTodo'
        }]
    },
    {
        text: '安保人员',
        name: 'securityGuards',
        children: [{
            text: '车辆录入',
            name: 'secutityTodo',
            path: '/secutityTodo'
        }]
    }
]