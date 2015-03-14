/* global define */

define(['backbone'], function(Backbone) {
    'use strict';

var MenuItem = Backbone.Model.extend({
    
    urlRoot: 'http://api.publicfare.org/menus/item/',

    });

    return MenuItem;


});
