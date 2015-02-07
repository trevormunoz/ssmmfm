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
            this.listenTo(Backbone, 'seedQueryDuplicate', window.alert("Duplicate! Scoundrel! Knave!"));
            this.listenTo(Backbone, 'seedQueryFailure', this.flashFailMessage);
            this.listenTo(Backbone, 'facetQueryFailure', this.flashFailMessage);
            this.listenTo(Backbone, 'mltQueryFailure', this.flashFailMessage);
            this.listenTo(Backbone, 'entryAdded', this.updateCount);
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

        updateCount: function(data) {
            $('#stats').empty();
            var count = Math.floor(data);

            if ( count <= 1) {
                $('#stats').append('<p>'+ data + ' cluster reviewed</p>');
            } else {
                $('#stats').append('<p>'+ data + ' clusters reviewed</p>');
            };   
        }
        
        });
        
    return MessageView;
    
});