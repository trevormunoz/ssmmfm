/*global define*/

define([
        'backbone',
        'handlebars',
        'text!src/js/templates/term-template.html',
], function(Backbone, Handlebars, termTemplate) {
    'use strict';

    var TermView = Backbone.View.extend({
        termTemplate: Handlebars.compile(termTemplate),
        render: function() {
            return this.termTemplate(this.model.toJSON());
        }
    });

    return TermView;
});