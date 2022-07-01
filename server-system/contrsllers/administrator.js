//管理员
var connection = require('../util/connection-mysql')
    //查询用户名是否存在
let findUsername = (username) => {
        let sql = `select * from administrator where username=?`
        let sqlArr = [username]
        return connection.SySqlConnect(sql, sqlArr)
    }
    //用户注册
administratorRegister = (req, res) => {
        let { username, password, nickname, repassword } = req.body
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
                    let sql = `insert into administrator(username,password,nickname,status,create_time) value(?,?,?,?,?)`
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
administratorLogin = (req, res) => {
        let { username, password } = req.body
        let sql = `select * from administrator where username=? and password=?`
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
    //修改密码
changePassWord = (req, res) => {
        let { username, password, nickname, status, create_time, id, dataBase } = req.body
        let sql = `UPDATE ${dataBase} SET  username='${username}',password='${password}',nickname='${nickname}',status='${status}',create_time='${create_time}' WHERE id='${id}'`
        connection
            .query(sql)
            .then((data) => {
                res.send({
                    code: 200,
                    msg: '更新成功',
                    data: data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    //添加管理员
adminAdd = (req, res) => {
        let status = '1'
        let create_time = new Date().toLocaleString()
        let { username, password, nickname } = req.body
        let sql = `insert into administrator(username,password,nickname,status,create_time) value(?,?,?,?,?)`
        let sqlArr = [username, password, nickname, status, create_time]
        let callBack = async(err, data) => {
            if (err) {
                console.log(err)
                res.send({
                    code: 400,
                    msg: '添加失败'
                })
            } else {
                res.send({
                    code: 200,
                    msg: '添加成功'
                })
            }
        }
        connection.sqlConnect(sql, sqlArr, callBack)
    }
    //删除管理员
adminDel = (req, res) => {
        let { id } = req.body
        if (id) {
            let sql = `delete from administrator where id = ?`
            let sqlArr = [id]
            let callBack = async(err, data) => {
                if (err) {
                    console.log(err)
                    res.send({
                        code: 400,
                        msg: '删除失败'
                    })
                } else {
                    res.send({
                        code: 200,
                        msg: '删除成功'
                    })
                }
            }
            connection.sqlConnect(sql, sqlArr, callBack)
        } else {
            res.send({
                code: 400,
                msg: '无id,删除失败'
            })
        }
    }
    //查询所有管理员
adminQuery = (req, res) => {
    let sql = `SELECT * FROM administrator`
    connection
        .query(sql)
        .then((data) => {
            res.send({
                code: 200,
                msg: '获取成功',
                data: data
            })
        })
        .catch((err) => {
            res.send({
                code: 400,
                msg: '获取失败',
                data: data
            })
            console.log(err)
        })
}

//查询所有房屋
adminHouseQuery = (req, res) => {
        let sql = `SELECT * FROM house`
        connection
            .query(sql)
            .then((data) => {
                res.send({
                    code: 200,
                    msg: '获取成功',
                    data: data
                })
            })
            .catch((err) => {
                res.send({
                    code: 400,
                    msg: '获取失败',
                    data: data
                })
                console.log(err)
            })
    }
    //获取房屋去情况分类
adminHouseQueryFL = (req, res) => {
    let sql = `SELECT * FROM house`
    connection
        .query(sql)
        .then((data) => {
            let xz = 0
            data.map((item) => {
                if (item.xzStatus == '1') {
                    xz = xz + 1
                }
            })
            res.send({
                code: 200,
                msg: '获取成功',
                data: {
                    xzNums: xz,
                    fxzNums: data.length - xz,
                    total: data.length
                }
            })
        })
        .catch((err) => {
            res.send({
                code: 400,
                msg: '获取失败',
                data: data
            })
            console.log(err)
        })
}

//获取停车位情况分类
adminParkingQueryFL = (req, res) => {
    let sql = `SELECT * FROM parking`
    connection
        .query(sql)
        .then((data) => {
            let xz = 0
            data.map((item) => {
                if (item.isfull == '1') {
                    xz = xz + 1
                }
            })
            res.send({
                code: 200,
                msg: '获取成功',
                data: {
                    xzNums: xz,
                    fxzNums: data.length - xz,
                    total: data.length
                }
            })
        })
        .catch((err) => {
            res.send({
                code: 400,
                msg: '获取失败',
                data: data
            })
            console.log(err)
        })
}

//添加房屋信息
adminHouseAdd = (req, res) => {
        let {
            dizhi,
            xzStatus,
            wxStatus,
            bxInfo,
            ggqy,
            dqTime,
            qjStatus,
            wximg,
            qjimg,
            usePerson,
            qjPerson,
            wxPerson
        } = req.body
        let sql = `insert into house(dizhi,xzStatus,wxStatus,bxInfo,ggqy,dqTime,qjStatus,wximg,qjimg,usePerson,qjPerson,wxPerson) value(?,?,?,?,?,?,?,?,?,?,?,?)`
        let sqlArr = [
            dizhi,
            xzStatus,
            wxStatus,
            bxInfo,
            ggqy,
            dqTime,
            qjStatus,
            wximg,
            qjimg,
            usePerson,
            qjPerson,
            wxPerson
        ]
        let callBack = async(err, data) => {
            if (err) {
                console.log(err)
                res.send({
                    code: 400,
                    msg: '添加失败'
                })
            } else {
                res.send({
                    code: 200,
                    msg: '添加成功'
                })
            }
        }
        connection.sqlConnect(sql, sqlArr, callBack)
    }
    //修改房屋信息
adminHouseEdit = (req, res) => {
        let {
            dizhi,
            xzStatus,
            wxStatus,
            bxInfo,
            ggqy,
            dqTime,
            qjStatus,
            wximg,
            qjimg,
            usePerson,
            qjPerson,
            wxPerson,
            id
        } = req.body
        let sql = `UPDATE house SET  dizhi='${dizhi}',xzStatus='${xzStatus}',wxStatus='${wxStatus}',qjStatus='${qjStatus}',bxInfo='${bxInfo}',wximg='${wximg}',qjimg='${qjimg}',ggqy='${ggqy}',dqTime='${dqTime}',usePerson='${usePerson}',wxPerson='${wxPerson}',qjPerson='${qjPerson}' WHERE id='${id}'`
        connection
            .query(sql)
            .then((data) => {
                res.send({
                    code: 200,
                    msg: '更新成功',
                    data: data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    //删除房屋信息
adminHouseDel = (req, res) => {
        let { id } = req.body
        if (id) {
            let sql = `delete from house where id = ?`
            let sqlArr = [id]
            let callBack = async(err, data) => {
                if (err) {
                    console.log(err)
                    res.send({
                        code: 400,
                        msg: '删除失败'
                    })
                } else {
                    res.send({
                        code: 200,
                        msg: '删除成功'
                    })
                }
            }
            connection.sqlConnect(sql, sqlArr, callBack)
        } else {
            res.send({
                code: 400,
                msg: '无id,删除失败'
            })
        }
    }
    //查看停车位信息
adminParkingQuery = (req, res) => {
        let sql = `SELECT * FROM parking`
        connection
            .query(sql)
            .then((data) => {
                res.send({
                    code: 200,
                    msg: '获取成功',
                    data: data
                })
            })
            .catch((err) => {
                res.send({
                    code: 400,
                    msg: '获取失败',
                    data: data
                })
                console.log(err)
            })
    }
    //添加车位信息
adminParkingAdd = (req, res) => {
        let { isfull, dz, usePerson, dqTime, lxfs } = req.body
        let sql = `insert into parking(isfull, dz, usePerson, dqTime, lxfs) value(?,?,?,?,?)`
        let sqlArr = [isfull, dz, usePerson, dqTime, lxfs]
        let callBack = async(err, data) => {
            if (err) {
                console.log(err)
                res.send({
                    code: 400,
                    msg: '添加失败'
                })
            } else {
                res.send({
                    code: 200,
                    msg: '添加成功'
                })
            }
        }
        connection.sqlConnect(sql, sqlArr, callBack)
    }
    //更新车位信息
adminParkingEdit = (req, res) => {
        let { isfull, dz, usePerson, dqTime, lxfs, id } = req.body
        let sql = `UPDATE parking SET  isfull='${isfull}',dz='${dz}',usePerson='${usePerson}',dqTime='${dqTime}',lxfs='${lxfs}' WHERE id='${id}'`
        connection
            .query(sql)
            .then((data) => {
                res.send({
                    code: 200,
                    msg: '更新成功',
                    data: data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    //删除车位信息
adminParkingDel = (req, res) => {
    let { id } = req.body
    if (id) {
        let sql = `delete from parking where id = ?`
        let sqlArr = [id]
        let callBack = async(err, data) => {
            if (err) {
                console.log(err)
                res.send({
                    code: 400,
                    msg: '删除失败'
                })
            } else {
                res.send({
                    code: 200,
                    msg: '删除成功'
                })
            }
        }
        connection.sqlConnect(sql, sqlArr, callBack)
    } else {
        res.send({
            code: 400,
            msg: '无id,删除失败'
        })
    }
}

module.exports = {
    administratorRegister,
    administratorLogin,
    adminAdd,
    adminDel,
    adminQuery,
    adminHouseQuery,
    adminHouseAdd,
    adminHouseEdit,
    adminHouseDel,
    adminParkingQuery,
    adminParkingAdd,
    adminParkingEdit,
    adminParkingDel,
    adminParkingQueryFL,
    adminHouseQueryFL,
    changePassWord
}