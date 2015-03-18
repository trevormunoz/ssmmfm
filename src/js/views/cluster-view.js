/*global define*/

define([
    'backbone',
    'underscore',
    'jquery',
    'mousetrap',
    'src/js/collections/index', 
    'src/js/collections/cluster',
    'src/js/views/pickList-view',
    'src/js/views/item-view',
    'src/js/views/index-view',
    'src/js/models/fingerprint',
    'bootstrap',
    'src/js/helpers/queries'
],

function(Backbone, _, $, Mousetrap, Index, Cluster, PickListView, ItemView, IndexView, Fingerprint) {
    'use strict';
    
    var ClusterView = Backbone.View.extend({
        el: '#cluster',
        subviews: {},

        events: {
            'click tr.variant a': 'showContextModal',
            'click .modal-footer button': 'closeInputModal',
            'click .modal-footer a': 'resetContextModal'
        },
        openModal: false,
        
        initialize: function () {
            
            // Set up subviews …
            var cluster = new Cluster();
            var picker = new PickListView({collection: cluster});
            this.subviews.picker = picker;

            var viewer = new ItemView();
            this.subviews.viewer = viewer;
            
            var indexCollex = new Index();
            var index = new IndexView({collection: indexCollex});
            this.subviews.index = index;

            // And event listeners …
            this.listenTo(Backbone, 'seedQuerySuccess', this.dedupeFingerprint);
            this.listenTo(Backbone, 'fingerprintSuccess', this.getFacets);

            // Set up key bindings
            var that = this;
            Mousetrap.bind('space', function() {
                Backbone.trigger('clusterSkipped');
                that.resetCluster();
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
                var link = $(document.activeElement).find('a');
                link.click();
            });

            Mousetrap.bind('s', function() {
                var selectedEl = $(document.activeElement)[0];
                var selectedVal = '';

                if (selectedEl.tagName === 'TR') {
                    selectedVal = $('tr:focus > td:first-child').text();
                    Backbone.trigger('valueSelected', selectedVal);
                    that.resetCluster();
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
                    that.resetCluster();
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

                $('#input-modal').modal();
                that.openModal = true;
                $('#input-modal').on('shown.bs.modal', function() {
                    $('tr.variant').blur();
                    $('input.form-control text').focus();
                });
            });

            Mousetrap.bind('j', function() {
                var last = $('li:nth-last-child(2) a');
                last.click();
            });
            
            Mousetrap.bind('h', function() {
                $('#help-modal').modal();
            });

        },

        dedupeFingerprint: function(data) {
            var fingerprint = data;        
            var filter = this.collection.where({value: fingerprint});   
            if (filter.length === 0)  {
                    var fingerprintModel = new Fingerprint({value: fingerprint});
                    this.collection.add(fingerprintModel);
                    Backbone.trigger('fingerprintSuccess', fingerprint);
                } else {
                    Backbone.trigger('raiseError', 'duplicateSeed');
            }

        },

        getFacets: function(data) {
            var fingerprintVal = data;

            var facetQuery = getAggByFingerprint(fingerprintVal);

            // Trigger an event on Backbone & send query string
            Backbone.trigger('facetQuerySuccess', facetQuery);
        },        

        resetCluster: function() {
            $('.modal').modal('hide');
            this.openModal = false;

            var rowEls = $('.variant');
            
            var sample = function(elArray) {
                if (elArray.length > 3) {
                    return _.sample(elArray, 3);
                } else {
                    return elArray;
                }
            };

            var dishIds = _.map(
                    sample(rowEls),
                    function(el) {
                        var _id = $(el).attr('id');
                        return _id; 
                    }
                );
            
            // Build up a query object
            var queryObj = {}
            , query = {}
            , mltClause = {};

            mltClause.fields = ["menu_sponsor", "menu_location"];
            mltClause.ids = dishIds;
            mltClause.min_term_freq = 1;
            mltClause.min_doc_freq = 1;

            query.mlt = mltClause;
            queryObj.query = query;

            var queryString = JSON.stringify(queryObj);

            // Later we may create a collection to handle fetch,
            // but for now, fire off an AJAX call directly
            var mltPromise = $.ajax({
                type: 'GET',
                url: 'http://api.publicfare.org/menus/item/_search',
                data: $.param({source: queryString})
            });

            mltPromise.done(function(data) {
                var hitsArr = data.hits.hits;
                try {
                    var newSeed = _.sample(hitsArr)._source.dish_name_fingerprint;
                    Backbone.trigger('seedQuerySuccess', newSeed);
                } catch (e) {
                    Backbone.trigger('loadDefault');
                    
                  }  
            });

            mltPromise.fail(function() {
                Backbone.trigger('raiseError', 'mltQueryFailed');
                Backbone.trigger('loadDefault');
            });

        },

        showContextModal: function(event) {
            var linkEl = $(event.target.closest('a'));
            $('.modal-body iframe').attr('src', linkEl.data().item);
            $('.modal-footer a').attr('href', linkEl.data().page);
            $('#viewer-modal').modal();
        },

        resetContextModal: function(event) {
            event.preventDefault();
            var linkEl = $(event.target.closest('a'));
            var target = linkEl.attr('href');
            $('.modal-body iframe').attr('src', target);
            $('.modal-dialog').css("width", "80%");
        },

        closeInputModal: function() {
            var selectedVal = $('#input-modal input').val();
            if (selectedVal !== '') {
                Backbone.trigger('valueSelected', selectedVal);
                $('#input-modal').modal('hide');
                this.resetCluster();
            } else {
                Backbone.trigger('modalError', 'emptyInput');
            }

            $('#input-modal').on('hidden.bs.modal', function() {
                    this.openModal = false;
                    $('div#modal-message').empty();
                });
        }

    });

return ClusterView;

});