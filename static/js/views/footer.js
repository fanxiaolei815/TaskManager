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
        }
    })
    
});