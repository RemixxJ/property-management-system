import axios from 'axios'

export const superAdminLogin = (param) => {
    return axios({
        method: 'post',
        url: '/superAdminLogin',
        data: param
    })
}

export const cleaningStaffRegister = (param) => {
    return axios({
        method: 'post',
        url: '/cleaningStaffRegister',
        data: param
    })
}
export const cleaningStaffLogin = (param) => {
    return axios({
        method: 'post',
        url: '/cleaningStaffLogin',
        data: param
    })
}

export const getCleaningHouse = () => {
    return axios({
        method: 'get',
        url: '/getCleaningHouse'
    })
}
export const administratorRegister = (param) => {
    return axios({
        method: 'post',
        url: '/administratorRegister',
        data: param
    })
}
export const administratorLogin = (param) => {
    return axios({
        method: 'post',
        url: '/administratorLogin',
        data: param
    })
}
export const adminAdd = (param) => {
    return axios({
        method: 'post',
        url: '/adminAdd',
        data: param
    })
}
export const adminDel = (param) => {
    return axios({
        method: 'post',
        url: '/adminDel',
        data: param
    })
}
export const adminQuery = (param) => {
    return axios({
        method: 'get',
        url: '/adminQuery',
        param
    })
}
export const adminHouseQuery = (param) => {
    return axios({
        method: 'get',
        url: '/adminHouseQuery',
        param
    })
}
export const adminHouseAdd = (param) => {
    return axios({
        method: 'post',
        url: '/adminHouseAdd',
        data: param
    })
}
export const adminHouseEdit = (param) => {
    return axios({
        method: 'post',
        url: '/adminHouseEdit',
        data: param
    })
}
export const adminHouseDel = (param) => {
    return axios({
        method: 'post',
        url: '/adminHouseDel',
        data: param
    })
}
export const adminParkingQuery = (param) =>
    axios({
        method: 'get',
        url: '/adminParkingQuery',
        param
    })
export const adminParkingAdd = (param) => {
    return axios({
        method: 'post',
        url: '/adminParkingAdd',
        data: param
    })
}
export const adminParkingEdit = (param) =>
    axios({
        method: 'post',
        url: '/adminParkingEdit',
        data: param
    })
export const adminParkingDel = (param) => {
    return axios({
        method: 'post',
        url: '/adminParkingDel',
        data: param
    })
}

export const adminParkingQueryFL = () => {
    return axios({
        method: 'get',
        url: '/adminParkingQueryFL'
    })
}

export const adminHouseQueryFL = () => {
    return axios({
        method: 'get',
        url: '/adminHouseQueryFL'
    })
}

export const maintenancePersonnelRegister = (param) => {
    return axios({
        method: 'post',
        url: '/maintenancePersonnelRegister',
        data: param
    })
}
export const maintenancePersonnelLogin = (param) => {
    return axios({
        method: 'post',
        url: '/maintenancePersonnelLogin',
        data: param
    })
}
export const getMaintainHouse = () => {
    return axios({
        method: 'get',
        url: '/getMaintainHouse'
    })
}

export const securityGuardsRegister = (param) => {
    return axios({
        method: 'post',
        url: '/securityGuardsRegister',
        data: param
    })
}
export const securityGuardsLogin = (param) => {
    return axios({
        method: 'post',
        url: '/securityGuardsLogin',
        data: param
    })
}

export const userRegister = (param) => {
    return axios({
        method: 'post',
        url: '/userRegister',
        data: param
    })
}
export const userLogin = (param) => {
    return axios({
        method: 'post',
        url: '/userLogin',
        data: param
    })
}
export const userAdd = (param) => {
    return axios({
        method: 'post',
        url: '/userAdd',
        data: param
    })
}
export const userDel = (param) => {
    return axios({
        method: 'post',
        url: '/userDel',
        data: param
    })
}
export const userQuery = (param) => {
    return axios({
        method: 'get',
        url: '/userQuery',
        param
    })
}

export const carInfoQuery = (params) => {
    return axios({
        method: 'get',
        url: '/carInfoQuery',
        params
    })
}
export const carInfoAdd = (param) => {
    return axios({
        method: 'post',
        url: '/carInfoAdd',
        data: param
    })
}
export const carInfoDel = (param) => {
    return axios({
        method: 'post',
        url: '/carInfoDel',
        data: param
    })
}
export const messageAdd = (param) => {
    return axios({
        method: 'post',
        url: '/messageAdd',
        data: param
    })
}
export const messageUpdata = (param) => {
    return axios({
        method: 'post',
        url: '/messageUpdata',
        data: param
    })
}

export const messageQuery = (params) => {
    return axios({
        method: 'get',
        url: '/messageQuery',
        params
    })
}
export const getUserHouse = (params) => {
    return axios({
        method: 'get',
        url: `/getUserHouse`,
        params
    })
}

export const changePassWord = (params) => {
    return axios({
        method: 'post',
        url: '/changePassWord',
        data: params
    })
}