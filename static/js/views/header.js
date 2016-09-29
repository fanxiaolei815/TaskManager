define([
    'backbone','template','jquery-ui'
], function(B,T) {
    return B.View.extend({
        el:'header',
        events:{
            // 选中某一天 或者 日历上某一天时，修改日期
            'click input:not("#datepicker")':'changeDate',
            'change #datepicker':'changeDate'
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
                    checked:是否选中
                    */ 
                    id:now.getFullYear()*10000 + (now.getMonth()+1)*100+now.getDate(),
                    time:now.getTime(),
                    name:nameArr[i],
                    checked: i==1?true:false
                })
            }
            data.push({
                id:'datepicker',
                time:0,
                name:'日历',
                checked:false
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

            // 3、设置 集合 日期
            this.model.date = date.getFullYear()*10000 + (date.getMonth()+1)*100+date.getDate()
        },
        //星期转化
        getWeek:function(num){
            var arr = ['周日','周一','周二','周三','周四','周五','周六']
            return arr[num]
        },
        changeDate:function(ev){

            // 获取新的日期
            var time = $(ev.target).attr('data-time')
            var date 
            if(time == 0 ){
                // 说明触发该事件的是日历
                // 获取日期
                // 菜鸟教程上不全找不到该方法，可以去看官网上的说明
                // http://api.jqueryui.com/datepicker/
                date = this.$('#datepicker').datepicker('getDate')
            }else{
                //其他按钮
                date = new Date(parseInt(time))
            }

            // 刷新h1
            this.$('h1').text(date.getFullYear()+'年' + (date.getMonth()+1)+'月'
            +date.getDate()+'日' + '  ' + this.getWeek(date.getDay()))
            
            // 重设集合的日期
           this.model.date = date.getFullYear()*10000 + (date.getMonth()+1)*100+date.getDate()
        }
    })
    
});