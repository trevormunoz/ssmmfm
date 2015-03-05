/* global define */

define([
        'backbone',
        'src/js/models/term'
], function(Backbone, IndexTerm) {
    'use strict';

    var Index = Backbone.Collection.extend({
        model: IndexTerm,
        url: 'http://54.165.158.184/public_fare/term/_search',

        parse: function(response) {
            return response.hits.hits;
        },

        save: function() {
            // Do stuff
        },
    });

    return Index;
});