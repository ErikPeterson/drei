module.exports = function(Backbone, Drei){
    
    var $ = Backbone.$;
    var $body = $('body');

    var Header = Backbone.View.extend({
        className: 'drei-header',
        tagName: 'header',
        initialize: function(){
            this.showing = false;
            this.listenToOnce(this.model, 'sync', this.setHTML)

            return this.render();
        }, 
        setHTML: function(){
            this.setTitle();
            this.setNav();
        }, 
        setTitle: function(){
            this.$title_el = $(Drei.Layout.templates.title());
            this.$el.append(this.$title_el);
        },
        setNav: function(){
            this.$nav_el = ( Drei.Layout.templates.nav(this.model.attributes) );
            this.$el.append(this.$nav_el);
        }, 
        showNav: function(){
            this.$nav_el.show();
        }, 
        hideNav: function(){
            this.$nav_el.hide();
        },
        showTitle: function(){
            this.$title_el.show();
        },
        hideTitle: function(){
            this.$title_el.hide();
        },
        render: function(){
            this.has_rendered = true;
            $body.append(this.$el);

            return this;
        },
        show: function(){
            this.showing = true;
            this.$el.show();
        },
        hide: function(){
            this.showing = false;
            this.$el.hide();
        }
    });

    return Header;
};