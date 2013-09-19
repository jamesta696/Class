/*
	Copyright © 2013 ΩF:∅ Working Group contributors.
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
	associated documentation files (the "Software"), to deal in the Software without restriction, including 
	without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
	sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
	subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all copies or substantial 
	portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN 
	NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

; (function(env) {
    var Class;
    env.NSRegistry = {};
    env.Class = Class = function(){};
        Class.prototype = {
	        preInitialize: function(){
	        	this.initializeTraits(arguments);
	            return this.initialize.apply(this, arguments);
	        },
	        
	        initialize       : function() {return this;},
			
			hasOwnMember : function(key){
				try{return this.constructor.prototype.hasOwnProperty(key)}
				catch(e){return this.hasOwnProperty(key);}
			},
			
			initializeTraits : function(){
				var traits = this["@traits"]||[];
				for(var i=0; i<=traits.length-1; i++){
					var trait = traits[i];
					if(typeof trait == "function"){
		                new trait(this,arguments);
					}
					else if(trait && trait.initialize) {
						trait.initialize.apply(this,arguments);
					}
				}
			}
		};
    
    
    env.namespace = function(ns, def){
        if(def && typeof def == "object"){
            def.namespace = ns;
            def.classname = /([a-zA-Z]*)$/.test(ns) ? RegExp.$1:"Anonymous";
        }
        var n = createNS(ns);
        env.NSRegistry[ns] = n[0][n[1]] = def ?
        	createClass(def) : {};
    };
    
    
    var createNS = function(aNamespace){
		var scope       = env;
		var parts       = aNamespace.split(/\./g); 
		var classname 	= parts.pop();
			
		for (var i = 0; i <= parts.length - 1; i++) {
			scope = scope[parts[i]]||(scope[parts[i]] = {});
		};
		return [scope,classname];
	};
	
	var createClass = function(properties){
	    if(typeof properties == "function"){return properties}
		var obj = (properties["@inherits"]||Class);
		var traits = (properties["@traits"]||{});
        if (typeof(obj) === "function") {
            var F = function(){}; //optimization
            	F.prototype = obj.prototype;
				
			var klass = function() {
                return this.preInitialize.apply(this, arguments);
            };
            klass.prototype = new F();
			inheritTraits(klass.prototype, traits);
			inheritProperties(klass.prototype, properties);
				
            klass.prototype.constructor = klass;
			klass.prototype.ancestor = obj;
        }
        return klass;
    };
    
    var inheritTraits = function(klass, properties){
        var _traits = properties; 
        if (_traits) {
            var traits = [];
            if (_traits.reverse) {
                traits = traits.concat(_traits.reverse());}
            else {traits.push(_traits);}
			var trait;
            for (var i = 0; (trait = traits[i]); i++) {
                if (typeof trait == "object") {
					inheritProperties(klass, trait)
				}
			}
        }
        return klass;
    };
        
    var inheritProperties = function(dest, src, fname){
        if (!src || !dest) {return;}
        if (arguments.length === 3) {
            var ancestor    = dest[fname], 
                descendent  = src[fname], 
                method      = descendent;
                
            descendent = function() {
                var ref 	= this.parent;
                this.parent = ancestor;
                var result 	= method.apply(this, arguments);
                if(ref) {
					this.parent = ref;
				}
				else { delete this.parent }
                return result;
            };
            descendent.valueOf  = function() { return method;};
            descendent.toString = function() { return method.toString();};
            dest[fname] = descendent;
        }
        else {
            for (var prop in src) {
                if (dest[prop] && typeof(src[prop]) === 'function') { 
                    inheritProperties(dest, src, prop);
                }
                else { dest[prop] = src[prop]; }
            }
        }
        return dest;
    };
})(this);
