/*global define*/

define([
        'backbone',
        'underscore',
        'jquery',
        'handlebars',
        'src/js/helpers/keybindings',
        'src/js/models/issue',
        'text!src/js/templates/form-template.html',
        'text!src/js/templates/issue-template.md'
], function(Backbone, _, $, Handlebars, Keybindings, Issue, formTemplate, issueTemplate) {
    'use strict';

    var ModalView = Backbone.View.extend({
        el: '#modals',

        modals: {
            '$genericModal': $('#info-modal'),
            '$textInputModal': $('#input-modal'),
            '$helpModal': $('#help-modal') 
        },

        formTemplate: Handlebars.compile(formTemplate),
        issueTemplate: Handlebars.compile(issueTemplate),

        openModal: false,

        initialize: function() {

            this.listenTo(Backbone, 'handleInputModal', this.closeInputModal);
            this.listenTo(Backbone, 'launchIssueModal', this.createIssue);
            this.listenTo(Backbone, 'handleIssueModal', this.submitIssue);
            this.listenTo(Backbone, 'clearModals', this.clear);

            Keybindings.initActionBindings(this);
        },

        clear: function() {
            $('.modal').modal('hide');
            this.openModal = false;
        },

        createIssue: function(data) {
            var fingerprint = data;
            var $issueDisplay = this.formTemplate({value: fingerprint});

            $('#info-modal .modal-body').empty();
            $('#info-modal .modal-body').append($issueDisplay);
            $('#info-modal').modal();
        },

        submitIssue: function() {

            var itemLinks = _.map($('.variant'), function(row) {
                return $(row).find('a').attr('href');
            });

            var issueBody = this.issueTemplate({
                fingerprint: $('#issue-form').data('issue'),
                description: $('#issue-input').val(),
                links: itemLinks
            });

            var issue = new Issue({
                title: 'Cluster needs review: ' + $('#issue-form').data('issue'),
                body: issueBody
            });

            issue.save();

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