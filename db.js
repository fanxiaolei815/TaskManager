// 导入数据库模块
var mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/h5-5')
// 获取连接到的数据库对象
var db = mongoose.connection
// 监听事件
db.on('open',()=>{
    console.log('连接数据库并打开成功')
})
db.on('error',()=>{
    console.log('打开数据库失败')
})

// 配置文档
var schema = mongoose.Schema({
    time:String,
    content:String
})

// 创建文档类
var Task = mongoose.model('tasks',schema)

// 导出文档类
module.exports = Task