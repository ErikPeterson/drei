var handlebars = require('handlebars');

var source = '<figure>' +
             '{{#if illustration_url}}' +
                '<img src="{{illustration_url}}" class="three-object-image" />' +
             '{{/if}}' +
             '<figcaption class="three-object-caption">' +
                '<h1><a href="/objects/{{slug}}">{{short_title}}</a></h1>' +
                '<div class="description">{{short_description}}</div>' +
             '</figcaption>' +
             '</figure>' +
             '<ul class="three-object-nav">' +
                '<li><a href="/objects/{{slug}}/3d-view">3D View</a></li>' +
             '</ul>';
             
var template = handlebars.compile(source);

module.exports = template;

