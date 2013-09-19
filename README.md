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


**Define instance methods**
<pre>
  <code>
  	namespace("ui.controls.Box", {
    	  initialize : function(){
    	      alert("I am a box")
    	  },
    	  
    	  isBox : function(){
    	      return this.classname == "Box"
    	  }
  	})
  </code>
</pre>


**Define instance methods**
<pre>
  <code>
  	namespace("ui.controls.Box", {
    	  initialize : function(){
    	      alert("I am a box")
    	  },
    	  
    	  isBox : function(){
    	      return this instanceof ui.controls.Box
    	  }
  	})
  </code>
</pre>


**Define inheritance**
<pre>
  <code>
  	namespace("ui.controls.Panel", {
  	    '@inherits': ui.controls.Box
  	})
  </code>
</pre>


**Call baseclass methods**
<pre>
  <code>
  	namespace("ui.controls.Panel", {
  	    '@inherits': ui.controls.Box,
  	    
  	    isBox : function(){
  	        this.parent();
  	        alert("delegating to isBox() on baseclass Box");
  	    }
  	})
  </code>
</pre>
