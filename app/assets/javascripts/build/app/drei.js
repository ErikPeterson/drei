var Backbone = require('backbone');
var $ = require('jquery-untouched');
    Backbone.$ = $;

var Drei = function(){
    this.hostname = window.location.hostname;
    this.__initialize();
};

Drei.prototype.__initialize = function(){
    var that = this;
    this.Models = require('./models/models.js')(Backbone, that);
    this.Views = require('./views/views.js')(Backbone, that);
    this.Router = require('./router.js')(Backbone, that);

    return this.__start(Backbone);
};

Drei.prototype.__start = function(){

    this.router = new this.Router();

    Backbone.history.start({pushState: true});
};
Drei.prototype.handleLink = function(e){
    if(this.isLocal(e)){
        e.preventDefault();
        this.router.navigate(e.target.pathname, {trigger: true});
    }
};
Drei.prototype.isLocal = function(e){
    return e.target.hostname === this.hostname;
};

module.exports = Drei;