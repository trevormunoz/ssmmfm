/*global define*/

define([
    'backbone',
    'underscore', 
    'jquery',
    'src/js/helpers/server', 
    'src/js/views/cluster-view', 
    'src/js/views/message-view',
    'src/js/collections/seeds',
    'src/js/helpers/utils'
], function(Backbone, _, $, esClient, ClusterView, MessageView, Seeds) {
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
            var serverPromise = esClient.ping({
                requestTimeout: 1000,
                hello: "elasticsearch!"
            });

            serverPromise.then(function() {
                window.console.log("All is well!");
            });

            serverPromise.catch(function() {
                window.console.error('elasticsearch cluster is down!');
            });
        },

        bootstrapCluster: function() {
            //Pick a random number between 0 & length of
            // document collection
            var seedVal = _.random(0, 1321937);

            // Build up a query using this random id as seed
            var queryObj = {};

            queryObj.fields = ["dish_name_fingerprint"];
            queryObj.query = {};

            queryObj.query.function_score = {};
            queryObj.query.function_score.query = {"match_all": {}};
            queryObj.query.function_score.functions = [{"random_score": {"seed": seedVal}}];

            var queryString = JSON.stringify(queryObj);

            // Issue a full text search against all documents using
            // a random scoring function --- i.e., get 10 random docs
            var seedQueryPromise = $.ajax({
                type: 'GET',
                url: 'http://api.publicfare.org/menus/item/_search',
                data: $.param({source: queryString})
            });

            // 10 documents is default response length; 
            // pick one, again at random, and use its fingerprint
            // value to define first cluster
            seedQueryPromise.done(function(data) {
                var hitsArr = data.hits.hits;
                var potentialSeeds = _.map(
                        hitsArr, 
                        function(hitsObj){
                            var val = hitsObj.fields.dish_name_fingerprint[0];
                            return val;}
                        );
                var seed = _.sample(potentialSeeds);

                Backbone.trigger('seedQuerySuccess', seed);
                    
            });

            // If something goes wrong with the request,
            // trigger a failure event on Backbone
            seedQueryPromise.fail(function() {
                Backbone.trigger('raiseError', 'failedSeedQuery');
            });
        },
            
    });
     
    return AppView;
       
});
    