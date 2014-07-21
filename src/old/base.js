//function binder
$.fn.queryLoader2 = function(options){
    return this.each(function(){
        (new QueryLoader2(this, options));
    });
};
