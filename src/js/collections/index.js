/* global define */

define([
        'backbone',
        'underscore',
        'src/js/helpers/server',
        'src/js/models/term'
], function(Backbone, _, esClient, IndexTerm) {
    'use strict';

    var Index = Backbone.Collection.extend({
        model: IndexTerm,
        idOffset: 1,

        save: function() {
            
            this.each(function(model) {

                if (model.has('dishes_aggregated')) {
                    window.console.log(model);
                } else {
                    window.console.log('no dishes!');
                }

            });

        },

        getIdOffset: function() {
            var that = this;
            var allIds = [];

            var scrollPromise = esClient.search({
                index: 'public_fare',
                type: 'term',
                searchType: 'scan',
                scroll: '30s',
                fields: ['term_id'],
                body: {"query": { "match_all": {} }}
            });

            scrollPromise.then(function (response) {
                if (response.hits.total !== 0) {
                    
                    _.each(response.hits.hits, function(hit) {
                        allIds.push(hit.term_id);
                    });

                    if (response.hits.total !== allIds.length) {
                        window.console.log("More responses to get");
                    } else {
                        window.console.log("All ids acquired");
                    }
                } else {
                    that.save(0);
                }

            })
            .then(function() {

                if (_.isEmpty(allIds)) {
                    that.save(0);
                } else {
                    window.console.log(allIds);
                    that.save(_.max(allIds));
                }

            }, function(err) {
                window.console.error(err);
            });

        },

        sendData: function(data) {

            var fromOffset = data;

            this.each(function(model) {
                model.set('term_id', fromOffset+1);
                fromOffset++;
            });

            window.console.log(this);

            var uploadBody = [];
            _.map(this.toJSON(), function(modelJSON) {
                uploadBody.push({index: {}});
                uploadBody.push(modelJSON);
            });

           var uploadPromise = esClient.bulk({
                index: 'public_fare',
                type: 'term',
                body: uploadBody
            });

            uploadPromise.then(function(data) {
                window.console.log(data.items);
            }, function(err) {
                window.console.error(err.message.message);
            });

        },
    });

    return Index;
});