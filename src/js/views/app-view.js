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
        
            var clusterView = new ClusterView();
            this.subviews.cluster = clusterView;
            
            var messageView = new MessageView();
            this.subviews.messages = messageView;

        },

        bootstrapCluster: function() {
            //Pick a random number between 0 & length of
            // document collection
            

            // Build up a query using this random id as seed
            

            // Issue a full text search against all documents using
            // a random scoring function --- i.e., get 10 random docs


            // 10 documents is default response length; 
            // pick one, again at random, and use its fingerprint
            // value to define first cluster
            

                // Trigger an event on Backbone & send seed value
                

            // If something goes wrong with the request,
            // trigger a failure event on Backbone
            
        },
            
    });
     
    return AppView
       
});
    