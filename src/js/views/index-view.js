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
            var latestTerm = this.collection.pop();
            latestTerm.set('index_term', data);
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
        }
        
        });
        
    return IndexView;
    
});

  