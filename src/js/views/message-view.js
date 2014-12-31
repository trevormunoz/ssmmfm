/*global define*/

define([
    'backbone'
],

function(Backbone) {
    'use strict';
    
    var MessageView = Backbone.View.extend ({
        el: '#messages',

        initialize: function() {

            this.listenTo(Backbone, 'seedQueryFailure', this.flashFailMessage);
            this.listenTo(Backbone, 'facetQueryFailure', this.flashFailMessage);
        },

        flashFailMessage: function() {
            // Do something …
        },
        
        });
        
    return MessageView;
    
});