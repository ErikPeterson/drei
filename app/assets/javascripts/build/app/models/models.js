module.exports = function(Backbone, Drei){
    return { 
        ThreeObject: require('./ThreeObject.js')(Backbone, Drei),
        Header: require('./Header.js')(Backbone, Drei)
    };
};