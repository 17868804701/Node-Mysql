/**
 * Created by jiunuo on 2017/7/26.
 */
var express = require('express');
var db = require('./model/db.js');
var app = express();

app.set('view engine', 'ejs');//设置模板引擎为ejs
app.get('/',function (req,res) {
    db.query('select *from user',function (err,rows) {
        if(err){
            res.send("查询失败")
        }else {
            //查询成功跳转到user页面,data查出来是一个数组rows
            res.render('user',{"data":rows});
            console.log(rows);
        }
    });
});
//add页面跳转
app.get('/add',function (req,res) {
   res.render('add');
});

// 增加用户
app.get('/user/addUser',function (req,res) {
    var username = req.query.username;//获取表单提交的username
    var age = req.query.age;//获取表单提交的age
    db.query("insert into user(name,age) values('" + username + "'," + age + ")",function (err,rows) {
        if(err){
            res.send("添加失败")
        }else {
            res.send('添加成功');
        }
    });
});

// 删除
app.get('/del',function (req,res) {
   var id  = req.query.id;
   db.query("delete from user where id=" + id,function (err,rows) {
       if(err){
           res.send('删除失败'+err)
       }else {
           res.redirect('/')
       }
   })
});

// 修改
app.get('/user/edit',function (req,res) {
    var id  = req.query.id;
    db.query("select * from user where id=" + id, function (err, rows) {
        if (err) {
            res.end('修改页面跳转失败：' + err);
        } else {
            res.render("edit", {data: rows});       //直接跳转，填充表单，跟查询显示一样
        }
    });
});

// 修改提交
app.get('/user/update',function (req,res) {
    var id = req.query.id;
    var username = req.query.username;//获取表单提交的username
    var age = req.query.age;//获取表单提交的age
    db.query("update user set name='" + username + "',age='" + age + "' where id=" + id,function (err,rows) {
        if(err){
            res.send("修改失败"+err)
        }else {
            res.send('修改成功');
        }
    });
});
app.listen(3000);
