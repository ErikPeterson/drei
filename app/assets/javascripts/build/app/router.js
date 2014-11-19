module.exports = function(Backbone, Drei){
   
   var Router = Backbone.Router.extend({
        routes: {
            "objects/:slug_or_id": "showObject",
            "objects/:slug_or_id/3d-view": "show3dObject"
        },
        initialize: function(){
            this.navigate(window.location.pathname, {trigger: true})
        },
        showObject: function(slug_or_id){
            var obj = this.getObj(slug_or_id);
            var view = new Drei.Views.ThreeObjectView({model: obj});
        },
        show3dObject: function(slug_or_id){
            var obj = this.getObj(slug_or_id);
            var view = new Drei.Views.SingleThreeDeeObjectView({model: obj});
        },
        getObj: function(slug_or_id){
           return new Drei.Models.ThreeObject({id: slug_or_id});
        }
    });

   return Router;
};