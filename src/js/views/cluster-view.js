/*global define*/

define([
    'backbone',
    'mousetrap',
    'src/js/collections/index', 
    'src/js/collections/cluster',
    'src/js/views/pickList-view',
    'src/js/views/item-view',
    'src/js/views/index-view',
    'bootstrap'
],

function(Backbone, Mousetrap, Index, Cluster, PickListView, ItemView, IndexView) {
    'use strict';
    
    var ClusterView = Backbone.View.extend({
        el: '#cluster',
        subviews: {},

        events: {
            'click tr.variant a': 'showContextModal',
            'click .modal-footer button': 'closeInputModal',
            'click .modal-footer a': 'resetContextModal'
        },
        
        initialize: function () {
            var cluster = new Cluster();
            var picker = new PickListView({collection: cluster});
            this.subviews.picker = picker;

            var viewer = new ItemView();
            this.subviews.viewer = viewer;
            
            var indexCollex = new Index();
            var index = new IndexView({collection: indexCollex});
            this.subviews.index = index;

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
                if (selectedEl.tagName === 'TR') {
                    var selectedVal = $('tr:focus > td:first-child').text();
                } else {
                    var selectedVal = $('#input-modal input').val();
                }

                Backbone.trigger('valueSelected', selectedVal);
                that.resetCluster();
            });

            Mousetrap.bind('w', function() {
                $('#input-modal input').val("");
                $('#input-modal').modal();
                $('#input-modal').on('shown.bs.modal', function() {
                    $('tr.variant').blur();
                    $('input.form-control').focus();
                });
            });

            Mousetrap.bind('j', function() {
                var last = $('li:nth-last-child(2) a');
                window.console.log(last);
                last.click();
            });

        },

        resetCluster: function() {
            var rowEls = $('.variant');
            
            var sample = function(elArray) {
                if (elArray.length > 3) {
                    return _.sample(elArray, 3);
                } else {
                    return elArray;
                };
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
                url: 'http://54.165.158.184/menus/item/_search',
                data: $.param({source: queryString})
            });

            mltPromise.done(function(data) {
                var hitsArr = data.hits.hits;
                var newSeed = _.sample(hitsArr)._source.dish_name_fingerprint;
                Backbone.trigger('seedQuerySuccess', newSeed);
            });

            mltPromise.fail(function() {
                Backbone.trigger('mltQueryFailure');
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
            Mousetrap.trigger('s');
            $('#input-modal').modal('hide');
        }
    });

return ClusterView;

});