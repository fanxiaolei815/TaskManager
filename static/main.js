// 模块化配置
require.config({
    paths:{
        'jquery':'js/libs/jquery',
        'template':'js/libs/template',
        'jquery-ui':'js/libs/jquery-ui/jquery-ui.min',
        'underscore':'js/libs/underscore',
        'backbone':'js/libs/backbone'
    },
    shim:{
        'backbone':['underscore','jquery'],
        'jquery-ui':['jquery']
    }
})
require(['jquery','js/views/header','js/views/footer'],function($,Header,Footer){
    // 页面加载完成，风火轮消失，主界面展示出现
    $(function(){
        $('#loading').hide()
        $('main').fadeIn()
    })

    new Header()
    new Footer()
})