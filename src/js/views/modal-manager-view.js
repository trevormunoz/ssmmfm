/*global define*/

define([
        'backbone',
        'jquery'
], function(Backbone, $) {
    'use strict';

    var ModalView = Backbone.View.extend({
        el: '#modals',
        modals: {
            '$genericModal': $('#info-modal'),
            '$textInputModal': $('#input-modal'),
            '$helpModal': $('#help-modal') 
        },

        initialize: function() {
            window.console.log(this);
        }
    });

    return ModalView;
});