# Javascript Classes
Class.js is lite-weight and optimized library used for defining namespaces, classes 
and inheritance in Javascript using a terse and supple syntax which at first may seem
odd, but fully understandable and necessary.

**Define Namespaces**
<pre>
  <code>
  	namespace("ui.controls.Box");
  	ui.controls.Box = function(){}
  </code>
</pre>


**Define a Class**
<pre>
  <code>
  	namespace("ui.controls.Box", {
  	  initialize : function(){
  	    alert("I am a box")
  	  }
  	})
  </code>
</pre>
