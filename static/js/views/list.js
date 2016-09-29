define([
    'backbone','template'
], function(B,T) {
    return B.View.extend({
        el:'section',
        events:{

        },
        initialize:function(){
           //从服务端获取当前日期对应的数据展示
           this.render()

            //监听date的变化,重新渲染页面
            this.listenTo(this.model,'changeDate',this.render)   
        },
        render:function(){
            // 声明变量赋值为this
            var self = this 
            this.model.fetch().done(function(){
            //    这里，this不是视图类对象
               console.log(self.model)
                
                //    展示数据到页面

                // 组织数据为数据
                var arr = self.model.models.map(function(item,index,array){
                    return {
                        id:item.get('id'),
                        content:item.get('content'),
                        time:item.get('time')
                    }
                })
                // 采用artTemplate将模板和数据结合
                var html = T('listTemplate',{arr})
                //  填充到页面上
                self.$('ul').html(html)
                console.log(html)
           })
        }
    })
    
});