module.exports = function(Backbone, Drei){

    var $ = Backbone.$;
    var $body = $('body');

    var templates = require('./templates/Layout/layout');
    
    var Layout = Backbone.View.extend({
        templates: templates,
        initialize: function(){
            this.setHeader();
        },
        setHeader: function(){
            var obj = new Drei.Models.Header();
            this.header = new Drei.Views.HeaderView({model: obj});
        },
        addContentParent: function(parentEl){
            this.$contentEl = this.$contentEl || $('<div class="content"></div>').appendTo($body);
            this.$contentEl.append(parentEl);
        },
        replaceContentParent: function(parentEl){
            this.$contentEl = this.$contentEl || $('<div class="content"></div>').appendTo($body);
            this.$contentEl.children().remove();
            this.$contentEl.append(parentEl);
        }
    });

    return Layout;
};