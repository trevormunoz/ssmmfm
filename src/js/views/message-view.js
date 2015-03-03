/*global define*/

define([
    'backbone',
    'handlebars',
    'text!src/js/templates/message-template.html'
],

function(Backbone, Handlebars, messageTemplate) {
    'use strict';
    
    var MessageView = Backbone.View.extend ({
        el: '#messages',

        initialize: function() {

            this.listenTo(Backbone, 'fingerprintSuccess', this.flashFingerprint);
            this.listenTo(Backbone, 'seedQueryFailure', this.flashFailMessage);
            this.listenTo(Backbone, 'seedQueryDuplicate', this.flashFailMessage);
            this.listenTo(Backbone, 'facetQueryFailure', this.flashFailMessage);
            this.listenTo(Backbone, 'mltQueryFailure', this.flashFailMessage);
            this.listenTo(Backbone, 'entryAdded', this.updateCount);
        },

        messageTemplate: Handlebars.compile(messageTemplate),

        flashFingerprint: function(data) {
            $('#message-body').empty();
            $('#message-body').append(this.messageTemplate({message: 'fingerprint: ' + data}));
        },

        flashFailMessage: function() {
            $('tbody').empty();
            $('#message-body').empty();
            $('#message-body').append(this.messageTemplate({message:'Something went wrong. Try reloading the page.'}));
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