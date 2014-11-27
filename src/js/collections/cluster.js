/* global define */

define([
        'backbone',
        'src/js/models/item'
], function(Backbone, MenuItem) {
    'use strict';

    var Cluster = Backbone.Collection.extend({
        model: MenuItem,
        url: 'http://ec2-54-165-158-184.compute-1.amazonaws.com',
    });

    return Cluster;

});