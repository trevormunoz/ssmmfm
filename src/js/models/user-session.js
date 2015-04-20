/* global define */

define(['backbone'], function(Backbone) {
    'use strict';

    var UserSession = Backbone.Model.extend({
        urlRoot: '/user',

        parse: function(response) {
            var userObj = {
                'username': response.login,
                'user_icon': response.avatar_url,
                'user_webpage': response.html_url
            };
            
            return userObj;
        },
    });

    return new UserSession();
});