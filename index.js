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
    Task.find({time:date}).sort({sortIndex:1}).exec(function(error,tasks){
        console.log(tasks)
        if(error){
            res.json({result:0})
        }else{
            // 重新组织数据　实验一下
            tasks = tasks.map(function(item,index,array){
                return {
                    id:item._id,
                    content:item.content,
                    time:item.time,
                    complete:item.complete,
                    sortIndex:item.sortIndex
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
    Task.findByIdAndUpdate(id,{complete:req.body.complete,sortIndex:req.body.sortIndex}).exec()
    .then(function(){
         res.json({result:1})
    }).catch(function(err){
        res.json({result:0})
    })
})

//数据删除操作
app.delete('/task/:date/:id',function(req,res){
    Task.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.json({'message':'删除数据失败'})
        }else{
            res.json({'message':'删除数据成功'})
        }
    })
})

app.listen(4000,()=>{
    console.log('服务器监听3000端口')
})