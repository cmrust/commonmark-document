module.exports = {
    debug: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('DEBUG:');
        this.log.apply(this, args)
    },
    info: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('INFO:');
        this.log.apply(this, args)
    },
    warn: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('WARN:');
        this.log.apply(this, args)
    },
    error: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('ERROR:');
        this.err.apply(this, args)
    },
    fatal: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('FATAL:');
        this.err.apply(this, args)
    },
    log: function(){
        var args = Array.prototype.slice.call(arguments);
        args.unshift('['+new Date().toLocaleTimeString()+']');
        console.log.apply(this, args);
    },
    err: function(){
        var args = Array.prototype.slice.call(arguments);
        args.unshift('['+new Date().toLocaleTimeString()+']');
        console.error.apply(this, args);
    }
};