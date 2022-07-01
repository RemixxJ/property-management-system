const mysql = require("mysql");
module.exports = {
    config: {
        host: "localhost",
        port: "3306",
        user: "root",
        password: "password",
        database: "propertyserver",
    },
    sqlConnect: function(sql, sqlArr, callBack) {
        //创建连接池方法
        var pool = mysql.createPool(this.config);
        //从连接池中获得取得连接
        pool.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                console.log("连接失败");
                return;
            }
            //事件驱动回调
            conn.query(sql, sqlArr, callBack);
            //当连接不再使用时，将其归还到连接池中
            conn.release();
        });
    },
    SySqlConnect: function(sySql, sqlArr) {
        return new Promise((resolve, reject) => {
            var pool = mysql.createPool(this.config);
            //从连接池中获得取得连接
            pool.getConnection(function(err, conn) {
                if (err) {
                    reject(err);
                } else {
                    conn.query(sySql, sqlArr, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                        conn.release();
                    });
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    },
    query(sql) {
        var pool = mysql.createPool(this.config);
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                //掏出错误
                if (err) {
                    reject(err);
                    return;
                }
                conn.query(sql, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                    conn.release();
                });
            });
        });
    },
};