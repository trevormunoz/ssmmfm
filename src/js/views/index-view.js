/*global define*/

define([
    'backbone',
    'src/js/models/term',
    'src/js/views/term-view',
    'src/js/helpers'
],

function(Backbone, IndexTerm, TermView) {
    'use strict';
    
    var IndexView = Backbone.View.extend ({
    
        el: '#index',
        
        events: {
        'click a':  'editIndexTerm'
        },
        
        initialize: function() {
            this.listenTo(Backbone, 'seedQuerySuccess', this.createEntry);
            this.listenTo(Backbone, 'valueSelected', this.updateEntry);
            this.listenTo(Backbone, 'clusterSkipped', this.skipTerm);

            this.listenTo(this.collection, 'add', this.render);
        },

        createEntry: function(data) {
            var term = new IndexTerm();
            term.set('fingerprint_value', data);
            term.set('date_created', timeStamp());
            this.collection.add(term);

            Backbone.trigger('entryAdded', this.collection.length);
        },

        updateEntry: function(data) {
            var cleanData = data.trim();
            var latestTerm = this.collection.pop();
            latestTerm.set('index_term', cleanData);
            this.collection.add(latestTerm);
            
            Backbone.trigger('entryAdded', this.collection.length);
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
            this.$el.append(view.render());
        },
        
        editIndexTerm: function(event) { 
            event.preventDefault(); 
            var linkEl = $(event.target.closest('li'));
            var fingerprint = linkEl.data().fingerprint;
            var item = this.collection.where({fingerprint_value: fingerprint});
            this.collection.remove(item);
            this.collection.pop();
            Backbone.trigger('seedQuerySuccess', fingerprint);
            
        }
        
        });
        
    return IndexView;
    
});

  