//可能会添加多条任务数据-----多个model对象
//所以需要定义集合类，
// 一个集合中可以存放多个model对象
define([
    'backbone','task'
], function(B,Task) {
    return B.Collection.extend({
        model:Task,
        // 日期不同，向服务端获取的数据也不同，设置一个随日期变化的url
        url:function(){
            return '/task/'+this.date
        },

        //parse方法 解析服务端发过来的数据
        parse:function(data){
            return data.tasks
        }
    })
});