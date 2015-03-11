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
            this.listenTo(Backbone, 'raiseError', this.flashFailMessage);
            this.listenTo(Backbone, 'modalError', this.flashModalMessage);
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
            
            switch(errorType) {
                case "failedSeedQuery":
                    var errorMsg = 'Replace me with a better error message.';
                    break;
                case "duplicateSeed": 
                    var errorMsg = 'Replace me with a better error message.';
                    break;
                case "getFacetsFailed":
                    var errorMsg = 'Replace me with a better error message.';
                    break;
                case "mltQueryFailed":
                    var errorMsg = 'Replace me with a better error message.';
                    break;
                case "noValueSelected":
                    var errorMsg = 'Please select a value.';
                    break;
                default:
                    var errorMsg = 'Something went wrong. Try reloading the page.';
                    break;
            }
            
            this.render({'parent': '#message-body', 'message': errorMsg});

        },

        flashModalMessage: function(data) {
            var errorType = data;
            $('#modal-message').empty();
            
            switch(errorType) {
                case "emptyInput":
                    var errorMsg = 'Please input a value.';
                    break;
                default:
                    var errorMsg = 'Something went wrong. Try reloading the page.';
                    break;
            }

            this.render({'parent': '#modal-message', 'message': errorMsg});
        },

        updateCount: function(data) {
            $('#stats').empty();
            var count = Math.floor(data);

            if ( count <= 1) {
                var statsMsg = data + ' cluster reviewed';
            } else {
                var statsMsg = data + ' clusters reviewed';
            };

            this.render({'parent': '#stats', 'message': statsMsg});
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