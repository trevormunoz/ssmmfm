/* global define */

define([
        'backbone',
        'src/js/models/term'
], function(Backbone, IndexTerm) {
    'use strict';

    var Index = Backbone.Collection.extend({
        model: IndexTerm,

    });

    return Index;
});