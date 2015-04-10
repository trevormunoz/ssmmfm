/*global define*/

define([
        'backbone',
        'jquery',
        'src/js/helpers/keybindings',
], function(Backbone, $, Keybindings) {
    'use strict';

    var ModalView = Backbone.View.extend({
        el: '#modals',

        modals: {
            '$genericModal': $('#info-modal'),
            '$textInputModal': $('#input-modal'),
            '$helpModal': $('#help-modal') 
        },

        openModal: false,

        initialize: function() {

            this.listenTo(Backbone, 'handleInputModal', this.closeInputModal);
            this.listenTo(Backbone, 'clearModals', this.clear);

            Keybindings.initActionBindings(this);
        },

        clear: function() {
            $('.modal').modal('hide');
            this.openModal = false;
        },

        closeInputModal: function() {
            var selectedVal = $('#input-modal input').val();
            if (selectedVal !== '') {
                Backbone.trigger('valueSelected', selectedVal);
                this.modals.$textInputModal.modal('hide');
                Backbone.trigger('shuffle');
            } else {
                Backbone.trigger('modalError', 'emptyInput');
            }

            this.modals.$textInputModal.on('hidden.bs.modal', function() {
                    this.openModal = false;
                    $('div#modal-message').empty();
                });
        }
    });

    return ModalView;
});