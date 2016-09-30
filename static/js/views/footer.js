define([
    'backbone'
], function(B) {
    return  B.View.extend({
        el:'footer',
        events:{
            'click #addBtn':'showEditBox',
            'click #commit':'commit'
        },
        showEditBox:function(){
            this.$('#addBtn').hide()
            this.$('#editBox').fadeIn()
        },
        commit:function(){
            this.$('#addBtn').fadeIn()
            this.$('#editBox').hide()

            //提交数据到服务端（model类的操作）

            // 获取数据
            var content = this.$('#editBox input').val()
            content = content.trim()
            //清空输入框
            this.$('#editBox input').val('')
            
            // 提交数据
            // create方法的作用：根据传递的数据创建一个新的model对象，发送到服务端保存，同时添加到集合中
             
             //找到集合中sortIndex字段取值最大的模型
            console.log(this.model)
           
            var index = 0 

            //如果集合中无数据
            // index为1
            // 否则，index为集合数据中最大的sortIndex+1
            if(this.model.length ==0){
                index = 1 
            }else{
                // 从集合中找到sortIndex取值最大的任务
                var m = this.model.max(function(obj){
                    return obj.get('sortIndex')
                })
                console.log(m)
                // 新添加任务的序号是 最大的序号+1
                index = m.get('sortIndex') + 1
            }
            this.model.create({
                content:content,
                time:this.model.date,
                complete:false,
                sortIndex:index
            },{wait:true})
        }
    })
    
});