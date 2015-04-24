/* global define */

define([
        'backbone',
        'src/js/models/issue'
], function(Backbone, Fingerprint) {
    'use strict';

    var Issues = Backbone.Collection.extend({
        model: Issue,
        url: '/reviews',

        parse: function(response) {
            window.console.log(response);
        },
    });

    return Issues;
});