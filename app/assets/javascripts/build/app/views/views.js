module.exports = function(Backbone, Drei){
    return {
        ThreeObjectView: require('./ThreeObjectView.js')(Backbone, Drei),
        SingleThreeDeeObjectView: require('./SingleThreeDeeObjectView.js')(Backbone, Drei)
    }
};