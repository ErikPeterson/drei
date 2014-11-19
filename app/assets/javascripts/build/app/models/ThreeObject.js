module.exports = function(Backbone, Drei){
    var $ = Backbone.$;

    var ThreeObject = Backbone.Model.extend({
        urlRoot: '/objects',
        initialize: function(){

            this.fetch({
                error: function(model, response, options){
                    console.error(model, response, options);
                },
                success: function(model, response, options){
                    model.setShortValues();
                }
            });
        },
        setShortValues: function(){
            this.setShortDescription();
            this.setShortTitle();
        },
        setShortDescription: function(){
            var desc = this.get('description') || "";
            if(desc.length > 280){
                desc = desc.slice(0, 277) + '…';
            }
            this.set('short_description', desc);
        },
        setShortTitle: function(){
            var title = this.get('full_name') || "";
            if(title.length > 140){
                title = title.slice(0, 137) + '…';
            }
            this.set('short_title', title);
        }
    });

    return ThreeObject;
};