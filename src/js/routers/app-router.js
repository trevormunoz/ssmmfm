/* global define */

define([
        'backbone',
        'src/js/views/app-view'
], function(Backbone, AppView) {
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