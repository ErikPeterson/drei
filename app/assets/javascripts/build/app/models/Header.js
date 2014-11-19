module.exports = function(Backbone, Drei){
    
    var $ = Backbone.$;
    var $body = $('body');

    var Header = Backbone.Model.extend({
        urlRoot: '/nav-data',
        initialize: function(){
            
            this.fetch({
                error: function(model, response, options){
                    console.error(model, response, options);
                }
            });
        }
    });

    return Header;
};