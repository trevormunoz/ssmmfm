/* global define */

define([
        'backbone',
        'underscore',
        'src/js/helpers/server',
        'src/js/models/item'
], function(Backbone, _, esClient, MenuItem) {
    'use strict';

    var Cluster = Backbone.Collection.extend({
        model: MenuItem,
        
        fetch: function(query) {
            var that = this;

            var fetchPromise = esClient.search({
                index: 'menus',
                body: query
            });

            fetchPromise.then(function(response) {
                var data = that.parse(response);
                that.reset(data);
            }, function(err) {
                window.console.error(err.message);
                window.console.error(err.stack);
                Backbone.trigger('raiseError', 'getFacetsFailed');
            });

        },

        parse: function(response) {
            var responseArr = response.aggregations.dish.buckets;

            var dishAttrs = _.map(
                    responseArr, 
                    function(responseObj){
                        var result = responseObj.top_names.hits.hits[0];

                        var dish_id = responseObj.key
                        , name = result._source.dish_name
                        , count = result.sort[0]
                        , exemplar = result._id
                        , menu_page = result._source.menu_page_uri;

                        var dish = {
                            "id": dish_id,
                            "name_value": name,
                            "menu_count": count,
                            "exemplar_doc": exemplar,
                            "page_link": menu_page
                        };

                        return dish;}
                    );

            return dishAttrs;
        }
    });

    return Cluster;

});