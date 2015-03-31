/*global define, timeStamp, getAggregatedDishes*/

define([
    'backbone',
    'underscore',
    'jquery',
    'src/js/models/term',
    'src/js/collections/dishes',
    'src/js/views/term-view',
    'src/js/helpers/queries',
    'src/js/helpers/utils'
],

function(Backbone, _, $, IndexTerm, Dishes, TermView, Queries) {
    'use strict';
    
    var IndexView = Backbone.View.extend ({
    
        el: '#index-output',
        
        events: {
        'click a':  'editIndexTerm',
        'click button#saveButton': 'saveIndexState'
        },
        
        initialize: function() {
            this.listenTo(Backbone, 'fingerprintSuccess', this.createEntry);
            this.listenTo(Backbone, 'valueSelected', this.setEntryTerm);
            this.listenTo(Backbone, 'collectDishes', this.setEntryDishes);
            this.listenTo(Backbone, 'clusterSkipped', this.skipTerm);
            this.listenTo(Backbone, 'flaggedValue', this.flagEntry);
            this.listenTo(this.collection, 'add', this.render);

            this.$termList = this.$('#index');
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

            this.collection.add(latestTerm);

            Backbone.trigger('collectDishes', latestTerm.get('fingerprint_value'));
            Backbone.trigger('entryAdded', this.collection.length);
        },
        
         flagEntry: function(data) {
             
            var latestTerm = this.collection.pop();
            latestTerm.set('needsReview', true);
            this.collection.add(latestTerm);
            Backbone.trigger('entryAdded', this.collection.length);
        },
        
        setEntryDishes: function(data) {
            // Figuring out all of the dishes that share a fingerprint
            // has been deferred as long as possible --- we only go
            // to the trouble if an index term has been chosen for a
            // cluster.

            var fingerprint = data
            , item = this.collection.where({fingerprint_value: fingerprint})
            , dishCollex = new Dishes();

            var setDishes = function() {
                if (item.length === 1) {
                    var dishIds = _.map(dishCollex.pluck('dish_id'), function(id){ return Number(id).toFixed();});
                    item[0].set('dishes_aggregated', dishIds);
                } else {
                    Backbone.trigger('raiseError', 'dishAggFailed');
                }
            };

            dishCollex.fetch(Queries.getAggregatedDishes(fingerprint));
            this.listenTo(dishCollex, 'reset', setDishes);

            // Clean up by destroying all the models rather by reset
            _.each(_.clone(dishCollex.models), function(model) { model.destroy(); });
        },

        saveIndexState: function() {
            if (this.collection.length > 1) {
                this.collection.save();
            } else {
                Backbone.trigger('raiseError', 'noValueSelected');
            }
        },

        skipTerm: function() {
            this.collection.pop();
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
        
        editIndexTerm: function(event) { 
            event.preventDefault(); 
            var linkEl = $(event.target).closest('li');
            var fingerprint = linkEl.data().fingerprint;
            var item = this.collection.where({fingerprint_value: fingerprint});
            this.collection.remove(item);
            this.collection.pop();
            Backbone.trigger('fingerprintSuccess', fingerprint);
            
        }
        
        });
        
    return IndexView;
    
});

  