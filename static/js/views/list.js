define([
    'backbone'
], function(B) {
    return B.View.extend({
        el:'section',
        events:{

        },
        initialize:function(){
            // 声明变量赋值为this
            var self = this 
           //从服务端获取当前日期对应的数据展示
           this.model.fetch().done(function(data){
            //    这里，this不是视图类对象
               console.log(self.model)
           })

        }
    })
    
});