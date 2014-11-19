var handlebars = require('handlebars');

var source = '<figure>' +
            '{{#if illustration_url}}' +
                '<img src="{{illustration_url}}" class="three-object-image" />' +
            '{{/if}}' +
            '<figcaption class="three-object-caption">' +
                '<h1><a href="/objects/{{slug}}">{{short_title}}</a></h1>' +
                '<div class="description">{{description}}</div>' +
            '</figcaption>' +
            '</figure>' +
            '<div class="three-object-meta">' +
                 '<ul class="three-object-nav">' +
                    '<li><a href="/objects/{{slug}}/3d-view">3D View</a></li>' +
                 '</ul>' +
                 '<div class="three-object-tags">' +
                    '<span class="tags-label">Tags: </span>' +
                    '<ul class="tag-list">' +
                        '{{#each tag_names}}' +
                            '<li><a href="objects/tagged/{{this}}">{{this}}</a></li>' +
                        '{{/each}}' +
                    '</ul>' +
                '</div>' +
            '</div>';
             
var template = handlebars.compile(source);

module.exports = template;

