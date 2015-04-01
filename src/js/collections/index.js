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
        
        initialize: function() {
            // get whatever is on the server
            var that = this;
            //Starting this empty causes one 'superfluous' request
            var allIds = [];
            var allFingerprints = [];

            var scanPromise = esClient.search({
                index: 'public_fare',
                type: 'term',
                searchType: 'scan',
                size: 20,
                scroll: '30s',
                fields: ['term_id', 'fingerprint_value'],
                body: {"query": { "match_all": {} }}
            });

            scanPromise.then(function getMoreUntilDone(response) {
                
                if (response.hits.total !== 0) {
                    
                    _.each(response.hits.hits, function(hit) {
                        allIds.push(hit.fields.term_id[0]);
                        allFingerprints.push(hit.fields.fingerprint_value[0]);
                    });

                    if (response.hits.total !== allIds.length) {
                        
                        var scrollPromise = esClient.scroll({
                            scrollId: response._scroll_id,
                            scroll: '30s'
                        });

                        scrollPromise.then(getMoreUntilDone);

                    } else {

                        Backbone.trigger('serverDataRetrieved', allFingerprints);
                        if (! _.isEmpty(allIds)) {
                            var serverMaxima = _.max(allIds);
                            that.idOffset = serverMaxima + 1;
                        } else {
                            window.console.log('nothing to add');
                        }
                    }
                
                } else {
                    window.console.log('No ids on server');
                }

            }, function(err) {
                window.console.error(err);
            });

        },

        save: function() {
            
            var toSave = this.filterCollexForSave(this.idOffset);
            this.sendData(toSave);

        },

        filterCollexForSave: function(data) {

            var serverOffset = data;

            var uploadBody = [];
            this.each(function(model) {

                if (model.has('dishes_aggregated') 
                        && model.has('_session_id')) {

                    var id = model.get('_session_id');
                    window.console.log(id);
                    model.set('term_id', id);
                    model.unset('_session_id');
                    uploadBody.push({index: {}});
                    uploadBody.push(model.toJSON());
                }

            });

            return uploadBody;

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