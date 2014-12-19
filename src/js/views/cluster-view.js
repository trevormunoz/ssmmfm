/*global define*/

define([
    'backbone', 
    'src/js/collections/cluster',
    'src/js/views/pickList-view',
    'src/js/views/item-view',
    'src/js/views/index-view'
],

function(Backbone, Cluster, PickListView, ItemView, IndexView) {
    'use strict';
    
    var ClusterView = Backbone.View.extend({
        el: '#cluster',
        subviews: {},
        
        initialize: function () {
            var cluster = new Cluster();
            var picker = new PickListView({collection: cluster});
            this.subviews.picker = picker;

            var viewer = new ItemView();
            this.subviews.viewer = viewer;
            
            var index = new IndexView();
            this.subviews.index = index;

                }
        });

return ClusterView;

});