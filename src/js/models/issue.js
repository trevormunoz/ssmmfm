/* global define */

define(['backbone'], function(Backbone) {
    'use strict';

    var Issue = Backbone.Model.extend({
        urlRoot: '/review',

        save: function() {
            window.console.log(this);
        },

    });

    return Issue;
});