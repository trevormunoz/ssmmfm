/* global define */

define(['backbone'], function(Backbone) {
    'use strict';

    var UserSession = Backbone.Model.extend({
        urlRoot: '/user',

        parse: function(response) {
            window.console.log(response.login);
        },
    });

    return new UserSession();
});