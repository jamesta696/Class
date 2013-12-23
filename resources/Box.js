
namespace("ui.controls.Box", 
{
      initialize : function(width, height){
          this.width  = width;
          this.height = height;
      },
      
      isBox : function(){
          return this instanceof ui.controls.Box;
      }
});