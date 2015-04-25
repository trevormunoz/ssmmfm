/*global define*/

define([
        'backbone',
        'underscore'
], function(Backbone, _) {
    'use strict';

    var IssuesView = Backbone.View.extend({

        initialize: function() {

            this.listenTo(this.collection, 'reset', this.loadIssues);

            this.collection.fetch({reset: true});
        },

        loadIssues: function() {

            var issueFingerprints = _.map(this.collection.models, function(model) {

                var text = model.get('title');
                var matches = text.split(/(\:\s)/);
                window.console.log(matches);
                var fingerprint = matches[0].trim();

                return fingerprint;
            });

            Backbone.trigger('serverDataRetrieved', issueFingerprints);
        },
        
    });

    return IssuesView;
});