/*global define, timeStamp, getAggregatedDishes*/

define([
    'backbone',
    'underscore',
    'jquery',
    'src/js/models/term',
    'src/js/models/user-session',
    'src/js/views/search-view',
    'src/js/views/term-view',
    'src/js/helpers/utils'
],

function(Backbone, _, $, IndexTerm, UserSession, SearchView, TermView) {
    'use strict';
    
    var IndexView = Backbone.View.extend ({
    
        el: '#index-output',
        subviews: {},
        
        events: {
        'click a':  'editIndexTerm',
        'click button#saveButton': 'saveIndexState'
        },
        
        initialize: function() {

            var search = new SearchView();
            this.subviews.search = search;

            //Populate user session model with data to be used later
            UserSession.fetch();

            var that = this;
            $(window).on('beforeunload', function() {
                that.saveIndexState();
            });

            this.listenTo(Backbone, 'fingerprintSuccess', this.createEntry);
            this.listenTo(Backbone, 'valueSelected', this.setEntryTerm);
            this.listenTo(Backbone, 'entryAdded', this.checkIndex);
            this.listenTo(Backbone, 'clusterSkipped', this.skipTerm);
            this.listenTo(Backbone, 'saveSuccess', this.setSaveStatus);
            this.listenTo(Backbone, 'flaggedValue', this.flagEntry);
            this.listenTo(Backbone, 'replace', this.reinsertTerm);
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'change:saved', this.acknowledgeSave);

            this.$termList = this.$('#index');
        },

        cleanUp: function() {

            _.each(this.subviews, function(subview) {
                if(subview) {
                    subview.remove();
                }
            });

            this.remove();
        },

        checkIndex: function() {
            var numSaved = this.collection.where({saved: true});

            if (this.collection.length - _.size(numSaved) >= 10) {
                this.saveIndexState();
            } else {
                // pass
            }
        },

        createEntry: function(data) {
            var term = new IndexTerm();
            term.set('fingerprint_value', data);
            term.set('date_created', timeStamp());
            this.collection.add(term);

        },

        setEntryTerm: function(data) {
            var cleanData = data.trim();

            var latestTerm = this.collection.pop();
            latestTerm.set('index_term', cleanData);

            latestTerm.set('_session_id', this.collection.idOffset);
            this.collection.idOffset++;

            var user = UserSession.get('username');
            latestTerm.set('responsible', user);

            this.collection.add(latestTerm);

            Backbone.trigger('entryAdded', this.collection.length);
        },
        
         flagEntry: function() {
            var latestTerm = this.collection.pop();

            Backbone.trigger('launchIssueModal', latestTerm);

            // Do stuff in the modal

            var that = this;
            var setFlag = function(data) {
                var issue_url = data;

                latestTerm.set('needsReview', true);
                latestTerm.set('review_url', issue_url);
                that.collection.add(latestTerm);

                Backbone.trigger('entryAdded', that.collection.length);
                Backbone.trigger('shuffle');
            };

            this.listenTo(Backbone, 'issueCreated', setFlag);

        },

        saveIndexState: function() {
            if (this.collection.length > 1) {
                this.collection.save();
            } else {
                Backbone.trigger('raiseError', 'noValueSelected');
            }
        },

        setSaveStatus: function(data) {
            var saveResponse = data;
            var that = this;

            _.each(saveResponse, function(resp) {

                if (resp.index.status === 201) {
                    var savedId = Number(resp.index._id);
                    var model = that.collection.where({term_id: savedId})[0];
                    model.set('saved', true);
                } else {
                    window.console.error('Something went wrong w/save!');
                }

            });
        },

        skipTerm: function() {
            this.collection.pop();
        },

        reinsertTerm: function(data) {
            this.collection.push(data);
        },

        render: function() {
            this.$termList.empty();

            this.collection.each(this.addTerm, this);
            return this;
        },

        addTerm: function(term) {
            var view = new TermView({model: term});
            this.$termList.prepend(view.render());
        },

        acknowledgeSave: function(data) {
            var savedModel = data;
            var fingerprint = savedModel.get('fingerprint_value');
            var $termEl = $('[data-fingerprint="' + fingerprint + '"] > span');
            $termEl.addClass('save-confirmed');
        },
        
        editIndexTerm: function(event) { 
            event.preventDefault(); 
            var linkEl = $(event.target).closest('li');
            var fingerprint = linkEl.data().fingerprint;
            var item = this.collection.where({fingerprint_value: fingerprint})[0];
            
            if (! item.has('term_id')) {
                this.collection.remove(item);
                this.collection.pop();
                Backbone.trigger('fingerprintSuccess', fingerprint);
            } else {
                Backbone.trigger('editSavedTerm', item);
            }
            
        }
        
        });
        
    return IndexView;
    
});

  