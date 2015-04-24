/*global define*/

define([
        'backbone'
], function(Backbone) {
    'use strict';

    var IssuesView = Backbone.View.extend({

        initialize: function() {
            this.collection.fetch();
        },
        
    });

    return IssuesView;
});