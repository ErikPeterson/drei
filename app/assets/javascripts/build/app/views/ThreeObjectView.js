module.exports = function(Backbone, Drei){
    var $ = Backbone.$;
    var $body = $('body');
    var template = require('./templates/ThreeObject/show');

    var ThreeObjectView = Backbone.View.extend({
        tagName: "div",
        className: "three-object-inner",
        template: template,
        events: {
            'click a':'handleLink'
        },
        initialize: function(){
            this.$parent = (this.parent_el ? $(this.parent_el) : $body);
            this.listenToOnce(this.model, 'sync', this.initRender);
        },
        initRender: function(){
            this.$parent.html(this.$el);
            this.listenTo(this.model, 'change', this.render);
            this.render();
            return this;
        },
        render: function(){
            this.$el.html(this.template(this.model.attributes));
        },
        handleLink: function(e){
            return Drei.handleLink(e);
        }
    });
    return ThreeObjectView;
};