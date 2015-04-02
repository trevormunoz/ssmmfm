/* global define */

define([
        'backbone'
], function(Backbone) {
    'use strict';

    var IndexTerm = Backbone.Model.extend({
        url: 'http://api.publicfare.org/public_fare/term/'
    });

    return IndexTerm;
    
});