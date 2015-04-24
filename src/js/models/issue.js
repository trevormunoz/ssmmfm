/* global define */

define(['backbone'], function(Backbone) {
    'use strict';

    var Issue = Backbone.Model.extend({
        urlRoot: '/reviews',

    });

    return Issue;
});