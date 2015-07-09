
namespace("ui.controls.Panel", 
{
    '@inherits' : ui.controls.Box,
    '@traits'   : [Logger],
    
    
    isBox : function(){
        return this.parent();//calls isBox() on baseclass
    }
});











