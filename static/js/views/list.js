define([
    'backbone'
], function(B) {
    return B.View.extend({
        el:'section',
        events:{

        },
        initialize:function(){
           //从服务端获取当前日期对应的数据展示
           this.model.fetch().done(function(data){
               console.log(data)
           })

        }
    })
    
});