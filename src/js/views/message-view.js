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
        },

        flashFingerprint: function(data) {
            $('#message-body > p').empty();
            $('#message-body > p').append('fingerprint: ' + data);
        },

        flashFailMessage: function() {
            // Do something …
        },
        
        });
        
    return MessageView;
    
});