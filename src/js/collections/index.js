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

            var uploadBody = [];
            _.map(this.toJSON(), function(model) {
                uploadBody.push({index: {}});
                uploadBody.push(model);
            });

           var uploadPromise = esClient.bulk({
                index: 'public_fare',
                type: 'term',
                body: uploadBody
            });

            uploadPromise.then(function(data) {
                window.console.log(data.items);
            }, function(data) {
                window.console.error(data.message.message);
            });

        },
    });

    return Index;
});