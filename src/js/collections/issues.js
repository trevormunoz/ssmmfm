/* global define */

define([
        'backbone',
        'src/js/models/issue'
], function(Backbone, Issue) {
    'use strict';

    var Issues = Backbone.Collection.extend({
        model: Issue,
        url: '/reviews',

        parse: function(response) {
            return response.issues;
        },
    });

    return Issues;
});