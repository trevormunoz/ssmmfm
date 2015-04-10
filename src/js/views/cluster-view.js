/*global define*/

define([
    'backbone',
    'underscore',
    'jquery',
    'src/js/helpers/server',
    'src/js/helpers/keybindings',
    'src/js/collections/index', 
    'src/js/collections/cluster',
    'src/js/views/pickList-view',
    'src/js/views/index-view',
    'src/js/models/fingerprint',
    'src/js/helpers/queries',
    'bootstrap'
],

function(Backbone, _, $, esClient, Keybindings, Index, Cluster, PickListView, IndexView, Fingerprint, Queries) {
    'use strict';
    
    var ClusterView = Backbone.View.extend({
        el: '#cluster',
        subviews: {},

        events: {
            'click .modal-footer button': 'closeInputModal'
        },
        openModal: false,
        
        initialize: function () {
            
            // Set up subviews …
            var cluster = new Cluster();
            var picker = new PickListView({collection: cluster});
            this.subviews.picker = picker;
            
            var indexCollex = new Index();
            var index = new IndexView({collection: indexCollex});
            this.subviews.index = index;

            // And event listeners …
            this.listenTo(Backbone, 'seedQuerySuccess', this.dedupeFingerprint);
            this.listenTo(Backbone, 'fingerprintSuccess', this.getFacets);
            this.listenTo(Backbone, 'serverDataRetrieved', this.loadExisting);

            // Set up key bindings
            Keybindings.initialize(this);
        },

        loadExisting: function(data) {
            var serverFingerprints = data;
            var that = this;

            _.each(serverFingerprints, function(fingerprint) {
                var fingerprintModel = new Fingerprint({value: fingerprint});
                that.collection.add(fingerprintModel); 
            });

        },

        cleanUp: function() {

            _.each(this.subviews, function(subview) {
                if(subview) {
                    subview.remove();
                }
            });

            this.remove();
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
                    Backbone.trigger('loadDefault');
            }

        },

        getFacets: function(data) {
            var fingerprintVal = data;

            var facetQuery = Queries.getAggByFingerprint(fingerprintVal);

            // Trigger an event on Backbone & send query string
            Backbone.trigger('facetQueryReady', facetQuery);
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

            var mltPromise = esClient.search({
                index: 'menus',
                body: Queries.getMlt(dishIds)
            });

            mltPromise.then(function(data) {
                var hitsArr = data.hits.hits;
                try {
                    var newSeed = _.sample(hitsArr)._source.dish_name_fingerprint;
                    Backbone.trigger('seedQuerySuccess', newSeed);
                } catch (e) {
                    Backbone.trigger('loadDefault');
                    
                  }  
            }, function(e) {
                Backbone.trigger('raiseError', 'mltQueryFailed');
                Backbone.trigger('loadDefault');
            });

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