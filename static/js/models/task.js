// Model 类
define([
    'backbone'
], function(B) {
    return B.Model.extend({
        defaults:{
            time:0,
            content:'',
            complete:false
        }
    })
    
});