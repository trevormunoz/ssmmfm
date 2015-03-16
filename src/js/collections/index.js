/* global define */

define([
        'backbone',
        'src/js/helpers/server',
        'src/js/models/term'
], function(Backbone, esClient, IndexTerm) {
    'use strict';

    var Index = Backbone.Collection.extend({
        model: IndexTerm,
        url: 'http://api.publicfare.org/public_fare/term/_search',

        parse: function(response) {
            return response.hits.hits;
        },

        save: function() {

            var uploadPromise = esClient.bulk({
                index: 'public_fare',
                type: 'term',
                body: this.toJSON()
            });

            uploadPromise.then(function(data) {
                window.console.log(data.items);
            });

            uploadPromise.catch(function(data) {
                window.console.error(data.message.message);
            });
        },
    });

    return Index;
});