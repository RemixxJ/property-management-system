//保洁人员
var connection = require('../util/connection-mysql')
    //查询用户名是否存在
let findUsername = (username) => {
        let sql = `select * from cleaningStaff where username=?`
        let sqlArr = [username]
        return connection.SySqlConnect(sql, sqlArr)
    }
    //用户注册
cleaningStaffRegister = (req, res) => {
        let { username, password, nickname, repassword } = req.body
        console.log(password, repassword)
        let status = '1'
        let create_time = new Date().toLocaleString()
        findUsername(username).then((r) => {
            if (r.length > 0) {
                res.send({
                    code: 400,
                    msg: '用户名相同'
                })
            } else {
                if (!username) {
                    res.send({
                        code: 400,
                        msg: '请输入用户名'
                    })
                    return
                } else if (password != repassword) {
                    res.send({
                        code: 400,
                        msg: '两次输入密码不同'
                    })
                    return
                } else if (!nickname) {
                    res.send({
                        code: 400,
                        msg: '请输入真实姓名'
                    })
                    return
                } else {
                    let sql = `insert into cleaningStaff(username,password,nickname,status,create_time) value(?,?,?,?,?)`
                    let sqlArr = [username, password, nickname, status, create_time]
                    let callBack = async(err, data) => {
                        if (err) {
                            console.log(err)
                            res.send({
                                code: 400,
                                msg: '注册失败'
                            })
                        } else {
                            res.send({
                                code: 200,
                                msg: '注册成功',
                                data: data[0]
                            })
                        }
                    }
                    connection.sqlConnect(sql, sqlArr, callBack)
                }
            }
        })
    }
    //login
cleaningStaffLogin = (req, res) => {
        let { username, password } = req.body
        let sql = `select * from cleaningStaff where username=? and password=?`
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
                    // data: data[0]
                    data: data
                })
            }
        }
        connection.sqlConnect(sql, sqlArr, callBack)
    }
    //获取房屋待清洁房屋
getCleaningHouse = (req, res) => {
    //wxStatus  0 无维修  1  待维修
    let qjStatus = '1'
    let sql = `select * from house where qjStatus=?`
    let sqlArr = [qjStatus]
    connection
        .SySqlConnect(sql, sqlArr)
        .then((e) => {
            res.send({
                code: 200,
                msg: '获取成功',
                data: e
            })
        })
        .catch((err) => {
            res.send({
                code: 400,
                msg: '获取失败',
                data: e
            })
            console.log(err)
        })
}
module.exports = { cleaningStaffRegister, cleaningStaffLogin, getCleaningHouse }