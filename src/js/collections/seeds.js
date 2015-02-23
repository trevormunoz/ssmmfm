/* global define */

define([
        'backbone',
        'src/js/models/fingerprint'
], function(Backbone, Fingerprint) {
    'use strict';

    var Seeds = Backbone.Collection.extend({
        model: Fingerprint,
    });

    return Seeds;
});