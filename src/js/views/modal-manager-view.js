/*global define*/

define([
        'backbone',
        'jquery',
        'handlebars',
        'src/js/helpers/keybindings',
        'text!src/js/templates/issue-template.html',
], function(Backbone, $, Handlebars, Keybindings, issueTemplate) {
    'use strict';

    var ModalView = Backbone.View.extend({
        el: '#modals',

        modals: {
            '$genericModal': $('#info-modal'),
            '$textInputModal': $('#input-modal'),
            '$helpModal': $('#help-modal') 
        },

        issueTemplate: Handlebars.compile(issueTemplate),

        openModal: false,

        initialize: function() {

            this.listenTo(Backbone, 'handleInputModal', this.closeInputModal);
            this.listenTo(Backbone, 'launchIssueModal', this.createIssue);
            this.listenTo(Backbone, 'clearModals', this.clear);

            Keybindings.initActionBindings(this);
        },

        clear: function() {
            $('.modal').modal('hide');
            this.openModal = false;
        },

        createIssue: function(data) {
            var fingerprint = data;
            var $issueDisplay = this.issueTemplate({value: fingerprint});

            $('#info-modal .modal-body').empty();
            $('#info-modal .modal-body').append($issueDisplay);
            $('#info-modal').modal();

            Backbone.trigger('issueCreated');
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