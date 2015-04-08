/* global define */

define([
        'backbone'
], function(Backbone) {
    'use strict';

    var IndexTerm = Backbone.Model.extend({
        url: 'https://api.publicfare.org/public_fare/term/'
    });

    return IndexTerm;
    
});