/*global define*/

define([
    'backbone'
],

function(Backbone) {
    'use strict';
    
    var MessageView = Backbone.View.extend ({
        el: '#messages',

        initialize: function() {

            this.listenTo(Backbone, 'seedQuerySuccess', this.flashFingerprint);
            this.listenTo(Backbone, 'seedQueryFailure', this.flashFailMessage);
            this.listenTo(Backbone, 'facetQueryFailure', this.flashFailMessage);
            this.listenTo(Backbone, 'mltQueryFailure', this.flashFailMessage);
        },

        flashFingerprint: function(data) {
            $('#message-body > p').empty();
            $('#message-body > p').append('fingerprint: ' + data);
        },

        flashFailMessage: function() {
            $('tbody').empty();
            $('#message-body > p').empty();
            $('#message-body > p').append('Something went wrong. Try reloading the page.');
        },
        
        });
        
    return MessageView;
    
});