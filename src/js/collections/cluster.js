/* global define */

define([
        'backbone',
        'src/js/models/item'
], function(Backbone, MenuItem) {
    'use strict';

    var Cluster = Backbone.Collection.extend({
        model: MenuItem,
        url: 'http://some-url',
    });

    return Cluster;

});