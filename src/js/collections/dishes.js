/* global define */

define([
        'backbone',
        'underscore',
        'src/js/models/dish'
], function(Backbone, _, Dish) {
    'use strict';

    var Dishes = Backbone.Collection.extend({
        model: Dish,
        url: 'http://52.0.128.38/menus/item/_search',
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