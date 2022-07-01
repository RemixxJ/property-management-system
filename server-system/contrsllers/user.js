//用户
var connection = require('../util/connection-mysql')
    //查询用户名是否存在
let findUsername = (username) => {
        let sql = `select * from user where username=?`
        let sqlArr = [username]
        return connection.SySqlConnect(sql, sqlArr)
    }
    //用户注册
userRegister = (req, res) => {
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
                    let sql = `insert into user(username,password,nickname,status,create_time) value(?,?,?,?,?)`
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
userLogin = (req, res) => {
    let { username, password } = req.body
    let sql = `select * from user where username=? and password=?`
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
            // let user_id = data[0].id;
            // let result = await getUserInfo(user_id);  //教师用户username无法在学生信息表里查到
            // data[0].userinfo = result[0];
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

//添加用户
userAdd = (req, res) => {
        let { username, password, nickname } = req.body
        let status = '1'
        let create_time = new Date().toLocaleString()
        let sql = `insert into user(username,password,nickname,status,create_time) value(?,?,?,?,?)`
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
    //删除相关信息
let updateHouserInfo = (user) => {
    let sql = `UPDATE house SET  xzStatus='',wxStatus='',qjStatus='',dqTime='',usePerson=''  WHERE usePerson='${user}'`
    connection.query(sql).then((res) => {
        // console.log(res);
    })
}
let updateMesInfo = (user) => {
    let sql = `DELETE FROM message  WHERE username='${user}'`
    connection.query(sql).then((res) => {
        // console.log(res);
    })
}
let updateCarInfo = (user) => {
        let sql = `DELETE FROM car  WHERE user='${user}'`
        connection.query(sql).then((res) => {
            // console.log(res);
        })
    }
    //删除用户
userDel = (req, res) => {
        let { id, user } = req.body

        if (id) {
            let sql = `delete from user where id = ?`
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
            updateHouserInfo(user)
            updateMesInfo(user)
            updateCarInfo(user)
        } else {
            res.send({
                code: 400,
                msg: '无id,删除失败'
            })
        }
    }
    //查询所有用户
userQuery = (req, res) => {
        let sql = `SELECT * FROM user`
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
    //车辆信息录入
carInfoAdd = (req, res) => {
        let { card, jrtime, lktime, isgsyg, lxfs, user } = req.body
        let sql = ''
        let sqlArr = []
        if (user) {
            sql = `insert into car(card, jrtime, lktime,isgsyg,lxfs,user) value(?,?,?,?,?,?)`
            sqlArr = [card, jrtime, lktime, isgsyg, lxfs, user]
        } else {
            sql = `insert into car(card, jrtime, lktime,isgsyg,lxfs) value(?,?,?,?,?)`
            sqlArr = [card, jrtime, lktime, isgsyg, lxfs]
        }
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
    //车辆信息删除
carInfoDel = (req, res) => {
        let { id } = req.body
        if (id) {
            let sql = `delete from car where id = ?`
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
    //车辆信息获取
carInfoQuery = (req, res) => {
        let sql = `SELECT * FROM car`
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
    //新增问题
messageAdd = (req, res) => {
        let { username, lymsg, fkmsg } = req.body
        let sql = `insert into message(username,lymsg,fkmsg) value(?,?,?)`
        let sqlArr = [username, lymsg, fkmsg]
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
    //更新反馈
messageUpdata = (req, res) => {
    let { username, lymsg, fkmsg, id } = req.body
    let sql = `UPDATE message SET  username='${username}',lymsg='${lymsg}',fkmsg='${fkmsg}' WHERE id='${id}'`
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
messageQuery = (req, res) => {
        let sql = `SELECT * FROM message`
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
    //查询用户名下房屋
getUserHouse = (req, res) => {
    let { usePerson } = req.query
    console.log(usePerson, 'usePerson')
    let sql = `select * from house where usePerson=?`
    let sqlArr = [usePerson]
    connection
        .SySqlConnect(sql, sqlArr)
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
                data: e
            })
            console.log(err)
        })
}
module.exports = {
    userRegister,
    userLogin,
    userAdd,
    userDel,
    userQuery,
    carInfoAdd,
    carInfoDel,
    carInfoQuery,
    messageAdd,
    messageUpdata,
    messageQuery,
    getUserHouse
}