var handlebars = require('handlebars');
var fs = require('fs');

var sources = {
    nav: fs.readFileSync(__dirname + '/nav.handlebars', {encoding: 'utf-8'}),
    title: fs.readFileSync(__dirname + '/title.handlebars', {encoding: 'utf-8'})
};

var templates = {};

for( var key in sources){
    templates[key] = handlebars.compile(sources[key]);
}

module.exports = templates;