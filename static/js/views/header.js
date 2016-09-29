define([
    'backbone','template','jquery-ui'
], function(B,T) {
    return B.View.extend({
        el:'header',
        events:{

        },
        // 视图初始化
        initialize:function(){
            //1、获取当前的日期，展示到h1
            var date = new Date()
            this.$('h1').text(date.getFullYear()+'年' + (date.getMonth()+1)+'月'
            +date.getDate()+'日' + '  ' + this.getWeek(date.getDay()))
            
            //2、 按钮组实现
            var now = new Date()
            // 前天
            now.setDate(now.getDate()-2)
            var nameArr = ['昨天','今天','明天','第三天','第四天']
            //组织模板数据
            var data = []
            for(var i = 0 ; i < 5 ;i ++){
                now.setDate(now.getDate()+1)
                data.push({
                    /*
                    id：唯一标识符；例如：20160929
                    time:当前时间；
                    name:label上的文字
                    */ 
                    id:now.getFullYear()*10000 + (now.getMonth()+1)*100+now.getDate(),
                    time:now.getTime(),
                    name:nameArr[i]
                })
            }
            data.push({
                id:'datepicker',
                time:0,
                name:'日历'
            })
            console.log(data)
            // 采用art-template把模板和数据结合，生成html字符串
            var html = T('dateTemplate',{data})
            console.log(html)
            this.$('#radio').html(html)
            // 根据jquery-ui设置按钮组效果
            // http://www.runoob.com/jqueryui/example-button.html
            this.$('#radio').buttonset()
            // 删除按钮组中的圆圈样式
            this.$('#radio label span').remove()
            // 根据jquery-ui设置日历效果
            // http://www.runoob.com/jqueryui/example-datepicker.html
            this.$('#radio #datepicker').datepicker()

        },
        //星期转化
        getWeek:function(num){
            var arr = ['周日','周一','周二','周三','周四','周五','周六']
            return arr[num]
        }
    })
    
});