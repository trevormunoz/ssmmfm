/* global define */

define([
        'backbone',
        'underscore',
        'src/js/models/issue'
], function(Backbone, _, Issue) {
    'use strict';

    var Issues = Backbone.Collection.extend({
        model: Issue,
        url: '/reviews',

        parse: function(response) {
            
            var openIssues = _.filter(response.issues, function(issue) {
                return issue.state === 'open';
            });

            return openIssues;
        },
    });

    return Issues;
});