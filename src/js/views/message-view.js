/*global define*/

define([
    'backbone'
],

function(Backbone) {
    'use strict';
    
    var MessageView = Backbone.View.extend ({
        el: '#messages',

        initialize: function() {

            this.listenTo(Backbone, 'fingerprintSuccess', this.flashFingerprint);
            this.listenTo(Backbone, 'seedQueryFailure', this.flashFailMessage);
            this.listenTo(Backbone, 'seedQueryDuplicate', this.flashFailMessage);
            this.listenTo(Backbone, 'facetQueryFailure', this.flashFailMessage);
            this.listenTo(Backbone, 'mltQueryFailure', this.flashFailMessage);
            this.listenTo(Backbone, 'selectedValueError', this.flashValueError);
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

        flashValueError: function() {
            $('#message-body > p').empty();
            $('#message-body > p').append('Please select a value.');
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