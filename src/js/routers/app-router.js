/* global define */

define([
        'backbone',
        'src/js/views/app-view',
        'src/js/views/cluster-view'
], function(Backbone, AppView, ClusterView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'loadDefault' 
        },

        initialize: function() {
            new AppView();
        },

        loadDefault: function() {
            Backbone.trigger('loadDefault');
        },

    });

    return AppRouter;
});