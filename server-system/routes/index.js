var express = require('express')
var router = express.Router()
var superAdmin = require('../contrsllers/super-administrator')
var cleaningStaff = require('../contrsllers/cleaning-staff')
var admin = require('../contrsllers/administrator')
var maintenancePersonnel = require('../contrsllers/maintenance-personnel')
var securityGuards = require('../contrsllers/security-guards')
var user = require('../contrsllers/user')
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' })
})
router.post('/cleaningStaffRegister', cleaningStaff.cleaningStaffRegister)
router.post('/cleaningStaffLogin', cleaningStaff.cleaningStaffLogin)
router.get('/getCleaningHouse', cleaningStaff.getCleaningHouse)

router.post('/administratorRegister', admin.administratorRegister)
router.post('/administratorLogin', admin.administratorLogin)
router.post('/adminAdd', admin.adminAdd)
router.post('/adminDel', admin.adminDel)
router.get('/adminQuery', admin.adminQuery)
router.get('/adminHouseQuery', admin.adminHouseQuery)
router.post('/adminHouseAdd', admin.adminHouseAdd)
router.post('/adminHouseEdit', admin.adminHouseEdit)
router.post('/adminHouseDel', admin.adminHouseDel)
router.get('/adminParkingQuery', admin.adminParkingQuery)
router.post('/adminParkingAdd', admin.adminParkingAdd)
router.post('/adminParkingEdit', admin.adminParkingEdit)
router.post('/adminParkingDel', admin.adminParkingDel)
router.get('/adminParkingQueryFL', admin.adminParkingQueryFL)
router.get('/adminHouseQueryFL', admin.adminHouseQueryFL)
router.post('/changePassWord', admin.changePassWord)

router.post('/maintenancePersonnelRegister', maintenancePersonnel.maintenancePersonnelRegister)
router.post('/maintenancePersonnelLogin', maintenancePersonnel.maintenancePersonnelLogin)
router.get('/getMaintainHouse', maintenancePersonnel.getMaintainHouse)

router.post('/securityGuardsRegister', securityGuards.securityGuardsRegister)
router.post('/securityGuardsLogin', securityGuards.securityGuardsLogin)

router.post('/userRegister', user.userRegister)
router.post('/userLogin', user.userLogin)
router.post('/userAdd', user.userAdd)
router.post('/userDel', user.userDel)
router.get('/userQuery', user.userQuery)

router.post('/carInfoAdd', user.carInfoAdd)
router.post('/carInfoDel', user.carInfoDel)
router.get('/carInfoQuery', user.carInfoQuery)

router.get('/messageQuery', user.messageQuery)
router.post('/messageAdd', user.messageAdd)
router.post('/messageUpdata', user.messageUpdata)

router.get('/getUserHouse', user.getUserHouse)

router.post('/superAdminLogin', superAdmin.superAdminLogin)
module.exports = router