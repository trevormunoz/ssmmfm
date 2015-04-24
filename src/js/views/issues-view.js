/*global define*/

define([
        'backbone'
], function(Backbone) {
    'use strict';

    var IssuesView = Backbone.View.extend({

        initialize: function() {

            var issues = this.collection.fetch();
            window.console.log(issues);

            var issueFingerprints = _.each(issues, function(model) {

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