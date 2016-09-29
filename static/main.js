// 模块化配置
require.config({
    paths:{
        'jquery':'js/libs/jquery',
        'template':'js/libs/template',
        'jquery-ui':'js/libs/jquery-ui/jquery-ui.min',
        'underscore':'js/libs/underscore',
        'backbone':'js/libs/backbone',
        'task':'js/models/task'
    },
    shim:{
        'backbone':['underscore','jquery'],
        'jquery-ui':['jquery']
    }
})
require(['jquery','js/views/header','js/views/footer','js/collections/taskset'],function($,Header,Footer,Taskset){
    // 页面加载完成，风火轮消失，主界面展示出现
    $(function(){
        $('#loading').hide()
        $('main').fadeIn()
    })

    var taskset = new Taskset()
    // 将header视图与集合关联；在header中修改的日期需要通过集合传递到footer中
    new Header({model:taskset})
    new Footer({model:taskset})
})