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

// 获取日期对应的任务数据返回
app.get('/task/:date',(req,res)=>{
    // 从url中获取日期
    var date = req.params.date
    console.log(date)
    // 根据time字段从数据库获取数据
    Task.find({time:date}).exec(function(error,tasks){
        console.log(tasks)
        if(error){
            res.json({result:0})
        }else{
            // 重新组织数据
            tasks = tasks.map(function(item,index,array){
                return {
                    id:item._id,
                    content:item.content,
                    time:item.time,
                    complete:item.complete
                }
            })
            // 反馈数据到浏览器端
            res.json({result:1,tasks:tasks})
        }
    })
})


// 更新任务状态
app.put('/task/:date/:id',(req,res)=>{
    var id = req.params.id
    Task.findByIdAndUpdate(id,{complete:req.body.complete}).exec(function(err){
        if(err){
            res.json({result:0})
        }else{
            res.json({result:1})
        }
    })
})

app.listen(3000,()=>{
    console.log('服务器监听3000端口')
})