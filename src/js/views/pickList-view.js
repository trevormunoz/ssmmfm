/* global define */

define([
        'backbone'
], function(Backbone) {
    'use strict';
    
    var PickListView = Backbone.View.extend ({
        el: '#picker',

        initialize: function() {
            this.listenTo(Backbone, 'facetQuerySuccess', this.buildCluster);
        },

        buildCluster: function(data) {
            var queryString = data;
            this.collection.fetch({data: {source: queryString}, reset: true});

        },
        
        });
        
    return PickListView;

});
        
        