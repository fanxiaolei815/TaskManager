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

             
            //任务列表支持排序
            // http://api.jqueryui.com/sortable/

            // 排序，需要有一个原始顺序，向Task中添加sortIndex字段；每次添加新数据
            // 补充sortIndex字段

            // 采用jquery-ui支持排序

             $('#list').sortable({
            //    占位符：占位符标签设置的class属性
               placeholder:'li-placeholder',
            //    ev：事件对象
            // ui:对象，包含被排序元素的各种信息
               start:function(ev,ui){
                   console.log('开始排序')
                   $('#addBtn').removeClass().addClass('icon-trash icon-3x')
               },
               stop:function(ev,ui){
                   console.log('结束排序')
                   $('#addBtn').removeClass().addClass('icon-plus-sign icon-3x')
               },
               update:function(ev,ui){
                   console.log('更新位置了')
                   //找到对应的数据，修改sortIndex
                   console.log(ev)
                   console.log(ui)
                   console.log(ui.item[0])
                   //ui.item代表的是当前被拖拽的标签jquery对象
                   // find(selector):查找元素
                    //   id对应了数据model的id
                  var id =  ui.item.find('input').attr('id')
                  console.log(id) 
                  //获取对应的数据
                  var m = this.model.find(function(obj){
                      return obj.get('id') == id
                  })
                  console.log(m)
                  //修改m的sortIndex
                  //如果li被移动到最上方，值就是原来最上方的li对应的sortIndex-1
                  // 如果li被移动到最下方，值就是原来最下方的li对应的sortIndex+1
                 // 如果li被移动到中间，值就是 上、下的li对应的sortIndex相加除以2
                var index = 0 
                if(ui.item[0] == $('#list li').first()[0]){
                    console.log('li被移动到最上方了')
                    console.log(ui.item.next())
                    // 找到下一个任务的id
                    var nextId = ui.item.next().find('input').attr('id')
                    // 找到下一个任务
                    var nextM = this.model.find(function(obj){
                        return obj.get('id') == nextId
                    })
                    // 下一个任务的序号减1
                    // 需要给任务添加sortIndex字段，添加数据的时候，计算sortIndex
                    index = nextM.get('sortIndex')-1

                }else if(ui.item[0] == $('#list li').last()[0]){
                    console.log('li被移动到最下方了')
                     console.log(ui.item.prev())
                    //  找到上一个任务的id
                    var prevId = ui.item.prev().find('input').attr('id')
                    // 找到上一个任务
                    var prevM = this.model.find(function(obj){
                        return obj.get('id') == prevId
                    })
                    // 上一个任务的序号+1
                    index = prevM.get('sortIndex')+1

                }else{

                    // 判断li是否已经不在ul内，如果是，则返回
                    if(ui.item.parent()[0] != $('#list')[0]){
                        return 
                    }
                    console.log('li 被移动到中间了')
                    console.log(ui.item.prev())
                    console.log(ui.item.next())
                    // 找到上一个任务
                    var nextId = ui.item.next().find('input').attr('id')
                    var nextM = this.model.find(function(obj){
                        return obj.get('id') == nextId
                    })
                    //找到下一个任务
                    var prevId = ui.item.prev().find('input').attr('id')
                    var prevM = this.model.find(function(obj){
                        return obj.get('id') == prevId
                    })
                    // 计算序号
                    index = (prevM.get('sortIndex') + nextM.get('sortIndex'))/2
                }
                //修改sortIndex
                m.set({sortIndex:index})
                console.log(index)
                //保存 
                m.save()

               }.bind(this),
                // 关联一个外部的元素
                // 'footer':是关联元素的选择器
                // 外部元素也要sortable
                connectWith:'footer'
           })

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
                        complete:item.get('complete'),
                        sortIndex:item.get('sortIndex')
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
            obj.set({'complete':complete})
            //4、保存到服务器
            obj.save()
        }
    })
    
});