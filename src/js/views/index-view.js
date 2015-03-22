/*global define, timeStamp, getAggregatedDishes*/

define([
    'backbone',
    'underscore',
    'jquery',
    'src/js/models/term',
    'src/js/collections/dishes',
    'src/js/views/term-view',
    'src/js/helpers/utils'
],

function(Backbone, _, $, IndexTerm, Dishes, TermView) {
    'use strict';
    
    var IndexView = Backbone.View.extend ({
    
        el: '#index',
        
        events: {
        'click a':  'editIndexTerm'
        },
        
        initialize: function() {
            this.listenTo(Backbone, 'fingerprintSuccess', this.createEntry);
            this.listenTo(Backbone, 'valueSelected', this.setEntryTerm);
            this.listenTo(Backbone, 'collectDishes', this.setEntryDishes);
            this.listenTo(Backbone, 'clusterSkipped', this.skipTerm);

            this.listenTo(this.collection, 'add', this.render);
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

        setEntryDishes: function(data) {
            var fingerprint = data
            , item = this.collection.where({fingerprint_value: fingerprint})
            , dishCollex = new Dishes();

            var setDishes = function() {
                if (item.length === 1) {
                    var dishIds = _.map(dishCollex.pluck('dish_id'), function(id){ return Number(id).toFixed();});
                    item[0].set('dishes_aggregated', dishIds);
                } else {
                    // Throw an error;
                }

                if (this.collection.length % 5 === 0) {
                    this.collection.save();
                }

            };

            dishCollex.fetch({
                data: {source: getAggregatedDishes(fingerprint)}, 
                reset: true
            });
            this.listenTo(dishCollex, 'reset', setDishes);

            // Clean up
            _.each(_.clone(dishCollex.models), function(model) { model.destroy(); });
        },

        skipTerm: function() {
            this.collection.pop();
        },

        render: function() {
            $('#index').empty();

            this.collection.each(this.addTerm, this);
            return this;
        },

        addTerm: function(term) {
            var view = new TermView({model: term});
            this.$el.prepend(view.render());
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

  