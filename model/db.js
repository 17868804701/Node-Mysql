/**
 * Created by jiunuo on 2017/7/26.
 */
var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',//服务器地址
    user: 'root',//用户名
    password: 'root',//密码
    database: 'node_test'//数据库
});

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}
exports.query = query;//向外暴露函数，外面的要引用