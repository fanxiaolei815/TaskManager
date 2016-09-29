define([
    'backbone','template'
], function(B,T) {
    return B.View.extend({
        el:'section',
        events:{
            'click input':'completeOrNot'
        },
        initialize:function(){
           //从服务端获取当前日期对应的数据展示
           this.render()

            //监听date的变化,重新渲染页面
            this.listenTo(this.model,'changeDate',this.render) 

            //监听集合中加入任务的事件，重新渲染页面
            this.listenTo(this.model,'add',this.render)
        },
        render:function(){
            console.log('render')
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
                        time:item.get('time'),
                        complete:item.get('complete')
                    }
                })
                // 采用artTemplate将模板和数据结合
                var html = T('listTemplate',{arr})
                //  填充到页面上
                self.$('ul').html(html)
                console.log(html)
           })
        },
        completeOrNot:function(ev){
            // 1、根据input选中与否，修改label的背景图，通过css实现(见index.css)

            //2、 获取当前的状态
            var complete = $(ev.target).prop('checked')
            console.log(complete)

            // 3、修改对应任务的完成状态
            // 首先 需要在task模型中添加complete字段
            // 其次 代码中所有涉及task的位置，补充complete相应内容(提交时，获取数据时，服务端数据库模型类,反馈数据时)
            
            // 获取该任务对应的id
            var id = $(ev.target).attr('id')
            // 找到对应的任务
            var obj = this.model.find(function(item){
                return item.get('id') == id
            })
            // 更新任务状态
            obj.set({'complete':isComplete})
            //4、保存到服务器
            obj.save()
        }
    })
    
});