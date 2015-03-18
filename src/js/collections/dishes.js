/* global define */

define([
        'backbone',
        'underscore',
        'src/js/helpers/server',
        'src/js/models/dish'
], function(Backbone, _, esClient, Dish) {
    'use strict';

    var Dishes = Backbone.Collection.extend({
        model: Dish,
        
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
                Backbone.trigger('raiseError', 'dishAggFailure');
            });
        },

        parse: function(response) {
            var bucketsArr =  response.aggregations.dishes.buckets;

            var dishArr = _.map(
                    bucketsArr,
                    function(bucket) {
                        var dishId = bucket.key;
                        return {"dish_id": dishId};
                    }
                ); 

            return dishArr;
        },
    });

    return Dishes;
});