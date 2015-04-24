/*global define*/

define([
        'backbone'
], function(Backbone) {
    'use strict';

    var IssuesView = Backbone.View.extend({

        initialize: function() {

            this.listenTo(this.collection, 'reset', this.loadIssues);

            this.collection.fetch({reset: true});
        },

        loadIssues: function() {

            var issueFingerprints = _.each(this.collection, function(model) {

                var text = model.get('body');
                var matches = text.match(/\s\/.*?\/\s/);

                var fingerprint = matches[0].trim();

                return fingerprint;
            });

            Backbone.trigger('serverDataRetrieved', issueFingerprints);
        },
        
    });

    return IssuesView;
});