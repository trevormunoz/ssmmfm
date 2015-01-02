/*global define*/

define([
    'backbone',
    'mousetrap', 
    'src/js/collections/cluster',
    'src/js/views/pickList-view',
    'src/js/views/item-view',
    'src/js/views/index-view'
],

function(Backbone, Mousetrap, Cluster, PickListView, ItemView, IndexView) {
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

            // Set up key bindings
            var that = this;
            Mousetrap.bind('space', function() {
                that.resetCluster();
            });

        },

        resetCluster: function() {
            var rowEls = $('.variant');
            
            var sample = function(elArray) {
                if (elArray.length > 3) {
                    return _.sample(elArray, 3);
                } else {
                    return elArray;
                };
            };

            var dishIds = _.map(
                    sample(rowEls),
                    function(el) {
                        var _id = $(el).attr('id');
                        return _id; 
                    }
                );
            
            // Build up a query object
            var queryObj = {}
            , query = {}
            , mltClause = {};

            mltClause.fields = ["menu_sponsor", "menu_location"];
            mltClause.ids = dishIds;
            mltClause.min_term_freq = 1;
            mltClause.min_doc_freq = 1;

            query.mlt = mltClause;
            queryObj.query = query;

            var queryString = JSON.stringify(queryObj);

            // Later we may create a collection to handle fetch,
            // but for now, fire off an AJAX call directly
            var mltPromise = $.ajax({
                type: 'GET',
                url: 'http://54.165.158.184/menus/item/_search',
                data: $.param({source: queryString})
            });

            mltPromise.done(function(data) {
                var hitsArr = data.hits.hits;
                var newSeed = _.sample(hitsArr)._source.dish_name_fingerprint;
                Backbone.trigger('seedQuerySuccess', newSeed);
            });

            mltPromise.fail(function() {
                // Do something useful …
            });
        },
    });

return ClusterView;

});