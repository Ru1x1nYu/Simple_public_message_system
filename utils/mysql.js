var mysql   = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    port: '3306',
    database: 'test',
});

function mysqlQuery(){

    //检索
    this.select=function(callback){
        var  sql = 'SELECT  * FROM user';
        connection.query(sql,function(err,result){
            if(err){console.log(err)}
            callback(result); // 此处直接返回 return 返回undefined, 需要使用回调函数来接收数据。
        })

    };

}

module.exports = mysqlQuery;
