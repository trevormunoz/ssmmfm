/*global define*/

define([
    'backbone', 
    'src/js/views/cluster-view', 
    'src/js/views/message-view'
],
function(Backbone, ClusterView, MessageView) {
'use strict';

    var AppView = Backbone.View.extend({
        el: '#app-content',
        subviews: {},
        
        initialize: function() {
        
            // Set up subviews …
            var clusterView = new ClusterView();
            this.subviews.cluster = clusterView;
            
            var messageView = new MessageView();
            this.subviews.messages = messageView;

            // And event listeners …
            this.listenTo(Backbone, 'seedQuerySuccess', this.getFacets);

            // Start bootstrapping data …
            this.bootstrapCluster();
        },

        bootstrapCluster: function() {
            //Pick a random number between 0 & length of
            // document collection
            var seedVal = _.random(0, 1315024);

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
                url: 'http://54.165.158.184/menus/item/_search',
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

                // Trigger an event on Backbone & send seed value
                 Backbone.trigger('seedQuerySuccess', seed);
            });

            // If something goes wrong with the request,
            // trigger a failure event on Backbone
            seedQueryPromise.fail(function() {
                Backbone.trigger('seedQueryFailure');
            });
        },

        getFacets: function(data) {
            var fingerprintVal = data;

            // Build up a query w/a filter and an aggregation
            var queryObj = {};
            var query = {};
            var aggs = {};

            // Filter to include only documents with this fingerprint
            query.filtered = {};
            query.filtered.query = { "match_all": {} };
            query.filtered.filter = { "term": {
                "dish_name_fingerprint": fingerprintVal}
            };

            // Aggregate by dish id
            aggs.dish = {};
            aggs.dish.terms = { "field": "dish_id", "size": 0};

            // Pull it all together
            queryObj.size = 0;
            queryObj.query = query;
            queryObj.aggregations = aggs;
            
            var queryString = JSON.stringify(queryObj);

            // Fire off an AJAX call
            var clusterQueryPromise = $.ajax({
                type: 'GET',
                url: 'http://54.165.158.184/menus/item/_search',
                data: $.param({source: queryString})
            });

            clusterQueryPromise.done(function(data) {
                var facetsArr = data.aggregations.dish.buckets;

                var dishIds = _.map(
                        facetsArr, 
                        function(facetObj){
                            var facet = facetObj.key;
                            return facet;}
                        );

                // Trigger an event on Backbone & send ids
                Backbone.trigger('facetQuerySuccess', dishIds);
            });

            clusterQueryPromise.fail(function() {
                Backbone.trigger('facetQueryFailure');
            });
        },
            
    });
     
    return AppView
       
});
    