module.exports = function(Backbone, Drei){
    return {
        ThreeObjectView: require('./ThreeObjectView.js')(Backbone, Drei),
        SingleThreeDeeObjectView: require('./SingleThreeDeeObjectView.js')(Backbone, Drei),
        Layout: require('./Layout.js')(Backbone, Drei),
        HeaderView: require('./HeaderView.js')(Backbone, Drei)
    };
};