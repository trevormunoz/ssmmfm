/*global define*/

define([
        'backbone',
        'jquery',
        'handlebars',
        'text!src/js/templates/result-template.html',
        'src/js/helpers/server'
], function(Backbone, $, Handlebars, resultTemplate, esClient) {
    'use strict';

    var SearchView = Backbone.View.extend({
        el: '#search-form',

        events: {
        'click button#searchButton': 'searchTerms',
        'submit #search-form': 'searchTerms'
        },

        resultTemplate: Handlebars.compile(resultTemplate),

        initialize: function() {
            this.listenTo(Backbone, 'searchResultsReturned', this.showInfoModal);
        },

        searchTerms: function() {
            var query = $('#search-form input').val();
            if (query !== "") {

                $('#search-message').empty();

                var queryBody = {"query": { "match_all": {} }}
                var phraseRegex = /^[^"|']/
                if (phraseRegex.test(query)) {
                    queryBody = {"query": { "match": { "_all": query} } };
                } else {
                    queryBody = {"query": { "match_phrase": { "_all": query} } };
                }

                var searchPromise = esClient.search({
                    index: 'public_fare',
                    type: 'term',
                    size: 25,
                    body: queryBody
                });

                searchPromise.then(function(response) {
                    
                    if (response.hits.total !== 0) {
                        Backbone.trigger('searchResultsReturned', response.hits.hits);
                    } else {
                        Backbone.trigger('searchError', 'noResults');
                    }

                }, function(err) {
                    window.console.error(err);
                });
            }
        },

        showInfoModal: function(data) {
            var searchResults = data;
            var $resultDisplay = this.resultTemplate(searchResults);
            
            $('#info-modal .modal-body').empty();
            $('#info-modal .modal-body').append($resultDisplay);
            $('#info-modal').modal();

        },

    });

    return SearchView;
});