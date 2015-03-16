/* global define */

define([
        'backbone',
        'src/js/helpers/server',
        'src/js/models/term'
], function(Backbone, esClient, IndexTerm) {
    'use strict';

    var Index = Backbone.Collection.extend({
        model: IndexTerm,

        save: function() {

            // Do something;

        },
    });

    return Index;
});