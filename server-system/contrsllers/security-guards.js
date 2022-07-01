//安保人员
var connection = require('../util/connection-mysql')
//查询用户名是否存在
let findUsername = (username) => {
  let sql = `select * from securityGuards where username=?`
  let sqlArr = [username]
  return connection.SySqlConnect(sql, sqlArr)
}
//用户注册
securityGuardsRegister = (req, res) => {
  let { username, password, nickname, repassword } = req.body
  let status = '1'
  let create_time = new Date().toLocaleString()
  console.log(password, repassword)
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
        let sql = `insert into securityGuards(username,password,nickname,status,create_time) value(?,?,?,?,?)`
        let sqlArr = [username, password, nickname, status, create_time]
        let callBack = async (err, data) => {
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
securityGuardsLogin = (req, res) => {
  let { username, password } = req.body
  let sql = `select * from securityGuards where username=? and password=?`
  let sqlArr = [username, password]
  console.log(req.query, req.body)
  let callBack = async (err, data) => {
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
module.exports = { securityGuardsRegister, securityGuardsLogin }
