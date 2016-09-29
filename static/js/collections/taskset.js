//可能会添加多条任务数据-----多个model对象
//所以需要定义集合类，
// 一个集合中可以存放多个model对象
define([
    'backbone','task'
], function(B,Task) {
    return B.Collection.extend({
        model:Task
    })
});