/* global define */

define([
        'backbone',
        'src/js/views/listRow-view'
], function(Backbone, RowView) {
    'use strict';
    
    var PickListView = Backbone.View.extend ({
        el: '#picker',

        initialize: function() {
            this.listenTo(Backbone, 'facetQuerySuccess', this.buildCluster);
            this.listenTo(this.collection, 'reset', this.render);

            this.$tableBody = this.$('tbody');
        },

        buildCluster: function(data) {
            var queryString = data;
            this.collection.fetch({data: {source: queryString}, reset: true});

        },

        render: function() {
            this.$tableBody.empty();

            this.collection.each(this.addRow, this);
            $('tbody tr:first-child').focus();
            return this;
        },

        addRow: function(dish) {
            var view = new RowView({model: dish});
            this.$tableBody.append(view.render());
        }
        
        });
        
    return PickListView;

});
        
        