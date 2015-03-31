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
            
            this.getServerIds();

        },

        getServerIds: function() {
            
            var that = this;
            var allIds = [];

            var scanPromise = esClient.search({
                index: 'public_fare',
                type: 'term',
                searchType: 'scan',
                scroll: '30s',
                fields: ['term_id'],
                body: {"query": { "match_all": {} }}
            });

            scanPromise.then(function getMoreUntilDone(response) {
                
                if (response.hits.total !== 0) {
                    
                    _.each(response.hits.hits, function(hit) {
                        allIds.push(hit.term_id);
                    });

                    if (response.hits.total !== allIds.length) {
                        
                        var scrollPromise = esClient.scroll({
                            scrollId: response._scroll_id,
                            scroll: '30s'
                        });

                        scrollPromise.then(getMoreUntilDone);

                    } else {
                        // pass
                    }
                
                } else {
                    window.console.log('No ids on server');
                }

            })
            .then(function() {

                if (! _.isEmpty(allIds)) {
                    that.filterIndex(_.max(allIds));
                } else {
                    that.filterIndex(0);
                }

            }, function(err) {
                window.console.error(err);
            });

        },

        filterIndex: function(data) {

            var serverOffset = data;

            var uploadBody = [];
            this.each(function(model) {

                if (model.has('dishes_aggregated') 
                        && model.has('_session_id')) {

                    var id = model.get('_session_id') + serverOffset;
                    model.set('term_id', id);
                    model.unset('_session_id');
                    uploadBody.push({index: {'_version': 1}});
                    uploadBody.push(model.toJSON());
                }

            });

            this.sendData(uploadBody);

        },

        sendData: function(bulkUpload) {

           var uploadPromise = esClient.bulk({
                index: 'public_fare',
                type: 'term',
                refresh: true,
                body: bulkUpload
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