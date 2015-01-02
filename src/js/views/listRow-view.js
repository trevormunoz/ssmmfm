/*global define*/

define([
        'backbone',
        'handlebars',
        'text!src/js/templates/listRow-template.html',
], function(Backbone, Handlebars, listRowTemplate) {
    'use strict';

    var RowView = Backbone.View.extend({
        tagName: 'td',

        listRowTemplate: Handlebars.compile(listRowTemplate),

        render: function() {
            
            return this.listRowTemplate(this.model.toJSON());
        }

    });

    return RowView;
});