/* global define */

define(['backbone'], function(Backbone) {
    'use strict';

var MenuItem = Backbone.Model.extend({
    
    urlRoot: 'http://52.0.128.38/menus/item/',

    });

    return MenuItem;


});
