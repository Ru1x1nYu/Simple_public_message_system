//app.js application
//导入请求包
var http =require('http');
var fs=require('fs');
var url=require('url');
var template=require('art-template');
//导入mysql包
var mysql   = require('mysql');
//连接mysql
var connection = mysql.createConnection({
    host     : 'localhost',//host
    user     : 'root',//用户名
    password : '123456',//密码
    port: '3306',//端口号
    database: 'test'//数据库名
});
//数据库连接
connection.connect();
//查询功能
function selectData(data,res) {
    //查询语句
    const sql = 'select * from comments' ;
    //实现查询语句
    connection.query(sql, (err, rows, fields) => {
        //如果错误就报错
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        //render函数方法，调用后实现查询的数据渲染到网页中
        //传入参数1、数据库数据，要渲染的数据，和要响应的参数
        render(JSON.parse(JSON.stringify(rows)),data,res)
    });
}
//render函数方法，传入参数1、数据库数据，要渲染的数据，和要响应的参数
function render(comments,data,res){
    //获取到前端页面的代码，把数据渲染进去
    var htmlStr=template.render(data.toString(),{
        comments:comments
    })
    //把渲染你完的前端页面响应出去，形成页面
    res.end(htmlStr);
}
//添加功能
//传入参数1、id值 2、用户姓名 3、留言数据
function insertInfo(id,name,toName,comment){
    //mysql语句
    var insertComments = 'INSERT INTO comments(id,name,toName,comment,time) VALUES(?,?,?,?,now())';
    //传入的mysql参数
    var insertComments_Params = [id,name,toName,comment];
    //实现mysql方法
    connection.query(insertComments,insertComments_Params,function (err, result) {
        //如果错误就报错
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
    });
}
//删除功能 1、传入参数id值
function deleteInfo(id){
    //mysql删除语句
    var delSql = 'DELETE FROM comments WHERE id = ?';
    //mysql删除语句的id值，参数该id行
    var delSql_parmas=[id]
    connection.query(delSql,delSql_parmas,function (err, result) {
        //如果错误就报错
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
        }
    });
}
//启动后端服务
http.createServer(function (req,res) {
    //定义收到页面的值
    var parseObj=url.parse(req.url,true);
    //定义地址栏上的目录
    var pathname=parseObj.pathname;
    //如果是默认
    if (pathname==='/'){
        //系统跳转到首页
        fs.readFile('./view/index.html',function (err,data) {
            //如果错误就在页面上报错404 Not Found
            if (err){
                return res.end('404 Not Found')
            }
            //首页采用上面的查询功能，在mysql查找到的数据后，再获取前端页面的代码，然后渲染数据，接着响应到前端页面
            selectData(data,res);
        })
        //如果地址是/public/ 可接受被访问的数据
    }else if (pathname.indexOf('/public/')===0){
        fs.readFile('.'+pathname,function (err,data) {
            //如果错误就在页面上报错404 Not Found
            if (err){
                return res.end('404 Not Found')
            }
            res.end(data);
        })
        //post为写内容的那一页，当地址是post时，调转到发布留言那页
    }else if (pathname==='/post'){
        fs.readFile('./view/post.html',function (err,data) {
            //如果错误就在页面上报错404 Not Found
            if (err){
                return res.end('404 Not Found')
            }
            res.end(data)
        })
        //如果前端选择了发表留言，则会进行以下操作
    }else if (pathname==='/fabiao'){
        //获取到输入的id值，名字，留言内容 如：[{ num: '9', name: '666666', comment: '666666666666666' }]
        var comment=parseObj.query;
        //使用上面的添加功能，把id值，name值，comment值传入数据库中
        insertInfo(comment.num,comment.name,comment.toName,comment.comment)
        //响应状态码302，进行重定向
        res.statusCode=302;
        //把地址定到'/'那里，也就是默认的首页
        res.setHeader('Location','/');
        //响应结束
        res.end();
        //如果选择了删除功能
    }else if (pathname==='/delete'){
        //获取到删除第几行的id
        var comment=parseObj.query;
        //使用上面删除功能，传入id值
        deleteInfo(comment.id)
        //响应状态码302，进行重定向
        res.statusCode=302;
        //把地址定到'/'那里，也就是默认的首页
        res.setHeader('Location','/');
        //响应结束
        res.end();
    }
    //设置端口码，端口码设置为彭某人最喜欢的6666
}).listen(3001,function () {
    //输出启动信息
    console.log('runned，彭君销的系统启动了');
})
