# Javascript Classes
Class.js is lite-weight and optimized library used for defining namespaces, classes 
and inheritance in Javascript using a terse and supple syntax which at first may seem
odd, but fully understandable and necessary.

**Define a Namespace**
<pre>
  <code>
  	namespace("ui.controls.Box");
  	ui.controls.Box = function(){}
  </code>
</pre>


**Define a an empty Class in a Namespace**
<pre>
  <code>
  	namespace("ui.controls.Box", {
  	    //class body here
  	})
  </code>
</pre>


**Define a Class constructor**
<pre>
  <code>
  	namespace("ui.controls.Box", {
    	  initialize : function(){
    	      alert("I am a box")
    	  }
  	})
  </code>
</pre>


**Define other instance methods**
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


# Modules & Traits
In object-oriented programming, to reuse code (a module or api) across multiple classes
when inheritance does not make sense is to use either:
   - delegation (every language)
   - multiple inheritance (C++, Lisp, Perl, Python)
   - mixins (Ruby - http://www.tutorialspoint.com/ruby/ruby_modules.htm)
   - traits (SELF, PHP - http://en.wikipedia.org/wiki/Traits_class#PHP)

For our Javascript classes, we'll use the concept of traits which work like php's traits 
and Ruby's simpler module mixins. We'll look at both here.

**Define a module to mixin**
<pre>
  <code>
  	var Logger = {
  	    log : function(str){
  	        console.log(str) //delegates to firebug
  	    },
  	    warn : function(str){
  	        console.warn(str)
  	    }
  	}
  	
  	**Apply the module as a mixin**
  	namespace("ui.controls.Box", {
  	    '@traits'  : [Logger],
  	    
    	  initialize : function(){
    	      alert("I am a box")
    	  }
  	})
  </code>
</pre>
