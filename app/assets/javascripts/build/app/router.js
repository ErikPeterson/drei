module.exports = function(Backbone, Drei){
   var $ = Backbone.$;

   var Router = Backbone.Router.extend({
        routes: {
            "objects/:slug_or_id": "showObject",
            "objects/:slug_or_id/3d-view": "show3dObject"
        },
        initialize: function(){
            this.setLayout();
            this.navigate(window.location.pathname, {trigger: true});
        },
        showObject: function(slug_or_id){
            Drei.Layout.header.show();
            var parentEl = $('<div class="three-object"></div>');
            
            Drei.Layout.replaceContentParent(parentEl);

            var obj = this.getObj(slug_or_id);
            var view = new Drei.Views.ThreeObjectView({model: obj, attributes: {parent_el: '.three-object'}});
        },
        show3dObject: function(slug_or_id){
            Drei.Layout.header.hide();

            var parentEl = $('<div class="three-object-threedee"></div>');

            Drei.Layout.replaceContentParent(parentEl);

            var obj = this.getObj(slug_or_id);
            var view = new Drei.Views.SingleThreeDeeObjectView({model: obj, attributes: {parent_el: '.three-object-threedee'}});
        },
        getObj: function(slug_or_id){

           return new Drei.Models.ThreeObject({id: slug_or_id});
        },
        setLayout: function(){
           Drei.Layout = Drei.Layout || new Drei.Views.Layout();
        }
    });

   return Router;
};