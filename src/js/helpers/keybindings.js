/* global define */

define(['mousetrap'], function(Mousetrap) {
    'use strict';

    var Keybindings = {
        
        initNavBindings: function() {

            Mousetrap.bind('space', function() {
                Backbone.trigger('shuffle');
                Backbone.trigger('clusterSkipped');
            });

            Mousetrap.bind('p', function() {
                $('tbody tr:first-child').focus();
            });

            Mousetrap.bind('down', function() {
                $(document.activeElement).next('tr').focus();
            });

            Mousetrap.bind('up', function() {
                $(document.activeElement).prev('tr').focus();
            });

            Mousetrap.bind('l', function() {
                var link = $(document.activeElement).find('a')[0];
                link.click();
            });

            Mousetrap.bind('option+l', function() {
                var pageLink = $(document.activeElement).find('a')[1];
                pageLink.click();
            });

        },

        initActionBindings: function(context) {

            var that = context;

            Mousetrap.bind('s', function() {
                var selectedEl = $(document.activeElement)[0];
                var selectedVal = '';

                if (selectedEl.tagName === 'TR') {
                    selectedVal = $('tr:focus > td:first-child').text();
                    Backbone.trigger('valueSelected', selectedVal);
                    Backbone.trigger('shuffle');
                } else {
                    if (that.openModal === true) {
                        that.closeInputModal();
                    } else {
                        Backbone.trigger('raiseError', 'noValueSelected');
                    }
                }

            });

            Mousetrap.bind('option+s', function() {
                var selectedEl = $(document.activeElement)[0];
                if (selectedEl.tagName === 'TR') {
                    var selectedVal = $('tr:focus > td:first-child').text().toLowerCase();
                    Backbone.trigger('valueSelected', selectedVal);
                    Backbone.trigger('shuffle');
                } else {
                    // If not on a TR, do nothing
                }

            });

            Mousetrap.bind('w', function() {
                var selectedEl = $(document.activeElement)[0];
                if (selectedEl.tagName === 'TR') {
                    var selectedVal = $('tr:focus > td:first-child').text();
                    $('#input-modal input').val(selectedVal);
                } else {
                    $('#input-modal input').val("");
                }

                that.modals.$textInputModal.modal();
                that.openModal = true;
                that.modals.$textInputModal.on('shown.bs.modal', function() {
                    $('tr.variant').blur();
                    $('input.form-control text').focus();
                });
            });

            Mousetrap.bind('j', function() {
                that.clear();

                var lastSeen = $('li:nth-child(2) a');
                lastSeen.click();
            });
            
            Mousetrap.bind('r', function() {
                Backbone.trigger('flaggedValue');
            });
            
            Mousetrap.bind('h', function() {
                Backbone.trigger('getHelp');
            });

            Mousetrap.bind('shift+enter', function() {
                $('button#saveButton').click();
            });
        },
    };

    return Keybindings;
});