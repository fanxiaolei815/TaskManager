var exp = require('express')
var app = exp()
app.use(exp.static('static'))

var bodyParser = require('body-parser')
app.use(bodyParser.json())

// 导入数据库模块
var Task = require('./db.js')

// 保存数据到数据库
app.post('/task/:date',(req,res)=>{
    var task = new Task(req.body)
    task.save(function(error){
        if(error){
            res.json({'result':0})
        }else{
            res.json({'result':1})
        }
    })
})

app.listen(3000,()=>{
    console.log('服务器监听3000端口')
})