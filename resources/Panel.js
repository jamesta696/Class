
namespace("ui.controls.Panel", 
{
    '@inherits': ui.controls.Box,
    
    isBox : function(){
        return this.parent();//calls isBox() on baseclass
    }
})