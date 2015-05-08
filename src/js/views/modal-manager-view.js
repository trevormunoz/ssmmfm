/*global define*/

define([
        'backbone',
        'underscore',
        'jquery',
        'handlebars',
        'src/js/helpers/keybindings',
        'src/js/models/issue',
        'src/js/collections/dishes',
        'src/js/helpers/queries',
        'text!src/js/templates/form-template.html',
        'text!src/js/templates/help-template.html',
        'text!src/js/templates/edit-template.html'
], function(Backbone, _, $, Handlebars, Keybindings, Issue, Dishes, Queries, formTemplate, helpTemplate, editTemplate) {
    'use strict';

    var ModalView = Backbone.View.extend({
        el: '#modals',

        modals: {
            '$genericModal': $('#info-modal'),
            '$textInputModal': $('#input-modal'),
            '$helpModal': $('#help-modal') 
        },

        formTemplate: Handlebars.compile(formTemplate),
        helpTemplate: Handlebars.compile(helpTemplate),
        editTemplate: Handlebars.compile(editTemplate),

        openModal: false,

        initialize: function() {

            this.listenTo(Backbone, 'handleInputModal', this.closeInputModal);
            this.listenTo(Backbone, 'editSavedTerm', this.editTerm);
            this.listenTo(Backbone, 'launchIssueModal', this.createIssue);
            this.listenTo(Backbone, 'spinWhileSubmit', this.displayWaiting);
            this.listenTo(Backbone, 'handleIssueModal', this.submitIssue);
            this.listenTo(Backbone, 'getHelp', this.showHelpModal);
            this.listenTo(Backbone, 'clearModals', this.clear);

            Keybindings.initActionBindings(this);
        },

        clear: function() {
            $('.modal').modal('hide');
            this.openModal = false;
        },

        editTerm: function(data) {
            var model = data
            , dishCollex = new Dishes();

            var setDishes = function() {
                var dishIds = _.map(dishCollex.pluck('dish_id'), function(id){ return Number(id).toFixed();});
                model.set('dishes_aggregated', dishIds);
            };

            dishCollex.fetch(Queries.getAggregatedDishes(model.get('fingerprint_value')));
            this.listenTo(dishCollex, 'reset', setDishes);

            // Clean up by destroying all the dish models rather by reset
            _.each(_.clone(dishCollex.models), function(model) { model.destroy(); });


            var $termEditor = this.editTemplate(model.toJSON());

            $('#info-modal .modal-body').empty();
            $('#info-modal .modal-body').append($termEditor);
            this.openModal = true;
            $('#info-modal').modal();
        },

        createIssue: function(data) {
            var model = data;

            var $issueDisplay = this.formTemplate({value: model.get('fingerprint_value')});

            $('#info-modal .modal-body').empty();
            $('#info-modal .modal-body').append($issueDisplay);
            this.openModal = true;
            $('#info-modal').modal();

            this.modals.$genericModal.on('hidden.bs.modal', function() {
                this.openModal = false;

                if ($('#issue-input').val() === '') {
                    Backbone.trigger('replace', model);
                }
            });
        },

        displayWaiting: function() {
            $('#issueSubmitButton').empty();
            $('#issueSubmitButton').append('<span class="glyphicon glyphicon-refresh glyphicon-spin"></span>');
        },

        submitIssue: function() {

            var itemLinks = _.map($('.variant'), function(row) {
                return $(row).find('a').attr('href');
            });

            var issueBody = {
                fingerprint: $('#issue-form').data('issue'),
                description: $('#issue-input').val(),
                links: itemLinks
            };

            var issue = new Issue({
                title: 'Cluster needs review: ' + $('#issue-form').data('issue'),
                body: issueBody
            });

            issue.save(null, {
                wait: true,
                success: function(model, response) {
                    $('#issueSubmitButton').attr('disabled', 'disabled');
                    Backbone.trigger('clearModals');

                    Backbone.trigger('issueCreated', model.get('html_url'));

                    model.trigger('destroy', model);
                    $('#issueSubmitButton').empty();
                    $('#issueSubmitButton').append('Submit');

                },
                error: function(model, error) {
                    window.console.error(error);
                }
            });

        },

        showHelpModal: function() {
            var $helpDisplay = this.helpTemplate();

            $('#help-modal .modal-body').empty();
            $('#help-modal .modal-body').append($helpDisplay);
            this.openModal = true;

            this.modals.$helpModal.modal();
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