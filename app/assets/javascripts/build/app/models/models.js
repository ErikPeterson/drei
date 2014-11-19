module.exports = function(Backbone, Drei){
    return { 
        ThreeObject: require('./ThreeObject.js')(Backbone, Drei)
    };
};