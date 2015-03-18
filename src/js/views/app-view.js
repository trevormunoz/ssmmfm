/*global define*/

define([
    'backbone',
    'underscore', 
    'jquery',
    'src/js/helpers/server', 
    'src/js/views/cluster-view', 
    'src/js/views/message-view',
    'src/js/collections/seeds',
    'src/js/helpers/queries'
], function(Backbone, _, $, esClient, ClusterView, MessageView, Seeds, Queries) {

'use strict';

    var AppView = Backbone.View.extend({
        el: '#app-content',
        subviews: {},
        
        initialize: function() {
        
            // Set up subviews 
            var seedsCollex = new Seeds();
            var clusterView = new ClusterView({collection: seedsCollex});            
            this.subviews.cluster = clusterView;
            
            var messageView = new MessageView();
            this.subviews.messages = messageView;

            this.listenTo(Backbone, 'loadDefault', this.bootstrapCluster);

            // Smoke test for server
            this.checkServer();

        },

        cleanUp: function() {

            _.each(this.subviews, function(subview) {
                if(subview) {
                    subview.remove();
                }
            });

            this.remove();
            
        },

        checkServer: function() {

            var serverPromise = esClient.ping({
                requestTimeout: 1000,
                hello: "elasticsearch!"
            });

            serverPromise.then(function() {
                window.console.log('Elasticsearch cluster: All is well!');
            }, function(err) {
                Backbone.trigger('raiseError', 'serverError');
                window.console.error('Elasticsearch cluster is down!');
                window.console.error(err.message);
            });
        },

        bootstrapCluster: function() {
            var seedQuery = Queries.getRandomSeed();
            Backbone.trigger('startLoadingSpinner');

            // Issue a full text search against all documents using
            // a random scoring function --- i.e., get 10 random docs
            var seedQueryPromise = esClient.search({
                index: 'menus',
                body: seedQuery
            });

            // 10 documents is default response length; 
            // pick one, again at random, and use its fingerprint
            // value to define first cluster
            seedQueryPromise.then(function(data) {
                var hitsArr = data.hits.hits;
                var potentialSeeds = _.map(
                        hitsArr, 
                        function(hitsObj){
                            var val = hitsObj.fields.dish_name_fingerprint[0];
                            return val;}
                        );
                var seed = _.sample(potentialSeeds);

                Backbone.trigger('seedQuerySuccess', seed);
            
                // If something goes wrong with the request,
                // trigger a failure event on Backbone
            }, function(err) {
                Backbone.trigger('raiseError', 'failedSeedQuery');
            });

        },
            
    });
     
    return AppView;
       
});
    