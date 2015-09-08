# Javascript Classes
Class.js is lite-weight and optimized library used for defining namespaces, classes 
and inheritance in Javascript using a terse and supple syntax.
# testing 12345
**Define a Namespace**
<pre>
  <code>
  	namespace("ui.controls.Box");
  	ui.controls.Box = function(){}
  </code>
</pre>



**Define an empty Class in a Namespace**
<pre>
  <code>
  	namespace("ui.controls.Box", {
  	    //class body here
  	})
  </code>
  
  ==USAGE==
  var box = new ui.controls.Box;
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
  
  ==USAGE==
  var box = new ui.controls.Box; //invokes the constructor automatically
</pre>


**Define a Class constructor with arguments**
<pre>
  <code>
  	namespace("ui.controls.Box", {
    	  initialize : function(width, heigt){
    	      this.width  = width;
    	      this.height = height;
    	  }
  	})
  </code>
  
  ==USAGE==
  var box = new ui.controls.Box(300, 200);
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


# Code Sharing > Modules Mixins
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
  </code>
</pre>


**Apply the module as a mixin**
<pre>
  <code>
  	namespace("ui.controls.Box", {
  	    '@traits' : [Logger],
  	    
    	  initialize : function(){
    	      alert("I am a box")
    	  }
  	})
  </code>
</pre>


# Code Sharing > Traits
Traits are similar to module mixins, but does not actually mix itself into the prototype chain of
the class. Instead, a trait is self-contained function with seperate scope, runs isolated and able to decorate
the host class with new behavior and properties. A mixin otherwise mixes itself and all it's state into
the prototype of the class. Both ways have pros and cons.

**Define a function as a trait**
<pre>
  <code>
  	var Logger = function(hostClass){
  	        this.host = hostClass;
  	        this.host.logapi = this;
  	    };
  	    
  	    Logger.prototype = {
      	    log : function(str){
      	        console.log(this.host.namespace + " logged -> " + str);
      	    }
  	    }
  </code>
</pre>


**Apply the function as a trait**
<pre>
  <code>
  	namespace("ui.controls.Box", {
  	    '@traits' : [Logger],
  	    
    	  initialize : function(){
    	      console.log(this.logapi) //reference to Logger instance
    	  },
    	  
    	  log : function(str){
    	      this.logapi.log(str)
    	  }
  	})
  </code>
</pre>


# Code Sharing > Multiple Traits
Your class might make use of a single trait or multiple traits, -- works like multiple inheritance 
which could lead to ambigous method calls, but increases the leverage to share code across classes:

**Define multiple kinds of traits (as functions or modules)**
<pre>
  <code>
    var Draggable = {
        initialize : function(){},
        setDraggable : function(){...}
    };
    
    var Resizable = {...}
    
  	var Logger = function(hostClass){
  	        this.host = hostClass;
  	        this.host.logapi = this;
  	    };
  	    
  	    Logger.prototype = {
      	    log : function(str){
      	        console.log(this.host.namespace + " logged -> " + str);
      	    }
  	    }
  </code>
</pre>


**Implement multiple traits**
<pre>
  <code>
  	namespace("ui.controls.Box", {
  	    '@traits' : [Logger, Draggable, Resizable],
  	    
    	  initialize : function(){
    	      console.log("I can now log, drag and resize myself :");
    	  }
  	})
  </code>
</pre>
