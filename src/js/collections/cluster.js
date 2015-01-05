/* global define */

define([
        'backbone',
        'src/js/models/item'
], function(Backbone, MenuItem) {
    'use strict';

    var Cluster = Backbone.Collection.extend({
        model: MenuItem,
        url: 'http://54.165.158.184/menus/item/_search',

        parse: function(response) {
            var responseArr = response.aggregations.dish.buckets;

            var dishAttrs = _.map(
                    responseArr, 
                    function(responseObj){
                        var result = responseObj.top_names.hits.hits[0];

                        var dish_id = responseObj.key
                        , name = result._source.dish_name
                        , count = result.sort[0]
                        , exemplar = result._id;

                        var dish = {
                            "id": dish_id,
                            "name_value": name,
                            "menu_count": count,
                            "exemplar_doc": exemplar
                        };

                        return dish;}
                    );

            return dishAttrs;
        }
    });

    return Cluster;

});