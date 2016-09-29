var exp = require('express')
var app = exp()
app.use(exp.static('static'))
app.listen(3000,()=>{
    console.log('服务器监听3000端口')
})