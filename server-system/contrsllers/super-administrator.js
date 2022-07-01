//超级管理员
var connection = require('../util/connection-mysql')
let getUserInfo = (username) => {
        //获取用户详情
        let sql = `select * from superAdministrator where username=?`
        let sqlArr = [username]
        return connection.SySqlConnect(sql, sqlArr)
    }
    //登录
superAdminLogin = (req, res) => {
    let { username, password } = req.body
    let sql = `select * from superAdministrator where username=? and password=?`
    let sqlArr = [username, password]
    console.log(req.query, req.body)
    let callBack = async(err, data) => {
        console.log('1111')
        if (err) {
            console.log(err)
            res.send({
                code: 400,
                msg: '出错了'
            })
        } else if (data == '') {
            res.send({
                code: 400,
                msg: '用户名或者密码出错！'
            })
        } else {
            res.send({
                code: 200,
                msg: '登录成功',
                data: data
            })
        }
    }
    connection.sqlConnect(sql, sqlArr, callBack)
}

module.exports = { superAdminLogin }