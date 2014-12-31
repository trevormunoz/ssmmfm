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
            return response.hits.hits;
        }
    });

    return Cluster;

});