define([
    'backbone'
], function(B) {
    return B.View.extend({
        el:'header',
        events:{

        },
        initialize:function(){
            //获取当前的日期，展示到h1
            var date = new Date()
            this.$('h1').text(date.getFullYear()+'年' + (date.getMonth()+1)+'月'
            +date.getDate()+'日' + '  ' + this.getWeek(date.getDay()))
        },
        //星期转化
        getWeek:function(num){
            var arr = ['周日','周一','周二','周三','周四','周五','周六']
            return arr[num]
        }
    })
    
});