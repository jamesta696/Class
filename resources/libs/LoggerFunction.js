var Logger = function(hostClass){
    this.host = hostClass;
    this.host.logger = this;
};

Logger.prototype = {
    log : function(str){
        console.log(this.host.namespace + " logged -> " + str);
    }
};