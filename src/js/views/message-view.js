/*global define*/

define([
    'backbone',
    'jquery',
    'handlebars',
    'text!src/js/templates/message-template.html'
],

function(Backbone, $, Handlebars, messageTemplate) {
    'use strict';
    
    var MessageView = Backbone.View.extend ({
        el: '#messages',

        initialize: function() {

            this.listenTo(Backbone, 'serverStats', this.updateServerCount);
            this.listenTo(Backbone, 'fingerprintSuccess', this.flashFingerprint);
            this.listenTo(Backbone, 'raiseError', this.flashFailMessage);
            this.listenTo(Backbone, 'modalError', this.flashModalMessage);
            this.listenTo(Backbone, 'searchError', this.flashSearchMessage);
            this.listenTo(Backbone, 'entryAdded', this.updateCount);
        },

        messageTemplate: Handlebars.compile(messageTemplate),

        flashFingerprint: function(data) {
            $('#message-body').empty();
            var fingerprintMsg = 'fingerprint: ' + data;
            this.render({'parent': '#message-body', 'message': fingerprintMsg});
        },

        flashFailMessage: function(data) {
            var errorType = data;

            $('#message-body').empty();

            var errorMessages = {
                'dishAggFailed': "We couldn't get dishes associated with this cluster.",
                'duplicateSeed': 'Skipping duplicate …',
                'failedSeedQuery': "We're sorry—the server appears to be down. Try reloading this page.",
                'getFacetsFailed': 'We failed to get the facets.',
                'mltQueryFailed': 'We did not find more like this. Retrying …',
                'noValueSelected': 'Please select a value.',
                'serverError': 'Server is unavailable. Retrying …'
            };
            
            if (errorMessages[errorType]) {
                this.render({'parent': '#message-body', 'message': errorMessages[errorType]});
            } else {
                this.render({'parent': '#message-body', 'message': 'Something went wrong. Try reloading the page.'});
            }

        },

        flashModalMessage: function(data) {
            var errorType = data;
            $('#modal-message').empty();

            var errorMessages = {
                'emptyInput': 'Please input a value.'
            };

            if (errorMessages[errorType]) {
                this.render({'parent': '#modal-message', 'message': errorMessages[errorType]});
            } else {
                this.render({'parent': '#message-body', 'message': 'Something went wrong. Try reloading the page.'});
            }
            
        },

        flashSearchMessage: function(data) {
            var errorType = data;

            $('#search-message').empty();

            var errorMessages = {
                'emptyInput': 'Please input a value.',
                'noResults': 'No results.'
            };

            if (errorMessages[errorType]) {
                this.render({'parent': '#search-message', 'message': errorMessages[errorType]});
            } else {
                this.render({'parent': '#search-message', 'message': 'Something went wrong. Try reloading the page.'});
            }
        },

        updateCount: function(data) {
            $('#stats').empty();
            var count = Math.floor(data);

            var statsMsg = 0;
            if ( count === 1) {
                statsMsg = data + ' cluster reviewed this session';
            } else {
                statsMsg = data + ' clusters reviewed this session';
            }

            this.render({'parent': '#stats', 'message': statsMsg});
        },

        updateServerCount: function(data) {
            $('#server').empty();
            var count = Math.floor(data);

            var serverMsg = 0;
            if ( count === 1) {
                serverMsg = data + ' cluster reviewed to date';
            } else {
                serverMsg = data + ' clusters reviewed to date';
            }

            this.render({'parent': '#server', 'message': serverMsg});
        },

        render: function(data) {
            var parentSelector = data.parent;
            var val = data.message;

            $(parentSelector).append(this.messageTemplate( { message: val }));
            return this;
        },
        
        });
        
    return MessageView;
    
});