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
            this.model.create({
                content:content,
                time:this.model.date
            })
        }
    })
    
});